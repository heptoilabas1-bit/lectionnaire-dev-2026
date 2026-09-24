import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const demoRoot = path.join(projectRoot, 'demo');
const demoDataRoot = path.join(demoRoot, 'data');

const allowedSundayKeys = [
  '309_after_pentecost_9',
  '97_cross_after',
  '90_advent_2',
  '325_after_pentecost_25'
];
const allowedSet = new Set(allowedSundayKeys);
const calendarYears = [2023, 2024, 2025, 2026, 2027];
const demoOwnedFiles = [
  'app.js',
  'style.css',
  'data/309_after_pentecost_9.json',
  'data/97_cross_after.json',
  'data/90_advent_2.json',
  'data/325_after_pentecost_25.json',
  'data/liturgical_path.json'
];
const demoOverrides = new Map();

for (const relativePath of demoOwnedFiles) {
  try {
    demoOverrides.set(relativePath, await readFile(path.join(demoRoot, relativePath)));
  } catch {
    // Lors de la première génération, la source complète sert de point de départ.
  }
}

const readJson = async filePath => JSON.parse(await readFile(filePath, 'utf8'));
const analysisOverrides = await readJson(path.join(projectRoot, 'scripts', 'demo-analysis-overrides.json'));
const writeJson = async (filePath, value) => {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};
const removeEditorialDashes = text => text.replace(/\s*—\s*/g, ', ');
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
  .replace(/href="style\.css\?[^\"]+"/, 'href="style.css?v=20260924-demo-11"')
  .replace('<div><dt>Lemme</dt><dd id="comparison-term-lemma"></dd></div>', '<div><dt>Forme du dictionnaire</dt><dd id="comparison-term-lemma"></dd></div>')
  .replace('Cliquez sur un mot coloré pour ouvrir son explication.', 'Survolez un mot signalé pour sa grammaire, puis cliquez pour ouvrir sa fiche.')
  .replace(
    /<div class="annotation-legend" aria-label="Signification des couleurs">[\s\S]*?<\/div>/,
    '<div class="annotation-legend" aria-label="Importance des mots expliqués">\n                    <span><i class="legend-dot major"></i>Mot-clé majeur</span>\n                    <span><i class="legend-dot local"></i>Mot d’intérêt local</span>\n                </div>'
  )
  .replace(/\s*<h4>Contributions Communautaires<\/h4>[\s\S]*?<\/div>\s*(?=<\/section>)/, '\n')
  .replace(
    /<script src="app\.js\?[^\"]+"><\/script>/,
    '<script src="demo-config.js"></script>\n    <script src="app.js?v=20260924-demo-11"></script>'
  );
await writeFile(path.join(demoRoot, 'index.html'), indexHtml, 'utf8');

// La démo conserve sa propre copie du moteur et des éléments visuels. Les
// expérimentations menées ici ne modifient donc pas l'application complète.
for (const asset of ['app.js', 'style.css', 'orthodox-cross.png']) {
  const override = demoOverrides.get(asset);
  if (override) await writeFile(path.join(demoRoot, asset), override);
  else await cp(path.join(projectRoot, asset), path.join(demoRoot, asset));
}

const demoConfig = `window.LECTIONARY_CONFIG = ${JSON.stringify({
  demo: true,
  documentTitle: 'Lectionnaire interlinéaire orthodoxe — Démonstration',
  appTitle: 'Lectionnaire Interlinéaire Orthodoxe',
  demoNotice: 'Version de démonstration — quatre péricopes complètes',
  allowedSundayKeys,
  defaultSundayKey: allowedSundayKeys[0],
  calendarYears,
  defaultCalendarYear: 2026,
  dataVersion: '20260924-demo-11'
}, null, 2)};\n`;
await writeFile(path.join(demoRoot, 'demo-config.js'), demoConfig, 'utf8');

for (const key of allowedSundayKeys) {
  const relativePath = `data/${key}.json`;
  const override = demoOverrides.get(relativePath);
  if (override) await writeFile(path.join(demoRoot, relativePath), override);
  else {
    await cp(
      path.join(projectRoot, 'data', `${key}.json`),
      path.join(demoRoot, relativePath)
    );
  }

  const demoFilePath = path.join(demoRoot, relativePath);
  const publicAnalysis = analysisOverrides[key];
  if (publicAnalysis) {
    const pericope = await readJson(demoFilePath);
    if (pericope.gospel && publicAnalysis.gospel) pericope.gospel.personal_analysis = publicAnalysis.gospel;
    if (pericope.apostle && publicAnalysis.apostle) pericope.apostle.personal_analysis = publicAnalysis.apostle;
    await writeJson(demoFilePath, pericope);
  }
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

const liturgicalPathOverride = demoOverrides.get('data/liturgical_path.json');
if (liturgicalPathOverride) {
  await writeFile(path.join(demoDataRoot, 'liturgical_path.json'), liturgicalPathOverride);
} else {
  await cp(
    path.join(projectRoot, 'data', 'liturgical_path.json'),
    path.join(demoDataRoot, 'liturgical_path.json')
  );
}

await writeJson(path.join(demoRoot, 'manifest.json'), {
  kind: 'lectionary-demo',
  generated_from: 'application-complete',
  pericopes: allowedSundayKeys,
  isolated_engine: ['app.js', 'style.css'],
  generated_files: [
    'app.js',
    'style.css',
    'orthodox-cross.png',
    'data/309_after_pentecost_9.json',
    'data/97_cross_after.json',
    'data/90_advent_2.json',
    'data/325_after_pentecost_25.json',
    ...calendarYears.map(year => `data/calendar_${year}.json`),
    'data/liturgical_path.json'
  ]
});

// Choix éditorial de la démo : aucune incise avec tiret cadratin. Les plages
// chronologiques conservent leur tiret demi-cadratin (par ex. 2026–2027).
const editorialTextFiles = [
  'index.html',
  'app.js',
  'demo-config.js',
  'manifest.json',
  ...allowedSundayKeys.map(key => `data/${key}.json`),
  ...calendarYears.map(year => `data/calendar_${year}.json`),
  'data/liturgical_path.json'
];
for (const relativePath of editorialTextFiles) {
  const filePath = path.join(demoRoot, relativePath);
  const content = await readFile(filePath, 'utf8');
  await writeFile(filePath, removeEditorialDashes(content), 'utf8');
}

console.log(`Démonstration générée dans ${demoRoot}`);
