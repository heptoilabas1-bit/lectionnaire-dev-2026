import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const listBlock = appSource.match(/const liturgicalList = \{([\s\S]*?)\n    \};/);

if (!listBlock) throw new Error('Liste des péricopes introuvable dans app.js.');

const keys = [...listBlock[1].matchAll(/'([^']+)'\s*:/g)].map(match => match[1]);
const errors = [];
const pairs = new Map();
const normalize = value => String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');

for (const key of keys) {
    const filename = path.join(root, 'data', `${key}.json`);
    if (!fs.existsSync(filename)) {
        errors.push(`${key} : fichier absent`);
        continue;
    }

    let data;
    try {
        data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    } catch (error) {
        errors.push(`${key} : JSON invalide (${error.message})`);
        continue;
    }

    for (const readingType of ['gospel', 'apostle']) {
        const reading = data[readingType];
        if (!reading) {
            errors.push(`${key} : section ${readingType} absente`);
            continue;
        }
        if (!String(reading.reference || '').trim()) errors.push(`${key}/${readingType} : référence absente`);
        if (!String(reading.personal_analysis || '').trim()) errors.push(`${key}/${readingType} : analyse absente`);
        if (!Array.isArray(reading.interlinear) || !reading.interlinear.length) {
            errors.push(`${key}/${readingType} : texte interlinéaire absent`);
            continue;
        }
        for (const verse of reading.interlinear) {
            if (!String(verse.verse_number ?? '').trim()) errors.push(`${key}/${readingType} : numéro de verset absent`);
            for (const translation of ['segond', 'darby']) {
                if (!String(verse.translations?.[translation] || '').trim()) {
                    errors.push(`${key}/${readingType}/${verse.verse_number} : traduction ${translation} absente`);
                }
            }
            if (!Array.isArray(verse.interlinear) || !verse.interlinear.length) {
                errors.push(`${key}/${readingType}/${verse.verse_number} : mots interlinéaires absents`);
            }
        }
    }

    if (data.gospel && data.apostle) {
        const pair = `${normalize(data.gospel.reference)}|${normalize(data.apostle.reference)}`;
        const previous = pairs.get(pair);
        if (previous) errors.push(`${key} et ${previous} : couple Évangile–Apôtre dupliqué`);
        else pairs.set(pair, key);
    }
}

const calendar = JSON.parse(fs.readFileSync(path.join(root, 'data', 'calendar_2026.json'), 'utf8'));
for (const sunday of calendar.sundays) {
    const filename = path.join(root, 'data', `${sunday.key}.json`);
    if (!fs.existsSync(filename)) {
        errors.push(`${sunday.date} : fiche ${sunday.key} absente`);
        continue;
    }
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for (const readingType of ['gospel', 'apostle']) {
        if (normalize(data[readingType]?.reference) !== normalize(sunday.readings?.[readingType]?.reference)) {
            errors.push(`${sunday.date}/${readingType} : référence différente du calendrier officiel`);
        }
    }
}

if (errors.length) {
    console.error(`Audit en échec : ${errors.length} anomalie(s).`);
    errors.forEach(error => console.error(`- ${error}`));
    process.exitCode = 1;
} else {
    console.log(`Audit réussi : ${keys.length} couples et ${calendar.sundays.length} dimanches contrôlés.`);
}
