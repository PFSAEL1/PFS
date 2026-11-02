#!/usr/bin/env node
// Builds shared/boothFilterGuides.mjs from shared/booth_models.csv.
// Public copy uses only rows that are not flagged for owner verification.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const csvPath = path.join(root, 'shared', 'booth_models.csv');
const outPath = path.join(root, 'shared', 'boothFilterGuides.mjs');

const BRANDS = {
  'Accudraft (Saima Accudraft)': { slug: 'accudraft', name: 'Accudraft' },
  Saima: { slug: 'saima', name: 'Saima' },
  'Garmat USA': { slug: 'garmat-usa', name: 'Garmat USA' },
  'GFS (Global Finishing Solutions)': { slug: 'global-finishing-solutions', name: 'Global Finishing Solutions (GFS)' },
  Blowtherm: { slug: 'blowtherm', name: 'Blowtherm' },
  BITA: { slug: 'bita', name: 'Bita' },
  'USI Italia': { slug: 'usi-italia', name: 'USI Italia' },
  'Nova Verta': { slug: 'nova-verta', name: 'Nova Verta' },
  Binks: { slug: 'binks', name: 'Binks' },
  DeVilbiss: { slug: 'devilbiss', name: 'DeVilbiss' },
  Eagle: { slug: 'eagle', name: 'Eagle' },
  Spraybake: { slug: 'spraybake', name: 'Spraybake' },
  AEN: { slug: 'aen', name: 'AEN' },
  'Aero-Cure': { slug: 'aero-cure', name: 'Aero-Cure' },
  Americure: { slug: 'americure', name: 'Americure' },
  Brewco: { slug: 'brewco', name: 'Brewco' },
  Diamond: { slug: 'diamond', name: 'Diamond' },
  Europea: { slug: 'europea', name: 'Europea' },
  Furnocolor: { slug: 'furnocolor', name: 'Furnocolor' },
  'Future Cure': { slug: 'future-cure', name: 'Future Cure' },
  'J-Mar': { slug: 'j-mar', name: 'J-Mar' },
  'Jong Air': { slug: 'jong-air', name: 'Jong Air' },
  KWB: { slug: 'kwb', name: 'KWB' },
  Lutro: { slug: 'lutro', name: 'Lutro' },
  Marini: { slug: 'marini', name: 'Marini' },
  Noram: { slug: 'noram', name: 'Noram' },
  Omia: { slug: 'omia', name: 'Omia' },
  Optima: { slug: 'optima', name: 'Optima' },
  Pivab: { slug: 'pivab', name: 'Pivab' },
  Polin: { slug: 'polin', name: 'Polin' },
  'Polar Air': { slug: 'polar-air', name: 'Polar Air' },
  Protectaire: { slug: 'protectaire', name: 'Protectaire' },
  'Spray Booth America': { slug: 'spray-booth-america', name: 'Spray Booth America' },
  'Spray King': { slug: 'spray-king', name: 'Spray King' },
  Technocure: { slug: 'technocure', name: 'Technocure' },
  'Thermal Draft': { slug: 'thermal-draft', name: 'Thermal Draft' },
  Unicure: { slug: 'unicure', name: 'Unicure' },
  'Wellbuilt (Welbilt)': { slug: 'wellbuilt', name: 'Wellbuilt' },
  Zhongda: { slug: 'zhongda', name: 'Zhongda' },
  'Col-Met': { slug: 'col-met', name: 'Col-Met' },
  'Spray-Tech': { slug: 'spray-tech', name: 'Spray-Tech' },
  'PFS Spray Booths': { slug: 'pfs-spray-booths', name: 'PFS Spray Booths' },
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') inQuotes = true;
    else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') field += char;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [header, ...body] = rows;
  return body
    .filter((cells) => cells.some((cell) => cell.trim()))
    .map((cells) => Object.fromEntries(header.map((key, index) => [key, (cells[index] || '').trim()])));
}

