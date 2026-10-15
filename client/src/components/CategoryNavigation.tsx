// Home category row — dark "Explore the lineup" tiles.
import { LineupCard, LineupCarousel, LineupHeader, tintFor } from '@/components/Lineup';

type Category = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  alt: string;
};

const categories: Category[] = [
  {
    title: 'Ceiling Blankets',
    subtitle: 'Overhead intake filtration',
    href: '/category/ceiling-blankets',
    image: '/images/cat_ceiling_blankets-640.webp',
    alt: 'Paint booth ceiling blanket intake filter media for downdraft spray booths',
  },
  {
    title: 'Fiberglass Arrestors',
    subtitle: 'High-capacity exhaust filtration',
    href: '/category/fiberglass-arrestors',
    image: '/images/cat_fiberglass_arrestors-transparent-640.webp',
    alt: 'Paint booth fiberglass paint arrestor exhaust filter pad',
  },
  {
    title: 'Tacky Panel Filters',
    subtitle: 'Superior particle capture',
    href: '/category/tacky-panels',
    image: '/images/cat_tacky_panels-640.webp',
    alt: 'Paint booth tacky panel intake filter for spray booth air inlet',
  },
  {
    title: 'Roll Media',
    subtitle: 'Continuous roll filtration',
    href: '/category/roll-media',
    image: '/images/cat_roll_media-transparent-640.webp',
    alt: 'Paint booth roll filter media for intake and exhaust filtration',
  },
  {
    title: 'Shop by Size',
    subtitle: '20x20, 20x25, custom cuts',
    href: '/shop-by-size',
    image: '/images/cat_fiberglass_arrestors-transparent-640.webp',
    alt: 'Paint booth filters by size — 20x20, 20x25 and custom-cut',
  },
  {
    title: 'Shop by Type',
    subtitle: 'Intake, exhaust, MERV-rated',
    href: '/shop-by-type',
    image: '/images/cat_roll_media-transparent-640.webp',
    alt: 'Paint booth filters by type — intake, exhaust and MERV-rated media',
  },
];

export const CategoryNavigation = () => {
  return (
    <section className="section-raised px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <LineupHeader title="Find your filter." href="/shop" linkLabel="Shop all" />
        <LineupCarousel label="Filter categories">
          {categories.map((cat, index) => (
            <LineupCard
              key={cat.href}
              href={cat.href}
              title={cat.title}
              description={cat.subtitle}
              image={cat.image}
              alt={cat.alt}
              tint={tintFor(`${cat.title} ${cat.subtitle}`, index)}
              width={640}
              height={640}
              sizes="300px"
            />
          ))}
        </LineupCarousel>
      </div>
    </section>
  );
};
