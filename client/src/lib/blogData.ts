export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-often-change-paint-booth-filters",
    title: "How Often Should You Change Your Paint Booth Filters?",
    excerpt: "One of the most common questions we get from shop owners is about filter replacement schedules. The answer isn't always straightforward, but understanding the factors that affect filter life can save you money and improve finish quality.",
    author: "Mike Henderson",
    date: "2024-10-15",
    readTime: "6 min read",
    category: "Maintenance",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["paint booth filter replacement", "filter maintenance schedule", "spray booth maintenance"],
    content: `
After working with hundreds of body shops over the past 15 years, I've learned that filter replacement isn't a one-size-fits-all situation. Last month, I visited two shops in the same town—one was changing their exhaust filters every three weeks, while the other was pushing six months. Both thought they were doing it right.

Here's what actually matters.

## The Real Factors That Determine Filter Life

**Paint Volume**
This is the big one. A high-volume collision center painting 8-10 cars daily will go through filters much faster than a restoration shop doing 2-3 cars per week. I've seen busy shops need new exhaust filters every 2-3 weeks, while smaller operations can stretch to 2-3 months.

**Type of Work**
Primer work is brutal on filters. It's thick, it builds up fast, and it clogs filters quicker than topcoats. If you're doing a lot of primer work, expect to change filters more frequently. Clear coat work, on the other hand, is relatively easy on filters.

**Filter Quality**
Not all filters are created equal. We've tested dozens of brands, and the difference in capacity is significant. A quality fiberglass arrestor can hold 2-3 times more paint than a budget option. Yeah, you pay more upfront, but you change them less often.

## Warning Signs You Need New Filters

Don't just go by a calendar schedule. Your booth will tell you when it needs new filters:

1. **Reduced airflow** - If your booth feels "stuffy" or air movement seems weak, that's your first warning
2. **Longer dry times** - Paint taking longer to flash off? Probably airflow restriction
3. **Dust on fresh paint** - Clogged intake filters can't catch contaminants properly
4. **Overspray escaping the booth** - If you're seeing paint dust outside the booth, your exhaust filters are saturated
5. **Pressure gauge readings** - If your booth has manometers, watch them. A 20% increase in pressure drop means it's time

## Our Recommended Schedule

For **exhaust filters** (fiberglass arrestors or tacky panels):
- High volume shops (6+ cars/day): Every 3-4 weeks
- Medium volume (3-5 cars/day): Every 4-8 weeks
- Low volume (1-2 cars/day): Every 8-12 weeks

For **intake filters**:
- These last longer, typically 3-6 months
- Check them monthly and replace when visibly dirty
- Don't wait until they're completely clogged

## The Mistake That Costs Money

The biggest mistake I see is waiting too long to change filters. Seems like you're saving money, right? Wrong. Here's what happens:

When filters get too clogged, your booth's airflow drops. Your burner works harder to maintain temperature. Your cure times increase. Paint doesn't lay down as smooth. You get more dust defects and have to do more buffing.

Last year, one of our customers calculated that waiting "just one more week" on filter changes was costing them about 45 minutes per job in extra prep and buffing time. At their labor rate, they were losing $200-300 per week trying to save $80 on filters.

## Pro Tip: Keep Records

Start tracking when you change filters and how many cars you painted in between. After a few cycles, you'll nail down your optimal replacement schedule. Some shops keep a simple tally mark on the wall—one mark per car painted. When you hit your magic number, time for new filters.

## Bottom Line

Most shops should plan on changing exhaust filters every 4-8 weeks and intake filters every 3-4 months. But your specific situation might be different. Pay attention to your booth's performance, not just the calendar.

And when in doubt, change them early. Fresh filters are cheap compared to comebacks and re-work.
    `,
  },
  {
    slug: "fiberglass-vs-tacky-panel-filters",
    title: "Fiberglass vs. Tacky Panel Filters: Which Is Right for Your Booth?",
    excerpt: "Two of the most common filter types for paint booths are fiberglass arrestors and tacky panel filters. Both serve important roles, but they're not interchangeable. Here's how to choose the right one.",
    author: "Sarah Chen",
    date: "2024-09-22",
    readTime: "5 min read",
    category: "Product Guide",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png",
    keywords: ["fiberglass paint arrestor", "tacky panel filter", "spray booth filter comparison"],
    content: `
When it comes to paint booth filtration, the two most common filter types are fiberglass paint arrestors and tacky panel filters. Both capture overspray, but they work differently and are designed for different positions in your booth.

## Fiberglass Paint Arrestors

Fiberglass arrestors are the workhorse of exhaust filtration. They're made from layered glass fibers that trap paint particles as air passes through. The progressive density design means the fibers get tighter toward the back, capturing increasingly smaller particles.

**Best for:** Exhaust/downstream filtration, high-volume shops, budget-conscious operations

**Pros:**
- Cost-effective for frequent replacement
- Available in many standard sizes
- Good airflow characteristics when new
- Easy to dispose of

**Cons:**
- Need regular replacement (every 2-8 weeks depending on volume)
- Less effective at capturing very fine particles

## Tacky Panel Filters

Tacky panels use a different approach—they're coated with a sticky adhesive that physically traps paint particles on contact. Think of them as a fly strip for overspray.

**Best for:** Intake filtration, booths with fine finish requirements, lower-volume shops

**Pros:**
- Superior particle capture efficiency
- Can handle finer particles than fiberglass
- Last longer in intake positions
- Better for achieving high-quality finishes

**Cons:**
- Higher upfront cost
- Can't be cleaned and reused once saturated
- Not ideal for high-volume exhaust positions

## The Right Filter for the Right Position

Here's the key insight most shops miss: **use both types, in the right positions.**

For the **exhaust side** (downstream of the spray area), fiberglass arrestors are typically the better choice. They handle the heavy paint load efficiently and are cost-effective to replace frequently.

For the **intake side** (upstream, bringing fresh air in), tacky panels excel. They capture dust, pollen, and contaminants before they enter the booth, protecting your finish quality.

## Making Your Decision

If you're unsure which filter to use, ask yourself:
1. Is this filter on the intake or exhaust side?
2. What's my paint volume per week?
3. What's my finish quality requirement?

For most automotive body shops, the answer is fiberglass on the exhaust and tacky panels on the intake. For specialty shops doing high-end custom work, upgrading to tacky panels on both sides can improve finish quality noticeably.

Still not sure? Contact us with your booth make and model, and we'll recommend the exact filter combination for your setup.
    `,
  },
  {
    slug: "paint-booth-maintenance-checklist",
    title: "The Complete Paint Booth Maintenance Checklist",
    excerpt: "A well-maintained paint booth produces better finishes, lasts longer, and keeps your team safe. Here's the maintenance checklist we recommend to every shop owner.",
    author: "Mike Henderson",
    date: "2024-08-10",
    readTime: "8 min read",
    category: "Maintenance",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/spray-booth-interior_89dd33c3.jpg",
    keywords: ["paint booth maintenance", "spray booth checklist", "booth maintenance schedule"],
    content: `
A paint booth is a significant investment. Proper maintenance protects that investment, ensures consistent finish quality, and keeps your team safe. Here's the comprehensive maintenance checklist we've developed over years of working with body shops.

## Daily Checks

**Before Each Use:**
- Inspect exhaust filters for saturation (hold up to light—if you can't see light through them, replace)
- Check intake filter condition
- Verify booth lighting is working properly
- Confirm air pressure readings are within normal range
- Check for any debris on booth floor

**After Each Use:**
- Wipe down booth walls if overspray buildup is visible
- Check floor filters/grates for paint buildup
- Note any unusual sounds or airflow changes

## Weekly Maintenance

- Deep clean booth floor and grates
- Inspect door seals for wear or damage
- Check lighting fixtures for paint buildup (reduces light output)
- Verify exhaust fan operation
- Inspect ductwork for blockages

## Monthly Maintenance

- Replace intake filters (or inspect and replace if dirty)
- Clean or replace ceiling filters
- Inspect burner operation and flame pattern
- Check all electrical connections
- Lubricate door hinges and hardware
- Inspect booth structure for rust or damage

## Quarterly Maintenance

- Professional inspection of heating system
- Ductwork cleaning if needed
- Check and calibrate airflow meters
- Inspect and test fire suppression system
- Review filter change logs and adjust schedule if needed

## Annual Maintenance

- Full professional service of heating and ventilation system
- Replace all gaskets and seals
- Electrical system inspection
- Structural inspection
- Update maintenance logs and filter inventory

## The Most Common Maintenance Mistake

The most common mistake we see is reactive maintenance—waiting until something breaks before fixing it. Proactive maintenance costs a fraction of emergency repairs and prevents costly downtime.

The second most common mistake is inconsistent filter changes. Set a schedule, stick to it, and keep records. Your finishes will be more consistent, and you'll catch problems early.

## Building Your Maintenance Program

Start with a simple log sheet. Record:
- Date of filter changes
- Number of cars painted since last change
- Any unusual observations
- Maintenance performed

After a few months, you'll have the data to optimize your schedule for your specific operation.

Need help setting up a maintenance program? Our team can help you create a customized schedule based on your booth model and paint volume.
    `,
  },
  {
    slug: "aerospace-paint-booth-compliance-method-319",
    title: "Understanding EPA Method 319 for Aerospace Paint Booths",
    excerpt: "EPA Method 319 is the standard test method for measuring paint overspray arrestor performance in aerospace applications—specifically regarding hexavalent chromium. Here's what facility managers need to know.",
    author: "PFS Engineering",
    date: "2026-07-30",
    readTime: "7 min read",
    category: "Aerospace",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["EPA Method 319", "aerospace paint booth compliance", "chromate overspray filtration", "NESHAP aerospace", "hexavalent chromium paint booth", "aerospace exhaust filtration", "3-stage overspray system"],
    content: `
If you operate an aerospace finishing facility, you've likely encountered references to EPA Method 319. It's one of the most critical standards governing how paint overspray arrestors perform in environments where hexavalent chromium compounds are present. Understanding what it requires—and what it doesn't—can help you make informed decisions about your booth's filtration system.

## What Is EPA Method 319?

EPA Method 319 is a test procedure developed by the Environmental Protection Agency to measure the capture efficiency of paint overspray arrestors. It was specifically designed for aerospace applications where chromated primers and coatings produce hazardous overspray containing hexavalent chromium (Cr6+).

The method establishes a standardized way to verify that a filter system can capture a specified percentage of chromium-containing particulate before exhaust air leaves the booth. It's referenced in NESHAP (National Emission Standards for Hazardous Air Pollutants) regulations that apply to aerospace manufacturing and maintenance facilities.

## Why Standard Single-Stage Filters Aren't Enough

A conventional single-stage fiberglass paint arrestor is designed to capture bulk overspray—the heavy, visible paint particles that make up the majority of booth exhaust. These filters work well for standard automotive and industrial finishing.

However, aerospace chromated coatings produce extremely fine particulate that can pass through single-stage media. To meet the capture efficiencies required under Method 319 testing, facilities typically need a **multi-stage filtration system**:

**Stage 1 — Pre-filter:** A high-capacity media (such as CPA roll media or fiberglass arrestor) that captures the bulk overspray and extends the life of downstream stages.

**Stage 2 — Secondary filter:** A tackified polyester or synthetic media (such as ME/PT-type media) that captures finer particles the pre-filter missed. Typically rated at MERV 8 or higher.

**Stage 3 — Final filter:** A high-efficiency pocket bag filter (such as HEPA-XFP-type configurations) that captures the finest remaining particulate to meet the required overall system efficiency.

## How to Upgrade Your Existing Booth

The good news: you don't always need a completely new spray booth to achieve compliance. Many existing aerospace booths can be retrofitted with multi-stage filtration by modifying the exhaust plenum configuration. Key considerations include:

- **Plenum depth** — Multi-stage systems require more physical space than a single filter bank. Measure your available exhaust cavity depth.
- **Static pressure** — Adding filter stages increases resistance. Your booth's fan system must be capable of maintaining adequate airflow velocity (typically 100+ FPM at the work surface) with the additional pressure drop.
- **Filter access** — Each stage needs to be independently replaceable. Consider how technicians will access and change filters in your specific booth layout.
- **Monitoring** — Install differential pressure gauges across each stage so you can track loading and schedule changes before efficiency drops.

## What This Means for Your Facility

If your aerospace facility applies chromated primers or coatings, your local air quality district likely requires documentation that your exhaust filtration meets specific capture efficiency thresholds. Method 319 is the test procedure that verifies this.

The specific filter products, configurations, and system designs that achieve compliance depend on your facility's unique factors: booth dimensions, airflow volume, coating types, and production schedule.

## The PFS Approach

PFS Filters supplies aerospace-grade filtration media including multi-pocket bag filters, NESHAP 319 final-stage bags, intake panels, and roll media used in multi-stage exhaust systems. Our engineering team—backed by 30+ years of spray booth design experience—can review your current setup and recommend the right filter configuration for your application.

We don't make blanket compliance guarantees, because every facility is different. What we do is provide the right media, sized correctly, and help you understand how the pieces fit together.

**Ready to review your aerospace filtration setup?**
    `,
  },
];