function skipReason(row) {
  const brand = row.brand || '';
  const status = row.status || '';
  if (/\(not on site\)/i.test(brand)) return 'not-on-site';
  if (/unconfirmed|maker unknown|unknown\)/i.test(brand)) return 'unknown-maker';
  if (/needs owner/i.test(status)) return 'owner-check';
  if (/confirm it covers/i.test(status)) return 'unconfirmed-coverage';
  if (/\(no public model/i.test(row.model || '')) return 'no-data';
  if (!row.model || !row.filter_type || !row.size_in) return 'incomplete';
  return '';
}

function positionLabel(position) {
  const labels = {
    ceiling: 'Ceiling',
    exhaust: 'Exhaust',
    'prefilter/intake': 'Intake / prefilter',
    'prefilter/intake/exhaust': 'Intake, prefilter, or exhaust',
    'ceiling/intake': 'Ceiling / intake',
    'ceiling/exhaust': 'Ceiling / exhaust',
  };
  return labels[position] || position;
}

function listJoin(items) {
  const unique = [...new Set(items.filter(Boolean))];
  if (unique.length <= 1) return unique[0] || '';
  if (unique.length === 2) return `${unique[0]} and ${unique[1]}`;
  return `${unique.slice(0, -1).join(', ')}, and ${unique[unique.length - 1]}`;
}

function qtyPhrase(qty) {
  if (!qty || /^see size$/i.test(qty)) return '';
  return ` (${qty})`;
}

function hash(value) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function groupRows(rows) {
  const groups = [];
  for (const row of rows) {
    const existing = groups.find((group) => group.model === row.model);
    if (existing) existing.rows.push(row);
    else groups.push({ model: row.model, rows: [row] });
  }
  return groups;
}

function articleFor(label) {
  return /^[aeiou]/i.test(label) ? 'an' : 'a';
}

function stagePhrase(row) {
  const position = positionLabel(row.position).toLowerCase();
  return `${articleFor(position)} ${position} stage using ${row.filterType} at ${row.size}${qtyPhrase(row.qty)}`;
}

function labeledModel(name, model) {
  return model.toLowerCase().includes(name.toLowerCase()) ? model : `${name} ${model}`;
}

function buildIntro(name, rows) {
  const groups = groupRows(rows);
  const variant = hash(name) % 4;
  const modelNames = groups.map((group) => group.model);
  const openings = [
    `${name} filter records on this page cover ${groups.length === 1 ? 'one model' : `${groups.length} models`}: ${listJoin(modelNames)}.`,
    `The ${name} models with filter sizes in this guide are ${listJoin(modelNames)}.`,
    `Use the ${name} table when the booth tag matches ${listJoin(modelNames)}.`,
    `${name} stages below are grouped under ${listJoin(modelNames)}.`,
  ];
  const modelSentences = groups.map((group) => {
    const stages = group.rows.map((row) => stagePhrase(row));
    return `${group.model} has ${listJoin(stages)}.`;
  });
  const sizes = listJoin(rows.map((row) => row.size));
  const positions = listJoin([...new Set(rows.map((row) => positionLabel(row.position).toLowerCase()))]);
  const summary = `The stages in the table are ${positions}. Recorded sizes are ${sizes}.`;
  const closings = [
    'Match the name on the booth to one model, then measure the filter you are removing before you order.',
    'Stay on the row that matches the tag in the booth, then measure the opening.',
    'Order for the stage you are changing. A ceiling size from this table is an exhaust size only when that row says exhaust.',
    'The table is the model record. The opening on the booth is the size to order.',
  ];
  return [openings[variant], ...modelSentences, summary, closings[variant]].join(' ');
}

