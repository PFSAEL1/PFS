-- Private, service-role-only cart reminder state. Do not expose guest email or carts via anon RLS.
CREATE TABLE IF NOT EXISTS public.cart_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  browser_token_hash text NOT NULL UNIQUE,
  email_ciphertext text NOT NULL,
  email_hash text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  item_fingerprint text NOT NULL,
  consent_version text NOT NULL,
  consent_at timestamptz NOT NULL DEFAULT now(),
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'claimed', 'sent', 'cancelled', 'checkout_started', 'failed')),
  checkout_started_at timestamptz,
  attempted_at timestamptz,
  sent_at timestamptz,
  resend_message_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS cart_reminders_due_idx ON public.cart_reminders(last_activity_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS cart_reminders_email_idx ON public.cart_reminders(email_hash, sent_at);
ALTER TABLE public.cart_reminders ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.cart_reminders FROM anon, authenticated;

CREATE TABLE IF NOT EXISTS public.cart_reminder_suppressions (
  email_hash text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cart_reminder_suppressions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.cart_reminder_suppressions FROM anon, authenticated;

CREATE TABLE IF NOT EXISTS public.cart_reminder_rate_limits (
  bucket text PRIMARY KEY,
  attempts integer NOT NULL DEFAULT 0,
  expires_at timestamptz NOT NULL
);
ALTER TABLE public.cart_reminder_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.cart_reminder_rate_limits FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.reserve_cart_reminder_optin(p_bucket text, p_limit integer)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE accepted integer;
BEGIN
  INSERT INTO public.cart_reminder_rate_limits(bucket, attempts, expires_at)
  VALUES (p_bucket, 1, now() + interval '1 day')
  ON CONFLICT (bucket) DO UPDATE
    SET attempts = public.cart_reminder_rate_limits.attempts + 1
    WHERE public.cart_reminder_rate_limits.attempts < p_limit;
  GET DIAGNOSTICS accepted = ROW_COUNT;
  RETURN accepted = 1;
END;
$$;
REVOKE ALL ON FUNCTION public.reserve_cart_reminder_optin(text,integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_cart_reminder_optin(text,integer) TO service_role;

-- Retain only the keyed address fingerprint needed for old email opt-out links.
-- The full cart snapshot and encrypted address are purged after 60 days.
CREATE TABLE IF NOT EXISTS public.cart_reminder_unsubscribe_links (
  id uuid PRIMARY KEY,
  email_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cart_reminder_unsubscribe_links ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.cart_reminder_unsubscribe_links FROM anon, authenticated;

CREATE TABLE IF NOT EXISTS public.cart_reminder_send_claims (
  email_hash text PRIMARY KEY,
  cart_id uuid NOT NULL,
  claimed_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cart_reminder_send_claims ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.cart_reminder_send_claims FROM anon, authenticated;

-- Both cart and per-address reservations are committed in a single transaction.
-- A claim is retained for 14 days even if a provider request fails ambiguously.
CREATE OR REPLACE FUNCTION public.claim_cart_reminder(p_id uuid, p_due_before timestamptz)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE v_email_hash text;
DECLARE v_rows integer;
BEGIN
  UPDATE public.cart_reminders
  SET status = 'claimed', attempted_at = now(), updated_at = now()
  WHERE id = p_id AND status = 'pending' AND last_activity_at <= p_due_before
    AND checkout_started_at IS NULL AND sent_at IS NULL
  RETURNING email_hash INTO v_email_hash;
  IF v_email_hash IS NULL THEN RETURN false; END IF;
  INSERT INTO public.cart_reminder_send_claims(email_hash, cart_id, claimed_at)
  VALUES (v_email_hash, p_id, now())
  ON CONFLICT (email_hash) DO UPDATE
    SET cart_id = EXCLUDED.cart_id, claimed_at = now()
    WHERE public.cart_reminder_send_claims.claimed_at < now() - interval '14 days'
  RETURNING 1 INTO v_rows;
  IF v_rows IS NULL THEN
    UPDATE public.cart_reminders SET status = 'cancelled', updated_at = now() WHERE id = p_id;
    RETURN false;
  END IF;
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_cart_reminder(uuid,timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_cart_reminder(uuid,timestamptz) TO service_role;
