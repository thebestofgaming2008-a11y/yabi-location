const { chromium } = require("playwright");
const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = __dirname;
const templateUrl = pathToFileURL(path.join(root, "yabi-poster-template.html"));
const formats = [
  { name: "mobile", width: 1080, height: 1350, file: "yabi-google-poster-fr-mobile-1080x1350-v3.png" },
  { name: "square", width: 1200, height: 1200, file: "yabi-google-poster-fr-square-1200x1200-v3.png" },
  { name: "landscape", width: 1200, height: 628, file: "yabi-google-poster-fr-landscape-1200x628-v3.png" },
];

function linearChannel(value) {
  const channel = value / 255;
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((index) => linearChannel(parseInt(value.slice(index, index + 2), 16)));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first, second) {
  const [bright, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (bright + 0.05) / (dark + 0.05);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function audit() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const format of formats) {
      const imagePath = path.join(root, format.file);
      const metadata = await sharp(imagePath).metadata();
      const bytes = fs.statSync(imagePath).size;
      assert(metadata.width === format.width && metadata.height === format.height, `${format.name}: wrong dimensions`);
      assert(bytes < 5 * 1024 * 1024, `${format.name}: exceeds 5 MiB`);

      const page = await browser.newPage({ viewport: { width: format.width, height: format.height } });
      const url = new URL(templateUrl);
      url.searchParams.set("format", format.name);
      await page.goto(url.href, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);

      const layout = await page.evaluate(() => {
        const selectors = [".content", ".offer", ".models", ".cta", ".url"];
        const boxes = Object.fromEntries(
          selectors.map((selector) => {
            const rect = document.querySelector(selector).getBoundingClientRect();
            return [selector, { x: rect.x, y: rect.y, width: rect.width, height: rect.height }];
          }),
        );
        const heading = document.querySelector("h1");
        return {
          boxes,
          text: document.querySelector(".poster").innerText.replace(/\s+/g, " ").trim(),
          fonts: {
            display: document.fonts.check('800 40px "Barlow Condensed"'),
            body: document.fonts.check('700 20px "Manrope"'),
          },
          assets: {
            logo: document.querySelector(".logo").getAttribute("src"),
            photo: document.querySelector(".photo img").getAttribute("src"),
          },
          headingFits: heading.scrollWidth <= heading.clientWidth + 1,
        };
      });

      assert(layout.fonts.display && layout.fonts.body, `${format.name}: required fonts did not load`);
      assert(layout.assets.logo.endsWith("yabi-logo.webp"), `${format.name}: wrong logo asset`);
      assert(layout.assets.photo.endsWith("fleet-hero-1600.webp"), `${format.name}: wrong fleet photo`);
      assert(layout.headingFits, `${format.name}: headline overflow`);

      const requiredCopy = [
        "Votre utilitaire.",
        "Sans leasing longue durée.",
        "Dès 1 200 €",
        "HTVA / mois",
        "Assurance comprise",
        "–15 %",
        "dès 4 mois",
        "Demander une offre",
        "yabilocation.com",
      ];
      for (const copy of requiredCopy) {
        assert(layout.text.toLocaleLowerCase("fr").includes(copy.toLocaleLowerCase("fr")), `${format.name}: missing copy: ${copy}`);
      }

      const safeX = format.width * 0.1;
      const safeY = format.height * 0.1;
      for (const [selector, box] of Object.entries(layout.boxes)) {
        const tolerance = 1.1;
        assert(box.x >= safeX - tolerance, `${format.name}: ${selector} crosses left safe area`);
        assert(box.x + box.width <= format.width - safeX + tolerance, `${format.name}: ${selector} crosses right safe area`);
        assert(box.y >= safeY - tolerance, `${format.name}: ${selector} crosses top safe area`);
        assert(box.y + box.height <= format.height - safeY + tolerance, `${format.name}: ${selector} crosses bottom safe area`);
      }

      results.push({
        format: format.name,
        dimensions: `${metadata.width}×${metadata.height}`,
        sizeKiB: Number((bytes / 1024).toFixed(1)),
        safeArea: "pass",
        fonts: "Barlow Condensed + Manrope",
        copy: "pass",
        overflow: "pass",
      });
      await page.close();
    }
  } finally {
    await browser.close();
  }

  const contrastPairs = [
    { use: "navy text on white", foreground: "#071b43", background: "#ffffff", minimum: 4.5 },
    { use: "blue text on white", foreground: "#1456d9", background: "#ffffff", minimum: 4.5 },
    { use: "white CTA text on blue", foreground: "#ffffff", background: "#1456d9", minimum: 4.5 },
    { use: "navy badge text on lime", foreground: "#071b43", background: "#b9df16", minimum: 4.5 },
  ].map((pair) => ({ ...pair, ratio: Number(contrast(pair.foreground, pair.background).toFixed(2)) }));

  for (const pair of contrastPairs) {
    assert(pair.ratio >= pair.minimum, `${pair.use}: contrast ${pair.ratio}:1 is below ${pair.minimum}:1`);
  }

  console.log(JSON.stringify({ result: "PASS", formats: results, contrast: contrastPairs }, null, 2));
}

audit().catch((error) => {
  console.error(`AUDIT FAILED: ${error.message}`);
  process.exitCode = 1;
});
