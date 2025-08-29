#!/usr/bin/env node
// tools/probe-image.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import * as exifr from "exifr";
import Tesseract from "tesseract.js";
import imghash from "imghash";
import sw from "stopword";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node tools/probe-image.mjs <imagePath> [--out out.json]");
  process.exit(1);
}
const imgPath = args[0];
const outIdx = args.indexOf("--out");
const outPath = outIdx > -1 ? args[outIdx + 1] : null;

async function getStats(p) {
  const i = sharp(p);
  const meta = await i.metadata();
  const stats = await i.stats();
  const mean = stats.channels.map(c => Math.round(c.mean));
  const dominant = stats.dominant || { r: mean[0], g: mean[1], b: mean[2] };
  return { meta, meanRGB: mean, dominantRGB: dominant };
}

function topTerms(text, n = 12) {
  const cleaned = text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const tokens = cleaned.split(" ");
  const filtered = sw.removeStopwords(tokens);
  const counts = new Map();
  for (const t of filtered) {
    if (!t) continue;
    counts.set(t, (counts.get(t) || 0) + 1);
  }
  const ranked = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([term]) => term);
  return ranked.slice(0, n);
}

function makeQueries(ocrText) {
  const terms = topTerms(ocrText, 10);
  const q1 = terms.join(" ");
  const q2 = `"${terms.slice(0, 3).join(" ")}" site:news`;
  const q3 = `${terms[0] || ""} ${terms[1] || ""} "blog"`;
  const q4 = terms.slice(0, 5).map(encodeURIComponent).join("+");
  const web = {
    bing: `https://www.bing.com/search?q=${q4}`,
    ddg: `https://duckduckgo.com/?q=${q4}`,
    google: `https://www.google.com/search?q=${q4}`
  };
  return { terms, suggestions: [q1, q2, q3], web };
}

(async () => {
  if (!fs.existsSync(imgPath)) {
    console.error("Image not found:", imgPath);
    process.exit(1);
  }

  const [hash, stats, exif] = await Promise.all([
    imghash.hash(imgPath, 16, "hex"),
    getStats(imgPath),
    exifr.parse(imgPath).catch(() => null)
  ]);

  // OCR (English by default; change lang as needed)
  const { data } = await Tesseract.recognize(imgPath, "eng", {
    tessedit_pageseg_mode: 3
  });
  const ocrText = (data && data.text) ? data.text.trim() : "";

  const queries = makeQueries(ocrText || "");

  const result = {
    file: path.relative(process.cwd(), imgPath),
    fingerprint: {
      perceptualHashHex: hash,
      width: stats.meta.width,
      height: stats.meta.height,
      format: stats.meta.format,
      space: stats.meta.space,
      hasAlpha: !!stats.meta.hasAlpha,
      dominantRGB: stats.dominantRGB
    },
    exif: exif || {},
    ocr: {
      utf8: ocrText,
      topTerms: queries.terms
    },
    suggestedWebSearch: {
      queries: queries.suggestions,
      engines: queries.web
    }
  };

  const output = JSON.stringify(result, null, 2);
  if (outPath) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output);
    console.log(`Wrote ${outPath}`);
  } else {
    console.log(output);
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});

