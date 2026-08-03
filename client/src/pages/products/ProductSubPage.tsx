import React, { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import {
  IMG_PAINT_BOOTH, IMG_OPEN_FACE_BOOTH, IMG_PARTS_BOOTH, IMG_CUSTOM_BOOTH,
  IMG_CONTAINER_BOOTH, IMG_AIRCRAFT_BOOTH,
  IMG_POWDER_COATING, IMG_POWDER_RECLAIM,
  IMG_OVEN_BATCH, IMG_OVEN_CONVEYOR, IMG_OVEN_WALKIN, IMG_OVEN_LARGE,
  IMG_OVEN_INFRARED, IMG_OVEN_INFRARED_CLOSE, IMG_OVEN_INFRARED_OPEN,
  IMG_BLAST, IMG_BLAST_ROOM,
  IMG_PREP_STATION, IMG_MIX_ROOM, IMG_INSPECTION,
  IMG_AMU,
  IMG_ROBOTICS, IMG_CONVEYOR_LINE, IMG_POWDER_LINE, IMG_PRETREATMENT,
  IMG_FILTERS,
} from "@/lib/productImages";

const HERO_IMG = IMG_PAINT_BOOTH;
const AEROSPACE_IMG = IMG_AIRCRAFT_BOOTH;
const POWDER_IMG = IMG_POWDER_COATING;
const OVEN_IMG = IMG_OVEN_WALKIN;
// Dedicated product renders
const OPEN_FACE_RENDER = IMG_OPEN_FACE_BOOTH;
const ENCLOSED_BOOTH_RENDER = "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg";
// Aerospace product page — real photos provided by PFS:
// bgImage  : side-angle private jet in white booth (hero)
// AERO_FEATURED: PFS-branded jet side profile (featured/gallery 1)
// AERO_GALLERY2: twin-engine prop in hangar (gallery 2)
const AIRCRAFT_RENDER      = "/manus-storage/pfs-aerospace-jet-side-booth-hero_34e5d4ce.png";   // hero — real PFS jet side angle
const AIRCRAFT_HERO_VIDEO  = "/manus-storage/product_aerospace_jet_side_hero_ae4811fe.mp4"; // hero video — generated from real photo
const AERO_FEATURED     = "/manus-storage/aero-pfs-jet-side-profile-clean_5b7a100a.jpg"; // PFS-branded jet
const AERO_GALLERY2     = "/manus-storage/aero-twin-engine-hangar-clean_122f0945.jpg";  // twin-engine prop
const AERO_REAL_BOOTH   = "/manus-storage/pfs-aerospace-jet-in-booth-real_2eb79dc9.png"; // real PFS install
const POWDER_RENDER = IMG_POWDER_COATING;
const BATCH_OVEN_RENDER = IMG_OVEN_BATCH;
const CONVEYOR_OVEN_RENDER = IMG_OVEN_CONVEYOR;
const WALKIN_OVEN_RENDER = IMG_OVEN_WALKIN;
const LARGE_EQUIP_OVEN_RENDER = IMG_OVEN_LARGE;
const CUSTOM_OVEN_RENDER = IMG_OVEN_BATCH; // Use real batch oven photo for custom too
const PREP_STATION_RENDER = IMG_PREP_STATION;
const MIX_ROOM_RENDER = IMG_MIX_ROOM;
const BLASTING_RENDER = IMG_BLAST;
const BLAST_ROOM_RENDER = IMG_BLAST_ROOM;
const AMU_RENDER = IMG_AMU;
const ENV_ROOM_RENDER = "/manus-storage/pfs-render-environmental-room_c30d070a.jpg";
const INSPECTION_RENDER = IMG_INSPECTION;
const CONVEYOR_IMG = IMG_CONVEYOR_LINE;
const PRETREAT_IMG = IMG_PRETREATMENT;
const FILTERS_IMG = IMG_FILTERS;

interface RelatedProduct {
  title: string;
  subtitle: string;
  href: string;
  image: string;
}

interface PageData {
  title: string;
  subtitle: string;
  seoTitle?: string;
  seoDescription?: string;
  bgImage: string;
  bgVideo?: string;
  bgImagePosition?: string;
  breadcrumbs: { label: string; href?: string }[];
  body: string;
  features: string[];
  relatedHref: string;
  relatedLabel: string;
  relatedProducts?: RelatedProduct[];
  galleryImages?: string[];
  seriesBadge?: string; // e.g. "PFS VULCAN SERIES"
  sectionVideo?: string; // in-page action video clip
  featuredImage?: string; // optional featured product image shown in sidebar
  ctaPricingHref?: string; // override the default /contact/request-a-quote CTA destination
  featuredBooth?: {
    label: string;
    title: string;
    description: string;
    exteriorImage: string;
    interiorImage: string;
    specs?: { label: string; value: string }[];
  };
}

const PAGE_DATA: Record<string, PageData> = {
  // ── Paint Booths ──────────────────────────────────────────────────────────
  "paint-booths/parts-booths": {
    seoTitle: "Parts Spray Booths | Small Parts Finishing Booth | PFS",
    seoDescription: "PFS compact open-face parts spray booths are built for small components, brackets, hardware, and assemblies. High-efficiency back-wall filtration, ETL/UL certified components, NFPA 33 compliant. Single and multi-station configurations. Made in the USA.",
    title: "Parts Spray Booths",
    subtitle: "Compact open-face spray booths engineered for small parts — components, brackets, hardware, and assemblies.",
    bgImage: "/manus-storage/pfs-parts-booth-angled_01b1a8aa.jpeg",
    bgVideo: "/manus-storage/pfs-parts-booth-hero_e7f63b78.mp4",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Parts Booths" }],
    body: "PFS parts spray booths are compact, open-face finishing systems designed for small components, brackets, hardware, and assemblies. Efficient cross-draft airflow pulls overspray through the back filter wall, keeping the operator and work area clean. built with ETL/UL certified components to NFPA 33 and built in the USA — available in single and multi-station configurations.",
    features: ["built with ETL/UL certified components to NFPA 33", "Open-face design for easy part loading", "High-efficiency back-wall filtration", "Single and multi-station configurations", "Explosion-proof lighting", "Low-maintenance filter media", "Made in the USA", "Custom widths available"],
    galleryImages: ["/manus-storage/pfs-parts-booth-straight_03c3a83b.jpeg", "/manus-storage/pfs-parts-booth-angled_01b1a8aa.jpeg"],
    relatedHref: "/products/paint-booths",
    relatedLabel: "View All Paint Booths",
    relatedProducts: [
      { title: "Open Face Paint Booths", subtitle: "Larger open-face configurations", href: "/products/paint-booths/open-face", image: OPEN_FACE_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "paint-booths/open-face": {
    seoTitle: "Open Face Spray Booths | Open-Face Paint Booth | PFS",
    seoDescription: "PFS open-face spray booths provide a clean, filtered spray environment without a full enclosure. Ideal for large parts, production lines, and applications where full enclosure is not practical. ETL/UL certified components, NFPA 33 compliant. Made in the USA.",
    title: "Open Face Paint Booths",
    subtitle: "Open-front spray booths for large parts, high-volume production, and industrial finishing operations.",
    bgImage: OPEN_FACE_RENDER,
    bgVideo: "/manus-storage/pfs-open-face-booth-hero-v2_1c16c291.mp4",
    galleryImages: [
      "/manus-storage/pfs-open-face-booth-render_2c814ace.png",
    ],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Open Face" }],
    body: "PFS open face paint booths provide unobstructed front access for large or irregularly shaped parts. Designed for high-throughput industrial and automotive refinishing operations, these booths feature cross-draft or downdraft airflow and are built with ETL/UL certified components to NFPA 33 standards.",
    features: ["built with ETL/UL certified components to NFPA 33", "Cross-draft or downdraft airflow", "Available in standard and custom widths", "High-efficiency filtration", "Explosion-proof lighting", "Made in the USA"],
    relatedHref: "/products/paint-booths",
    relatedLabel: "View All Paint Booths",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "paint-booths/enclosed": {
    seoTitle: "Enclosed Paint Booths | Industrial Spray Booths | PFS",
    seoDescription: "PFS enclosed paint booths are available in cross-flow, semi-downdraft, full downdraft, and side-downdraft configurations for automotive, industrial, and aerospace finishing. ETL/UL certified, NFPA 33 compliant, UL 508A controls. Made in Santa Rosa, CA.",
    title: "Enclosed Paint Booths",
    subtitle: "Full-enclosure spray booths for superior overspray containment, finish quality, and worker safety.",
    bgImage: "/manus-storage/pfs_helios_side_angle_final_73768c1f_5eaf3967.png",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Enclosed" }],
    body: "PFS enclosed paint booths provide complete containment for overspray, VOCs, and airborne particles. Available in cross-draft, semi-downdraft, side-downdraft, and full-downdraft configurations — built with ETL/UL certified components and built to NFPA 33 and OSHA standards.",
    features: ["Full enclosure for overspray containment", "Multiple airflow configurations", "built with ETL/UL certified components to NFPA 33", "OSHA compliant", "High-efficiency exhaust filtration", "Custom sizing available"],
    relatedHref: "/products/paint-booths",
    relatedLabel: "View All Paint Booths",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "paint-booths/paint-walls": {
    seoTitle: "Paint Walls | Spray Booth Exhaust Filter Wall | PFS",
    seoDescription: "PFS paint walls are open-face exhaust filtration walls for spray painting large flat panels and architectural components without a full enclosure. High-efficiency filter media, ETL/UL certified. Made in the USA.",
    title: "Paint Walls",
    subtitle: "Open-face paint wall systems for large-format, flat-panel, and architectural finishing applications.",
    bgImage: "/manus-storage/pfs-paint-walls-card_553fa1c5.png",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Paint Walls" }],
    body: "PFS paint walls are open-face finishing systems designed for large flat panels, architectural components, and wide-format parts that don't fit in a traditional enclosed booth. High-velocity filtered airflow pulls overspray away from the operator and part surface, delivering a clean, consistent finish.",
    features: ["Open-face design for large flat parts", "High-velocity filtered airflow", "Available in modular widths", "ETL/UL Certified Components", "Low-maintenance filter media", "Custom heights available"],
    relatedHref: "/products/paint-booths",
    relatedLabel: "View All Paint Booths",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "paint-booths/drive-through": {
    seoTitle: "Drive-Through Spray Booths | Pass-Through Paint Booth | PFS",
    seoDescription: "PFS drive-through spray booths feature entry and exit doors on both ends for continuous production flow — trucks, buses, heavy equipment, and high-volume automotive finishing. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Drive-Through Paint Booths",
    subtitle: "Drive-through spray booths for continuous production flow and high-throughput finishing operations.",
    bgImage: ENCLOSED_BOOTH_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Drive-Through" }],
    body: "PFS drive-through spray booths have entry and exit doors on both ends of the booth — allowing vehicles and large assemblies to drive straight through without reversing. The drive-through configuration maximizes throughput in high-volume production environments and is the standard choice for fleet refinishing, bus and coach painting, and OEM production lines.\n\nAvailable in cross-flow, semi-downdraft, and full-downdraft airflow configurations. Custom lengths from 30 to 100+ feet to accommodate any vehicle or assembly size. Heated and non-heated options.\n\nUL508A controls, ETL listed in Canada and USA. UL listed tube axial fans, certified lighting. Built to NFPA 33 and OSHA standards. Ships nationally. Made in the USA.",
    features: ["Entry and exit doors on opposite ends", "Ideal for fleet and large vehicle finishing", "built with ETL/UL certified components to NFPA 33", "Available in heated and non-heated", "Custom lengths and widths", "Integrated lighting and filtration"],
    relatedHref: "/products/paint-booths",
    relatedLabel: "View All Paint Booths",
    relatedProducts: [
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "paint-booths/aircraft": {
    seoTitle: "Aircraft Paint Booths | Aerospace Spray Booth | PFS",
    seoDescription: "PFS aircraft paint booths are engineered for commercial, military, and general aviation finishing — full downdraft airflow, 100% fresh air, explosion-proof electrical, and custom sizing for any airframe. ETL/UL certified, NFPA 33 and MIL-SPEC compliant. Made in the USA.",
    title: "Aerospace Paint Booths",
    subtitle: "Oversized, high-clearance spray booths engineered for aircraft, helicopters, and UAVs — compliant with MIL-SPEC and aerospace finishing standards.",
    bgImage: AIRCRAFT_RENDER,
    bgVideo: AIRCRAFT_HERO_VIDEO,
    galleryImages: [AERO_REAL_BOOTH, AIRCRAFT_RENDER, AERO_FEATURED, AERO_GALLERY2],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Aerospace Paint Booths" }],
    body: "PFS aircraft paint booths are purpose-built for the unique demands of aerospace finishing. With ceiling heights up to 30+ feet, wide-span door systems, and precision downdraft airflow, these booths deliver the controlled environment required for MIL-SPEC coatings, OEM primers, and topcoat applications on fixed-wing aircraft, helicopters, and UAVs. All systems are built with ETL/UL certified components and designed to meet NFPA 33, OSHA, and applicable aerospace finishing standards.",
    features: [
      "Ceiling heights up to 30+ feet",
      "Wide-span hydraulic or bi-fold door systems",
      "Full downdraft airflow for uniform finish",
      "built with ETL/UL certified components — NFPA 33 compliant",
      "MIL-SPEC and aerospace coating compatible",
      "Explosion-proof electrical throughout",
      "High-CRI lighting for color accuracy",
      "Custom sizing for any aircraft type",
      "Made in the USA",
    ],
    relatedHref: "/industries/aerospace-defense",
    relatedLabel: "View Aerospace & Defense Solutions",
    relatedProducts: [
      { title: "Air Make-Up Units", subtitle: "Precision air supply for large-volume booths", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Environmental Rooms", subtitle: "Controlled environments for sensitive finishing", href: "/products/environmental-rooms/temperature-controlled", image: ENV_ROOM_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "paint-booths/inspection": {
    seoTitle: "Inspection Booths | Paint Inspection Booth | PFS",
    seoDescription: "PFS inspection booths provide high-CRI, color-corrected LED lighting for post-paint quality inspection. Identify surface defects, runs, and missed areas before parts leave the finishing line. ETL/UL certified. Made in the USA.",
    title: "Inspection Booths",
    subtitle: "High-CRI lighting and controlled airflow for post-paint quality inspection in automotive, aerospace, and industrial applications.",
    bgImage: INSPECTION_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Inspection Booths" }],
    body: "PFS inspection booths provide the controlled lighting and airflow environment needed for accurate post-paint quality inspection. High-CRI LED lighting systems reveal surface defects, orange peel, and color inconsistencies that are invisible under standard shop lighting. Used in automotive refinishing, aerospace, and high-end industrial finishing operations.",
    features: [
      "High-CRI LED lighting (90+ CRI)",
      "Adjustable lighting angles for defect detection",
      "Controlled airflow to prevent contamination",
      "Available as standalone or integrated with paint booth",
      "Custom sizing for vehicles, aircraft, or parts",
      "ETL/UL Certified Components",
    ],
    relatedHref: "/products/paint-booths",
    relatedLabel: "View All Paint Booths",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "The booth that feeds the inspection process", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
    ],
  },
  "paint-booths/prep-booths": {
    seoTitle: "Prep Booths | Paint Prep Booth | Surface Preparation Booth | PFS",
    seoDescription: "PFS prep booths provide a clean, ventilated environment for sanding, masking, and surface preparation before painting. Downdraft and side-downdraft airflow. ETL/UL certified components, NFPA 33 compliant. Made in the USA.",
    title: "Prep Booths & Prep Stations",
    subtitle: "Dedicated prep environments for sanding, masking, and surface preparation before painting.",
    bgImage: PREP_STATION_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Prep Booths" }],
    body: "PFS prep booths and prep stations provide a controlled environment for sanding, masking, and surface preparation — keeping dust and contaminants away from the paint booth. Available in open, enclosed, downdraft, and side-downdraft configurations for automotive body shops, industrial facilities, and fleet operations.",
    features: ["Downdraft or side-downdraft airflow", "High-efficiency dust filtration", "Available in open and enclosed", "Integrated lighting", "ETL/UL Certified Components", "Custom sizing available"],
    relatedHref: "/products/prep",
    relatedLabel: "View All Prep Solutions",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "The next step after prep", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Dust Collection", subtitle: "Source-capture dust removal", href: "/products/prep/dust-collection", image: PREP_STATION_RENDER },
    ],
  },
  "paint-booths/custom": {
    seoTitle: "Custom Paint Booths | Custom-Engineered Spray Booth | PFS",
    seoDescription: "PFS custom paint booths are engineered to your part size, production volume, airflow requirement, and facility constraints. Any size, any configuration, any industry. ETL/UL certified, NFPA 33 compliant. Factory-direct pricing. Made in Santa Rosa, CA.",
    title: "Custom Paint Booths",
    subtitle: "Engineered to your exact facility dimensions, process requirements, and throughput specifications.",
    bgImage: "/manus-storage/pfs-custom-booth-front-card_7e7d1673.jpg",
    bgVideo: "/manus-storage/pfs-custom-booth-hero-video_e3670d11.mp4",
    galleryImages: [
      "/manus-storage/pfs-factory-booth-wide_234b773d.jpeg",
      "/manus-storage/pfs-factory-helios-front_9112086e.jpeg",
      "/manus-storage/pfs-custom-booth-crossflow-green-filters_f4f232ff.jpeg",
      "/manus-storage/custom-booth-IMG_0920_bcbb3520.webp",
      "/manus-storage/custom-booth-IMG_0918_43e31a25.webp",
      "/manus-storage/custom-booth-IMG_9817_261ccf64.jpg",
      "/manus-storage/custom-booth-IMG_2131_3d656c25.jpg",
      "/manus-storage/custom-booth-IMG_2129_a82ae316.jpg",
      "/manus-storage/custom-booth-IMG_1053_eaac4ed6.jpg",
      "/manus-storage/custom-booth-IMG_0896_76a74aca.jpg",
    ],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Custom" }],
    body: "When standard configurations don't fit your application, PFS engineers custom paint booths from the ground up. Our in-house engineering team works directly with your facility team to design a system that meets your exact dimensional, airflow, electrical, and process requirements.",
    features: ["Custom dimensions and configurations", "In-house engineering and design", "ETL/UL Certified Components", "Any airflow pattern available", "Integration with conveyors and automation", "Full installation support"],
    relatedHref: "/contact/request-a-quote",
    relatedLabel: "Get Pricing",
    relatedProducts: [
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
    ],
  },

  // ── Prep ──────────────────────────────────────────────────────────────────
  "prep/paint-prep-stations": {
    title: "Paint Prep Stations",
    subtitle: "Dedicated prep stations with downdraft or side-downdraft airflow for sanding, masking, and surface prep before painting.",
    bgImage: PREP_STATION_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Prep", href: "/products/prep" }, { label: "Paint Prep Stations" }],
    body: "PFS paint prep stations are dedicated, ventilated enclosures for surface cleaning, sanding, masking, and pre-spray preparation. Keeping prep operations in a controlled environment prevents sanding dust and solvent vapors from contaminating the spray booth and causing finish defects.\n\nPFS prep stations use cross-draft or downdraft airflow to capture dust and vapors at the source. Available with heated or ambient airflow, integrated dust collection, LED lighting, and masking paper dispensers. Drive-through configurations available for high-volume collision repair and fleet refinishing operations.\n\nETL/UL certified components, NFPA 33 compliant. Ships nationally. Made in the USA.",
    features: ["Downdraft or side-downdraft airflow", "High-efficiency dust filtration", "Available in open and enclosed", "Integrated LED lighting", "Meets OEM prep certification requirements", "Custom sizing available"],
    relatedHref: "/products/prep",
    relatedLabel: "View All Prep Solutions",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "The next step after prep", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Dust Collection", subtitle: "Source-capture dust removal", href: "/products/prep/dust-collection", image: PREP_STATION_RENDER },
    ],
  },
  "prep/dust-collection": {
    title: "Dust Collection",
    subtitle: "Integrated dust collection systems for prep environments — capturing sanding dust, grinding particles, and airborne contaminants at the source.",
    bgImage: PREP_STATION_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Prep", href: "/products/prep" }, { label: "Dust Collection" }],
    body: "PFS dust collection systems capture sanding dust, grinding particulate, and dry overspray at the source — protecting workers, preventing cross-contamination between prep and spray operations, and maintaining OSHA PEL compliance for nuisance dust and metal particulate.\n\nAvailable as standalone units or integrated with PFS prep stations, sanding booths, and grinding booths. Cartridge filter systems with pulse-jet cleaning for continuous operation. HEPA filtration options for fine metal dust and composite materials. Explosion-proof configurations for combustible dust applications.\n\nBuilt to OSHA 1910.94 and NFPA 652 combustible dust standards. ETL/UL certified components. Ships nationally. Made in the USA.",
    features: ["Source-capture dust collection", "OSHA air quality compliant", "Available as standalone or integrated", "High-efficiency filter media", "Cartridge and bag filter options", "Custom CFM sizing"],
    relatedHref: "/products/prep",
    relatedLabel: "View All Prep Solutions",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Sanding Booths", subtitle: "Enclosed sanding environments", href: "/products/prep-support/sanding-booths", image: PREP_STATION_RENDER },
    ],
  },
  "prep/wash-booths": {
    title: "Wash Booths & Washers",
    subtitle: "Spray washers and wash booths for parts cleaning and surface degreasing prior to finishing.",
    bgImage: PREP_STATION_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Prep", href: "/products/prep" }, { label: "Wash Booths & Washers" }],
    body: "PFS wash booths are engineered for industrial parts washing, pre-treatment, and surface preparation before painting or powder coating. Proper surface prep is the single most important factor in finish adhesion and long-term coating durability — a contaminated or improperly cleaned surface will cause premature failure regardless of coating quality.\n\nPFS wash booths provide a controlled, enclosed environment for solvent washing, aqueous washing, and phosphate pre-treatment. Available in manual and automated configurations, with heated or ambient water options, spray nozzle systems, and integrated drain and containment. Built to EPA and OSHA standards for chemical containment and worker safety. ETL/UL certified components, NFPA 33 compliant.\n\nCompatible with all PFS spray booth and powder coating systems as a complete pre-treatment line.",
    features: ["Manual and automated configurations", "Heated wash options available", "Stainless steel construction", "Integrated drying capability", "Custom sizing for any part", "Compatible with pretreatment lines"],
    relatedHref: "/products/prep",
    relatedLabel: "View All Prep Solutions",
    relatedProducts: [
      { title: "Pretreatment Systems", subtitle: "Chemical pretreatment before coating", href: "/integration-automation/pretreatment-systems", image: PRETREAT_IMG },
      { title: "Powder Coating Systems", subtitle: "The coating process after wash", href: "/products/powder-booths", image: POWDER_RENDER },
    ],
  },
  "prep/aluminum-repair": {
    title: "Aluminum Repair",
    subtitle: "Dedicated aluminum repair environments with proper containment and ventilation for aluminum welding, sanding, and surface repair.",
    bgImage: PREP_STATION_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Prep", href: "/products/prep" }, { label: "Aluminum Repair" }],
    body: "Aluminum repair requires a completely separate, dedicated environment to prevent cross-contamination with steel particles — a critical requirement for modern collision repair shops handling aluminum-intensive vehicles. PFS aluminum repair stations provide proper ventilation, dust containment, and separation from steel work areas, meeting OEM certification requirements for aluminum repair.",
    features: [
      "Dedicated aluminum-only environment",
      "Prevents cross-contamination with steel",
      "Meets OEM aluminum repair certification requirements",
      "Proper ventilation for aluminum dust",
      "Integrated dust collection",
      "Available in enclosed and open configurations",
    ],
    relatedHref: "/industries/collision-repair",
    relatedLabel: "View Collision Repair Solutions",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Dust Collection", subtitle: "Source-capture dust removal", href: "/products/prep/dust-collection", image: PREP_STATION_RENDER },
    ],
  },

  // ── Powder Coating Systems ───────────────────────────────────────────────
  "powder-booths/spray-to-waste": {
    title: "Spray to Waste Powder Booths",
    subtitle: "Open-face and enclosed powder booths with disposable filter media for low-volume and multi-color operations.",
    bgImage: "/manus-storage/spray-to-waste-hero_2fe77f1d.jpg",
    bgImagePosition: "center center",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Powder Coating Systems", href: "/products/powder-booths" }, { label: "Spray to Waste" }],
    body: "PFS spray-to-waste powder coating booths are engineered for job shops, custom coaters, and production operations where frequent color changes make powder reclaim impractical. Each booth uses high-efficiency disposable filter modules to capture overspray powder and maintain NFPA 33 and IFC Chapter 24 compliant airflow. Available in open-face and fully enclosed configurations with ETL/UL certified components and UL508A control panels. Booth construction is galvanized or powder-coated steel with CID2-rated interior lighting. PFS spray-to-waste booths ship nationally from our Santa Rosa, CA manufacturing facility and are sized to your part geometry and production volume.",
    features: ["Disposable filter media", "Easy color change", "Open-face or enclosed", "High-efficiency cartridge filters", "ETL/UL Certified Components", "Custom sizing available"],
    galleryImages: [
      "/manus-storage/spray-to-waste-pfs-booth-blue-unit_1f718c28.webp",
      "/manus-storage/spray-to-waste-aerospace-composite_3907664d.png",
      "/manus-storage/pfs-stw-4208_b899a28f.jpg",
      "/manus-storage/pfs-stw-7010_4c202b9d.jpg",
      "/manus-storage/pfs-stw-8411_efbc079f.jpg",
      "/manus-storage/pfs-stw-action1_5dd2f4d4.webp",
      "/manus-storage/pfs-stw-action2_4d74a007.webp",
      "/manus-storage/pfs-act-dust-module_b0566cde.webp",
    ],
    sectionVideo: "/manus-storage/pfs-stw-action-clip_ba3b60d0.mp4",
    featuredBooth: {
      label: "FEATURED INSTALLATION",
      title: "Enclosed Spray-to-Waste Powder Booth",
      description: "This PFS enclosed spray-to-waste powder booth was engineered for a precision manufacturing facility requiring clean, multi-color powder coating capability. The booth features a white powder-coated steel enclosure, full-height glass viewing windows, and a bank of blue disposable filter modules at the exhaust wall for maximum overspray capture. Built in the USA with ETL/UL certified components to NFPA 33.",
      exteriorImage: "/manus-storage/pfs-stw-4208_b899a28f.jpg",
      interiorImage: "/manus-storage/pfs-stw-7010_4c202b9d.jpg",
      specs: [
        { label: "Configuration", value: "Enclosed, Cross-Draft" },
        { label: "Filter System", value: "Disposable Blue Module Media" },
        { label: "Lighting", value: "Explosion-Proof LED" },
        { label: "Construction", value: "Powder-Coated Steel" },
        { label: "Compliance", value: "NFPA 33 / ETL/UL Certified Components" },
        { label: "Origin", value: "Made in USA \u2014 Santa Rosa, CA" },
      ],
    },
    relatedHref: "/products/powder-booths",
    relatedLabel: "View All Powder Coating Systems",
    relatedProducts: [
      { title: "Batch Ovens", subtitle: "Cure your powder coating", href: "/products/ovens/batch", image: BATCH_OVEN_RENDER },
      { title: "Blasting Systems", subtitle: "Surface prep before powder coating", href: "/products/blast-systems", image: BLASTING_RENDER },
    ],
  },
  "powder-booths/powder-reclaim": {
    title: "Powder Reclaim Systems",
    subtitle: "Cyclone and cartridge recovery systems that capture and recycle overspray powder for maximum material efficiency.",
    bgImage: "/manus-storage/pfs-powder-reclaim-unit_48f7c437.png",
    bgVideo: "/manus-storage/pfs-nova-powder-reclaim-hero_8e1b0424.mp4",
    featuredImage: "/manus-storage/pfs-powder-reclaim-unit_48f7c437.png",
    galleryImages: ["/manus-storage/pfs-powder-reclaim-unit_48f7c437.png", "/manus-storage/pfs-powder-recovery-lines_a80d3e22.png", "/manus-storage/pfs-powder-coating-action_2ede4cbe.png", "/manus-storage/pfs-robotic-arm-red-spray_90b1e89b.png"],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Powder Coating Systems", href: "/products/powder-booths" }, { label: "Powder Reclaim" }],
    body: "PFS powder reclaim booths are designed for high-volume single-color powder coating operations where material recovery directly impacts cost per part. Each system uses twin cyclone separators to capture overspray powder, clean it through a media classifier, and return it to the feed hopper — continuously, without interrupting production. The non-conductive booth canopy minimizes powder attraction and buildup, while the stainless steel floor provides operator grounding and maximum durability. Electrode air wash systems maximize electrostatic charging efficiency for high first-pass transfer rates. All PFS powder reclaim systems are built to NFPA 33 and IFC Chapter 24 requirements with ETL/UL certified components and UL508A control panels. Manufactured in Santa Rosa, CA.",
    features: [
      "Fast, contamination-free color change capability",
      "Non-conductive booth canopy with minimal powder attraction and retention",
      "Stainless steel booth floor for maximum durability and operator grounding",
      "Electrode air wash system for maximized electrostatic charging efficiency",
      "Adjustable gun mounting for complete top-to-bottom part coverage",
      "Twin cyclone separators with hinged access panels for thorough cleaning",
      "Open design for complete visual inspection and cross-contamination prevention",
      "Closed-loop powder recovery and recycling system",
      "Continuous powder evacuation for maximum cyclone efficiency",
      "Minimized powder in process at all times during operation",
      "ETL/UL Certified Components",
      "Custom configurations available",
    ],
    relatedHref: "/products/powder-booths",
    relatedLabel: "View All Powder Coating Systems",
    relatedProducts: [
      { title: "Conveyor Ovens", subtitle: "Continuous curing for high-volume lines", href: "/products/ovens/conveyor", image: CONVEYOR_OVEN_RENDER },
      { title: "Conveyor Systems", subtitle: "Move parts through the coating line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
    ],
  },
  "powder-booths/automated": {
    seoTitle: "Automated Powder Coating Systems | Robotic Powder Application | PFS",
    seoDescription: "PFS automated powder coating systems integrate robotic applicators, automatic gun movers, conveyor systems, and closed-loop powder reclaim for high-volume production. NFPA 33 compliant, ETL/UL certified. Made in Santa Rosa, CA.",
    title: "Automated Powder Systems",
    subtitle: "Fully automated powder application systems integrated with conveyor lines and robotic applicators for high-volume production.",
    bgImage: POWDER_RENDER,
    bgVideo: "/manus-storage/pfs-auto-powder-hero_259593a2.mp4",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Powder Coating Systems", href: "/products/powder-booths" }, { label: "Automated Powder Systems" }],
    body: "PFS automated powder coating systems integrate automatic gun movers, robotic applicators, conveyor systems, and closed-loop powder reclaim into a complete high-volume finishing line. Designed for production environments where throughput, repeatability, and transfer efficiency are the primary performance metrics. PFS engineers each automated system around your part geometry, conveyor speed, production rate, and powder chemistry — from a single automated booth to a complete powder coating line including pretreatment, application, curing oven, and conveyor. All systems are built to NFPA 33 and IFC Chapter 24 requirements with ETL/UL certified components.",
    features: ["Automatic gun movers", "Robotic applicator integration", "Conveyor system integration", "Integrated powder reclaim", "Color change systems", "ETL/UL Certified Components"],
    galleryImages: [
      "/manus-storage/pfs-auto-powder-line1_3bb98899.png",
      "/manus-storage/pfs-auto-powder-booth_355e5ffc.png",
      "/manus-storage/pfs-auto-powder-conveyor_14f8b84a.png",
      "/manus-storage/pfs-auto-powder-operator_24e559e8.jpg",
      "/manus-storage/pfs-powder-coating-action_2ede4cbe.png",
    ],
    relatedHref: "/products/powder-booths",
    relatedLabel: "View All Powder Coating Systems",
    relatedProducts: [
      { title: "Conveyor Ovens", subtitle: "Continuous curing for automated lines", href: "/products/ovens/conveyor", image: CONVEYOR_OVEN_RENDER },
      { title: "Conveyor Systems", subtitle: "Move parts through the coating line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
      { title: "Pretreatment Systems", subtitle: "Chemical pretreatment before coating", href: "/integration-automation/pretreatment-systems", image: PRETREAT_IMG },
    ],
  },
  "powder-booths/manual": {
    seoTitle: "Manual Powder Coating Booths | Batch Powder Booth | PFS",
    seoDescription: "PFS manual powder coating booths provide a clean, controlled enclosure for hand-gun powder application. Available in spray-to-waste and powder reclaim configurations. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Manual Powder Booths",
    subtitle: "Manual powder coating booths for batch operations, job shops, and low-to-medium volume production.",
    bgImage: POWDER_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Powder Booths", href: "/products/powder-booths" }, { label: "Manual" }],
    body: "PFS manual powder coating booths provide a clean, controlled enclosure for hand-gun powder application with integrated overspray collection. Manual booths are the right choice for job shops, custom coaters, and low-to-medium volume operations where part variety is high and automated conveyance is not practical.\n\nPFS manual powder booths feature high-velocity exhaust airflow to capture airborne powder before it settles on surfaces or escapes the enclosure, integrated powder recovery systems, and easy-clean interior surfaces. Available in spray-to-waste and powder reclaim configurations.\n\nBuilt to NFPA 33 and OSHA standards for powder coating operations. ETL/UL certified components. Ships nationally. Made in the USA.",
    features: ["Manual application compatible", "Recovery or non-recovery options", "Easy color change design", "High-efficiency filtration", "ETL/UL Certified Components", "Custom sizing available"],
    relatedHref: "/products/powder-booths",
    relatedLabel: "View All Powder Booths",
    relatedProducts: [
      { title: "Batch Ovens", subtitle: "Cure your powder coating", href: "/products/ovens/batch", image: BATCH_OVEN_RENDER },
      { title: "Blasting Systems", subtitle: "Surface prep before powder coating", href: "/products/blast-systems", image: BLASTING_RENDER },
    ],
  },
  "powder-booths/automatic": {
    seoTitle: "Automatic Powder Coating Booths | High-Volume Powder Booth | PFS",
    seoDescription: "PFS automatic powder coating booths deliver consistent, repeatable results for high-volume production lines. Integrated gun movers, conveyor compatibility, and powder reclaim. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Automatic Powder Booths",
    subtitle: "Automated powder coating booths for high-volume production lines with consistent, repeatable results.",
    bgImage: POWDER_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Powder Booths", href: "/products/powder-booths" }, { label: "Automatic" }],
    body: "PFS automatic powder coating booths are engineered for high-volume, automated powder application with reciprocating or robotic gun systems. Automatic booths deliver consistent film build, reduced labor cost, and higher throughput than manual application — making them the standard choice for OEM production lines, contract coaters, and high-volume job shops.\n\nPFS automatic booths integrate with conveyor systems, powder feed centers, and color change systems. Available with fast color change capability, closed-loop powder recovery, and automated booth cleaning. Custom widths and lengths to match your conveyor line.\n\nBuilt to NFPA 33 and OSHA standards. ETL/UL certified components. Ships nationally. Made in the USA.",
    features: ["Automated gun mover compatible", "Conveyor integration", "High transfer efficiency", "Recovery systems available", "Color change capable", "Custom sizing"],
    relatedHref: "/products/powder-booths",
    relatedLabel: "View All Powder Booths",
    relatedProducts: [
      { title: "Conveyor Ovens", subtitle: "Continuous curing for automated lines", href: "/products/ovens/conveyor", image: CONVEYOR_OVEN_RENDER },
      { title: "Conveyor Systems", subtitle: "Move parts through the coating line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
    ],
  },
  "powder-booths/batch": {
    seoTitle: "Batch Powder Coating Booths | Flexible Powder Booth | PFS",
    seoDescription: "PFS batch powder coating booths are built for flexible production schedules and varied part sizes. Spray-to-waste or reclaim filtration. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Batch Powder Booths",
    subtitle: "Batch powder coating booths for flexible production schedules and varied part sizes.",
    bgImage: POWDER_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Powder Booths", href: "/products/powder-booths" }, { label: "Batch" }],
    body: "PFS batch powder coating booths are designed for batch processing of parts in a single enclosure — load, coat, unload, repeat. The batch configuration is ideal for job shops, custom coaters, and manufacturers with high part variety and moderate volume where a continuous conveyor line is not justified.\n\nPFS batch booths provide a clean, controlled spray environment with integrated powder recovery, easy-clean interior, and quick color change capability. Available in walk-in and drive-in sizes to accommodate large parts and assemblies.\n\nBuilt to NFPA 33 and OSHA standards for powder coating operations. ETL/UL certified components. Ships nationally. Made in the USA.",
    features: ["Flexible batch operation", "Quick color change", "Easy access design", "High-efficiency filtration", "ETL/UL Certified Components", "Multiple size options"],
    relatedHref: "/products/powder-booths",
    relatedLabel: "View All Powder Booths",
    relatedProducts: [
      { title: "Batch Ovens", subtitle: "Cure your powder coating", href: "/products/ovens/batch", image: BATCH_OVEN_RENDER },
      { title: "Blasting Systems", subtitle: "Surface prep before powder coating", href: "/products/blast-systems", image: BLASTING_RENDER },
    ],
  },
  "powder-booths/modular": {
    seoTitle: "Modular Powder Coating Booths | Expandable Powder Booth | PFS",
    seoDescription: "PFS modular powder coating booths are designed to expand with your production needs. Add sections as your volume grows. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Modular Powder Booths",
    subtitle: "Modular powder coating booths that expand with your production needs.",
    bgImage: POWDER_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Powder Booths", href: "/products/powder-booths" }, { label: "Modular" }],
    body: "PFS modular powder coating booths are designed for scalability — start with a single booth and add capacity as your production grows. Modular construction allows PFS booths to be expanded, reconfigured, or relocated without major structural work.\n\nEach modular powder booth section uses standardized panel dimensions and connection hardware, making expansion straightforward. Available in spray-to-waste and powder reclaim configurations, with manual or automatic application. Compatible with PFS conveyor ovens and batch cure ovens for a complete powder coating line.\n\nBuilt to NFPA 33 and OSHA standards. ETL/UL certified components. Ships nationally. Made in the USA.",
    features: ["Modular panel construction", "Expandable and reconfigurable", "Quick installation", "ETL/UL Certified Components", "Recovery or non-recovery", "Custom configurations"],
    relatedHref: "/products/powder-booths",
    relatedLabel: "View All Powder Booths",
    relatedProducts: [
      { title: "Batch Ovens", subtitle: "Cure your powder coating", href: "/products/ovens/batch", image: BATCH_OVEN_RENDER },
      { title: "Conveyor Systems", subtitle: "Scale up with automation", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
    ],
  },
  "powder-booths/custom": {
    seoTitle: "Custom Powder Coating Booths | Custom-Engineered Powder Booth | PFS",
    seoDescription: "PFS custom powder coating booths are engineered for unique applications, facility constraints, and production requirements. Any size, any configuration. ETL/UL certified, NFPA 33 compliant. Factory-direct. Made in Santa Rosa, CA.",
    title: "Custom Powder Booths",
    subtitle: "Custom-engineered powder coating booths for unique applications and facility requirements.",
    bgImage: POWDER_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Powder Booths", href: "/products/powder-booths" }, { label: "Custom" }],
    body: "PFS custom powder coating booths are engineered to order for facilities with unique part geometries, production requirements, or integration needs that standard configurations cannot accommodate. Every custom booth begins with an engineering consultation to define airflow requirements, part dimensions, application method, and powder recovery strategy.\n\nPFS custom booths can integrate with existing conveyor lines, robotic application systems, and automated color change equipment. Available in any size, with any combination of spray-to-waste or reclaim, manual or automatic application, and heated or ambient cure.\n\nAll custom booths include ETL/UL certified components, NFPA 33 compliant airflow design, and UL508A control panels. Engineered drawings available. Ships nationally. Made in the USA.",
    features: ["Custom dimensions", "In-house engineering", "Automation integration", "ETL/UL Certified Components", "Any airflow configuration", "Full installation support"],
    relatedHref: "/contact/request-a-quote",
    relatedLabel: "Get Pricing",
    relatedProducts: [
      { title: "Custom Ovens", subtitle: "Custom curing for your process", href: "/products/ovens/custom", image: CUSTOM_OVEN_RENDER },
      { title: "Conveyor Systems", subtitle: "Integrate with your production line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
    ],
  },

  // ── Ovens ─────────────────────────────────────────────────────────────────
  "ovens/batch": {
    seoTitle: "Industrial Batch Ovens | Powder Cure Oven | Paint Bake Oven | PFS",
    seoDescription: "PFS industrial batch ovens cure powder coating, bake liquid paint, and heat-treat parts in job shop and manufacturing environments. Natural gas, propane, or electric. ETL/UL certified, NFPA 86 compliant. Made in Santa Rosa, CA.",
    title: "Batch Ovens",
    subtitle: "Industrial batch ovens for powder curing, paint baking, and heat treating in job shop and manufacturing environments.",
    bgImage: BATCH_OVEN_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Industrial Ovens", href: "/products/ovens" }, { label: "Batch Ovens" }],
    body: "PFS batch ovens are designed for flexible curing and baking of powder coatings, liquid paints, and industrial coatings. Available in gas, electric, and combination heat sources with precise temperature control.",
    features: ["Gas, electric, or combination heat", "Precise temperature control", "Available in walk-in and drive-in", "ETL/UL Certified Components", "Custom sizing", "Digital temperature recording"],
    galleryImages: [
      "/manus-storage/IMG_4175_a7a2b2ea.jpg",
      "/manus-storage/IMG_4182_72dfc596.jpg",
      BATCH_OVEN_RENDER,
    ],
    relatedHref: "/products/ovens",
    relatedLabel: "View All Industrial Ovens",
    relatedProducts: [
      { title: "Powder Coating Systems", subtitle: "The coating process before curing", href: "/products/powder-booths", image: POWDER_RENDER },
      { title: "Blasting Systems", subtitle: "Surface prep before coating", href: "/products/blast-systems", image: BLASTING_RENDER },
    ],
  },
  "ovens/conveyor": {
    seoTitle: "Conveyor Ovens | Continuous Cure Oven | Production Powder Oven | PFS",
    seoDescription: "PFS conveyor ovens provide continuous curing for high-volume powder coating and liquid paint lines. Matched to your conveyor speed, part load, and powder chemistry. ETL/UL certified, NFPA 86 compliant. Made in Santa Rosa, CA.",
    title: "Conveyor Ovens",
    subtitle: "Continuous conveyor ovens for high-volume powder curing and paint baking on automated finishing lines.",
    bgImage: "/manus-storage/conveyor-oven-entry_8df7b0be.png",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Industrial Ovens", href: "/products/ovens" }, { label: "Conveyor Ovens" }],
    body: "PFS conveyor ovens integrate with overhead and floor conveyor systems for continuous, high-volume curing. Designed for production environments where throughput and consistency are critical.",
    features: ["Conveyor integration", "Continuous production", "Uniform temperature distribution", "Gas or electric heat", "Custom lengths and widths", "ETL/UL Certified Components"],
    galleryImages: [
      "/manus-storage/conveyor-oven-entry_8df7b0be.png",
      "/manus-storage/conveyor-oven-line_2746ee95.png",
    ],
    relatedHref: "/products/ovens",
    relatedLabel: "View All Industrial Ovens",
    relatedProducts: [
      { title: "Conveyor Systems", subtitle: "Move parts through the curing line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
      { title: "Powder Coating Lines", subtitle: "Complete automated powder line", href: "/integration-automation/powder-coating-lines", image: POWDER_RENDER },
      { title: "Pretreatment Systems", subtitle: "Chemical pretreatment before coating", href: "/integration-automation/pretreatment-systems", image: PRETREAT_IMG },
    ],
  },
  "ovens/walk-in": {
    seoTitle: "Walk-In Ovens | Large Batch Cure Oven | Industrial Walk-In Oven | PFS",
    seoDescription: "PFS walk-in ovens cure large batches of powder-coated or painted parts in a single cycle. Drive-in and forklift-load configurations. Natural gas, propane, or electric. ETL/UL certified, NFPA 86 compliant. Made in Santa Rosa, CA.",
    title: "Walk-In Ovens",
    subtitle: "Large walk-in industrial ovens for oversized parts, assemblies, and heavy equipment components.",
    bgImage: WALKIN_OVEN_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Industrial Ovens", href: "/products/ovens" }, { label: "Walk-In Ovens" }],
    body: "PFS walk-in ovens provide the space and temperature uniformity needed for large parts, assemblies, and heavy equipment components. Available in standard and custom sizes with fork truck access options.",
    features: [
      "Fork truck access available",
      "Large part capacity",
      "Precise temperature uniformity",
      "Natural gas or propane fired",
      "Electrical heating options available",
      "Custom sizing",
      "ETL/UL Certified Components",
      "NFPA 86 compliant",
      "Digital temperature recording",
      "Adjustable shelving and racking options",
      "Insulated panel construction",
      "Made in the USA",
    ],
    relatedHref: "/products/ovens",
    relatedLabel: "View All Industrial Ovens",
    relatedProducts: [
      { title: "Powder Coating Systems", subtitle: "The coating process before curing", href: "/products/powder-booths", image: POWDER_RENDER },
      { title: "Blasting Systems", subtitle: "Surface prep before coating", href: "/products/blast-systems", image: BLASTING_RENDER },
    ],
  },
  "ovens/large-equipment": {
    seoTitle: "Large Equipment Ovens | Heavy Equipment Cure Oven | PFS",
    seoDescription: "PFS large equipment ovens cure powder coating and paint on tractors, trucks, trailers, structural steel, and oversized industrial parts. Custom sizing for any part envelope. ETL/UL certified, NFPA 86 compliant. Made in Santa Rosa, CA.",
    title: "Large Equipment Ovens",
    subtitle: "Oversized industrial ovens for heavy equipment, agricultural machinery, and large structural components.",
    bgImage: "/manus-storage/pfs-large-equipment-oven-tractor_871dfb4d.jpg",
    featuredImage: "/manus-storage/pfs-large-equipment-oven-tractor_871dfb4d.jpg",
    galleryImages: [
      "/manus-storage/pfs-large-equipment-oven-tractor_871dfb4d.jpg",
      "/manus-storage/pfs-large-oven-1_5ae8ed8b.jpg",
      "/manus-storage/pfs-large-oven-2_1c6b101b.jpg",
      "/manus-storage/pfs-large-oven-3_f140680b.jpg",
    ],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Industrial Ovens", href: "/products/ovens" }, { label: "Large Equipment Ovens" }],
    body: "PFS large equipment ovens are engineered for the curing and baking of oversized industrial parts — from agricultural equipment and construction machinery to structural steel and marine components.",
    features: [
      "Drive-in and fork truck access",
      "Oversized door systems for large loads",
      "Natural gas or propane fired",
      "Electrical heating options available",
      "High-capacity burner system",
      "Precise temperature uniformity across large chambers",
      "Custom dimensions to fit any facility",
      "built with ETL/UL certified components — NFPA 86 compliant",
      "Digital temperature recording",
      "Heavy-duty structural steel construction",
      "Insulated panel walls and ceiling",
      "Made in the USA",
    ],
    relatedHref: "/products/ovens",
    relatedLabel: "View All Industrial Ovens",
    relatedProducts: [
      { title: "Blasting Systems", subtitle: "Surface prep before coating", href: "/products/blast-systems", image: BLASTING_RENDER },
      { title: "Powder Coating Systems", subtitle: "The coating process before curing", href: "/products/powder-booths", image: POWDER_RENDER },
    ],
  },
  "ovens/infrared": {
    seoTitle: "Infrared Ovens | IR Cure Oven | Infrared Powder Cure | PFS",
    seoDescription: "PFS infrared ovens cure powder coating and paint using short-wave or medium-wave IR emitters for fast, energy-efficient heat transfer. Ideal for high-throughput lines and heat-sensitive substrates. ETL/UL certified. Made in Santa Rosa, CA.",
    title: "Infrared Ovens",
    subtitle: "High-efficiency infrared curing ovens for powder coating lines — faster ramp-up, lower energy consumption, and gel/boost applications.",
    bgImage: "/manus-storage/HEROOVEN_23aea520.png",
    seriesBadge: "PFS VULCAN SERIES",
    featuredImage: "/manus-storage/infrared-oven-featured_328912a1.png",
    galleryImages: ["/manus-storage/HEROOVEN_23aea520.png", "/manus-storage/infrared-oven-featured_328912a1.png", IMG_OVEN_INFRARED_CLOSE, IMG_OVEN_INFRARED_OPEN],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Industrial Ovens", href: "/products/ovens" }, { label: "Infrared Ovens" }],
    body: "PFS infrared ovens use radiant IR energy to heat parts directly — not the surrounding air — delivering dramatically faster ramp-up times and more efficient curing than conventional convection ovens. Ideal for powder coating lines, IR ovens are used for gel and boost applications between coats, pre-heating thick substrates, and full curing of smaller parts. Available as standalone batch units or integrated IR booster sections within existing convection oven lines. Gas catalytic and electric infrared configurations available.",
    features: [
      "Faster ramp-up than convection ovens",
      "Gel and boost applications for powder coating lines",
      "Gas catalytic and electric infrared options",
      "Standalone batch or conveyor-integrated configurations",
      "Up to 23% energy savings vs. convection-only systems",
      "Compact footprint — fits inside existing oven vestibules",
      "Precise zone control for uniform heating",
      "built with ETL/UL certified components — NFPA 86 compliant",
      "Made in the USA",
    ],
    relatedHref: "/products/ovens",
    relatedLabel: "View All Industrial Ovens",
    relatedProducts: [
      { title: "Powder Coating Lines", subtitle: "Complete automated powder line", href: "/integration-automation/powder-coating-lines", image: IMG_POWDER_LINE },
      { title: "Conveyor Systems", subtitle: "Move parts through the curing line", href: "/integration-automation/conveyor-systems", image: IMG_CONVEYOR_LINE },
    ],
  },
  "ovens/custom": {
    seoTitle: "Custom Industrial Ovens | Custom Cure Oven | PFS",
    seoDescription: "PFS custom industrial ovens are engineered to your part size, production volume, fuel type, and process temperature. Any size, any configuration. ETL/UL certified, NFPA 86 compliant. Factory-direct. Made in Santa Rosa, CA.",
    title: "Custom Industrial Ovens",
    subtitle: "Custom-engineered industrial ovens for unique applications, process requirements, and facility constraints.",
    bgImage: CUSTOM_OVEN_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Industrial Ovens", href: "/products/ovens" }, { label: "Custom Ovens" }],
    body: "PFS engineers custom industrial ovens for applications that require non-standard dimensions, specialized temperature profiles, or integration with automated finishing lines.",
    features: ["Custom dimensions and configurations", "In-house engineering", "Automation integration", "ETL/UL Certified Components", "Any heat source", "Full installation support"],
    relatedHref: "/contact/request-a-quote",
    relatedLabel: "Get Pricing",
    relatedProducts: [
      { title: "Custom Powder Booths", subtitle: "Custom coating to match your oven", href: "/products/powder-booths/custom", image: POWDER_RENDER },
      { title: "Conveyor Systems", subtitle: "Integrate with your production line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
    ],
  },

  // ── Prep & Support ────────────────────────────────────────────────────────
  "prep-support/prep-stations": {
    seoTitle: "Paint Prep Stations | Downdraft Prep Station | Surface Prep Booth | PFS",
    seoDescription: "PFS downdraft and side-downdraft prep stations provide a clean, ventilated work area for sanding, masking, and surface preparation before painting. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Prep Stations",
    subtitle: "Downdraft and side-downdraft prep stations for surface preparation before painting.",
    bgImage: PREP_STATION_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Prep & Support", href: "/products/prep-support" }, { label: "Prep Stations" }],
    body: "PFS prep stations provide a dedicated, ventilated work area for surface preparation, masking, and pre-spray operations immediately adjacent to the spray booth. Proper prep is the foundation of every quality finish — a dedicated prep station keeps prep work out of the spray environment and eliminates the contamination that causes fish-eyes, solvent pop, and adhesion failures.\n\nPFS prep stations feature high-velocity cross-draft or downdraft airflow, integrated dust extraction, LED lighting, and masking paper dispensers. Available in drive-through and walk-in configurations to match your production flow. Compatible with all PFS enclosed spray booth systems.\n\nETL/UL certified components, NFPA 33 compliant. Ships nationally. Made in the USA.",
    features: ["Downdraft or side-downdraft airflow", "High-efficiency filtration", "Open and enclosed options", "Integrated lighting", "ETL/UL Certified Components", "Custom sizing"],
    relatedHref: "/products/prep",
    relatedLabel: "View All Prep Solutions",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "The next step after prep", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Dust Collection", subtitle: "Source-capture dust removal", href: "/products/prep/dust-collection", image: PREP_STATION_RENDER },
    ],
  },
  "prep-support/paint-mix-rooms": {
    seoTitle: "Paint Mix Rooms | Mixing Room | NFPA Paint Mixing Room | PFS",
    seoDescription: "PFS paint mixing rooms are NFPA 33-compliant enclosed spaces with explosion-proof ventilation and lighting for safe paint mixing, thinning, and storage. ETL/UL certified. Made in the USA.",
    title: "Paint Mix Rooms",
    subtitle: "NFPA-compliant paint mixing rooms with explosion-proof ventilation and lighting.",
    bgImage: "/manus-storage/IMG_0498_a98f5f38.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Prep & Support", href: "/products/prep-support" }, { label: "Paint Mix Rooms" }],
    body: "PFS paint mix rooms provide a dedicated, ventilated, fire-rated enclosure for storing, mixing, and dispensing flammable coatings and solvents. Mixing and storing flammable materials outside a compliant mix room is one of the most common OSHA and fire code violations in finishing facilities — and one of the most preventable.\n\nPFS mix rooms are built to NFPA 30 flammable liquids storage standards with explosion-proof electrical, continuous ventilation at a minimum of 1 CFM per square foot, and fire-rated wall construction. Available in standard sizes from 8×10 to 20×20 feet, or custom dimensions. Integrated shelving, mixing bench, and dispensing station options available.\n\nETL/UL certified components. Compatible with all PFS spray booth systems. Ships nationally. Made in the USA.",
    features: ["NFPA 33 compliant", "Explosion-proof ventilation", "Explosion-proof lighting", "Safe paint storage", "Custom sizing", "ETL/UL Certified Components"],
    relatedHref: "/products/prep-support",
    relatedLabel: "View Prep & Support",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "The spray environment fed by the mix room", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
    ],
  },
  "prep-support/sanding-booths": {
    seoTitle: "Sanding Booths | Enclosed Sanding Booth | Dust Capture Booth | PFS",
    seoDescription: "PFS enclosed sanding booths capture sanding dust at the source with high-efficiency filtration — protecting operators and keeping the shop clean. Ideal for body shops and industrial surface preparation. ETL/UL certified. Made in the USA.",
    title: "Sanding Booths",
    subtitle: "Enclosed sanding booths with high-efficiency dust capture for body shops and industrial surface preparation.",
    bgImage: "/manus-storage/pfs-sanding-booth-real_6c18c7ff.png",
    bgVideo: "/manus-storage/pfs-sanding-booth-hero_da984074.mp4",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Prep & Support", href: "/products/prep-support" }, { label: "Sanding Booths" }],
    body: "PFS sanding booths provide a dedicated, dust-controlled environment for dry sanding, block sanding, and surface preparation. Sanding dust is one of the most common sources of paint defects — without proper dust extraction, airborne particles contaminate the spray environment and embed in the finish.\n\nPFS sanding booths use high-velocity downdraft or cross-draft airflow to capture sanding dust at the source, pulling particles down through the floor grating or across the work surface into the filter media before they can become airborne. Available in drive-through and walk-in configurations. Integrated dust collection, HEPA filtration options, and LED lighting packages available.\n\nBuilt to OSHA 1910.94 standards for dust control and worker respiratory protection. ETL/UL certified components, NFPA 33 compliant. Made in the USA.",
    features: ["Enclosed dust containment", "Integrated dust collection", "High-efficiency filter media", "Downdraft airflow", "ETL/UL Certified Components", "Custom sizing"],
    relatedHref: "/products/prep-support",
    relatedLabel: "View Prep & Support",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "The next step after sanding", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Dust Collection", subtitle: "Source-capture dust removal", href: "/products/prep/dust-collection", image: PREP_STATION_RENDER },
    ],
  },
  "prep-support/grinding-booths": {
    seoTitle: "Grinding Booths | Spark-Arresting Grinding Booth | PFS",
    seoDescription: "PFS spark-arresting grinding booths contain sparks, metal dust, and grinding debris for safe metal fabrication and weld prep. ETL/UL certified, NFPA compliant. Made in the USA.",
    title: "Grinding Booths",
    subtitle: "Spark-arresting grinding booths for metal fabrication and weld prep.",
    bgImage: "/manus-storage/pfs-grinding-booth-real_fabfee76.png",
    bgVideo: "/manus-storage/pfs-grinding-booth-hero_fc31dd21.mp4",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Prep & Support", href: "/products/prep-support" }, { label: "Grinding Booths" }],
    body: "PFS grinding booths are engineered for metal grinding, weld preparation, and abrasive cutting in a controlled, spark-arresting environment. Grinding operations generate both combustible metal dust and high-temperature sparks — without proper containment, these create serious fire and explosion hazards in any finishing facility.\n\nPFS grinding booths incorporate spark-arresting filtration media, grounded steel construction, and high-velocity exhaust systems that capture metal particulate before it can accumulate. Available in standalone and integrated configurations. Compatible with PFS prep station lines for complete surface preparation workflows.\n\nBuilt to OSHA 1910.94 and NFPA 33 standards for combustible dust and spark control. ETL/UL certified components. Made in the USA.",
    features: ["Spark-arresting filtration", "NFPA 33 compliant", "OSHA compliant", "Heavy-duty construction", "ETL/UL Certified Components", "Custom sizing"],
    relatedHref: "/products/prep-support",
    relatedLabel: "View Prep & Support",
    relatedProducts: [
      { title: "Blasting Systems", subtitle: "Surface prep before coating", href: "/products/blast-systems", image: BLASTING_RENDER },
      { title: "Dust Collection", subtitle: "Source-capture dust removal", href: "/products/prep/dust-collection", image: PREP_STATION_RENDER },
    ],
  },
  "prep-support/paint-walls": {
    title: "Paint Walls",
    subtitle: "Open-face exhaust filtration walls for spray painting parts and panels — no full enclosure required.",
    bgImage: "/manus-storage/pfs-paint-walls-card_553fa1c5.png",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Prep & Support", href: "/products/prep-support" }, { label: "Paint Walls" }],
    body: "PFS Paint Walls are wall-mounted exhaust filtration systems that create a controlled spray zone without the footprint of a full enclosure. Ideal for auto body shops, collision repair centers, and industrial facilities that need to paint doors, panels, bumpers, and small assemblies quickly and safely. High-velocity airflow draws overspray directly into the filter media, protecting the operator and keeping the shop clean. Available in modular widths from 8 to 20 feet, with optional LED lighting packages and fire suppression integration. Heated and non-heated airflow options available. built with ETL/UL certified components and built to NFPA 33 standards.",
    features: ["Wall-mounted open-face design", "Modular widths: 8 ft to 20 ft", "High-velocity filtered exhaust airflow", "Optional LED lighting package", "Fire suppression integration available", "Heated airflow option", "built with ETL/UL certified components to NFPA 33", "Low-maintenance filter media", "Made in the USA"],
    relatedHref: "/products/prep-support",
    relatedLabel: "View Prep & Support",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },

  // ── Blasting Systems ──────────────────────────────────────────────────────
  "blast-systems/blasting-booths": {
    seoTitle: "Blasting Booths | Abrasive Blast Booth | Sandblast Booth | PFS",
    seoDescription: "PFS enclosed abrasive blasting booths prepare surfaces for coating by removing rust, mill scale, and old coatings. OSHA 1910.94 compliant, ETL/UL certified. Available for steel shot, aluminum oxide, glass bead, and other media. Made in the USA.",
    title: "Blasting Booths",
    subtitle: "Enclosed abrasive blasting booths for surface preparation, rust removal, and coating adhesion.",
    bgImage: BLASTING_RENDER,
    galleryImages: [
      "/manus-storage/pfs-blast-systems2-gallery_01c11421.png",
      "/manus-storage/pfs-blast-booth-interior_cf77951a.png",
      "/manus-storage/pfs-blast-reclaim-unit_d0656341.png",
      "/manus-storage/pfs-blast-booth-door_d3afcc3c.jpg",
      "/manus-storage/pfs-blast-heic1_c23a30a9.jpg",
      "/manus-storage/pfs-blast-heic2_82efda1f.jpg",
      "/manus-storage/pfs-blast-heic3_5967fbd4.jpg",
      "/manus-storage/pfs-blast-heic4_68457c3f.jpg",
    ],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Blasting Systems", href: "/products/blast-systems" }, { label: "Blasting Booths" }],
    body: "PFS abrasive blasting booths provide a fully enclosed, OSHA 1910.94-compliant environment for surface preparation, rust removal, mill scale removal, and coating adhesion profiling. Each booth is engineered to contain abrasive media and blast dust, protect operators from respirable particulate, and maintain compliant air quality throughout the work zone. Compatible with steel grit, steel shot, glass bead, aluminum oxide, garnet, and plastic media. High-efficiency dust collection systems maintain visibility and air quality during continuous operation. PFS blasting booths are custom-sized to your largest part and production requirements, with ETL/UL certified components and UL508A control panels. Manufactured in Santa Rosa, CA.",
    features: ["Contained blast environment", "Media recovery systems", "High-efficiency dust collection", "Multiple abrasive media compatible", "Custom sizing", "ETL/UL Certified Components"],
    relatedHref: "/products/blast-systems",
    relatedLabel: "View All Blasting Systems",
    relatedProducts: [
      { title: "Powder Coating Systems", subtitle: "The coating process after blasting", href: "/products/powder-booths", image: POWDER_RENDER },
      { title: "Enclosed Paint Booths", subtitle: "Paint after blast prep", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
    ],
  },
  "blast-systems/reclaim-blasting-booths": {
    seoTitle: "Reclaim Blasting Booths | Media Recovery Blast Booth | PFS",
    seoDescription: "PFS reclaim blasting booths integrate media recovery systems that collect, clean, and recycle abrasive media — reducing operating cost and waste disposal. OSHA 1910.94 compliant, ETL/UL certified. Made in the USA.",
    title: "Reclaim Blasting Booths",
    subtitle: "Blasting booths with integrated media recovery systems for maximum efficiency and reduced operating costs.",
    bgImage: "/manus-storage/pfs-reclaim-blast-booth_bd633d6a.png",
    galleryImages: [
      "/manus-storage/pfs-blast-reclaim-unit_d0656341.png",
      "/manus-storage/pfs-blast-systems2-gallery_01c11421.png",
      "/manus-storage/pfs-blast-booth-interior_cf77951a.png",
      "/manus-storage/pfs-blast-booth-door_d3afcc3c.jpg",
      "/manus-storage/pfs-blast-heic1_c23a30a9.jpg",
      "/manus-storage/pfs-blast-heic2_82efda1f.jpg",
      "/manus-storage/pfs-blast-heic3_5967fbd4.jpg",
      "/manus-storage/pfs-blast-heic4_68457c3f.jpg",
    ],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Blasting Systems", href: "/products/blast-systems" }, { label: "Reclaim Blasting Booths" }],
    body: "PFS reclaim blasting booths combine a fully enclosed OSHA 1910.94-compliant blast environment with an integrated media recovery system — floor sweep, bucket elevator, and media classifier — to capture, clean, and recycle abrasive media back into the blast pot continuously. This closed-loop recovery system dramatically reduces media consumption and disposal costs in high-volume blasting operations while maintaining consistent blast profile and surface cleanliness. Compatible with steel grit, steel shot, and other recoverable abrasive media. High-efficiency dust collection maintains operator visibility and compliant air quality. Custom-sized to your part and production requirements with ETL/UL certified components. Manufactured in Santa Rosa, CA.",
    features: ["Floor media recovery", "Bucket elevator reclaim", "Media classifier and separator", "Reduced media consumption", "High-efficiency dust collection", "Custom sizing"],
    relatedHref: "/products/blast-systems",
    relatedLabel: "View All Blasting Systems",
    relatedProducts: [
      { title: "Powder Coating Systems", subtitle: "The coating process after blasting", href: "/products/powder-booths", image: POWDER_RENDER },
      { title: "Conveyor Systems", subtitle: "Move parts through the finishing line", href: "/integration-automation/conveyor-systems", image: CONVEYOR_IMG },
    ],
  },
  "blast-systems/containerized-blast-booths": {
    title: "Containerized Blast Booths",
    subtitle: "Portable, deployable abrasive blasting environments built inside standard 20-ft or 40-ft ISO shipping containers — ready to operate anywhere.",
    seoTitle: "Containerized Blast Booth | Portable Blast Room in a Shipping Container | PFS",
    seoDescription: "PFS containerized blast booths convert 20-ft or 40-ft ISO shipping containers into fully self-contained portable blast rooms. Bucket elevator reclaim, vacuum recovery, or no-recovery options. OSHA 1910.94-compliant. Deployable by flatbed, crane, or forklift. ETL/UL certified. Made in the USA.",
    bgImage: "/manus-storage/blast-container-system_0e694223.png",
    bgVideo: "/manus-storage/pfs-blast-container-hero_dab31fe9.mp4",
    featuredImage: "/manus-storage/blast-container-system_0e694223.png",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Blasting Systems", href: "/products/blast-systems" }, { label: "Containerized Blast Booths" }],
    body: "PFS containerized blast booths convert a standard 20-ft or 40-ft ISO shipping container into a fully enclosed, self-contained abrasive blasting environment. The container shell serves as the blast chamber — no permanent building, no concrete pad, no lengthy site preparation. Units ship complete with integrated dust collection, interior LED lighting, abrasive media containment, and OSHA 1910.94-compliant ventilation already installed.\n\nMedia recovery is available in three configurations: bucket elevator reclaim for high-volume continuous production, vacuum recovery for smaller or intermittent operations, or no-recovery for single-use or low-frequency applications. PFS engineers the recovery method to match your throughput and media type.\n\nDeployable by flatbed truck, crane, or forklift, these portable blast rooms are used by military and government contractors, pipeline and infrastructure operators, shipyards, and industrial maintenance teams that need a relocatable blasting capability. Manufactured in Santa Rosa, CA with ETL/UL certified components.",
    features: [
      "20-ft or 40-ft ISO container construction",
      "Fully self-contained blast chamber",
      "Integrated high-efficiency dust collector",
      "Bucket elevator reclaim, vacuum recovery, or no-recovery options",
      "OSHA 1910.94-compliant ventilation",
      "Interior LED lighting",
      "Abrasive media containment flooring",
      "Deployable by flatbed, crane, or forklift",
      "No permanent building or concrete pad required",
      "Compatible with steel grit, steel shot, aluminum oxide, and garnet",
      "Military and government contractor ready",
      "ETL/UL certified electrical components",
      "UL508A control panel",
      "Custom blast nozzle and hose configurations",
      "Optional personnel access door and safety interlocks",
      "Made in the USA",
    ],
    relatedHref: "/products/blast-systems",
    relatedLabel: "View All Blasting Systems",
    relatedProducts: [
      { title: "Container Paint Booths", subtitle: "Portable spray booth in a container", href: "/products/container-booths/40ft", image: "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg" },
      { title: "Powder Coating Systems", subtitle: "The coating process after blasting", href: "/products/powder-booths", image: POWDER_RENDER },
    ],
  },
  "blast-systems/blast-booths": {
    seoTitle: "Blast Booths | Industrial Blast Booth | Abrasive Blasting Booth | PFS",
    seoDescription: "PFS industrial blast booths provide a contained environment for abrasive blasting, rust removal, and surface preparation before coating. OSHA 1910.94 compliant, ETL/UL certified. Made in the USA.",
    title: "Blast Booths",
    subtitle: "Industrial blast booths for surface preparation, rust removal, and coating adhesion.",
    bgImage: "/manus-storage/pfs-render-blast-booth_e7b47ff4.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Blast Systems", href: "/products/blast-systems" }, { label: "Blast Booths" }],
    body: "PFS blast booths provide a contained environment for abrasive blasting operations — protecting workers, containing media, and capturing dust. Available in multiple sizes for parts and assemblies.",
    features: ["Contained blast environment", "Media recovery systems", "High-efficiency dust collection", "Multiple abrasive media compatible", "Custom sizing", "ETL/UL Certified Components"],
    relatedHref: "/products/blast-systems",
    relatedLabel: "View All Blast Systems",
    relatedProducts: [
      { title: "Powder Coating Systems", subtitle: "The coating process after blasting", href: "/products/powder-booths", image: POWDER_RENDER },
      { title: "Enclosed Paint Booths", subtitle: "Paint after blast prep", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
    ],
  },
  "blast-systems/blast-rooms": {
    seoTitle: "Blast Rooms | Large Blast Room | Heavy Equipment Blast Room | PFS",
    seoDescription: "PFS large-scale blast rooms handle heavy equipment, structural steel, bridges, and oversized industrial components. Custom sizing, media reclaim options, and OSHA 1910.94 compliant ventilation. ETL/UL certified. Made in the USA.",
    title: "Blast Rooms",
    subtitle: "Large-scale blast rooms for heavy equipment, structural steel, and oversized components.",
    bgImage: BLAST_ROOM_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Blasting Systems", href: "/products/blast-systems" }, { label: "Blast Rooms" }],
    body: "PFS blast rooms are engineered for large-scale abrasive blasting of heavy equipment, structural steel, rail cars, marine vessels, bridge components, and oversized industrial assemblies. Each blast room is custom-designed to your largest part, production throughput, and media type — with full mechanical media recovery, dust collection, and OSHA 1910.94-compliant ventilation. Drive-in access configurations accommodate forklifts, overhead cranes, and wheeled equipment. Blast room panels are constructed from heavy-gauge steel with abrasion-resistant interior liners for long service life. PFS blast rooms are manufactured in Santa Rosa, CA with ETL/UL certified components and UL508A control panels.",
    features: ["Large-scale capacity", "Full media recovery", "High-efficiency dust collection", "Drive-in access available", "Custom dimensions", "Made in the USA"],
    relatedHref: "/products/blast-systems",
    relatedLabel: "View All Blast Systems",
    relatedProducts: [
      { title: "Large Equipment Ovens", subtitle: "Cure large parts after coating", href: "/products/ovens/large-equipment", image: LARGE_EQUIP_OVEN_RENDER },
      { title: "Powder Coating Systems", subtitle: "The coating process after blasting", href: "/products/powder-booths", image: POWDER_RENDER },
    ],
  },

  // ── Air Make-Up Units ─────────────────────────────────────────────────────
  "air-make-up-units/standard": {
    seoTitle: "Air Make-Up Units | Spray Booth AMU | Air Replacement Unit | PFS",
    seoDescription: "PFS air make-up units replace air exhausted by spray booths, maintaining proper booth pressure and airflow. Available in a range of CFM capacities for booths of all sizes. ETL/UL certified. Made in the USA.",
    title: "Standard Air Make-Up Units",
    subtitle: "Standard air make-up units for spray booth air replacement and facility ventilation.",
    bgImage: AMU_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Air Make-Up Units", href: "/products/air-make-up-units" }, { label: "Standard" }],
    body: "PFS standard air make-up units replace the air exhausted by spray booths, maintaining proper booth pressure and airflow. Available in a range of CFM capacities for booths of all sizes.",
    features: ["Proper booth pressure maintenance", "Range of CFM capacities", "Direct-fired or indirect-fired", "ETL/UL Certified Components", "Custom configurations", "Made in the USA"],
    relatedHref: "/products/air-make-up-units",
    relatedLabel: "View All Air Make-Up Units",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "The booth your AMU serves", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "air-make-up-units/heated": {
    seoTitle: "Heated Air Make-Up Units | Heated Spray Booth AMU | PFS",
    seoDescription: "PFS heated air make-up units condition incoming air to the precise temperature required for optimal spray application and curing. Natural gas, propane, or electric. ETL/UL certified. Made in the USA.",
    title: "Heated Air Make-Up Units",
    subtitle: "Temperature-controlled air make-up units for spray booths — available in Natural Gas, Propane, and Electric configurations.",
    bgImage: AMU_RENDER,
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Air Make-Up Units", href: "/products/air-make-up-units" }, { label: "Heated" }],
    body: "PFS heated air make-up units condition incoming air to the precise temperature required for optimal spray application and curing. Proper heated airflow is critical for paint atomization, solvent flash-off, and consistent finish quality — especially in cold climates or high-production environments.\n\nAvailable in three heater configurations:\n\n• Natural Gas Heaters — The most common choice for production shops. Direct-fired or indirect-fired gas burners deliver high BTU output with low operating cost. Ideal for facilities with existing gas infrastructure.\n\n• Propane Heaters — Identical performance to natural gas units, configured for propane supply. Preferred for remote facilities, outdoor booths, and locations without natural gas service.\n\n• Electric Heaters — Clean, zero-emission heating with no combustion. Ideal for environmentally sensitive facilities, clean rooms, and locations where gas is not available. Lower BTU ceiling than gas but precise digital temperature control.",
    features: ["Natural Gas, Propane, or Electric heater options", "Direct-fired and indirect-fired gas configurations", "Modulating heat output for precise temperature control", "ETL/UL Certified Components", "Custom CFM and BTU sizing", "Digital temperature controls", "Compatible with all PFS spray booth models", "Made in the USA"],
    relatedHref: "/products/air-make-up-units",
    relatedLabel: "View All Air Make-Up Units",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "The booth your AMU serves", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Heated Paint Booths", subtitle: "Spray, flash, and bake in one system", href: "/products/paint-booths/enclosed/heated", image: OVEN_IMG },
    ],
  },
  "air-make-up-units/non-heated": {
    seoTitle: "Non-Heated Air Make-Up Units | Untempered Spray Booth AMU | PFS",
    seoDescription: "PFS non-heated air make-up units supply fresh outside air to spray booths without tempering. Ideal for mild climates and applications where temperature control is not required. ETL/UL certified. Made in the USA.",
    title: "Non-Heated Air Make-Up Units",
    subtitle: "Designed to bring fresh outside air into the paint booth. Non-tempered. Heated options available upon request.",
    bgImage: "/manus-storage/apollo-amu-non-heated-render_2991eb20.png",
    galleryImages: [
      "/manus-storage/apollo-amu-non-heated-render_2991eb20.png",
      "/manus-storage/apollo-amu-non-heated-rooftop_e9762585.jpg",
      "/manus-storage/apollo-amu-non-heated-install_c90bdc45.jpg",
    ],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Air Make-Up Units", href: "/products/air-make-up-units" }, { label: "Non-Heated" }],
    body: "The PFS Apollo Non-Heated AMU is designed to bring fresh outside air into the paint booth. Non-tempered. Heated options available upon request.",
    features: ["Fresh outside air supply", "Non-tempered airflow", "Heated options available upon request", "ETL/UL Certified Components", "Custom CFM sizing", "Made in the USA"],
    relatedHref: "/products/air-make-up-units",
    relatedLabel: "View All Air Make-Up Units",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "The booth your AMU serves", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },


  // ── Environmental Rooms ───────────────────────────────────────────────────
  "environmental-rooms/temperature-controlled": {
    seoTitle: "Temperature-Controlled Rooms | Environmental Control Room | PFS",
    seoDescription: "PFS temperature-controlled rooms maintain precise temperature and humidity for finishing, curing, testing, and storage applications. Custom sizing and HVAC configurations. ETL/UL certified. Made in the USA.",
    title: "Temperature-Controlled Rooms",
    subtitle: "Precision temperature-controlled environments for finishing processes that require stable conditions.",
    bgImage: "/manus-storage/pfs-environmental-room-exterior-showroom_08ee80dd.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Environmental Rooms", href: "/products/environmental-rooms" }, { label: "Temperature-Controlled" }],
    body: "PFS temperature-controlled rooms maintain precise temperature ranges for finishing processes that require stable conditions — including powder coating, liquid paint curing, and adhesive bonding.",
    features: ["Precise temperature control", "Heating and cooling available", "Tight temperature tolerances", "ETL/UL Certified Components", "Custom sizing", "Made in the USA"],
    relatedHref: "/products/environmental-rooms",
    relatedLabel: "View All Environmental Rooms",
    relatedProducts: [
      { title: "Enclosed Paint Booths", subtitle: "Spray environment within the controlled room", href: "/products/paint-booths/enclosed", image: ENCLOSED_BOOTH_RENDER },
      { title: "Batch Ovens", subtitle: "Curing within controlled environments", href: "/products/ovens/batch", image: BATCH_OVEN_RENDER },
    ],
  },
  "environmental-rooms/process-controlled": {
    seoTitle: "Process-Controlled Rooms | Controlled Environment Room | PFS",
    seoDescription: "PFS process-controlled rooms provide a precisely managed environment for sensitive finishing, assembly, and inspection processes. Custom temperature, humidity, and pressure control. ETL/UL certified. Made in the USA.",
    title: "Process-Controlled Rooms",
    subtitle: "Controlled environments for finishing processes requiring precise temperature, humidity, and airflow conditions.",
    bgImage: "/manus-storage/pfs-process-controlled-room-exterior_f4302d4b.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Environmental Rooms", href: "/products/environmental-rooms" }, { label: "Process-Controlled" }],
    body: "PFS process-controlled rooms provide the precise environmental conditions — temperature, humidity, and airflow — required for sensitive finishing processes in aerospace, electronics, and specialty manufacturing.",
    features: ["Temperature and humidity control", "Precise airflow management", "Contamination control", "ETL/UL Certified Components", "Custom sizing", "Made in the USA"],
    galleryImages: [
      "/manus-storage/pfs-process-controlled-room-exterior_f4302d4b.jpg",
      "/manus-storage/pfs-environmental-room-exterior-wide_5d55f5f9.jpg",
      "/manus-storage/pfs-environmental-room-side-panel_b4f867c3.jpg",
      "/manus-storage/pfs-environmental-room-interior-heater_f59bfa10.jpg",
      "/manus-storage/pfs-environmental-room-interior-exit_ed4be04c.jpg",
      "/manus-storage/pfs-process-controlled-room-interior-heater_604bc1c7.jpg",
      "/manus-storage/pfs-environmental-room-interior-epoxy-floor_68c1c749.jpeg",
      "/manus-storage/pfs-environmental-room-interior-large_a5ff5797.jpg",
    ],
    relatedHref: "/products/environmental-rooms",
    relatedLabel: "View All Environmental Rooms",
    relatedProducts: [
      { title: "Aircraft Paint Booths", subtitle: "Aerospace-grade spray environments", href: "/products/paint-booths/aircraft", image: AIRCRAFT_RENDER },
      { title: "Inspection Booths", subtitle: "Post-paint quality inspection", href: "/products/paint-booths/inspection", image: INSPECTION_RENDER },
    ],
  },
  "environmental-rooms/enclosed-work": {
    seoTitle: "Enclosed Work Areas | Controlled Work Environment | PFS",
    seoDescription: "PFS enclosed work areas provide a clean, contained environment for sensitive assembly, inspection, and finishing operations. Custom sizing and ventilation. ETL/UL certified. Made in the USA.",
    title: "Enclosed Work Environments",
    subtitle: "Clean, enclosed work environments for sensitive assembly, inspection, and finishing operations.",
    bgImage: "/manus-storage/pfs-environmental-room-interior-large_a5ff5797.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Environmental Rooms", href: "/products/environmental-rooms" }, { label: "Enclosed Work" }],
    body: "PFS enclosed work environments provide a controlled, contamination-free space for sensitive assembly, inspection, and finishing work. Used in aerospace, electronics, and precision manufacturing.",
    features: ["Contamination control", "Positive or negative pressure", "HEPA filtration available", "ETL/UL Certified Components", "Custom sizing", "Made in the USA"],
    relatedHref: "/products/environmental-rooms",
    relatedLabel: "View All Environmental Rooms",
    relatedProducts: [
      { title: "Inspection Booths", subtitle: "Post-paint quality inspection", href: "/products/paint-booths/inspection", image: INSPECTION_RENDER },
      { title: "Aircraft Paint Booths", subtitle: "Aerospace-grade spray environments", href: "/products/paint-booths/aircraft", image: AIRCRAFT_RENDER },
    ],
  },
  "environmental-rooms/custom": {
    seoTitle: "Custom Environmental Rooms | Custom Controlled Environment | PFS",
    seoDescription: "PFS custom environmental rooms are engineered for unique process requirements and facility constraints. Any size, any environmental control specification. ETL/UL certified. Made in Santa Rosa, CA.",
    title: "Custom Environmental Rooms",
    subtitle: "Custom-engineered environmental rooms for unique process requirements and facility constraints.",
    bgImage: "/manus-storage/pfs-render-temp-room_f66dd693.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Environmental Rooms", href: "/products/environmental-rooms" }, { label: "Custom" }],
    body: "PFS engineers custom environmental rooms for applications that require non-standard dimensions, specialized environmental controls, or integration with automated finishing systems.",
    features: ["Custom dimensions", "In-house engineering", "Any environmental control", "ETL/UL Certified Components", "Full installation support", "Made in the USA"],
    relatedHref: "/contact/request-a-quote",
    relatedLabel: "Get Pricing",
    relatedProducts: [
      { title: "Custom Paint Booths", subtitle: "Custom spray environment to match", href: "/products/paint-booths/custom", image: "/manus-storage/pfs-custom-booth-front-card_7e7d1673.jpg" },
    ],
  },

  // ── Outdoor Paint Booths ─────────────────────────────────────────────────
  "outdoor-booths/standard": {
    seoTitle: "Outdoor Spray Booths | Outdoor Paint Booth Building | PFS",
    seoDescription: "PFS outdoor spray booths are pre-engineered metal building structures with a fully equipped spray booth inside — installed permanently on a concrete pad outdoors. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Standard Outdoor Spray Booths",
    subtitle: "Pre-engineered metal building structures with a fully equipped spray booth inside — installed permanently on a concrete pad outdoors.",
    bgImage: "/manus-storage/pfs-outdoor-hero-8143_9d49ac36.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Outdoor Paint Booths", href: "/products/outdoor-booths" }, { label: "Standard" }],
    body: "PFS standard outdoor spray booths are permanent, building-style structures installed on a concrete pad at your facility. Each system consists of a heavy-duty steel metal building with a fully equipped spray booth inside — LED lighting, exhaust filtration, HVAC, and controls. built with ETL/UL certified components and NFPA 33 compliant.",
    features: ["Permanent outdoor installation", "Heavy-duty steel structure", "Full spray booth interior", "LED lighting", "built with ETL/UL certified components — NFPA 33", "Heated and non-heated options", "Custom dimensions available", "Made in the USA"],
    relatedHref: "/products/outdoor-booths",
    relatedLabel: "View All Outdoor Booths",
    relatedProducts: [
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for outdoor booths", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "outdoor-booths/drive-through": {
    seoTitle: "Drive-Through Outdoor Paint Booths | Pass-Through Outdoor Booth | PFS",
    seoDescription: "PFS drive-through outdoor spray booths feature entry and exit doors on both ends for continuous production flow — trucks, buses, and heavy equipment. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Drive-Through Outdoor Booths",
    subtitle: "Outdoor building-style spray booths with entry and exit doors on both ends for continuous production flow.",
    bgImage: "/manus-storage/pfs-outdoor-hero-8143_9d49ac36.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Outdoor Paint Booths", href: "/products/outdoor-booths" }, { label: "Drive-Through" }],
    body: "PFS drive-through outdoor spray booths are permanent, building-style structures with entry and exit doors on opposite ends — eliminating the need to reverse vehicles and dramatically increasing throughput for high-volume fleet, bus, truck, and large vehicle operations.\n\nEach drive-through outdoor booth is a heavy-duty steel metal building with a fully equipped spray booth inside: LED lighting, exhaust filtration, HVAC, and UL508A controls. The drive-through configuration is the preferred choice for fleet refinishing shops, municipal vehicle maintenance facilities, transit authorities, and any operation where cycle time and vehicle flow are critical.\n\nHeated and non-heated airflow options available. Custom lengths, widths, and heights engineered to your site. ETL/UL certified components, NFPA 33 compliant. Ships nationally. Made in the USA.",
    features: ["Entry and exit doors on both ends", "Permanent outdoor structure", "built with ETL/UL certified components — NFPA 33", "Ideal for fleet and large vehicle ops", "Heated and non-heated options", "Custom lengths and widths", "Made in the USA"],
    relatedHref: "/products/outdoor-booths",
    relatedLabel: "View All Outdoor Booths",
    relatedProducts: [
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
    ],
  },
  "outdoor-booths/large-equipment": {
    seoTitle: "Large Equipment Outdoor Paint Booths | Heavy Equipment Spray Booth | PFS",
    seoDescription: "PFS oversized outdoor spray booths handle trucks, buses, agricultural equipment, and large industrial parts. Custom sizing, drive-through configurations. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Large Equipment Outdoor Booths",
    subtitle: "Oversized outdoor structures for painting heavy equipment, trucks, buses, and large industrial parts.",
    bgImage: "/manus-storage/pfs-outdoor-hero-8143_9d49ac36.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Outdoor Paint Booths", href: "/products/outdoor-booths" }, { label: "Large Equipment" }],
    body: "PFS large equipment outdoor spray booths are oversized permanent structures engineered for painting heavy equipment, agricultural machinery, mining equipment, construction vehicles, buses, and large industrial assemblies that cannot fit in standard spray booth enclosures.\n\nEach system is a custom-engineered steel building with a fully equipped spray booth interior — high-output LED lighting, industrial exhaust filtration, heated or non-heated HVAC, and UL508A controls. Clearance heights from 16 to 40+ feet, widths from 20 to 60+ feet. Drive-through configurations available for tracked and wheeled heavy equipment.\n\nBuilt to NFPA 33 and OSHA standards. ETL/UL certified components. Engineered drawings and permits available. Ships nationally. Made in the USA.",
    features: ["Oversized door openings", "High ceiling clearance", "Heavy-duty steel structure", "built with ETL/UL certified components — NFPA 33", "Heated and non-heated", "Custom dimensions", "Made in the USA"],
    relatedHref: "/products/outdoor-booths",
    relatedLabel: "View All Outdoor Booths",
    relatedProducts: [
      { title: "Large Equipment Ovens", subtitle: "Cure large parts after painting", href: "/products/ovens/large-equipment", image: LARGE_EQUIP_OVEN_RENDER },
      { title: "Blasting Systems", subtitle: "Surface prep before coating", href: "/products/blast-systems", image: BLASTING_RENDER },
    ],
  },
  "outdoor-booths/custom": {
    seoTitle: "Custom Outdoor Paint Booths | Custom Outdoor Spray Booth | PFS",
    seoDescription: "PFS custom outdoor paint booths are engineered to your site plan, local building codes, and process requirements. Any size, any configuration. ETL/UL certified, NFPA 33 compliant. Made in Santa Rosa, CA.",
    title: "Custom Outdoor Paint Booths",
    subtitle: "Engineered to your site plan, local building codes, and process requirements — any size, any configuration.",
    bgImage: "/manus-storage/pfs-outdoor-hero-8143_9d49ac36.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Outdoor Paint Booths", href: "/products/outdoor-booths" }, { label: "Custom" }],
    body: "PFS custom outdoor spray booths are engineered-to-order permanent structures for facilities with unique site constraints, production requirements, or equipment dimensions that standard configurations cannot accommodate.\n\nEvery custom outdoor booth begins with a site survey and engineering consultation. PFS designs the steel building structure, spray booth interior, airflow system, electrical, HVAC, and controls as a fully integrated system. Options include multi-bay configurations, drive-through layouts, elevated platforms, explosion-proof electrical, and custom door configurations.\n\nAll custom outdoor booths include ETL/UL certified components, NFPA 33 compliant airflow design, and UL508A control panels. Engineered drawings, stamped calculations, and permit packages available. Ships nationally. Made in the USA.",
    features: ["Custom site plan engineering", "Local code compliance", "Any size and configuration", "Permitting coordination", "ETL/UL Certified Components", "Full installation support", "Made in the USA"],
    relatedHref: "/contact/request-a-quote",
    relatedLabel: "Get Pricing",
    relatedProducts: [
      { title: "Air Make-Up Units", subtitle: "Air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
    ],
  },

  // ── Shipping Container Paint Booths ───────────────────────────────────────
  "container-booths/20ft": {
    seoTitle: "20-Foot Container Paint Booth | Portable Spray Booth in a Container | PFS",
    seoDescription: "PFS 20-ft ISO container paint booths are compact, portable spray booths ideal for small parts, touch-up, and remote job sites. Fully equipped with lighting, ventilation, and filter media. ETL/UL certified. Made in the USA.",
    title: "20-Foot Container Paint Booth",
    subtitle: "Compact 20-ft ISO container converted to a fully equipped spray booth — ideal for small parts, touch-up, and remote job sites.",
    bgImage: "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Shipping Container Booths", href: "/products/container-booths" }, { label: "20-Foot" }],
    body: "PFS 20-foot container spray booths convert a standard ISO shipping container into a fully self-contained, portable spray booth. The 20ft configuration is the most compact and mobile option — ideal for temporary job sites, remote locations, military forward operating bases, and facilities that need a deployable finishing capability without permanent construction.\n\nEach 20ft container booth includes LED lighting, exhaust filtration, HVAC, and UL508A controls pre-installed inside the container. The unit ships complete and ready to operate — connect power and compressed air, open the doors, and spray. No concrete pit required. Relocatable by forklift or crane.\n\nETL/UL certified components, NFPA 33 compliant. Available heated and non-heated. Made in the USA.",
    features: ["Standard 20-ft ISO container", "Full spray booth interior", "LED lighting", "built with ETL/UL certified components — NFPA 33", "Explosion-proof electrical", "Deployable by forklift", "Minimal site prep", "Made in the USA"],
    relatedHref: "/products/container-booths",
    relatedLabel: "View All Container Booths",
    relatedProducts: [
      { title: "Containerized Blast Booths", subtitle: "Portable blast prep in a container", href: "/products/blast-systems/containerized-blast-booths", image: BLASTING_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "container-booths/40ft": {
    seoTitle: "40-Foot Container Paint Booth | Portable Vehicle Spray Booth | PFS",
    seoDescription: "PFS 40-ft container paint booths provide a full-size portable spray environment for vehicles, large parts, and production-level finishing operations. Deployable by flatbed or crane. ETL/UL certified. Made in the USA.",
    title: "40-Foot Container Paint Booth",
    subtitle: "Full-size 40-ft container booth for vehicles, large parts, and production-level finishing operations.",
    bgImage: "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Shipping Container Booths", href: "/products/container-booths" }, { label: "40-Foot" }],
    body: "PFS 40-foot container spray booths provide a full-size, portable spray booth in a standard ISO shipping container footprint. The 40ft configuration offers a working interior length of approximately 36 feet — large enough for full-size vehicles, trucks, large assemblies, and industrial components.\n\nEach 40ft container booth ships as a complete, self-contained system with LED lighting, exhaust filtration, HVAC, and UL508A controls pre-installed. No site construction required. Deployable to remote locations, job sites, military installations, and industrial facilities worldwide. Relocatable by crane or heavy equipment.\n\nHeated and non-heated options available. ETL/UL certified components, NFPA 33 compliant. Ships nationally and internationally. Made in the USA.",
    features: ["Standard 40-ft ISO container", "Full-size vehicle capacity", "LED lighting throughout", "built with ETL/UL certified components — NFPA 33", "Heated or non-heated", "Explosion-proof electrical", "Deployable by crane", "Made in the USA"],
    relatedHref: "/products/container-booths",
    relatedLabel: "View All Container Booths",
    relatedProducts: [
      { title: "Containerized Blast Booths", subtitle: "Portable blast prep in a container", href: "/products/blast-systems/containerized-blast-booths", image: BLASTING_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
    ],
  },
  "container-booths/high-cube": {
    seoTitle: "High-Cube Container Paint Booth | Tall Container Spray Booth | PFS",
    seoDescription: "PFS high-cube container paint booths provide 9.5-ft interior height for Sprinter vans, tall vehicles, and oversized equipment. Portable, deployable, fully equipped. ETL/UL certified. Made in the USA.",
    title: "High-Cube Container Paint Booth",
    subtitle: "9.5-ft interior height for tall vehicles, Sprinter vans, and oversized equipment.",
    bgImage: "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Shipping Container Booths", href: "/products/container-booths" }, { label: "High-Cube" }],
    body: "PFS high-cube container spray booths use a 9.5-foot-tall ISO high-cube container to provide additional interior clearance for taller vehicles, equipment, and assemblies. The extra headroom makes the high-cube configuration the preferred choice for SUVs, light trucks, vans, agricultural equipment, and industrial components that require overhead spray access.\n\nAll PFS high-cube container booths ship as complete, self-contained units with LED lighting, exhaust filtration, HVAC, and UL508A controls pre-installed. Deployable worldwide. No site construction required. Relocatable by crane.\n\nHeated and non-heated options available. ETL/UL certified components, NFPA 33 compliant. Made in the USA.",
    features: ["9.5-ft interior height", "High-cube ISO container", "Fits Sprinter vans and tall vehicles", "LED lighting", "built with ETL/UL certified components — NFPA 33", "Explosion-proof electrical", "Made in the USA"],
    relatedHref: "/products/container-booths",
    relatedLabel: "View All Container Booths",
    relatedProducts: [
      { title: "Sprinter Van Booths", subtitle: "High-clearance enclosed booth option", href: "/products/paint-booths/enclosed/sprinter-van", image: ENCLOSED_BOOTH_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "container-booths/custom": {
    seoTitle: "Custom Container Paint Booths | Multi-Container Spray Booth | PFS",
    seoDescription: "PFS custom container paint booths include multi-container configurations, custom dimensions, and specialized interior layouts. Engineered for unique applications and remote deployments. ETL/UL certified. Made in Santa Rosa, CA.",
    title: "Custom Container Paint Booths",
    subtitle: "Multi-container configurations, custom dimensions, and specialized interior layouts for unique applications.",
    bgImage: "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Shipping Container Booths", href: "/products/container-booths" }, { label: "Custom" }],
    body: "PFS custom container booths can combine multiple containers, use non-standard dimensions, or incorporate specialized interior layouts for unique applications. Multi-container configurations can create larger spray environments while maintaining the mobility and deployability of container-based systems.",
    features: ["Multi-container configurations", "Custom interior layouts", "Any size application", "ETL/UL Certified Components", "Full engineering support", "International shipping compatible", "Made in the USA"],
    relatedHref: "/contact/request-a-quote",
    relatedLabel: "Get Pricing",
    relatedProducts: [
      { title: "Containerized Blast Booths", subtitle: "Portable blast prep in a container", href: "/products/blast-systems/containerized-blast-booths", image: BLASTING_RENDER },
    ],
  },

  // ── Enclosed Booth Configurations ─────────────────────────────────────────
  "paint-booths/enclosed/cross-flow": {
    seoTitle: "Cross-Flow Spray Booths | Cross Draft Paint Booth | PFS Orion",
    seoDescription: "PFS Orion cross-flow spray booths deliver horizontal airflow from front intake to rear exhaust — the most cost-effective enclosed booth for automotive and general industrial finishing. ETL/UL certified, NFPA 33 compliant. Made in Santa Rosa, CA.",
    title: "Cross-Flow Spray Booths",
    subtitle: "Horizontal airflow from front intake to rear exhaust — the most cost-effective enclosed booth configuration for automotive and general industrial finishing.",
    bgImage: "/manus-storage/pfs-orion-card-white_9020af3e.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Enclosed", href: "/products/paint-booths/enclosed" }, { label: "Cross-Flow" }],
    body: "PFS cross-flow spray booths move air horizontally from intake filters on the front wall to exhaust filters on the rear wall. This is the most economical enclosed booth configuration — simple to install, easy to maintain, and effective for automotive refinishing, light industrial, and general-purpose spray applications.",
    features: ["Horizontal airflow", "Front intake / rear exhaust", "Most economical configuration", "built with ETL/UL certified components — NFPA 33", "Easy maintenance", "Heated and non-heated options", "Custom sizing available", "Made in the USA"],
    relatedHref: "/products/paint-booths/enclosed",
    relatedLabel: "View All Enclosed Booth Configurations",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "paint-booths/enclosed/semi-downdraft": {
    seoTitle: "Semi-Downdraft Spray Booths | Semi Downdraft Paint Booth | PFS",
    seoDescription: "PFS semi-downdraft spray booths draw air from the ceiling at the front half and exhaust at the rear floor — better finish quality than cross-flow at a lower cost than full downdraft. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Semi-Downdraft Spray Booths",
    subtitle: "Ceiling intake at the front half, rear floor-level exhaust — better finish quality than cross-flow at a lower cost than full downdraft.",
    bgImage: "/manus-storage/orion-semi-down-epoxy_9144ba19.png",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Enclosed", href: "/products/paint-booths/enclosed" }, { label: "Semi-Downdraft" }],
    body: "PFS semi-downdraft spray booths deliver downdraft-style airflow without requiring a below-grade concrete pit. Air enters through ceiling intake plenums and exhausts through rear lower wall exhaust chambers — creating a diagonal airflow pattern that carries overspray away from the painter and the work surface.\n\nThe semi-downdraft configuration is the most popular choice for shops that want the finish quality of a downdraft system without the cost and disruption of excavating a concrete pit. No pit required means faster installation, lower site prep costs, and the ability to install in existing buildings with slab-on-grade floors.\n\nAvailable in heated and non-heated configurations. UL508A controls, ETL listed in Canada and USA. UL listed tube axial fans, certified lighting, CID2 inside 4-tube light fixtures. Exhaust fiberglass filters, tacky intake filters. Galvanized or powder-coated steel construction. Built to NFPA 33 and OSHA air quality standards. Ships nationally. Made in the USA.",
    features: ["Ceiling intake at front half", "Rear floor-level exhaust", "Better finish quality than cross-flow", "No full raised floor required", "built with ETL/UL certified components — NFPA 33", "Heated and non-heated options", "Custom sizing available", "Made in the USA"],
    relatedHref: "/products/paint-booths/enclosed",
    relatedLabel: "View All Enclosed Booth Configurations",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "paint-booths/enclosed/full-downdraft": {
    seoTitle: "Full Downdraft Spray Booths | Downdraft Paint Booth | PFS Helios",
    seoDescription: "PFS Helios full downdraft spray booths deliver vertical airflow from a full ceiling plenum through a raised grated floor — the cleanest airflow pattern for premium automotive, aerospace, and industrial finishing. ETL/UL certified, NFPA 33 compliant. Made in Santa Rosa, CA.",
    title: "Full Downdraft Spray Booths",
    subtitle: "Air flows vertically downward from a full ceiling plenum through a full raised grated floor — the cleanest airflow pattern available.",
    bgImage: "/manus-storage/pfs_zenith_booth_v2_d56f2cd8_d3f181cd.png",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Enclosed", href: "/products/paint-booths/enclosed" }, { label: "Full Downdraft" }],
    body: "PFS full downdraft spray booths provide the highest quality airflow pattern available — air enters through a full ceiling plenum and exhausts through a full raised grated floor. This vertical airflow carries overspray directly away from the part surface and operator, delivering the cleanest finish environment possible. Preferred for premium automotive, aerospace, and high-end industrial finishing.",
    features: ["Full ceiling plenum intake", "Full raised grated floor exhaust", "Cleanest airflow pattern", "built with ETL/UL certified components — NFPA 33", "Preferred for premium finishes", "Heated and non-heated options", "Custom sizing available", "Made in the USA"],
    relatedHref: "/products/paint-booths/enclosed",
    relatedLabel: "View All Enclosed Booth Configurations",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Inspection Booths", subtitle: "Post-paint quality inspection", href: "/products/paint-booths/inspection", image: INSPECTION_RENDER },
    ],
  },
  "paint-booths/enclosed/side-downdraft": {
    seoTitle: "Side Downdraft Spray Booths | Side Draft Paint Booth | PFS",
    seoDescription: "PFS side downdraft spray booths draw air from the ceiling and exhaust through side wall filter banks at floor level — ideal when a pit or raised floor is not feasible. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Side Downdraft Spray Booths",
    subtitle: "Air enters from the ceiling and exhausts through side wall filter banks at floor level — ideal when a pit or raised floor is not feasible.",
    bgImage: "/manus-storage/pfs_helios_side_angle_final_73768c1f_5eaf3967.png",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Enclosed", href: "/products/paint-booths/enclosed" }, { label: "Side Downdraft" }],
    body: "PFS side downdraft spray booths draw air in from the ceiling and exhaust through filter banks on the side walls at floor level. This configuration provides excellent overspray control without requiring a pit or raised floor — making it ideal for retrofit installations or facilities where floor modifications are not practical.",
    features: ["Ceiling intake", "Side wall floor-level exhaust", "No pit or raised floor required", "Ideal for retrofit installations", "built with ETL/UL certified components — NFPA 33", "Heated and non-heated options", "Custom sizing available", "Made in the USA"],
    relatedHref: "/products/paint-booths/enclosed",
    relatedLabel: "View All Enclosed Booth Configurations",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
    ],
  },
  "paint-booths/enclosed/heated": {
    seoTitle: "Heated Paint Booths | Heated Spray Booth | Bake Booth | PFS",
    seoDescription: "PFS heated paint booths combine spray, flash, and bake cycles in a single enclosure — accelerating cure times and improving finish quality. Natural gas, propane, or electric heat. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Heated Paint Booths",
    subtitle: "Any airflow configuration with an integrated heating system for accelerated cure cycles and improved finish quality.",
    bgImage: "/manus-storage/pfs_zenith_booth_v2_d56f2cd8_d3f181cd.png",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Enclosed", href: "/products/paint-booths/enclosed" }, { label: "Heated" }],
    body: "PFS heated spray booths integrate a direct-fired or indirect-fired air make-up unit into the spray booth system, conditioning incoming air to the precise temperature required for optimal paint atomization, solvent flash-off, and accelerated cure cycles.\n\nHeated airflow is essential for waterborne basecoat application, high-solids coatings, and any production environment where ambient temperature drops below 65°F. PFS heated booths are available with natural gas, propane, or electric heat sources. Bake cycle capability up to 160°F for accelerated curing of OEM and refinish coatings.\n\nUL508A controls, ETL listed in Canada and USA. UL listed tube axial fans, certified lighting, CID2 inside 4-tube light fixtures. Blanket intake upgrades available for heated booths. Exhaust fiberglass filters, tacky intake filters. Built to NFPA 33 and OSHA standards. Ships nationally. Made in the USA.",
    features: ["Integrated heating system", "Spray, flash, and bake modes", "Programmable temperature control", "Reduces cure cycle time", "built with ETL/UL certified components — NFPA 33", "Available in all airflow configurations", "Custom sizing available", "Made in the USA"],
    relatedHref: "/products/paint-booths/enclosed",
    relatedLabel: "View All Enclosed Booth Configurations",
    relatedProducts: [
      { title: "Heated Air Make-Up Units", subtitle: "Conditioned air supply for your heated booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
    ],
  },
  "paint-booths/enclosed/non-heated": {
    seoTitle: "Non-Heated Paint Booths | Ambient Spray Booth | PFS",
    seoDescription: "PFS non-heated enclosed paint booths provide a clean spray environment at ambient temperature — lower initial cost and simpler operation for applications where heat curing is not required. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Non-Heated Paint Booths",
    subtitle: "Ambient-temperature enclosed booths for applications where heat curing is not required — lower initial cost and simpler operation.",
    bgImage: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Enclosed", href: "/products/paint-booths/enclosed" }, { label: "Non-Heated" }],
    body: "PFS non-heated enclosed spray booths provide a clean, controlled spray environment with ambient-temperature airflow — the right choice for facilities in warm climates, shops using solvent-borne coatings that flash quickly at ambient temperature, and operations where a separate air make-up unit will be added later.\n\nNon-heated booths deliver the same NFPA 33 compliant airflow, ETL/UL certified components, and professional finish quality as PFS heated systems — without the added cost of a heat source. Upgradeable to heated operation at any time by adding a PFS Apollo AMU.\n\nUL508A controls, ETL listed in Canada and USA. UL listed tube axial fans, certified lighting, CID2 inside 4-tube light fixtures. Exhaust fiberglass filters, tacky intake filters. Galvanized or powder-coated steel construction. Ships nationally. Made in the USA.",
    features: ["No integrated heating system", "Lower initial cost", "Simpler operation", "Pair with a separate curing oven", "built with ETL/UL certified components — NFPA 33", "Available in all airflow configurations", "Custom sizing available", "Made in the USA"],
    relatedHref: "/products/paint-booths/enclosed",
    relatedLabel: "View All Enclosed Booth Configurations",
    relatedProducts: [
      { title: "Batch Ovens", subtitle: "Separate curing oven for your process", href: "/products/ovens/batch", image: BATCH_OVEN_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/non-heated", image: AMU_RENDER },
    ],
  },
  "paint-booths/enclosed/sprinter-van": {
    seoTitle: "Sprinter Van Paint Booths | High-Clearance Spray Booth | PFS",
    seoDescription: "PFS Sprinter van and high-clearance spray booths provide 11–12 ft interior height for Sprinter vans, high-roof cargo vans, and tall commercial vehicles. ETL/UL certified, NFPA 33 compliant. Made in the USA.",
    title: "Sprinter Van & High-Clearance Booths",
    subtitle: "Enclosed spray booths with 11–12 ft interior height — specifically designed for Sprinter vans, high-roof cargo vans, and tall commercial vehicles.",
    bgImage: "/manus-storage/pfs-sprinter-van-ford-clean_9a7301c8.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Paint Booths", href: "/products/paint-booths" }, { label: "Enclosed", href: "/products/paint-booths/enclosed" }, { label: "Sprinter Van / High-Clearance" }],
    body: "PFS Sprinter van and high-clearance spray booths are enclosed booths with 11–12 ft interior height — built specifically for Mercedes Sprinter vans, Ford Transit high-roof, Ram ProMaster, and other tall commercial vehicles. Full-length LED wall lighting ensures complete coverage from roof to rocker panel. Downdraft airflow carries overspray away from the vehicle surface for a clean, consistent finish.",
    features: ["11–12 ft interior height", "Full-length LED wall lighting", "Downdraft airflow for complete coverage", "Fits all Sprinter and high-roof van models", "built with ETL/UL certified components — NFPA 33", "Heated and non-heated options", "Drive-through configuration available", "Made in the USA"],
    relatedHref: "/products/paint-booths/enclosed",
    relatedLabel: "View All Enclosed Booth Configurations",
    relatedProducts: [
      { title: "Prep Stations", subtitle: "Surface prep before painting", href: "/products/prep/paint-prep-stations", image: PREP_STATION_RENDER },
      { title: "Air Make-Up Units", subtitle: "Fresh air supply for your booth", href: "/products/air-make-up-units/heated", image: AMU_RENDER },
    ],
  },

  // ── Parts & Filters ───────────────────────────────────────────────────────
  "parts-filters/oem-parts": {
    seoTitle: "OEM Spray Booth Parts | PFS Replacement Parts | PFS",
    seoDescription: "Genuine OEM replacement parts for PFS spray booths, ovens, and finishing equipment. Motors, fans, filters, controls, and hardware — factory-direct. Ships nationally.",
    title: "OEM Parts",
    subtitle: "Genuine OEM replacement parts for PFS spray booths, ovens, and finishing equipment.",
    bgImage: "/manus-storage/pfs-render-oem-parts_f8e6f503.jpg",
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: "Parts & Filters", href: "/products/parts-filters" }, { label: "OEM Parts" }],
    body: "Keep your PFS equipment running at peak performance with genuine OEM replacement parts. Our parts team can identify and source the correct components for any PFS booth, oven, or finishing system.",
    features: ["Genuine OEM components", "Fast parts identification", "In-stock and custom-order", "Compatible with all PFS systems", "Technical support available", "Ships nationwide"],
    ctaPricingHref: "/parts",
    relatedHref: "/service/oem-parts",
    relatedLabel: "View Service & Parts",
    relatedProducts: [
      { title: "Filters & Consumables", subtitle: "OEM replacement filter media", href: "/products/parts-filters/filters-consumables", image: FILTERS_IMG },
      { title: "Preventive Maintenance", subtitle: "Keep your equipment running", href: "/service/preventive-maintenance", image: AMU_RENDER },
    ],
  },
};

