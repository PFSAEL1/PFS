import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, PenSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Review {
  id: string;
  name: string;
  company: string | null;
  review_text: string;
  rating: number;
  created_at: string;
  product_id: string | null;
}

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data, error }) => {
        if (!error && data) setReviews(data);
        setLoading(false);
      });
  }, []);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/70'}`}
      />
    ));

  if (loading) {
    return (
      <section className="py-20 bg-[#0d0d0d]/5/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Customer Reviews</h2>
          <div className="text-white/70">Loading reviews...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0d0d0d]/5/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-primary/20 mb-4">
            <Star className="h-4 w-4 text-blue-400 fill-primary" />
            <span className="text-sm font-semibold text-blue-400">Customer Reviews</span>
          </div>
          <h2 className="text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
          <Link href="/submit-review">
            <Button size="sm" variant="outline" className="gap-2">
              <PenSquare className="w-4 h-4" />
              Write a Review
            </Button>
          </Link>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-white/70">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-4 italic">
                    "{review.review_text}"
                  </p>
                  <div>
                    <p className="font-semibold text-sm">{review.name}</p>
                    {review.company && (
                      <p className="text-xs text-white/70">{review.company}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