function buildFaqs(name, rows) {
  const groups = groupRows(rows);
  const variant = hash(name) % 4;
  const faqs = [];
  const first = groups[0];
  const firstLabel = labeledModel(name, first.model);
  const sizeQuestions = [
    `What filter sizes are listed for the ${firstLabel}?`,
    `Which sizes are recorded for the ${firstLabel}?`,
    `How is the ${firstLabel} filter set sized in the table?`,
    `What opening sizes are written down for the ${firstLabel}?`,
  ];
  faqs.push({
    question: sizeQuestions[variant],
    answer: `${first.model} is listed with ${listJoin(first.rows.map((row) => stagePhrase(row)))}. Pick the row for the stage you are changing, then measure that opening.`,
  });

  const second = groups[1] || groups[0];
  const focus = second.rows[second.rows.length - 1];
  const focusLabel = labeledModel(name, focus.model);
  const mediaQuestions = [
    `What media type is listed for the ${focusLabel} ${positionLabel(focus.position).toLowerCase()} stage?`,
    `Which filter type is recorded at ${focus.size} on the ${focusLabel}?`,
    `The ${focusLabel} ${positionLabel(focus.position).toLowerCase()} listing uses which media?`,
    `What kind of filter is written beside ${focus.size} for the ${focusLabel}?`,
  ];
  faqs.push({
    question: mediaQuestions[variant],
    answer: `The ${focus.model} line at ${focus.size} is ${focus.filterType} on the ${positionLabel(focus.position).toLowerCase()} position${qtyPhrase(focus.qty)}. Keep that media name with that size.`,
  });

  const withQty = rows.find((row) => row.qty && !/^see size$/i.test(row.qty)) || rows[0];
  const qtyLabel = labeledModel(name, withQty.model);
  const qtyQuestions = [
    `What quantity is listed for the ${qtyLabel} ${withQty.size} filter?`,
    `How many ${withQty.filterType} pieces does the ${qtyLabel} row list?`,
    `The ${qtyLabel} entry at ${withQty.size} shows what quantity?`,
    `What count is written beside the ${qtyLabel} ${positionLabel(withQty.position).toLowerCase()} filter?`,
  ];
  const qtyAnswer = withQty.qty && !/^see size$/i.test(withQty.qty)
    ? `${withQty.model} lists ${withQty.qty} for ${withQty.filterType} at ${withQty.size}. That figure is the recorded change or case quantity on this row. Count the openings on the booth before ordering.`
    : `${withQty.model} lists ${withQty.filterType} at ${withQty.size}. Any count in that size note is part of the size record, not a separate case quantity. Count the openings on the booth before ordering.`;
  faqs.push({
    question: qtyQuestions[variant],
    answer: qtyAnswer,
  });

  if (groups.length > 1) {
    const last = groups[groups.length - 1];
    const compareQuestions = [
      `How do the ${firstLabel} and ${labeledModel(name, last.model)} listings differ?`,
      `What separates the ${firstLabel} rows from the ${labeledModel(name, last.model)} rows?`,
      `Can the ${firstLabel} sizes be used for the ${labeledModel(name, last.model)}?`,
      `Which sizes belong to the ${labeledModel(name, last.model)} instead of the ${firstLabel}?`,
    ];
    faqs.push({
      question: compareQuestions[variant],
      answer: `${first.model} is recorded at ${listJoin(first.rows.map((row) => `${row.size} (${positionLabel(row.position).toLowerCase()})`))}. ${last.model} is recorded at ${listJoin(last.rows.map((row) => `${row.size} (${row.filterType})`))}. Those are separate rows. Do not move a size from one model onto the other without measuring the booth.`,
    });
  } else if (rows[0].reference) {
    faqs.push({
      question: `Which reference number is listed with the ${labeledModel(name, rows[0].model)}?`,
      answer: `The ${rows[0].model} row lists reference ${rows[0].reference} next to ${rows[0].filterType} at ${rows[0].size}. Treat that number as a cross-check with the label on the installed filter, and still measure the opening.`,
    });
  } else {
    const only = rows[0];
    faqs.push({
      question: `Which stage is the ${only.size} ${labeledModel(name, only.model)} filter listed for?`,
      answer: `${only.size} is the recorded size for the ${positionLabel(only.position).toLowerCase()} stage on the ${only.model}, using ${only.filterType}. It is not listed here as a different stage.`,
    });
  }

  return faqs.slice(0, 4);
}

