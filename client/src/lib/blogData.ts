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
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/og-image_9075de08.jpg",
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
];
