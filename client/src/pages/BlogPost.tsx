import { useParams, Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/blogData';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Clock, User, ArrowLeft, Calendar } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#040404] text-white">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white pfs-heading-animate">Post Not Found</h1>
          <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://pfsfilters.com' },
    { name: 'Blog', url: 'https://pfsfilters.com/blog' },
    { name: post.title, url: `https://pfsfilters.com/blog/${post.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    url: `https://pfsfilters.com/blog/${post.slug}`,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'PFS Filters', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/icon_a34990c0.png' },
    keywords: post.keywords.join(', '),
  };

  // Convert markdown-like content to HTML paragraphs
  const renderContent = (content: string) => {
    return content
      .trim()
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(3)}</h2>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-semibold mt-4 mb-2">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith('- ')) {
          return <li key={i} className="ml-6 list-disc text-white/70">{line.slice(2)}</li>;
        }
        if (line.match(/^\d+\. /)) {
          return <li key={i} className="ml-6 list-decimal text-white/70">{line.replace(/^\d+\. /, '')}</li>;
        }
        if (line.trim() === '') return <br key={i} />;
        return <p key={i} className="text-white/70 leading-relaxed">{line}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`https://pfsfilters.com/blog/${post.slug}`}
        ogType="article"
        ogImage={post.image}
        structuredData={{ '@context': 'https://schema.org', '@graph': [breadcrumbSchema, articleSchema] }}
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

        <Link href="/blog">
          <Button variant="ghost" size="sm" className="gap-2 mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Button>
        </Link>

        <article>
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-white/70">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-sm text-white/70">
                <Calendar className="h-3.5 w-3.5" /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{post.title}</h1>
            <p className="text-xl text-white/70 leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <User className="h-4 w-4" />
              <span>By <strong className="text-foreground">{post.author}</strong></span>
            </div>
          </div>

          <div className="aspect-video overflow-hidden rounded-2xl mb-10">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none space-y-2">
            {renderContent(post.content)}
          </div>

          <div className="mt-12 p-6 bg-blue-500/5 border border-primary/20 rounded-xl">
            <h3 className="font-bold text-lg mb-2">Need Help Choosing the Right Filters?</h3>
            <p className="text-white/70 mb-4">
              Our team of filtration experts can help you find the perfect filters for your specific spray booth and application.
            </p>
            <div className="flex gap-3">
              <Link href="/shop">
                <Button className="bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90">Shop Filters</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
