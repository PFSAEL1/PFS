import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/blogData';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Clock, User, ArrowRight } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Blog', url: 'https://pfsfilters.com/blog' },
]);

const blogListSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'PFS Filters Spray Booth Blog',
  description: 'Expert insights on spray booth maintenance, filter selection, and industry best practices',
  url: 'https://pfsfilters.com/blog',
  blogPost: blogPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://pfsfilters.com/blog/${post.slug}`,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'PFS Filters' },
  })),
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Spray Booth Maintenance & Filter Guide - Expert Tips & How-To"
        description="Expert advice on paint booth filters, maintenance schedules, filter selection, and troubleshooting. Learn from industry professionals with 20+ years experience."
        canonical="https://pfsfilters.com/blog"
        structuredData={{ '@context': 'https://schema.org', '@graph': [breadcrumbSchema, blogListSchema] }}
      />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <Breadcrumb items={[{ label: 'Blog' }]} />
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white pfs-heading-animate">Spray Booth Knowledge Center</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Expert guides, maintenance tips, and industry insights from the PFS Spray Booths team
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-video overflow-hidden bg-white/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <span className="text-xs text-white/70 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-bold text-lg leading-tight mb-2 hover:text-blue-400 transition-colors group-hover:text-blue-400">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-white/70">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-xs text-blue-400 font-medium hover:gap-2 transition-all">
                    Read more <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
