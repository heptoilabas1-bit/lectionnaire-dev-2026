import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const demoRoot = path.join(projectRoot, 'demo');
const demoDataRoot = path.join(demoRoot, 'data');

const allowedSundayKeys = [
  '309_after_pentecost_9',
  '97_cross_after'
];
const allowedSet = new Set(allowedSundayKeys);
const calendarYears = [2023, 2024, 2025, 2026, 2027];

const readJson = async filePath => JSON.parse(await readFile(filePath, 'utf8'));
const writeJson = async (filePath, value) => {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};
const entryBelongsToDemo = entry => {
  if (allowedSet.has(entry.key)) return true;
  return ['gospel', 'apostle'].some(type => allowedSet.has(entry.readings?.[type]?.key));
};

await rm(demoRoot, { recursive: true, force: true });
await mkdir(demoDataRoot, { recursive: true });

let indexHtml = await readFile(path.join(projectRoot, 'index.html'), 'utf8');
indexHtml = indexHtml
  .replace('<title>Lectionnaire Interlinéaire Orthodoxe</title>', '<title>Lectionnaire Interlinéaire Orthodoxe — Démonstration</title>')
  .replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="robots" content="noindex, nofollow">')
  .replace('href="style.css?', 'href="../style.css?')
  .replace('src="orthodox-cross.png"', 'src="../orthodox-cross.png"')
  .replace(
    /<script src="app\.js\?[^\"]+"><\/script>/,
    '<script src="demo-config.js"></script>\n    <script src="../app.js?v=20260924-demo-1"></script>'
  );
await writeFile(path.join(demoRoot, 'index.html'), indexHtml, 'utf8');

const demoConfig = `window.LECTIONARY_CONFIG = ${JSON.stringify({
  demo: true,
  documentTitle: 'Lectionnaire interlinéaire orthodoxe — Démonstration',
  appTitle: 'Lectionnaire Interlinéaire Orthodoxe',
  demoNotice: 'Version de démonstration — deux péricopes complètes',
  allowedSundayKeys,
  defaultSundayKey: allowedSundayKeys[0],
  calendarYears,
  defaultCalendarYear: 2026,
  dataVersion: '20260924-demo-1'
}, null, 2)};\n`;
await writeFile(path.join(demoRoot, 'demo-config.js'), demoConfig, 'utf8');

for (const key of allowedSundayKeys) {
  await cp(
    path.join(projectRoot, 'data', `${key}.json`),
    path.join(demoDataRoot, `${key}.json`)
  );
}

for (const year of calendarYears) {
  const calendar = await readJson(path.join(projectRoot, 'data', `calendar_${year}.json`));
  calendar.sundays = calendar.sundays.filter(entryBelongsToDemo);
  calendar.demo = {
    limited: true,
    notice: 'Calendrier filtré pour la version de démonstration.',
    available_pericopes: allowedSundayKeys
  };
  await writeJson(path.join(demoDataRoot, `calendar_${year}.json`), calendar);
}

await cp(
  path.join(projectRoot, 'data', 'liturgical_path.json'),
  path.join(demoDataRoot, 'liturgical_path.json')
);

await writeJson(path.join(demoRoot, 'manifest.json'), {
  kind: 'lectionary-demo',
  generated_from: 'application-complete',
  pericopes: allowedSundayKeys,
  shared_engine: ['../app.js', '../style.css'],
  generated_files: [
    'data/309_after_pentecost_9.json',
    'data/97_cross_after.json',
    ...calendarYears.map(year => `data/calendar_${year}.json`),
    'data/liturgical_path.json'
  ]
});

console.log(`Démonstration générée dans ${demoRoot}`);
