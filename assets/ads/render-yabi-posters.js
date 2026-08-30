const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = __dirname;
const templateUrl = pathToFileURL(path.join(root, "yabi-poster-template.html"));
const formats = [
  {
    name: "mobile",
    width: 1080,
    height: 1350,
    output: "yabi-google-poster-fr-mobile-1080x1350-v3.png",
  },
  {
    name: "square",
    width: 1200,
    height: 1200,
    output: "yabi-google-poster-fr-square-1200x1200-v3.png",
  },
  {
    name: "landscape",
    width: 1200,
    height: 628,
    output: "yabi-google-poster-fr-landscape-1200x628-v3.png",
  },
];

async function render() {
  const browser = await chromium.launch({ headless: true });

  try {
    for (const format of formats) {
      const page = await browser.newPage({
        viewport: { width: format.width, height: format.height },
        deviceScaleFactor: 1,
      });

      const url = new URL(templateUrl);
      url.searchParams.set("format", format.name);
      await page.goto(url.href, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          Array.from(document.images).map((image) =>
            image.complete
              ? Promise.resolve()
              : new Promise((resolve, reject) => {
                  image.addEventListener("load", resolve, { once: true });
                  image.addEventListener("error", reject, { once: true });
                }),
          ),
        );
      });

      const fontCheck = await page.evaluate(() => ({
        display: document.fonts.check('800 40px "Barlow Condensed"'),
        body: document.fonts.check('700 20px "Manrope"'),
      }));

      if (!fontCheck.display || !fontCheck.body) {
        throw new Error(`Web fonts did not load for ${format.name}`);
      }

      await page.screenshot({
        path: path.join(root, format.output),
        fullPage: false,
        type: "png",
      });

      await page.close();
    }
  } finally {
    await browser.close();
  }

  for (const format of formats) {
    const outputPath = path.join(root, format.output);
    const bytes = fs.statSync(outputPath).size;
    console.log(`${format.output}: ${format.width}x${format.height}, ${(bytes / 1024).toFixed(1)} KiB`);
  }
}

render().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
