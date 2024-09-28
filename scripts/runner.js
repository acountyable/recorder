// scripts/runner.js

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Function to parse command-line arguments
function getRecordingPath() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node runner.js <path_to_recording.json>');
    process.exit(1);
  }
  return args[0];
}

(async () => {
  const recordingPath = getRecordingPath();
  const absoluteRecordingPath = path.resolve(recordingPath);

  if (!fs.existsSync(absoluteRecordingPath)) {
    console.error(`Recording file does not exist: ${absoluteRecordingPath}`);
    process.exit(1);
  }

  const recordingData = JSON.parse(fs.readFileSync(absoluteRecordingPath, 'utf-8'));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  try {
    if (recordingData.actions && Array.isArray(recordingData.actions)) {
      for (const action of recordingData.actions) {
        switch (action.type) {
          case 'navigate':
            await page.goto(action.url, { waitUntil: 'networkidle2' });
            break;
          case 'click':
            await page.click(action.selector);
            break;
          case 'type':
            await page.type(action.selector, action.text);
            break;
          case 'wait':
            await page.waitForTimeout(action.duration);
            break;
          // Add more action types as needed
          default:
            console.warn(`Unknown action type: ${action.type}`);
        }
      }
    }

    // Take a screenshot after executing actions
    const resultsDir = path.join(__dirname, '..', 'results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir);
    }
    const recordingFileName = path.basename(recordingPath, '.json');
    const screenshotPath = path.join(resultsDir, `screenshot-${recordingFileName}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    console.log(`Scraper executed successfully for ${recordingFileName}`);
    console.log(`Screenshot saved at ${screenshotPath}`);
  } catch (error) {
    console.error(`Error executing scraper for ${recordingPath}:`, error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
