const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function makeTransparentBlackBg(inputPath, outputPath, options = {}) {
  try {
    console.log(`Processing: ${inputPath} -> ${outputPath}`);
    const image = await Jimp.read(inputPath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    const threshold = options.threshold || 25; // black floor
    const softRange = options.softRange || 45;  // gradient transition

    image.scan(0, 0, width, height, (x, y, idx) => {
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];

      // Luminance / maximum color value
      const maxVal = Math.max(r, g, b);
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      // Color distance from pure dark
      if (maxVal <= threshold && brightness <= threshold) {
        image.bitmap.data[idx + 3] = 0; // completely transparent
      } else if (maxVal < threshold + softRange) {
        // smooth feathering
        const factor = (maxVal - threshold) / softRange;
        image.bitmap.data[idx + 3] = Math.round(255 * Math.pow(factor, 1.2));
      } else {
        image.bitmap.data[idx + 3] = 255;
      }
    });

    await image.write(outputPath);
    console.log(`Saved transparent image: ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}

async function run() {
  const baseDir = path.join(__dirname, 'assets', 'images');
  
  await makeTransparentBlackBg(
    path.join(baseDir, 'single_rose_petals.jpg'),
    path.join(baseDir, 'single_rose_petals_transparent.png'),
    { threshold: 18, softRange: 40 }
  );

  await makeTransparentBlackBg(
    path.join(baseDir, 'kintsugi_ruby_heart.jpg'),
    path.join(baseDir, 'kintsugi_ruby_heart_transparent.png'),
    { threshold: 15, softRange: 35 }
  );
}

run();