// Fallback for unknown sub-pages — redirect straight to lead capture form
function FallbackPage({ category: _c, sub: _s }: { category: string; sub: string }) {
  React.useEffect(() => {
    // Use replaceState so the redirect doesn't pollute browser history
    window.history.replaceState(null, "", "/contact/request-a-quote");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);
  return null;
}

// Import PageHero
import PageHero from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";

function ProductSubPageSEO({ data, pageKey }: { data: PageData; pageKey: string }) {
  useSEO({
    title: data.seoTitle || `${data.title} | PFS Industrial Finishing`,
    description: data.seoDescription || `${data.subtitle} ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA. Ships nationally.`,
    canonical: `/products/${pageKey}`,
  });
  return null;
}

export default function ProductSubPage() {
  const params = useParams<{ category: string; sub: string }>();
  const [location] = useLocation();
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  let key = `${params.category}/${params.sub}`;
  if (!PAGE_DATA[key]) {
    const pathParts = location.split("/").filter(Boolean);
    if (pathParts.length >= 3 && pathParts[0] === "products") {
      key = `${pathParts.slice(1, -1).join("/")}/${pathParts[pathParts.length - 1]}`;
    }
  }
  const data = PAGE_DATA[key];

  if (!data) return <FallbackPage category={params.category || ""} sub={params.sub || ""} />;

  return (
    <div>
      <ProductSubPageSEO data={data} pageKey={key} />
      <PageHero
        title={data.title}
        subtitle={data.subtitle}
        breadcrumbs={data.breadcrumbs}
        bgImage={data.bgImage}
        bgVideo={data.bgVideo}
        bgImagePosition={data.bgImagePosition}
        ctaPricingHref={data.ctaPricingHref || "/contact/request-a-quote"}
      />

      {/* Featured Booth — shown directly below hero when featuredBooth is provided */}
      {data.featuredBooth && (
        <section style={{ padding: "4rem 0", backgroundColor: "#0d0d0d" }}>
          <div className="container">
            <span style={{ display: "block", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>
              {data.featuredBooth.label}
            </span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", textTransform: "uppercase", color: "#fff", marginBottom: "2.5rem", letterSpacing: "0.02em" }}>
              {data.featuredBooth.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }} className="grid-cols-1 sm:grid-cols-2">
              <div style={{ overflow: "hidden", lineHeight: 0 }}>
                <img
                  src={data.featuredBooth.exteriorImage}
                  alt={`${data.featuredBooth.title} — exterior`}
                  style={{ width: "100%", height: "420px", objectFit: "cover", display: "block", imageRendering: "crisp-edges" }}
                />
              </div>
              <div style={{ overflow: "hidden", lineHeight: 0 }}>
                <img
                  src={data.featuredBooth.interiorImage}
                  alt={`${data.featuredBooth.title} — interior with blue filter modules`}
                  style={{ width: "100%", height: "420px", objectFit: "cover", display: "block", imageRendering: "crisp-edges" }}
                />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0 }}>
                {data.featuredBooth.description}
              </p>
              {data.featuredBooth.specs && data.featuredBooth.specs.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                  {data.featuredBooth.specs.map((spec, i) => (
                    <div key={spec.label} style={{ padding: "0.85rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                      <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>{spec.label}</div>
                      <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.88rem", color: "#fff", fontWeight: 500 }}>{spec.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: "3rem 0", backgroundColor: "#fff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <span className="section-label">{data.breadcrumbs[1]?.label || "Products"}</span>
              {data.seriesBadge && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(27,43,75,0.08)", border: "1px solid rgba(27,43,75,0.2)", color: "#1B2B4B", borderRadius: "2px", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.28rem 0.75rem", marginBottom: "0.75rem" }}>
                  {data.seriesBadge}
                </span>
              )}
              <h2 className="section-heading">{data.title}</h2>
              <p className="section-body" style={{ marginBottom: "2rem" }}>{data.body}</p>

              {(() => {
                const SHOW_COUNT = 6;
                const hasMore = data.features.length > SHOW_COUNT;
                const visibleFeatures = hasMore && !featuresExpanded
                  ? data.features.slice(0, SHOW_COUNT)
                  : data.features;
                return (
                  <div className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {visibleFeatures.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} style={{ color: "#1B2B4B", flexShrink: 0, marginTop: "2px" }} />
                          <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#444", lineHeight: 1.5 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    {hasMore && (
                      <button
                        onClick={() => setFeaturesExpanded(!featuresExpanded)}
                        style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1B2B4B", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        {featuresExpanded ? "Show Less" : `Show All ${data.features.length} Features`}
                        <ArrowRight size={12} style={{ transform: featuresExpanded ? "rotate(270deg)" : "rotate(90deg)", transition: "transform 0.2s" }} />
                      </button>
                    )}
                  </div>
                );
              })()}

              <div className="flex flex-wrap gap-3">
                <Link href="/contact/request-a-quote">
                  <span className="btn-glow">Request a Quote <ArrowRight size={14} /></span>
                </Link>
                <a href="tel:8885457715">
                  <span className="btn-outline">Call (888) 545-7715</span>
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Featured product image — shown when featuredImage is provided */}
              {data.featuredImage && (
                <div style={{ marginBottom: "1.5rem", overflow: "hidden", border: "1px solid #e8e8e6" }}>
                  <img
                    src={data.featuredImage}
                    alt={`${data.title} — featured product`}
                    style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 280 }}
                  />
                </div>
              )}
              <div style={{ backgroundColor: "#f8f8f6", border: "1px solid #e8e8e6", padding: "1.5rem" }}>
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a1a1a", marginBottom: "1rem" }}>
                  Quick Links
                </h4>
                {[
                  { label: data.relatedLabel, href: data.relatedHref },
                  { label: "Get Pricing", href: "/contact/request-a-quote" },
                  { label: "Service & Support", href: "/service" },
                  { label: "View All Products", href: "/products" },
                ].map((link) => (
                  <Link key={link.label} href={link.href}>
                    <div className="flex items-center justify-between py-2.5 group" style={{ borderBottom: "1px solid #ebebeb", cursor: "pointer" }}>
                      <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#444", transition: "color 0.15s" }} className="group-hover:text-[#1B2B4B]">
                        {link.label}
                      </span>
                      <ArrowRight size={12} style={{ color: "#1B2B4B" }} />
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: "1.5rem", backgroundColor: "#1a1a1a", padding: "1.5rem" }}>
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>
                  Need Help Specifying?
                </h4>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  Our engineers are available to help you select the right configuration for your application.
                </p>
                <Link href="/contact/request-a-quote">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffffff", borderBottom: "2px solid rgba(255,255,255,0.4)", paddingBottom: "2px", cursor: "pointer" }}>
                    GET PRICING <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-Page Action Video — shown when sectionVideo is provided, placed right after CTAs */}
      {data.sectionVideo && (
        <section style={{ padding: "2rem 0", backgroundColor: "#111" }}>
          <div className="container">
            <span className="section-label" style={{ color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.75rem" }}>BOOTH IN ACTION</span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem,3vw,2rem)", textTransform: "uppercase", color: "#fff", marginBottom: "1.5rem", letterSpacing: "0.02em" }}>See It Running</h2>
            <div style={{ position: "relative", width: "100%", maxWidth: 960, margin: "0 auto", background: "#000", lineHeight: 0 }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", display: "block", maxHeight: 540, objectFit: "cover" }}
              >
                <source src={data.sectionVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery — install pics, shown before related products */}
      {data.galleryImages && data.galleryImages.length > 0 && (
        <section style={{ padding: "2rem 0", backgroundColor: "#1a1a1a" }}>
          <div className="container">
            <span className="section-label" style={{ color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.75rem" }}>REAL INSTALLS</span>
            <GalleryGrid
              images={data.galleryImages.map((src, i) => ({ src, alt: `${data.title} install ${i + 1}` }))}
            />
          </div>
        </section>
      )}

      {/* Related Products */}
      <SiteProductCardSection
        cards={(data.relatedProducts || []).map((rp) => ({
          label: rp.title,
          href: rp.href,
          img: rp.image,
          desc: rp.subtitle,
        }))}
      />
    </div>
  );
}