function shortType(filterType) {
  return filterType.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildMeta(name, rows) {
  const bits = [`${name}: ${rows[0].model} ${rows[0].size} ${shortType(rows[0].filterType)}.`];
  for (const row of rows.slice(1, 3)) bits.push(`${row.model} ${row.size}.`);
  bits.push('Measure the installed filter before ordering.');
  bits.push('Confirm the model and stage.');
  bits.push('Check the opening.');
  let value = '';
  for (const bit of bits) {
    if (value.length >= 140 && value.length <= 160) break;
    const next = `${value}${value ? ' ' : ''}${bit}`.replace(/\s+/g, ' ').trim();
    if (next.length <= 160) value = next;
    else if (value.length < 140) {
      const room = 160 - value.length - 1;
      if (room > 20) {
        const clipped = bit.slice(0, room).replace(/\s+\S*$/, '').trim();
        if (clipped) value = `${value} ${clipped}`.trim();
      }
      break;
    } else break;
  }
  if (value.length < 140 || value.length > 160) {
    throw new Error(`${name} meta description is ${value.length} characters: ${value}`);
  }
  return value;
}

function buildGuides(records) {
  const grouped = new Map();
  for (const record of records) {
    const brand = BRANDS[record.brand];
    if (!brand) continue;
    const reason = skipReason(record);
    if (reason) continue;
    const row = {
      model: record.model,
      position: positionLabel(record.position),
      filterType: record.filter_type,
      size: record.size_in,
      qty: record.qty_per_change_or_case || '',
      reference: record.oem_or_distributor_part_no || '',
    };
    const key = [row.model, row.position, row.filterType, row.size].join('|');
    if (!grouped.has(brand.slug)) grouped.set(brand.slug, { ...brand, seen: new Set(), rows: [] });
    const bucket = grouped.get(brand.slug);
    if (bucket.seen.has(key)) continue;
    bucket.seen.add(key);
    bucket.rows.push(row);
  }

  return [...grouped.values()]
    .filter((bucket) => bucket.rows.length > 0)
    .map((bucket) => {
      const rows = bucket.rows.map(({ reference, ...row }) => ({ ...row, reference }));
      return {
        slug: bucket.slug,
        name: bucket.name,
        intro: buildIntro(bucket.name, rows),
        rows: rows.map(({ reference, ...row }) => row),
        faqs: buildFaqs(bucket.name, rows),
        metaDescription: buildMeta(bucket.name, rows),
      };
    });
}

const records = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const guides = buildGuides(records);
const skipped = records.filter((record) => BRANDS[record.brand] && skipReason(record));

const moduleSource = `// Generated by scripts/build-booth-guides.mjs from shared/booth_models.csv.
// Rows marked for owner verification, unknown makers, and brands not on the site are omitted.
export const boothGuides = ${JSON.stringify(guides, null, 2)};

const guidesBySlug = new Map(boothGuides.map((guide) => [guide.slug, guide]));

export function getBoothGuide(slug) {
  return guidesBySlug.get(slug) || null;
}

export function listBoothGuides() {
  return boothGuides;
}
`;

fs.writeFileSync(outPath, moduleSource);
console.log(`Wrote ${guides.length} guides to ${path.relative(root, outPath)}`);
console.log(`Skipped ${skipped.length} mapped-brand rows that need verification or are incomplete`);
for (const guide of guides) {
  const words = guide.intro.split(/\s+/).length;
  console.log(`${guide.slug}\trows=${guide.rows.length}\tintroWords=${words}\tfaqs=${guide.faqs.length}\tmeta=${guide.metaDescription.length}`);
}
