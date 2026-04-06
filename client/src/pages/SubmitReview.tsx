import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function SubmitReview() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ name: '', company: '', review_text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.review_text) {
      toast.error('Please fill in your name and review.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        ...formData,
        rating,
        status: 'pending',
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Submit a Review - PFS Filters"
        description="Share your experience with PFS Filters. Leave a review to help other shops find the right paint booth filters."
        canonical="https://pfsfilters.com/submit-review"
        noIndex
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <Breadcrumb items={[{ label: 'Submit Review' }]} />

        {submitted ? (
          <Card className="text-center">
            <CardContent className="pt-12 pb-10">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Thank You for Your Review!</h2>
              <p className="text-white/50">Your review has been submitted and will appear after approval. We appreciate your feedback!</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Star rating */}
                <div className="space-y-1.5">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5"
                      >
                        <Star
                          className={`h-7 w-7 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-white/50'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Smith" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company">Shop / Company</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Smith's Body Shop" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="review_text">Your Review *</Label>
                  <Textarea
                    id="review_text"
                    name="review_text"
                    value={formData.review_text}
                    onChange={handleChange}
                    placeholder="Tell us about your experience with our filters..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Review'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
}
