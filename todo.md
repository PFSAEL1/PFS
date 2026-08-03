# Logo refresh tasks

## Findings from uploaded ZIP review
- `CUSTOMER LOGOS/Logo-Boeing.png`: clean blue Boeing wordmark with transparent background; suitable for static white-background strip and dark carousel.
- `CUSTOMER LOGOS/spacex.png`: sharp black SpaceX wordmark on white square background; good candidate for white-background strip, but should be tightly cropped/processed for dark carousel.
- `CUSTOMER LOGOS/Tesla_logo.png`: red Tesla mark and wordmark on transparent background; suitable for both static strip and dark carousel.
- `CUSTOMER LOGOS/CAT-logo.png`: sharp CAT logo with black letters and yellow triangle on transparent background; suitable for both placements.
- `CUSTOMER LOGOS/CARSTARNA_Logo_1170w-1024x523.png`: gray CARSTAR wordmark with red star on white background; suitable for Stripe-style static strip, may need white-background removal/cropping for dark carousel.
- ZIP also contains likely candidates for Metro, AV, LeRoi, and Dempsey Gill that still need mapping and processing.

## Tasks
- [ ] Identify each uploaded logo file and map it to the customer/company name used in the site.
- [ ] Process/crop logos so the Home page dark carousel uses sharp real assets with minimal background artifacts.
- [ ] Rewrite `TrustedBy.tsx` back to a static Stripe-style white section using the colored logos with subtle opacity blending.
- [ ] Update `LogoCarousel.tsx` to use the sharp processed real logos while leaving the compliance carousel untouched.
- [ ] Run TypeScript check and save a new checkpoint.
