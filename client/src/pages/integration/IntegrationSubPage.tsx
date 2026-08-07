import PageHero from "@/components/PageHero";
import { Link, useParams } from "wouter";
import { ArrowRight } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";

const PAINT = "/manus-storage/pfs-robotics-card_2aac132b.jpg";
const PAINT_VIDEO = "/manus-storage/pfs-liquid-paint-lines-robot-hero-v2_48bab39f.mp4";
const POWDER = "/manus-storage/pfs-powder-coating-line-real_9473890b.png";
const POWDER_VIDEO = "/manus-storage/pfs-powder-coating-line-hero_57df7526.mp4";
const OVEN = "/manus-storage/orig-render-conveyor-oven_7e2e504a.webp";
const AERO = "/manus-storage/pfs-aerospace-jet-in-booth-real_2eb79dc9.png";
const PRETREAT = "/manus-storage/washbooth_75284018.png";
const PRETREAT_SPRAY = "/manus-storage/washbooth_75284018.png";
const PRETREAT_VIDEO = "/manus-storage/integration_pretreatment_hero_114608e5.mp4";
const ROBOT = "/manus-storage/pfs-orion-r-robotic-cell_12c36106.png";
const ROBOTIC_VIDEO = "/manus-storage/pfs-robotic-cells-hero-v2_5c50c32e.mp4";
const CONVEYOR_IMG = "/manus-storage/yellow-conveyor-system_8b253b1f.jpg";
const CONVEYOR_VIDEO = "/manus-storage/pfs-conveyor-hero_b159dbda.mp4";
const INTEGRATED_SYSTEM = "/manus-storage/pfs-integrated-system-line_ad6dc185.png";
const SYSTEM_INTEGRATION_VIDEO = "/manus-storage/pfs-system-integration-hero_2d68f8ec.mp4";
const ZENITH_OVEN_CONVEYOR = "/manus-storage/pfs-zenith-oven-conveyor_5da05385.jpg";
const CONVEYOR_OVen_LINE = "/manus-storage/pfs-conveyor-oven-line_a1034fad.png";
const CONVEYOR_PANORAMIC = "/manus-storage/pfs-conveyor-panoramic_5c197ba2.png";

interface RelatedProduct { title: string; subtitle: string; href: string; image: string; }
interface FAQItem { q: string; a: string; }
interface SubContent {
  title: string;
  desc: string;
  seoTitle: string;
  seoDesc: string;
  body: string;
  body2?: string;
  body3?: string;
  features: string[];
  img: string;
  related: RelatedProduct[];
  galleryImages?: string[];
  faqs: FAQItem[];
}

const CONTENT: Record<string, SubContent> = {
  "liquid-paint-lines": {
    title: "Liquid Paint Lines",
    desc: "Complete automated liquid paint lines from pretreatment through topcoat.",
    seoTitle: "Automated Liquid Paint Lines | Turnkey Wet Paint Finishing Systems | PFS",
    seoDesc: "PFS designs and builds complete turnkey automated liquid paint lines — paint kitchen, plural component mixing, circulation systems, conveyor, spray booth, and cure oven — for automotive, aerospace, and industrial applications. NFPA 33 compliant. ETL/UL listed. Made in USA.",
    body: "PFS designs and builds complete automated liquid paint lines for automotive, industrial, aerospace, and general manufacturing applications. As a single-source manufacturer, we engineer every stage of the finishing line — from the paint kitchen and pretreatment wash system through the spray booth, flash-off zone, and curing oven — ensuring every component is designed to work together as a seamless, high-throughput production system. Our liquid paint lines handle solvent-borne and waterborne coatings, two-component urethanes, epoxy primers, high-solids topcoats, and specialty chemistries.",
    body2: "The paint kitchen is the heart of any automated liquid paint line. PFS designs and integrates paint circulation systems, plural component mixing equipment, fluid flow meters, and automated spray packages that deliver coating material at precise pressure, flow rate, and mix ratio to every gun on the line. Our PLC-based controls give operators full visibility and control over conveyor speed, booth airflow, oven temperature profiles, VOC concentration, and coating delivery parameters — all from a single HMI touchscreen. Recirculating spray booth systems minimize solvent emissions and reduce operating costs. Automated centralized control systems eliminate manual adjustments and reduce the risk of coating defects from process variation.",
    body3: "PFS liquid paint lines are installed in automotive OEM facilities, Tier 1 suppliers, agricultural equipment manufacturers, aerospace component shops, and custom coating operations across the United States. Line speeds, booth dimensions, oven lengths, and conveyor configurations — overhead monorail, power-and-free, or floor-mounted — are all custom-engineered to your part geometry, production volume, and coating specifications. Whether you are specifying a new automated wet paint line or retrofitting an existing manual operation, PFS provides the engineering, fabrication, installation, commissioning, and operator training to get your line running at target throughput from day one.",
    features: [
      "Complete line design and engineering from pretreatment through topcoat",
      "Paint kitchen — circulation pumps, fluid flow meters, pressure regulators",
      "Plural component mixing systems — 2K urethanes, epoxies, high-solids",
      "Spray washer pretreatment — iron phosphate, zinc phosphate, zirconium",
      "Recirculating and fresh-air spray booths with 100 FPM face velocity — NFPA 33 compliant",
      "VOC control and odor control systems",
      "Flash-off zones with temperature and humidity control",
      "Conveyor systems — overhead monorail, power-and-free, floor conveyor",
      "Curing ovens — conveyor, batch, or combination",
      "Automated centralized control — PLC with HMI touchscreen",
      "ETL/UL listed components throughout",
      "Commissioning, startup, and operator training included",
    ],
    img: PAINT,
    galleryImages: [
      ZENITH_OVEN_CONVEYOR,
      CONVEYOR_OVen_LINE,
      CONVEYOR_PANORAMIC,
      "/manus-storage/pfs-auto-powder-line1_3bb98899.png",
      "/manus-storage/pfs-auto-powder-booth_355e5ffc.png",
      "/manus-storage/pfs-auto-powder-conveyor_14f8b84a.png",
      "/manus-storage/pfs-auto-powder-operator_24e559e8.jpg",
    ],
    related: [
      { title: "Pretreatment Systems", subtitle: "Chemical wash & prep before painting", href: "/integration-automation/pretreatment-systems", image: PRETREAT },
      { title: "Conveyor Systems", subtitle: "Move parts through the paint line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
      { title: "Enclosed Paint Booths", subtitle: "Spray booth for your liquid paint line", href: "/products/paint-booths/enclosed", image: AERO },
    ],
    faqs: [
      { q: "What is a turnkey liquid paint line?", a: "A turnkey liquid paint line is a complete automated finishing system where a single manufacturer — in this case PFS — designs, engineers, fabricates, installs, and commissions every stage of the line. This includes pretreatment, spray booths, flash-off zones, conveyors, curing ovens, and controls. You receive a production-ready system rather than individual components that must be integrated by separate vendors." },
      { q: "What coatings can a PFS liquid paint line handle?", a: "PFS liquid paint lines are engineered for solvent-borne and waterborne coatings, two-component urethanes, epoxy primers, high-solids topcoats, and specialty coatings. The booth airflow, flash-off zone conditions, and oven temperature profiles are all configured to your specific coating chemistry." },
      { q: "What NFPA and safety standards apply to liquid paint lines?", a: "PFS liquid paint lines are engineered to NFPA 33 (Standard for Spray Application Using Flammable or Combustible Materials), OSHA 29 CFR 1910.94 (Ventilation — Spray Finishing Operations), and ETL/UL listing requirements. All electrical components in the spray zone meet Class I Division 1 or Division 2 hazardous location requirements as applicable." },
      { q: "How long does it take to design and install a liquid paint line?", a: "Project timelines vary based on line complexity, facility conditions, and equipment lead times. A typical automated liquid paint line project runs 16–32 weeks from signed contract to commissioning. PFS provides a detailed project schedule during the proposal phase." },
      { q: "Can PFS integrate a new liquid paint line with our existing conveyor or controls?", a: "Yes. PFS provides system integration services to connect new finishing equipment with existing conveyors, PLC systems, and facility utilities. Our engineers assess your existing infrastructure during the design phase and engineer the tie-in as part of the project scope." },
    ],
  },
  "powder-coating-lines": {
    title: "Powder Coating Lines",
    desc: "Fully integrated powder coating lines including pretreatment, application, and curing.",
    seoTitle: "Turnkey Powder Coating Lines | Automated Powder Coating System Integrator | PFS",
    seoDesc: "PFS designs and builds complete turnkey powder coating lines — dense phase powder pumps, cyclone and cartridge recovery, color change systems, conveyor, and cure ovens. Single-source manufacturer. NFPA 33 compliant. Made in USA.",
    body: "PFS designs and builds complete turnkey powder coating lines for metal fabricators, automotive suppliers, agricultural equipment manufacturers, and custom coating operations. As a single-source manufacturer, we engineer every stage of the powder coating process — from the pretreatment wash system through the powder application booth, powder recovery system, and curing oven — into a seamlessly integrated production line. Our systems accommodate standard TGIC polyester, epoxy, epoxy-polyester hybrid, and specialty powder chemistries.",
    body2: "Powder delivery precision is the difference between a consistent finish and a costly rework cycle. PFS integrates dense phase powder pump technology, Venturi pump systems, and powder center configurations that deliver stable, consistent powder flow to every gun on the line. Closed-loop digital flow control maintains powder output stability across shifts and color changes. Our color change systems — from manual to fully automated — are engineered for contamination-free color change with minimal purge time, protecting your production schedule and reducing material waste. Production monitoring dashboards give line supervisors real-time visibility into gun output, recovery efficiency, and oven temperature profiles.",
    body3: "PFS powder coating lines are installed in facilities across the United States, handling everything from small architectural components to large structural steel assemblies. Conveyor configurations include overhead monorail, power-and-free, and floor-mounted systems, all engineered to your part load, line speed, and facility layout. Our systems are engineered to NFPA 33 standards and ETL/UL listed, with PLC-based controls that manage conveyor speed, powder gun parameters, oven temperature profiles, and color change sequences from a single HMI touchscreen.",
    features: [
      "Complete line design and engineering from pretreatment through cure",
      "Spray washer pretreatment — 3-stage, 5-stage, and 7-stage systems",
      "Powder application booths with integrated recovery systems",
      "Dense phase powder pump technology for stable, consistent powder delivery",
      "Cyclone and cartridge filter powder recovery — 95–98% powder utilization",
      "Contamination-free color change systems — manual and automated",
      "Closed-loop digital flow control with production monitoring dashboards",
      "Overhead monorail, power-and-free, and floor conveyor systems",
      "Conveyor curing ovens sized to your line speed and part mass",
      "PLC-based controls with HMI touchscreen — Industry 4.0 ready",
      "ETL/UL listed components throughout",
      "Commissioning, startup, and operator training included",
    ],
    img: POWDER,
    galleryImages: [
      ZENITH_OVEN_CONVEYOR,
      CONVEYOR_OVen_LINE,
      CONVEYOR_PANORAMIC,
      "/manus-storage/pfs-powder-recovery-lines_a80d3e22.png",
      "/manus-storage/pfs-auto-powder-line1_3bb98899.png",
      "/manus-storage/pfs-auto-powder-booth_355e5ffc.png",
      "/manus-storage/pfs-auto-powder-conveyor_14f8b84a.png",
      "/manus-storage/pfs-auto-powder-operator_24e559e8.jpg",
      "/manus-storage/pfs-robotic-arm-red-spray_90b1e89b.png",
    ],
    related: [
      { title: "Pretreatment Systems", subtitle: "Chemical wash before powder coating", href: "/integration-automation/pretreatment-systems", image: PRETREAT },
      { title: "Conveyor Systems", subtitle: "Move parts through the powder line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
      { title: "Industrial Ovens", subtitle: "Cure the powder after application", href: "/products/ovens/conveyor", image: OVEN },
    ],
    faqs: [
      { q: "What is a turnkey powder coating line?", a: "A turnkey powder coating line is a complete automated finishing system where a single manufacturer — PFS — designs, engineers, fabricates, installs, and commissions every stage of the line. This includes the pretreatment wash system, powder application booth, powder recovery system, conveyor, curing oven, and controls. You receive a production-ready system with a single point of accountability." },
      { q: "What is the difference between a batch and a conveyor powder coating line?", a: "A batch powder coating system processes parts in groups — parts are loaded, coated, and cured in discrete batches. A conveyor powder coating line moves parts continuously through the pretreatment, application, and curing stages on a conveyor. Conveyor lines offer higher throughput and lower labor cost per part, while batch systems offer more flexibility for low-volume, high-mix production." },
      { q: "How does powder recovery work on a PFS powder coating line?", a: "PFS powder coating lines use cyclone separators and cartridge filter recovery systems to reclaim overspray powder for reuse. Recovery efficiency varies by powder type and booth design, but well-designed systems typically achieve 95–98% powder utilization. Color change procedures are engineered into the line design to minimize changeover time and cross-contamination." },
      { q: "What NFPA standards apply to powder coating lines?", a: "PFS powder coating lines are engineered to NFPA 33 (Standard for Spray Application Using Flammable or Combustible Materials), which covers powder coating operations, booth ventilation, fire suppression, and electrical classification requirements. All PFS powder coating systems include the required ventilation, grounding, and fire protection systems to meet NFPA 33 compliance." },
      { q: "Can PFS design a powder coating line for large or heavy parts?", a: "Yes. PFS designs powder coating lines for a wide range of part sizes and weights, from small components to large structural assemblies. Conveyor load capacity, booth dimensions, oven opening size, and hanger spacing are all engineered to your specific part envelope and weight." },
    ],
  },
  "conveyor-systems": {
    title: "Conveyor Systems",
    desc: "Overhead and floor conveyor systems for efficient part movement through finishing processes.",
    seoTitle: "Industrial Finishing Conveyor Systems | Overhead Monorail & Power-and-Free | PFS",
    seoDesc: "PFS designs and integrates overhead monorail, power-and-free, and floor conveyor systems for industrial finishing lines. Variable speed, load/unload stations, PLC controls. Single-source manufacturer. Made in USA.",
    body: "Conveyor systems are the backbone of any automated finishing line. PFS designs and integrates overhead monorail, power-and-free, enclosed track, and floor conveyor systems that move parts efficiently and reliably through every stage of the finishing process — from loading and pretreatment through spray application, flash-off, curing, and unloading.",
    body2: "The right conveyor system is critical to achieving your throughput targets, minimizing labor, and ensuring consistent part quality. PFS engineers select conveyor type, chain speed, hanger spacing, load capacity, and drive configuration based on your part geometry, production volume, line layout, and facility constraints. Our conveyor systems are integrated with PLC-based controls that coordinate conveyor speed with booth airflow, oven temperature, and coating delivery parameters.",
    body3: "PFS conveyor systems are designed for long service life in the demanding environment of industrial finishing operations — high temperatures, chemical exposure, and continuous duty cycles. We supply overhead monorail conveyors for simple continuous flow, power-and-free systems for accumulation and routing flexibility, and floor-mounted conveyors for heavy parts that cannot be hung. All systems include load/unload stations, safety stops, and variable speed drives.",
    features: [
      "Overhead monorail conveyors — simple, reliable continuous flow",
      "Power-and-free conveyor systems — accumulation and routing flexibility",
      "Enclosed track conveyor systems",
      "Floor-mounted conveyor systems for heavy parts",
      "Custom hanger and fixture design",
      "Load/unload stations with safety interlocks",
      "Variable speed drives with PLC integration",
      "Drive units, take-ups, and expansion joints",
      "High-temperature chain and components for oven zones",
      "Conveyor monitoring and fault detection",
    ],
    img: CONVEYOR_IMG,
    galleryImages: [
      ZENITH_OVEN_CONVEYOR,
      CONVEYOR_OVen_LINE,
      CONVEYOR_PANORAMIC,
      "/manus-storage/pfs-auto-powder-line1_3bb98899.png",
      "/manus-storage/pfs-auto-powder-booth_355e5ffc.png",
      "/manus-storage/pfs-auto-powder-conveyor_14f8b84a.png",
      "/manus-storage/pfs-auto-powder-operator_24e559e8.jpg",
    ],
    related: [
      { title: "Liquid Paint Lines", subtitle: "Complete automated liquid paint line", href: "/integration-automation/liquid-paint-lines", image: PAINT },
      { title: "Powder Coating Lines", subtitle: "Complete automated powder line", href: "/integration-automation/powder-coating-lines", image: POWDER },
      { title: "Pretreatment Systems", subtitle: "Chemical pretreatment before coating", href: "/integration-automation/pretreatment-systems", image: PRETREAT },
    ],
    faqs: [
      { q: "What type of conveyor is best for a powder coating line?", a: "The best conveyor type depends on your production requirements. Overhead monorail conveyors are the most common choice for continuous-flow powder coating lines — they are simple, reliable, and cost-effective for single-path production. Power-and-free conveyors are preferred when you need accumulation, routing to multiple stations, or the ability to stop individual carriers without stopping the entire line." },
      { q: "What is a power-and-free conveyor system?", a: "A power-and-free conveyor system uses two parallel tracks — a powered drive chain and a free track on which individual carriers ride. Carriers can be engaged or disengaged from the drive chain independently, allowing accumulation, routing to branch lines, and variable dwell times at individual stations. This flexibility makes power-and-free systems ideal for complex finishing lines with multiple process stages or high part mix." },
      { q: "How is conveyor speed calculated for a finishing line?", a: "Conveyor speed is calculated based on the required production rate (parts per hour), hanger spacing, and the length of the longest process zone — typically the curing oven. The oven dwell time required to reach cure temperature for the part mass and coating thickness determines the minimum oven length at a given conveyor speed. PFS engineers perform this calculation during the line design phase." },
      { q: "Can PFS retrofit a new conveyor into an existing finishing line?", a: "Yes. PFS provides conveyor retrofit and tie-in services for existing finishing lines. Our engineers assess your current conveyor configuration, drive capacity, and controls during the design phase and engineer the new conveyor to interface with your existing system. Tie-in points, chain splicing, and controls integration are all included in the project scope." },
      { q: "What maintenance is required for an industrial finishing conveyor?", a: "Industrial finishing conveyors require regular lubrication of the chain and trolleys, inspection of drive components and take-ups, and periodic replacement of worn chain links and trolley wheels. PFS provides a recommended maintenance schedule and spare parts list with every conveyor system. Our service team is available for scheduled maintenance visits and emergency service." },
    ],
  },
  "pretreatment-systems": {
    title: "Pretreatment Systems",
    desc: "Chemical pretreatment systems for cleaning, phosphating, and surface preparation.",
    seoTitle: "Industrial Pretreatment Systems | Spray Washer & Phosphate Systems | PFS",
    seoDesc: "PFS designs and integrates industrial pretreatment systems — spray washers, iron phosphate, zinc phosphate, zirconium, and immersion tank systems — for powder coating and liquid paint lines. NFPA 33 compliant. Made in USA.",
    body: "Proper surface preparation is the foundation of a quality finish. PFS designs and integrates chemical pretreatment systems that clean, condition, and chemically prepare metal parts for powder coating and liquid paint applications. Our pretreatment systems remove oils, mill scale, rust, and contaminants that would otherwise cause adhesion failure, corrosion, and coating defects.",
    body2: "PFS pretreatment systems include spray washer tunnels, immersion tank systems, and dry-off ovens configured for iron phosphate, zinc phosphate, and zirconium pretreatment chemistries. System stage count — 3-stage, 5-stage, or 7-stage — is selected based on the substrate, coating system, and corrosion resistance requirements. Our engineers work with your chemical supplier to ensure the pretreatment system is designed for the specific chemistry and process parameters you require.",
    body3: "Pretreatment system design must account for wastewater treatment and discharge compliance. PFS integrates wastewater treatment systems — including pH adjustment, coagulation, and filtration — as part of the pretreatment system scope. All PFS pretreatment systems are engineered to comply with applicable EPA and local discharge regulations, and we provide the documentation required for permitting.",
    features: [
      "Spray washer tunnel systems — 3-stage, 5-stage, and 7-stage",
      "Immersion tank pretreatment systems",
      "Iron phosphate pretreatment",
      "Zinc phosphate pretreatment",
      "Zirconium and nano-ceramic pretreatment",
      "Alkaline cleaning and degreasing stages",
      "Rinse stages — fresh water and DI water",
      "Dry-off ovens — conveyor and batch",
      "Wastewater treatment and pH adjustment",
      "Stainless steel and carbon steel construction options",
    ],
    img: PRETREAT,
    related: [
      { title: "Liquid Paint Lines", subtitle: "Complete automated liquid paint line", href: "/integration-automation/liquid-paint-lines", image: PAINT },
      { title: "Powder Coating Lines", subtitle: "Complete automated powder line", href: "/integration-automation/powder-coating-lines", image: POWDER },
      { title: "Conveyor Systems", subtitle: "Move parts through the finishing line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
    ],
    faqs: [
      { q: "What is a pretreatment system for powder coating?", a: "A pretreatment system for powder coating is a chemical cleaning and surface conditioning process that prepares metal parts for powder application. It typically consists of a spray washer tunnel with multiple stages — alkaline cleaning, rinsing, and a conversion coating stage (iron phosphate, zinc phosphate, or zirconium) — followed by a dry-off oven. The conversion coating creates a chemically bonded layer that dramatically improves powder adhesion and corrosion resistance." },
      { q: "What is the difference between iron phosphate and zinc phosphate pretreatment?", a: "Iron phosphate pretreatment produces a thin amorphous conversion coating that provides good adhesion and moderate corrosion resistance. It is the most common pretreatment for indoor or light-duty applications. Zinc phosphate pretreatment produces a heavier crystalline coating that provides superior corrosion resistance for outdoor, automotive, and heavy-duty applications. Zinc phosphate systems typically require more stages and higher operating temperatures than iron phosphate systems." },
      { q: "What is zirconium pretreatment?", a: "Zirconium (or nano-ceramic) pretreatment is a newer conversion coating technology that operates at lower temperatures and produces less sludge than traditional phosphate systems. It provides corrosion resistance comparable to zinc phosphate and is compatible with multiple substrates including steel, aluminum, and galvanized steel in a single process. Zirconium pretreatment is increasingly specified for new finishing lines due to its lower operating cost and reduced environmental impact." },
      { q: "How many stages does a pretreatment system need?", a: "Stage count depends on the substrate, coating system, and corrosion resistance requirements. A 3-stage system (clean, rinse, conversion coat) is suitable for light-duty indoor applications. A 5-stage system adds a sealer rinse for improved corrosion resistance. A 7-stage system (clean, rinse, conversion coat, rinse, DI rinse, sealer, DI rinse) is specified for automotive, outdoor, and high-corrosion-resistance applications. PFS engineers recommend the appropriate stage count based on your specific requirements." },
      { q: "Does PFS handle wastewater treatment for pretreatment systems?", a: "Yes. PFS integrates wastewater treatment systems — including pH adjustment tanks, coagulation and flocculation, and filtration — as part of the pretreatment system scope. We engineer the wastewater treatment system to meet applicable EPA and local discharge regulations and provide the documentation required for permitting." },
    ],
  },
  "robotic-finishing-cells": {
    title: "Robotic Finishing Cells",
    desc: "Robotic spray and powder application cells for consistent, high-volume automated finishing.",
    seoTitle: "Robotic Finishing Cells | Robotic Spray Painting & Powder Coating Cell Integrator | PFS",
    seoDesc: "PFS designs and integrates turnkey robotic finishing cells for automated spray painting and powder coating — robot brand agnostic, explosion-proof enclosures, bell cup atomizers, conveyor interface, and safety systems. Consistent film thickness. Reduced overspray. Made in USA.",
    body: "Robotic finishing cells deliver consistent, repeatable coating application with reduced material consumption, lower labor costs, and improved finish quality compared to manual spray operations. PFS designs and integrates complete robotic finishing cells — the cell enclosure, robot interface, end-of-arm tooling, spray or powder applicator, booth integration, conveyor interface, and safety systems — working with leading industrial robot suppliers to deliver turnkey automated finishing cells that run at production speed with minimal operator intervention. PFS is a robot brand agnostic integrator: we specify and integrate the robot platform that best fits your application, production volume, and budget.",
    body2: "The business case for robotic finishing is compelling. Robotic applicators equipped with high-speed rotary atomizers, bell cup applicators, or electrostatic spray guns apply coating at consistent film thickness across every part, every cycle — eliminating the variability inherent in manual spray operations. Transfer efficiency improvements of 20–40% are achievable with rotary atomizer technology compared to conventional air spray. Material savings of 15–30% are common when converting from manual to robotic application, due to the elimination of overspray from inconsistent technique. Robotic cells also eliminate operator exposure to coating materials and solvents, improving workplace safety and reducing PPE costs. Offline robot programming and path simulation allow new part programs to be developed and validated without taking the production cell offline.",
    body3: "PFS robotic finishing cells are engineered as complete, explosion-proof systems for Class I Division 1 and Division 2 hazardous locations per NFPA 33. The cell enclosure, robot mounting, color change valve manifold, fluid delivery system, and safety systems — light curtains, area scanners, safety-rated door interlocks, and emergency stops per ANSI/RIA R15.06 — are all designed and integrated by PFS. We provide robot path programming and simulation, production monitoring and data logging, and operator training as part of every robotic cell project. Our systems are designed for easy reprogramming when part geometry changes, protecting your investment as your product line evolves.",
    features: [
      "Robot brand agnostic integration — we specify the right platform for your application",
      "Explosion-proof cell enclosures — Class I Division 1 and Division 2 rated",
      "High-speed rotary atomizers and bell cup applicators for superior transfer efficiency",
      "Electrostatic spray guns — liquid and powder corona and tribo charging",
      "Robotic liquid spray applicators — HVLP, airless, air-assisted airless",
      "Custom end-of-arm tooling and gun mounting design",
      "Color change valve manifolds and fluid delivery systems",
      "Robot path programming and offline simulation",
      "Spray booth and powder booth integration",
      "Conveyor interface and part tracking",
      "Safety systems — light curtains, area scanners, interlocks per ANSI/RIA R15.06",
      "Production monitoring, data logging, and Industry 4.0 connectivity",
      "Operator training and programming support",
    ],
    img: ROBOT,
    galleryImages: [
      "/manus-storage/pfs-orion-r-robotic-cell_12c36106.png",
      "/manus-storage/pfs-robotic-booth_d873cffd.png",
      "/manus-storage/pfs-robotic-arm-red-spray_90b1e89b.png",
    ],
    related: [
      { title: "Conveyor Systems", subtitle: "Move parts through the robotic cell", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
      { title: "Liquid Paint Lines", subtitle: "Complete automated liquid paint line", href: "/integration-automation/liquid-paint-lines", image: PAINT },
      { title: "Powder Coating Lines", subtitle: "Complete automated powder line", href: "/integration-automation/powder-coating-lines", image: POWDER },
    ],
    faqs: [
      { q: "What is a robotic finishing cell?", a: "A robotic finishing cell is an automated coating application system in which one or more industrial robots apply liquid paint or powder coating to parts moving through a spray booth or powder booth. The robots follow programmed paths that apply coating at consistent film thickness, speed, and distance from the part surface — eliminating the variability of manual spray application and enabling lights-out or minimal-operator production." },
      { q: "What robots does PFS integrate for finishing applications?", a: "PFS is a robot brand agnostic integrator — we specify and integrate the industrial robot platform that best fits your application, production volume, and budget. We work with leading industrial robot suppliers whose platforms are specifically designed for coating environments, with explosion-proof construction for use in Class I Division 1 and Division 2 hazardous locations, integrated wrist axes for complex part geometries, and hollow wrist designs for clean routing of coating supply lines." },
      { q: "How much material savings can I expect from robotic finishing?", a: "Material savings from robotic finishing depend on the current manual process, part geometry, and coating type. Typical conversions from manual to robotic application achieve 15–30% reduction in coating material consumption, primarily by eliminating overspray from inconsistent technique and reducing film thickness variation. PFS performs a material usage analysis during the project design phase to estimate expected savings for your specific application." },
      { q: "Can a robotic finishing cell handle multiple part numbers?", a: "Yes. Robotic finishing cells can be programmed with multiple part programs that are called up automatically based on part identification — via barcode, RFID, or operator selection. PFS designs robotic cells with part program management systems that allow operators to add and modify programs without specialized robotics knowledge. Offline programming tools allow new part programs to be developed and simulated without taking the production cell offline." },
      { q: "What safety systems are required for a robotic finishing cell?", a: "Robotic finishing cells require safety systems that prevent personnel from entering the robot work envelope during operation. PFS integrates light curtains, area scanners, safety-rated door interlocks, and emergency stop systems that meet ANSI/RIA R15.06 robot safety standards. The spray booth or powder booth enclosure also provides the required ventilation and explosion protection per NFPA 33." },
    ],
  },
  "system-integration": {
    title: "System Integration",
    desc: "Integration of new finishing equipment with existing production lines and facility systems.",
    seoTitle: "Finishing System Integration Services | Retrofit & Tie-In | PFS",
    seoDesc: "PFS provides finishing system integration services — connecting new spray booths, ovens, and conveyor systems with existing production lines, PLC controls, and facility utilities. Turnkey retrofit and tie-in. Made in USA.",
    body: "Adding new finishing equipment to an existing facility requires careful planning, precise engineering, and experienced execution. PFS provides complete system integration services to connect new spray booths, ovens, conveyor systems, and pretreatment equipment with your existing production lines, PLC controls, compressed air, electrical, and exhaust systems — minimizing downtime and ensuring the new equipment performs as specified from day one.",
    body2: "Our system integration process begins with a thorough assessment of your existing facility and finishing line. PFS engineers document your current equipment configuration, utility capacities, controls architecture, and production requirements before designing the integration scope. This upfront engineering investment prevents surprises during installation and ensures the new equipment is designed to interface correctly with your existing systems.",
    body3: "PFS system integration projects range from simple booth replacements and oven additions to complete finishing line upgrades involving new conveyors, pretreatment systems, and controls. We manage the entire project — engineering, fabrication, installation, controls programming, commissioning, and operator training — with a single point of accountability. Our field installation crews are experienced in working in active production environments with minimal disruption to your ongoing operations.",
    features: [
      "Existing line assessment and documentation",
      "Integration engineering — mechanical, electrical, controls",
      "New equipment tie-in to existing conveyors",
      "PLC and controls integration",
      "Utility connections — electrical, compressed air, exhaust, gas",
      "Booth and oven replacement and upgrade",
      "Conveyor retrofit and extension",
      "Commissioning and startup",
      "Operator training on new equipment and controls",
      "Ongoing service and support",
    ],
    img: INTEGRATED_SYSTEM,
    galleryImages: [
      INTEGRATED_SYSTEM,
      CONVEYOR_OVen_LINE,
      CONVEYOR_PANORAMIC,
      "/manus-storage/pfs-powder-recovery-lines_a80d3e22.png",
      "/manus-storage/pfs-auto-powder-line1_3bb98899.png",
      "/manus-storage/pfs-auto-powder-booth_355e5ffc.png",
      "/manus-storage/pfs-auto-powder-conveyor_14f8b84a.png",
      "/manus-storage/pfs-auto-powder-operator_24e559e8.jpg",
      "/manus-storage/pfs-robotic-arm-red-spray_90b1e89b.png",
    ],
    related: [
      { title: "Conveyor Systems", subtitle: "Backbone of any automated line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
      { title: "Liquid Paint Lines", subtitle: "Complete automated liquid paint line", href: "/integration-automation/liquid-paint-lines", image: PAINT },
      { title: "Powder Coating Lines", subtitle: "Complete automated powder line", href: "/integration-automation/powder-coating-lines", image: POWDER },
    ],
    faqs: [
      { q: "What does finishing system integration involve?", a: "Finishing system integration involves connecting new finishing equipment — spray booths, ovens, conveyors, pretreatment systems — with an existing production line, facility utilities, and controls infrastructure. This includes mechanical tie-ins to existing conveyors, electrical connections, PLC programming to incorporate the new equipment into the existing controls architecture, and commissioning to verify the integrated system performs as specified." },
      { q: "How does PFS minimize production downtime during a system integration project?", a: "PFS minimizes production downtime through detailed upfront planning, prefabrication of equipment and controls panels in our facility before the installation begins, and scheduling critical tie-in work during planned maintenance shutdowns or off-shift periods. Our field installation crews are experienced in working in active production environments and coordinate closely with your production and maintenance teams throughout the project." },
      { q: "Can PFS integrate new equipment with our existing PLC system?", a: "Yes. PFS engineers are experienced in integrating new finishing equipment with existing Allen-Bradley, Siemens, and other major PLC platforms. We review your existing controls architecture during the design phase and engineer the new equipment controls to interface with your existing system — whether through hardwired I/O, DeviceNet, EtherNet/IP, or other communication protocols." },
      { q: "What if our existing conveyor cannot support additional equipment?", a: "PFS assesses your existing conveyor capacity — chain pull, drive motor sizing, and structural load — during the design phase. If the existing conveyor cannot support the additional equipment, PFS designs a conveyor upgrade or replacement as part of the integration scope. In some cases, a new conveyor section can be added to serve the new equipment while the existing conveyor continues to serve the rest of the line." },
      { q: "Does PFS provide service and support after system integration is complete?", a: "Yes. PFS provides ongoing service and support for all finishing systems we install, including integrated systems. Our service team is available for scheduled preventive maintenance, emergency service calls, controls troubleshooting, and equipment upgrades. We maintain a parts inventory for all PFS-manufactured equipment and can source replacement parts for third-party equipment integrated into your system." },
    ],
  },
};

function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", textAlign: "left", padding: "1.1rem 0",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a",
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ paddingRight: "1rem" }}>{faq.q}</span>
            <span style={{ flexShrink: 0, fontSize: "1.2rem", color: "#1B3A6B", fontWeight: 700 }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div style={{ paddingBottom: "1.1rem", fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#555", lineHeight: 1.75 }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function IntegrationSubPage() {
  const params = useParams<{ sub: string }>();
  const sub = params.sub || "";
  const content = CONTENT[sub];

  useSEO({
    title: content?.seoTitle || "Integration & Automation | PFS",
    description: content?.seoDesc || "PFS designs and builds complete automated finishing systems — liquid paint lines, powder coating lines, conveyor systems, pretreatment, and robotic finishing cells. Made in USA.",
  });

  if (!content) {
    return (
      <div>
        <PageHero title="Integration & Automation" breadcrumbs={[{ label: "Integration & Automation", href: "/integration-automation" }]} />
        <div className="container py-16 text-center">
          <p className="section-body">Page not found. Please use the navigation above.</p>
          <Link href="/integration-automation"><span className="btn-glow mt-4 inline-flex">Back to Integration & Automation</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={content.title}
        subtitle={content.desc}
        breadcrumbs={[{ label: "Integration & Automation", href: "/integration-automation" }, { label: content.title }]}
        bgImage={content.img}
        bgVideo={
          sub === "liquid-paint-lines" ? PAINT_VIDEO :
            sub === "pretreatment-systems" ? PRETREAT_VIDEO :
              sub === "robotic-finishing-cells" ? ROBOTIC_VIDEO :
                sub === "conveyor-systems" ? CONVEYOR_VIDEO :
                  sub === "system-integration" ? SYSTEM_INTEGRATION_VIDEO :
                    sub === "powder-coating-lines" ? POWDER_VIDEO : undefined
        }
        ctaPricingHref={`/contact/request-a-quote?from=integration-${sub}`}
      />

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <span className="section-label" style={{ color: "#1B2B4B" }}>Solution Overview</span>
              <h2 data-animation="slideLeft" className="section-heading">{content.title}</h2>
              <p className="section-body mb-5">{content.body}</p>
              {content.body2 && <p className="section-body mb-5">{content.body2}</p>}
              {content.body3 && <p className="section-body mb-8">{content.body3}</p>}

              <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem" }}>What's Included</h3>
              <ul className="space-y-2 mb-8">
                {content.features.map((f) => (
                  <li key={f} className="flex items-start gap-3" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#555", lineHeight: 1.7 }}>
                    <span style={{ color: "#1B2B4B", fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link data-animation="slideLeft" href={`/contact/request-a-quote?from=integration-${sub}`}><span className="btn-glow">Request Info <ArrowRight size={14} /></span></Link>
                <Link data-animation="slideRight" href="/contact/talk-to-an-engineer"><span className="btn-outline">Talk to an Engineer</span></Link>
              </div>
            </div>
            <div>
              <img src={content.img} alt={`PFS ${content.title} — automated industrial finishing system`} className="w-full object-cover" style={{ height: "280px" }} />
              {sub === "pretreatment-systems" && (
                <img src={PRETREAT_SPRAY} alt="PFS pretreatment spray washer tunnel system" className="w-full object-cover mt-3" style={{ height: "220px" }} />
              )}
              <div className="mt-6 p-5 border border-gray-200">
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>Start Your Project</h4>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.7, marginBottom: "1rem" }}>Talk to a PFS systems engineer about your integration project.</p>
                <Link href={`/contact/request-a-quote?from=integration-${sub}`}><span className="btn-glow w-full justify-center" style={{ fontSize: "0.75rem" }}>REQUEST INFO</span></Link>
                <a href="tel:8885457715" className="mt-3 block text-center" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#555" }}>(888) 545-7715</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {content.galleryImages && content.galleryImages.length > 0 && (
        <section style={{ padding: "3rem 0", backgroundColor: "#1a1a1a" }}>
          <div className="container">
            <span className="section-label" style={{ color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.75rem" }}>REAL INSTALLS</span>
          </div>
          <GalleryGrid
            images={content.galleryImages.map((src, i) => ({ src, alt: `PFS ${content.title} installation ${i + 1}` }))}
            fullBleed
          />
        </section>
      )}

      {/* FAQ Section */}
      {content.faqs && content.faqs.length > 0 && (
        <section style={{ padding: "4rem 0", backgroundColor: "#f9f9f7" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div className="mb-8">
              <span className="section-label" style={{ color: "#1B2B4B" }}>FAQ</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.02em", marginTop: "0.25rem" }}>
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion faqs={content.faqs} />
            <div className="mt-8" data-animation="slideRight">
              <Link href="/contact/talk-to-an-engineer"><span className="btn-glow">Ask an Engineer <ArrowRight size={14} /></span></Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {content.related && content.related.length > 0 && (
        <section style={{ padding: "4rem 0", backgroundColor: "#f4f4f2", borderTop: "1px solid #e8e8e6" }}>
          <div className="container">
            <div className="mb-8">
              <span className="section-label" style={{ color: "#1B2B4B" }}>Complete Your System</span>
              <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.02em", marginTop: "0.25rem" }}>
                You May Also Need
              </h3>
            </div>
            <div className={`grid gap-6 ${content.related.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {content.related.map((rp) => (
                <Link key={rp.href} href={rp.href}>
                  <div className="group cursor-pointer" style={{ backgroundColor: "#ffffff", border: "1px solid #e8e8e6", overflow: "hidden", transition: "box-shadow 0.2s" }}>
                    <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
                      <img src={rp.image} alt={`PFS ${rp.title}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} className="group-hover:scale-105" />
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <h4 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>{rp.title}</h4>
                      <p data-animation="slideRight" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.5, marginBottom: "0.75rem" }}>{rp.subtitle}</p>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B2B4B" }}>
                        Learn More <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
