// Fichier: app.js (VERSION FRANÇAISE ÉPURÉE - JSON MOT-À-MOT + BULLES D'INFO)

document.addEventListener('DOMContentLoaded', () => {

    const DATA_VERSION = '20260912-liturgical-path-4';
    const versionedDataPath = path => `${path}?v=${DATA_VERSION}`;

    // --- 1. LISTE DE RÉFÉRENCE DES DIMANCHES ---
    const liturgicalList = {
        // --- Période du Triode ---
        '00_publican_pharisee': 'A. Dimanche du Publicain et du Pharisien',
        '01_prodigal_son': 'B. Dimanche du Fils Prodigue',
        '02_meatfare': 'C. Dimanche du Jugement Dernier (Carnaval)',
        '03_cheese_fare': 'D. Dimanche du Pardon (Tyrophagie)',

        // --- Grand Carême ---
        '10_great_lent_1': '1. 1er Dim. du Carême (Orthodoxie)',
        '11_great_lent_2': '2. 2e Dim. du Carême (St Grégoire Palamas)',
        '12_great_lent_3': '3. 3e Dim. du Carême (Vénération de la Croix)',
        '13_great_lent_4': '4. 4e Dim. du Carême (St Jean Climaque)',
        '14_great_lent_5': '5. 5e Dim. du Carême (Ste Marie l\'Égyptienne)',
        '15_palm_sunday': '6. Dimanche des Rameaux (entrée à Jérusalem)',

        // --- Période du Pentecostaire ---
        '21_pascha': 'PÂQUES - La Sainte Résurrection',
        '22_thomas_sunday': 'Dimanche de Saint Thomas (2e de Pâques)',
        '23_myrrhbearers': 'Dimanche des Myrophores (3e de Pâques)',
        '24_paralytic': 'Dimanche du Paralytique (4e de Pâques)',
        '25_samaritan': 'Dimanche de la Samaritaine (5e de Pâques)',
        '26_blind_man': 'Dimanche de l\'Aveugle-né (6e de Pâques)',
        '27_holy_fathers_1': 'Saints Pères du 1er Concile (7e de Pâques) — écho : Gethsémani',
        '28_pentecost': 'PENTECÔTE - La Descente du Saint-Esprit',
        '29_all_saints': 'Dimanche de Tous les Saints (1er ap. Pentecôte)',

        // --- Cycle de Matthieu (Été) ---
        '302_after_pentecost_2': 'Tous les Saints de la Terre (2e de Matthieu)',
        '303_after_pentecost_3': 'La Lumière du corps (3e de Matthieu)',
        '304_after_pentecost_4': 'Le Centurion (4e de Matthieu)',
        '305_after_pentecost_5': 'Les deux démoniaques (5e de Matthieu)',
        '306_after_pentecost_6': 'La guérison du Paralytique (6e de Matthieu)',
        '307_after_pentecost_7': 'Les deux aveugles (7e de Matthieu)',
        '308_after_pentecost_8': 'Multiplication des pains (8e de Matthieu)',
        '309_after_pentecost_9': 'Marche sur les eaux (9e de Matthieu)',
        '310_after_pentecost_10': 'La guérison du lunatique (10e de Matthieu)',
        '311_after_pentecost_11': 'Le débiteur impitoyable (11e de Matthieu)',
        '312_after_pentecost_12': 'Le jeune homme riche (12e de Matthieu)',
        '313_after_pentecost_13': 'Les vignerons homicides (13e de Matthieu)',
        '314_after_pentecost_14': 'Les noces royales (14e de Matthieu)',
        '315_after_pentecost_15': 'Le plus grand commandement (15e de Matthieu)',
        '316_after_pentecost_16': 'La parabole des talents (16e de Matthieu)',
        '317_after_pentecost_17': 'La Cananéenne (17e de Matthieu)',

        // --- Dimanches autour de l’Exaltation de la Sainte-Croix ---
        '96_cross_before': 'Dimanche avant l’Exaltation de la Sainte-Croix',
        '97_cross_after': 'Dimanche après l’Exaltation de la Sainte-Croix',

        // --- Cycle de Luc (Automne - Octoèque suite) ---
        '318_after_pentecost_18': 'La Pêche miraculeuse (1er de Luc)',
        '319_after_pentecost_19': 'L\'Amour des ennemis (2e de Luc)',
        '320_after_pentecost_20': 'Le Fils de la veuve de Naïn (3e de Luc)',
        '321_after_pentecost_21': 'Le Semeur (4e de Luc)',
        '322_after_pentecost_22': 'Le Riche et Lazare (5e de Luc)',
        '323_after_pentecost_23': 'Le Démoniaque de Gérasa (6e de Luc)',
        '324_after_pentecost_24': 'La Fille de Jaïre (7e de Luc)',
        '325_after_pentecost_25': 'Le Bon Samaritain (8e de Luc)',
        '326_after_pentecost_26': 'Le Riche insensé (9e de Luc)',
        '327_after_pentecost_27': 'La Femme courbée (10e de Luc)',
        '328_after_pentecost_28': 'Les Dix Lépreux (12e de Luc)',
        '330_after_pentecost_30': 'Le Jeune Homme Riche (13e de Luc)',
        '331_after_pentecost_31': 'L\'Aveugle de Jéricho (14e de Luc)',
        '332_after_pentecost_32': 'Zachée (15e de Luc)',

        // --- Cycle de la Nativité et de la Théophanie ---
        '90_advent_2': 'Les Saints Ancêtres (2e dimanche avant la Nativité)',
        '91_advent_1': 'Généalogie du Seigneur (Dimanche avant la Nativité)',
        '92_nativity_after': 'La Fuite en Égypte (Dimanche après la Nativité)',
        '93_theophany_before': 'Commencement de l’Évangile (Dimanche avant la Théophanie)',
        '94_theophany_after': 'Le début de la Prédication (Dimanche après la Théophanie)',
        // La Cananéenne possède une fiche canonique unique : 317_after_pentecost_17.
    };

    // --- SÉCURITÉ : CHOIX PAR DÉFAUT ---
    let currentSundayKey = '00_publican_pharisee';
    let currentReadingType = 'gospel';
    let currentTranslation = 'segond';
    let currentHomilyReference = '';
    let currentHomilyReadingTitle = '';
    let currentHomilyData = null;
    let calendarSundays = [];
    let currentCalendarEntry = null;
    let homilySaveTimer;
    let themeIndex = null;
    let themeIndexPromise = null;
    let lectionaryDataPromise = null;
    let preferredReadingTypeByKey = new Map();
    let currentLectionaryData = null;
    let currentReadingView = 'reading';
    let comparisonDisplayMode = 'related';
    let focusedComparisonIndex = null;
    let liturgicalPathDataPromise = null;

    const defaultHomilyTemplate = [
        {
            id: 'theme',
            phase: 'inspiration',
            title: '1. Parole centrale',
            prompt: 'Quelle parole ou quel mot-clef portera toute l’homélie ?'
        },
        {
            id: 'text',
            phase: 'inspiration',
            title: '2. Écoute du texte',
            prompt: 'Que dit précisément la péricope ? Notez sa progression, ses répétitions et ses oppositions.'
        },
        {
            id: 'gospel',
            phase: 'inspiration',
            title: '3. Bonne Nouvelle',
            prompt: 'Qu’est-ce que Dieu accomplit ou révèle ici ? Formulez l’annonce évangélique en une ou deux phrases.'
        },
        {
            id: 'today',
            phase: 'gestation',
            title: '4. Passage vers aujourd’hui',
            prompt: 'Quelle expérience humaine concrète cette parole vient-elle éclairer, guérir ou déplacer ?'
        },
        {
            id: 'response',
            phase: 'gestation',
            title: '5. Réponse proposée',
            prompt: 'À quelle conversion, espérance ou action concrète l’assemblée est-elle appelée ?'
        },
        {
            id: 'oral',
            phase: 'expiration',
            title: '6. Homélie rédigée',
            prompt: 'Rédigez ici la version orale : une entrée, un mouvement clair, puis une conclusion mémorable.'
        }
    ];

    const getHomilyStorageKey = () =>
        `lectionnaire:homily:${currentSundayKey}`;

    const getHomilyCollectionKey = (sundayKey = currentSundayKey) =>
        `lectionnaire:homilies:${sundayKey}`;

    const getLegacyHomilyStorageKey = readingType =>
        `lectionnaire:homily:${currentSundayKey}:${readingType}`;

    const parseStoredDraft = key => {
        try {
            return JSON.parse(localStorage.getItem(key)) || {};
        } catch {
            return {};
        }
    };

    const mergeLegacyHomilyDrafts = () => {
        const gospelDraft = parseStoredDraft(getLegacyHomilyStorageKey('gospel'));
        const apostleDraft = parseStoredDraft(getLegacyHomilyStorageKey('apostle'));
        const fieldIds = new Set([
            ...Object.keys(gospelDraft),
            ...Object.keys(apostleDraft)
        ]);
        const merged = {};

        fieldIds.forEach(fieldId => {
            if (fieldId === '_oralReview') return;
            const gospelContent = String(gospelDraft[fieldId] || '').trim();
            const apostleContent = String(apostleDraft[fieldId] || '').trim();
            if (gospelContent && apostleContent && gospelContent !== apostleContent) {
                merged[fieldId] = `ÉVANGILE\n${gospelContent}\n\nAPÔTRE\n${apostleContent}`;
            } else {
                merged[fieldId] = gospelContent || apostleContent;
            }
        });

        merged._oralReview = [...new Set([
            ...(Array.isArray(gospelDraft._oralReview) ? gospelDraft._oralReview : []),
            ...(Array.isArray(apostleDraft._oralReview) ? apostleDraft._oralReview : [])
        ])];

        return merged;
    };

    const readLegacyHomilyDraft = () => {
        const unifiedKey = getHomilyStorageKey();
        const unifiedDraft = parseStoredDraft(unifiedKey);
        if (Object.keys(unifiedDraft).length) return unifiedDraft;

        const migratedDraft = mergeLegacyHomilyDrafts();
        const hasMigratedContent = Object.entries(migratedDraft)
            .some(([key, value]) => key === '_oralReview' ? value.length : String(value || '').trim());
        if (hasMigratedContent) {
            localStorage.setItem(unifiedKey, JSON.stringify(migratedDraft));
            return migratedDraft;
        }
        return {};
    };

    const createHomilyDraftRecord = (content = {}, name = 'Homélie 1') => {
        const now = new Date().toISOString();
        return {
            id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name,
            createdAt: now,
            updatedAt: now,
            content
        };
    };

    const readHomilyCollection = (sundayKey = currentSundayKey) => {
        const stored = parseStoredDraft(getHomilyCollectionKey(sundayKey));
        if (stored.version === 1 && Array.isArray(stored.drafts) && stored.drafts.length) {
            if (!stored.drafts.some(draft => draft.id === stored.activeId)) stored.activeId = stored.drafts[0].id;
            return stored;
        }
        const legacyDraft = sundayKey === currentSundayKey ? readLegacyHomilyDraft() : {};
        const first = createHomilyDraftRecord(legacyDraft, 'Homélie 1');
        const collection = { version: 1, activeId: first.id, drafts: [first] };
        if (Object.keys(legacyDraft).length) {
            localStorage.setItem(getHomilyCollectionKey(sundayKey), JSON.stringify(collection));
        }
        return collection;
    };

    const writeHomilyCollection = (collection, sundayKey = currentSundayKey) => {
        localStorage.setItem(getHomilyCollectionKey(sundayKey), JSON.stringify(collection));
    };

    const readHomilyDraft = () => {
        const collection = readHomilyCollection();
        return collection.drafts.find(draft => draft.id === collection.activeId)?.content || {};
    };

    const collectHomilyDraft = () => {
        const draft = {};
        document.querySelectorAll('#homily-fields textarea').forEach(field => {
            draft[field.dataset.fieldId] = field.value;
        });
        draft._oralReview = Array.from(document.querySelectorAll('#oral-review-list input:checked'))
            .map(input => input.value);
        draft._steps = Array.from(document.querySelectorAll('[data-homily-step]')).map((step, order) => ({
            id: step.dataset.homilyStep,
            title: step.querySelector('.homily-step-title')?.value || step.querySelector('label')?.textContent || 'Étape',
            active: step.querySelector('.homily-step-active')?.checked !== false,
            phase: step.dataset.phase || 'gestation',
            order,
            custom: step.dataset.custom === 'true'
        }));
        return draft;
    };

    const updateHomilyProgress = () => {
        const fields = Array.from(document.querySelectorAll('[data-homily-step]'))
            .filter(step => step.querySelector('.homily-step-active')?.checked !== false)
            .map(step => step.querySelector('textarea'))
            .filter(Boolean);
        const completed = fields.filter(field => field.value.trim()).length;
        const label = document.getElementById('homily-progress-label');
        const oralLength = document.getElementById('homily-oral-length');
        const bar = document.getElementById('homily-progress-bar');
        if (label) label.textContent = `${completed} ${completed > 1 ? 'étapes renseignées' : 'étape renseignée'} sur ${fields.length}`;
        if (oralLength) {
            const oralText = document.querySelector('#homily-fields textarea[data-field-id="oral"]')?.value.trim() || '';
            const wordCount = oralText ? oralText.split(/\s+/).filter(Boolean).length : 0;
            const minutes = wordCount ? Math.max(1, Math.round(wordCount / 120)) : 0;
            oralLength.textContent = wordCount
                ? `Rédaction finale : ${wordCount} mot${wordCount > 1 ? 's' : ''} · environ ${minutes} min à l’oral`
                : 'Rédaction finale encore vide';
        }
        if (bar) {
            bar.setAttribute('aria-valuemax', String(fields.length));
            bar.setAttribute('aria-valuenow', String(completed));
            const fill = bar.querySelector('span');
            if (fill) fill.style.width = fields.length ? `${(completed / fields.length) * 100}%` : '0%';
        }
    };

    const saveHomilyDraft = () => {
        const collection = readHomilyCollection();
        const active = collection.drafts.find(draft => draft.id === collection.activeId) || collection.drafts[0];
        active.content = collectHomilyDraft();
        active.updatedAt = new Date().toISOString();
        collection.activeId = active.id;
        writeHomilyCollection(collection);
        updateHomilyProgress();
        const status = document.getElementById('homily-save-status');
        if (status) {
            status.textContent = `Brouillon sauvegardé sur cet appareil à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}.`;
        }
    };

    const renderHomilyDraftManager = () => {
        const select = document.getElementById('homily-draft-select');
        const deleteButton = document.getElementById('delete-homily-draft');
        if (!select) return;
        const collection = readHomilyCollection();
        select.innerHTML = '';
        collection.drafts
            .slice()
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .forEach(draft => {
                const option = document.createElement('option');
                option.value = draft.id;
                option.textContent = `${draft.name} — ${new Date(draft.updatedAt).toLocaleDateString('fr-FR')}`;
                select.appendChild(option);
            });
        select.value = collection.activeId;
        if (deleteButton) deleteButton.disabled = collection.drafts.length < 2;
    };

    const addMaterialToHomily = ({ title, content, keywords = [] }) => {
        const workspace = document.getElementById('homily-workspace');
        const target = document.querySelector('#homily-fields textarea[data-field-id="text"]')
            || document.querySelector('#homily-fields textarea');
        const status = document.getElementById('homily-save-status');
        if (!workspace || !target) return;

        const block = [
            title ? `— ${title} —` : '',
            content || '',
            keywords.length ? `Mots-clefs : ${keywords.join(' · ')}` : ''
        ].filter(Boolean).join('\n');

        workspace.hidden = false;
        if (!target.value.includes(block)) {
            target.value = target.value.trim()
                ? `${target.value.trim()}\n\n${block}`
                : block;
            saveHomilyDraft();
            if (status) status.textContent = 'Élément ajouté au brouillon et sauvegardé sur cet appareil.';
        } else if (status) {
            status.textContent = 'Cet élément figure déjà dans le brouillon.';
        }
        target.focus({ preventScroll: true });
        workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const buildUnifiedHomilyTemplate = data => {
        const gospelTemplate = Array.isArray(data.gospel?.homily_template)
            ? data.gospel.homily_template
            : [];
        const apostleTemplate = Array.isArray(data.apostle?.homily_template)
            ? data.apostle.homily_template
            : [];
        const gospelById = new Map(gospelTemplate.map(section => [section.id, section]));
        const apostleById = new Map(apostleTemplate.map(section => [section.id, section]));
        const orderedIds = [...new Set([
            ...defaultHomilyTemplate.map(section => section.id),
            ...gospelTemplate.map(section => section.id),
            ...apostleTemplate.map(section => section.id)
        ])];

        return orderedIds.map((id, index) => {
            const fallback = defaultHomilyTemplate.find(section => section.id === id)
                || { id, phase: index < 3 ? 'inspiration' : 'gestation', title: `${index + 1}. Étape`, prompt: '' };
            const gospelSection = gospelById.get(id);
            const apostleSection = apostleById.get(id);
            const prompts = [];
            if (gospelSection?.prompt) prompts.push(`Évangile — ${gospelSection.prompt}`);
            if (apostleSection?.prompt) prompts.push(`Apôtre — ${apostleSection.prompt}`);

            const sourcePhase = gospelSection?.phase || apostleSection?.phase || fallback.phase;
            return {
                ...fallback,
                phase: sourcePhase === 'proclamation' ? 'expiration' : sourcePhase,
                title: fallback.title,
                prompt: prompts.length ? prompts.join('\n') : fallback.prompt
            };
        });
    };

    const buildUnifiedHomilyContext = data => {
        const references = [
            data.gospel?.reference ? `Évangile : ${data.gospel.reference}` : '',
            data.apostle?.reference ? `Apôtre : ${data.apostle.reference}` : ''
        ].filter(Boolean);

        return {
            title: liturgicalList[currentSundayKey]
                || currentCalendarEntry?.official_title
                || 'Homélie',
            reference: references.join(' · '),
            homily_template: buildUnifiedHomilyTemplate(data)
        };
    };

    const readingPlainText = reading => {
        if (!reading) return '';
        if (Array.isArray(reading.interlinear)) {
            const verses = reading.interlinear.map(verse => {
                const translation = verse.translations?.[currentTranslation]
                    || verse.translations?.segond
                    || verse.translations?.darby;
                return translation ? `${verse.verse_number}. ${translation}` : '';
            }).filter(Boolean).join(' ');
            if (verses) return verses;
        }
        return reading.french_only || reading.french_darby || '';
    };

    const buildHomilyInterlinear = reading => {
        const container = document.createElement('div');
        container.className = 'homily-interlinear';
        if (!Array.isArray(reading?.interlinear) || !reading.interlinear.length) {
            container.textContent = 'Version interlinéaire non disponible.';
            return container;
        }

        reading.interlinear.forEach(verse => {
            const row = document.createElement('div');
            row.className = 'homily-interlinear-verse';
            const number = document.createElement('span');
            number.className = 'homily-interlinear-number';
            number.textContent = `${verse.verse_number}.`;
            row.appendChild(number);

            const words = document.createElement('div');
            words.className = 'homily-interlinear-words';
            if (Array.isArray(verse.interlinear)) {
                verse.interlinear.forEach(word => {
                    const unit = document.createElement('span');
                    unit.className = 'homily-interlinear-word';
                    const greek = document.createElement('span');
                    const annotation = word.annotation || word.analyse;
                    greek.className = `greek-word${annotation ? ` mot-info mot-${inferAnnotationType(annotation)}` : ''}`;
                    greek.textContent = word.greek || '';
                    if (annotation) {
                        greek.dataset.annotation = encodeURIComponent(JSON.stringify(annotation));
                        greek.tabIndex = 0;
                        greek.setAttribute('role', 'button');
                    }
                    const gloss = document.createElement('span');
                    gloss.className = 'inter-gloss';
                    gloss.textContent = word.gloss || '';
                    unit.append(greek, gloss);
                    words.appendChild(unit);
                });
            } else if (verse.html_content) {
                words.innerHTML = verse.html_content;
            }
            row.appendChild(words);
            container.appendChild(row);
        });
        return container;
    };

    const renderHomilyReadingContext = data => {
        const container = document.getElementById('homily-reading-context');
        if (!container || !data) return;
        container.innerHTML = '';
        ['gospel', 'apostle'].forEach(type => {
            const reading = data[type];
            if (!reading) return;
            const card = document.createElement('article');
            card.className = `homily-reading-card homily-reading-card-${type}`;
            const label = document.createElement('p');
            label.className = 'homily-reading-label';
            label.textContent = type === 'gospel' ? 'Évangile' : 'Apôtre';
            const heading = document.createElement('h4');
            heading.textContent = reading.reference || reading.title || label.textContent;
            const details = document.createElement('details');
            const summary = document.createElement('summary');
            summary.textContent = 'Relire le texte français';
            const text = document.createElement('p');
            text.className = 'homily-reading-text';
            text.textContent = readingPlainText(reading) || 'Texte français non disponible.';
            details.append(summary, text);
            const interlinearDetails = document.createElement('details');
            interlinearDetails.className = 'homily-interlinear-details';
            const interlinearSummary = document.createElement('summary');
            interlinearSummary.textContent = 'Afficher l’interlinéaire grec–français';
            interlinearDetails.append(interlinearSummary, buildHomilyInterlinear(reading));
            const useButton = document.createElement('button');
            useButton.type = 'button';
            useButton.className = 'homily-reading-use';
            useButton.textContent = 'Garder cette référence dans le brouillon';
            useButton.addEventListener('click', () => addMaterialToHomily({
                title: `${label.textContent} — ${reading.reference || reading.title || ''}`,
                content: ''
            }));
            card.append(label, heading, details, interlinearDetails, useButton);
            container.appendChild(card);
        });
    };

    const renderHomilyWorkspace = (reading) => {
        const fields = document.getElementById('homily-fields');
        const title = document.getElementById('homily-workspace-title');
        const status = document.getElementById('homily-save-status');
        if (!fields) return;

        currentHomilyReference = reading.reference || '';
        currentHomilyReadingTitle = reading.title || '';
        let template = Array.isArray(reading.homily_template) && reading.homily_template.length
            ? reading.homily_template
            : defaultHomilyTemplate;
        const draft = readHomilyDraft();
        const savedSteps = Array.isArray(draft._steps) ? draft._steps : [];
        const savedById = new Map(savedSteps.map(step => [step.id, step]));
        const customSteps = savedSteps.filter(step => step.custom).map(step => ({
            id: step.id,
            phase: step.phase || 'gestation',
            title: step.title || 'Étape personnelle',
            prompt: 'Cette étape vous appartient : vous pouvez la renommer ou la retirer.'
        }));
        template = [...template, ...customSteps]
            .sort((a, b) => (savedById.get(a.id)?.order ?? 999) - (savedById.get(b.id)?.order ?? 999));

        if (title) title.textContent = `Construire l’homélie — ${currentHomilyReference || currentHomilyReadingTitle}`;
        const collection = readHomilyCollection();
        const activeDraft = collection.drafts.find(item => item.id === collection.activeId);
        if (status) status.textContent = Object.keys(draft).length
            ? `« ${activeDraft?.name || 'Homélie'} » retrouvée : ce brouillon est commun à l’Évangile et à l’Apôtre.`
            : `« ${activeDraft?.name || 'Homélie'} » est commune aux deux lectures et sera sauvegardée automatiquement sur cet appareil.`;

        const phases = {
            inspiration: {
                title: 'Inspiration — recevoir la Parole',
                description: 'Écouter les lectures et discerner leur mouvement propre.'
            },
            gestation: {
                title: 'Gestation — laisser la Parole travailler',
                description: 'Relier la péricope à l’expérience de l’assemblée et à sa réponse.'
            },
            expiration: {
                title: 'Expiration — transmettre',
                description: 'Donner au chemin parcouru une forme destinée à être proclamée.'
            }
        };
        let currentPhase = '';
        let phaseGrid = null;

        fields.innerHTML = '';
        template.forEach((section, index) => {
            const phaseKey = section.phase
                || (index < 3 ? 'inspiration' : index < template.length - 1 ? 'gestation' : 'expiration');
            if (phaseKey !== currentPhase) {
                currentPhase = phaseKey;
                const phase = phases[phaseKey] || phases.gestation;
                const group = document.createElement('section');
                group.className = `homily-phase homily-phase-${phaseKey}`;
                const heading = document.createElement('h4');
                heading.textContent = phase.title;
                const description = document.createElement('p');
                description.className = 'homily-phase-description';
                description.textContent = phase.description;
                phaseGrid = document.createElement('div');
                phaseGrid.className = 'homily-phase-grid';
                group.append(heading, description, phaseGrid);
                fields.appendChild(group);
            }

            const wrapper = document.createElement('div');
            wrapper.className = section.id === 'oral' ? 'homily-field homily-field-final' : 'homily-field';
            wrapper.dataset.homilyStep = section.id;
            wrapper.dataset.phase = phaseKey;
            wrapper.dataset.custom = String(Boolean(savedById.get(section.id)?.custom));

            const label = document.createElement('label');
            label.htmlFor = `homily-${section.id}`;
            label.className = 'visually-hidden';
            label.textContent = savedById.get(section.id)?.title || section.title;

            const toolbar = document.createElement('div');
            toolbar.className = 'homily-step-toolbar';
            const activeLabel = document.createElement('label');
            activeLabel.className = 'homily-step-choice';
            const active = document.createElement('input');
            active.type = 'checkbox';
            active.className = 'homily-step-active';
            active.checked = savedById.get(section.id)?.active !== false;
            const activeText = document.createElement('span');
            activeText.textContent = 'Utiliser';
            activeLabel.append(active, activeText);
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.className = 'homily-step-title';
            titleInput.value = savedById.get(section.id)?.title || section.title;
            titleInput.setAttribute('aria-label', 'Intitulé de l’étape');
            const moveUp = document.createElement('button');
            moveUp.type = 'button';
            moveUp.className = 'homily-step-move';
            moveUp.dataset.direction = 'up';
            moveUp.textContent = '↑';
            moveUp.setAttribute('aria-label', 'Monter cette étape');
            const moveDown = document.createElement('button');
            moveDown.type = 'button';
            moveDown.className = 'homily-step-move';
            moveDown.dataset.direction = 'down';
            moveDown.textContent = '↓';
            moveDown.setAttribute('aria-label', 'Descendre cette étape');
            toolbar.append(activeLabel, titleInput, moveUp, moveDown);

            const help = document.createElement('p');
            help.className = 'homily-prompt';
            help.textContent = section.prompt || '';

            const textarea = document.createElement('textarea');
            textarea.id = `homily-${section.id}`;
            textarea.dataset.fieldId = section.id;
            textarea.dataset.fieldTitle = section.title;
            textarea.rows = section.id === 'oral' ? 14 : 5;
            textarea.value = draft[section.id] || '';
            textarea.placeholder = section.placeholder || 'Écrivez ici…';

            const syncActiveState = () => wrapper.classList.toggle('homily-step-disabled', !active.checked);
            active.addEventListener('change', syncActiveState);
            syncActiveState();
            wrapper.append(label, toolbar, help, textarea);
            phaseGrid.appendChild(wrapper);
        });
        const checkedReviewItems = Array.isArray(draft._oralReview) ? draft._oralReview : [];
        document.querySelectorAll('#oral-review-list input').forEach(input => {
            input.checked = checkedReviewItems.includes(input.value);
        });
        updateHomilyProgress();
        renderHomilyDraftManager();
    };

    const buildHomilyExport = () => {
        const collection = readHomilyCollection();
        const activeDraft = collection.drafts.find(draft => draft.id === collection.activeId);
        const sections = Array.from(document.querySelectorAll('[data-homily-step]'))
            .filter(step => step.querySelector('.homily-step-active')?.checked !== false)
            .map(step => {
                const field = step.querySelector('textarea');
                return {
                    id: field.dataset.fieldId,
                    title: step.querySelector('.homily-step-title')?.value || field.dataset.fieldTitle,
                    content: field.value.trim()
                };
            });
        return {
            title: activeDraft?.name
                ? `${currentHomilyReadingTitle || 'Homélie'} — ${activeDraft.name}`
                : currentHomilyReadingTitle || 'Homélie',
            reference: currentHomilyReference,
            sections
        };
    };

    const safeFilename = (value) => value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();

    const downloadFile = (content, mimeType, extension) => {
        const exportData = buildHomilyExport();
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `homelie-${safeFilename(exportData.reference || exportData.title)}.${extension}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
    };

    const inferAnnotationType = annotation => {
        if (annotation && typeof annotation === 'object' && annotation.type) {
            return annotation.type;
        }
        const content = String(
            typeof annotation === 'string'
                ? annotation
                : annotation && (annotation.content || annotation.title) || ''
        ).toLowerCase();

        if (/racine|étymolog|etymolog|signifie littéralement|du verbe|préfixe|suffixe/.test(content)) {
            return 'racine';
        }
        if (/répét|repetition|revient|structure|parallél|opposition|chiasme|inclusio/.test(content)) {
            return 'repetition';
        }
        if (/traduit|traduction|segond|darby|mot-à-mot|mot à mot/.test(content)) {
            return 'traduction';
        }
        if (/théolog|spirituel|christ|père|saint-esprit|royaume|grâce|salut/.test(content)) {
            return 'theologie';
        }
        return 'analyse';
    };

    const connectionKindLabels = {
        same_form: 'Même forme grecque',
        same_lemma: 'Même lemme',
        same_root: 'Même racine',
        notion: 'Notion commune',
        structure: 'Structure',
        theology: 'Lien théologique'
    };

    const connectionLinkTypeLabels = {
        lexical_identity: 'Identité lexicale',
        spiritual_movement: 'Même mouvement spirituel',
        contrast: 'Contraste éclairant',
        shared_orientation: 'Même orientation',
        mission_continuity: 'Mission transmise',
        semantic_echo: 'Écho de sens',
        ecclesial_fulfillment: 'Accomplissement ecclésial',
        promise_fulfillment: 'Promesse → accomplissement',
        theological_reversal: 'Renversement théologique',
        embodied_service: 'Soin concret',
        witness: 'Témoignage transmis',
        discipleship_path: 'Même chemin de fidélité'
    };

    const connectionGreekBasisLabels = {
        same_form: 'Même forme grecque',
        same_lemma: 'Même lemme grec',
        same_root: 'Racine grecque commune'
    };

    const buildComparisonHomilyMaterial = connection => {
        const bridge = connection?.bridge || {};
        const linkType = connectionLinkTypeLabels[connection?.link_type]
            || connectionKindLabels[connection?.kind]
            || 'Rapprochement';
        const greekBasis = connectionGreekBasisLabels[connection?.kind] || 'Mots grecs différents';
        const lemmas = ['gospel', 'apostle'].flatMap(side =>
            (connection?.term_details?.[side] || []).map(term => term.lemma)
        ).filter(Boolean);
        return {
            title: `Évangile ↔ Apôtre — ${connection?.title || 'Rapprochement'}`,
            content: [
                `Nature du lien : ${linkType} (${greekBasis.toLowerCase()}).`,
                bridge.gospel ? `Évangile : ${bridge.gospel}` : '',
                bridge.apostle ? `Apôtre : ${bridge.apostle}` : '',
                bridge.relation ? `Relation : ${bridge.relation}` : '',
                connection?.bridge_sentence ? `Phrase-pont : « ${connection.bridge_sentence} »` : '',
                connection?.homiletic_use ? `Piste homilétique : ${connection.homiletic_use}` : ''
            ].filter(Boolean).join('\n'),
            keywords: [...new Set(lemmas)]
        };
    };

    const buildComparisonUseAction = connection => {
        const action = document.createElement('div');
        action.className = 'comparison-use-action';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'comparison-use-button';
        button.textContent = 'Ajouter cette piste à mon brouillon';
        button.addEventListener('click', () => addMaterialToHomily(buildComparisonHomilyMaterial(connection)));
        action.appendChild(button);
        return action;
    };

    const normalizeGreekToken = value => String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^\p{L}]/gu, '');

    const showStandardReadingView = readingType => {
        currentReadingView = 'reading';
        const pathView = document.getElementById('liturgical-path-view');
        const comparisonView = document.getElementById('comparison-view');
        const verseTitle = document.getElementById('verse-title');
        const mainText = document.getElementById('gospel-text');
        const notesView = document.getElementById('notes-view');
        const annotationHelp = document.querySelector('.annotation-help');
        const translationSelector = document.getElementById('translation-selector');
        const panelToggles = document.getElementById('panel-toggles');
        const textSelector = document.getElementById('text-selector');
        if (pathView) pathView.hidden = true;
        if (comparisonView) comparisonView.hidden = true;
        if (verseTitle) verseTitle.hidden = false;
        if (mainText) mainText.hidden = false;
        if (notesView) notesView.hidden = false;
        if (annotationHelp) annotationHelp.hidden = false;
        if (translationSelector) translationSelector.hidden = false;
        if (panelToggles) panelToggles.hidden = false;
        if (textSelector) textSelector.hidden = false;
        document.querySelectorAll('#text-selector button').forEach(button => button.classList.remove('active'));
        const activeButton = document.getElementById(`select-${readingType}`);
        if (activeButton) activeButton.classList.add('active');
    };

    const updateComparisonAvailability = data => {
        const button = document.getElementById('select-compare');
        if (!button) return;
        const available = Boolean(Array.isArray(data?.reading_connections?.links)
            && data.reading_connections.links.length
            && data.gospel
            && data.apostle);
        button.disabled = false;
        button.classList.toggle('comparison-pending', !available);
        button.title = available
            ? 'Comparer les passages grecs directement ou indirectement liés'
            : 'Cette comparaison est encore en préparation';
        button.setAttribute('aria-label', available
            ? 'Comparer l’Évangile et l’Apôtre'
            : 'Comparer l’Évangile et l’Apôtre — comparaison en préparation');
    };

    const connectionMatchesToken = (connection, side, token) =>
        (connection?.[side]?.terms || []).some(term => normalizeGreekToken(term) === token);

    const findComparisonTermDetail = (connection, side, token) =>
        (connection?.term_details?.[side] || []).find(item =>
            (item.forms || []).some(form => normalizeGreekToken(form) === token));

    const buildComparisonInterlinear = (reading, side, connection, options = {}) => {
        const container = document.createElement('div');
        container.className = 'comparison-interlinear';
        const sideData = connection?.[side] || {};
        const selectedVerses = new Set((sideData.verses || []).map(String));
        const fullConnections = Array.isArray(options.fullConnections) ? options.fullConnections : null;
        const verses = Array.isArray(reading?.interlinear)
            ? reading.interlinear.filter(verse => fullConnections || !selectedVerses.size || selectedVerses.has(String(verse.verse_number)))
            : [];

        if (!verses.length) {
            container.textContent = 'Passage interlinéaire non disponible.';
            return container;
        }

        verses.forEach(verse => {
            const row = document.createElement('div');
            row.className = 'comparison-verse';
            const number = document.createElement('span');
            number.className = 'comparison-verse-number';
            number.textContent = `${verse.verse_number}.`;
            const words = document.createElement('div');
            words.className = 'comparison-words';

            if (Array.isArray(verse.interlinear)) {
                verse.interlinear.forEach(word => {
                    const unit = document.createElement('span');
                    unit.className = 'comparison-word-unit';
                    const greek = document.createElement('span');
                    const annotation = word.annotation || word.analyse;
                    const token = normalizeGreekToken(word.greek);
                    greek.className = `greek-word${annotation ? ` mot-info mot-${inferAnnotationType(annotation)}` : ''}`;
                    greek.textContent = word.greek || '';
                    const matchingIndexes = fullConnections
                        ? fullConnections.map((item, index) => connectionMatchesToken(item, side, token) ? index : -1).filter(index => index >= 0)
                        : (connectionMatchesToken(connection, side, token) ? [options.connectionIndex ?? 0] : []);
                    if (matchingIndexes.length) {
                        const primaryConnection = fullConnections ? fullConnections[matchingIndexes[0]] : connection;
                        greek.classList.add('connection-highlight', 'comparison-term', `connection-${primaryConnection.kind || 'theology'}`);
                        matchingIndexes.forEach(index => greek.classList.add(`comparison-term-link-${index}`));
                        greek.dataset.comparisonSide = side;
                        greek.dataset.comparisonToken = token;
                        greek.dataset.connectionIndexes = matchingIndexes.join(',');
                        greek.tabIndex = 0;
                        greek.setAttribute('role', 'button');
                        greek.setAttribute('aria-label', `Étudier ${word.greek || 'ce mot'} dans la comparaison`);
                    }
                    if (annotation) {
                        greek.dataset.annotation = encodeURIComponent(JSON.stringify(annotation));
                        greek.tabIndex = 0;
                        greek.setAttribute('role', 'button');
                    }
                    const gloss = document.createElement('span');
                    gloss.className = 'inter-gloss';
                    gloss.textContent = word.gloss || '';
                    unit.append(greek, gloss);
                    words.appendChild(unit);
                });
            }
            row.append(number, words);
            container.appendChild(row);
        });
        return container;
    };

    const buildComparisonReading = (label, reading, side, connection, options = {}) => {
        const column = document.createElement('section');
        column.className = `comparison-reading comparison-reading-${side}`;
        const heading = document.createElement('div');
        heading.className = 'comparison-reading-heading';
        const name = document.createElement('h4');
        name.textContent = label;
        const reference = document.createElement('p');
        reference.textContent = reading?.reference || '';
        heading.append(name, reference);
        column.append(heading, buildComparisonInterlinear(reading, side, connection, options));
        return column;
    };

    const buildComparisonHeader = (connection, index) => {
        const header = document.createElement('div');
        header.className = 'comparison-link-header';
        const badges = document.createElement('div');
        badges.className = 'comparison-badges';
        const relationType = document.createElement('span');
        relationType.className = `comparison-badge comparison-badge-${connection.directness || 'indirect'}`;
        relationType.textContent = `Nature du lien · ${connectionLinkTypeLabels[connection.link_type]
            || connectionKindLabels[connection.kind]
            || 'Rapprochement'}`;
        const greekBasis = document.createElement('span');
        greekBasis.className = 'comparison-badge comparison-badge-kind';
        greekBasis.textContent = connectionGreekBasisLabels[connection.kind] || 'Mots grecs différents';
        badges.append(relationType, greekBasis);
        const title = document.createElement('h3');
        title.textContent = connection.title || `Rapprochement ${index + 1}`;
        const explanation = document.createElement('p');
        explanation.textContent = connection.explanation || '';
        header.append(badges, title, explanation);
        return header;
    };

    const buildComparisonBridge = (connection, index, interactive = true) => {
        const bridgeData = connection.bridge || {};
        const bridge = document.createElement('section');
        bridge.className = `comparison-bridge comparison-bridge-${connection.directness || 'indirect'}`;
        bridge.classList.toggle('comparison-bridge-static', !interactive);
        bridge.dataset.connectionIndex = String(index);
        bridge.setAttribute('aria-label', interactive
            ? 'Sélectionner ce rapprochement'
            : 'Explication du rapprochement');
        if (interactive) {
            bridge.tabIndex = 0;
            bridge.setAttribute('role', 'button');
            bridge.setAttribute('aria-pressed', 'false');
            bridge.addEventListener('click', () => {
                applyComparisonFocus(focusedComparisonIndex === index ? null : index);
            });
            bridge.addEventListener('keydown', event => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                applyComparisonFocus(focusedComparisonIndex === index ? null : index);
            });
        }

        const evidence = document.createElement('p');
        evidence.className = 'comparison-bridge-evidence';
        evidence.textContent = bridgeData.evidence || (connection.directness === 'direct'
            ? 'Correspondance grecque attestée dans les deux passages.'
            : 'Pas de racine grecque commune : rapprochement fondé sur le sens.');

        const map = document.createElement('div');
        map.className = 'comparison-bridge-map';

        const gospelSide = document.createElement('div');
        gospelSide.className = 'comparison-bridge-side comparison-bridge-gospel';
        const gospelLabel = document.createElement('span');
        gospelLabel.textContent = 'Dans l’Évangile';
        const gospelMeaning = document.createElement('strong');
        gospelMeaning.textContent = bridgeData.gospel || 'Les mots encadrés portent le premier mouvement.';
        gospelSide.append(gospelLabel, gospelMeaning);

        const core = document.createElement('div');
        core.className = 'comparison-bridge-core';
        const connector = document.createElement('span');
        connector.className = 'comparison-bridge-symbol';
        connector.setAttribute('aria-hidden', 'true');
        connector.textContent = '↔';
        const relation = document.createElement('strong');
        relation.textContent = bridgeData.relation || connection.title || 'Rapprochement';
        core.append(connector, relation);

        const apostleSide = document.createElement('div');
        apostleSide.className = 'comparison-bridge-side comparison-bridge-apostle';
        const apostleLabel = document.createElement('span');
        apostleLabel.textContent = 'Dans l’Apôtre';
        const apostleMeaning = document.createElement('strong');
        apostleMeaning.textContent = bridgeData.apostle || 'Les mots encadrés prolongent ce mouvement.';
        apostleSide.append(apostleLabel, apostleMeaning);

        map.append(gospelSide, core, apostleSide);
        bridge.append(evidence, map);
        if (bridgeData.detail) {
            const detail = document.createElement('p');
            detail.className = 'comparison-bridge-detail';
            detail.textContent = bridgeData.detail;
            bridge.appendChild(detail);
        }
        if (connection.bridge_sentence) {
            const sentence = document.createElement('blockquote');
            sentence.className = 'comparison-bridge-sentence';
            const sentenceLabel = document.createElement('span');
            sentenceLabel.textContent = 'Phrase-pont';
            const sentenceText = document.createElement('p');
            sentenceText.textContent = connection.bridge_sentence;
            sentence.append(sentenceLabel, sentenceText);
            bridge.appendChild(sentence);
        }
        if (connection.homiletic_use) {
            const homily = document.createElement('aside');
            homily.className = 'comparison-homiletic-use';
            const homilyTitle = document.createElement('strong');
            homilyTitle.textContent = 'Piste homilétique';
            const homilyText = document.createElement('p');
            homilyText.textContent = connection.homiletic_use;
            homily.append(homilyTitle, homilyText);
            bridge.appendChild(homily);
        }
        if (interactive) {
            const hint = document.createElement('span');
            hint.className = 'comparison-bridge-hint';
            hint.textContent = 'Cliquer pour isoler ce rapprochement';
            bridge.appendChild(hint);
        }
        return bridge;
    };

    const applyComparisonFocus = (index, options = {}) => {
        focusedComparisonIndex = Number.isInteger(index) ? index : null;
        const linksContainer = document.getElementById('comparison-links');
        if (!linksContainer) return;
        linksContainer.classList.toggle('has-focused-link', focusedComparisonIndex !== null);
        linksContainer.querySelectorAll('.comparison-link[data-connection-index]').forEach(article => {
            article.classList.toggle('is-focused', Number(article.dataset.connectionIndex) === focusedComparisonIndex);
        });
        linksContainer.querySelectorAll('.comparison-bridge[role="button"]').forEach(bridge => {
            bridge.setAttribute('aria-pressed', String(Number(bridge.dataset.connectionIndex) === focusedComparisonIndex));
        });
        const fullView = linksContainer.querySelector('.comparison-full-view');
        if (fullView) fullView.classList.toggle('has-focused-link', focusedComparisonIndex !== null);
        linksContainer.querySelectorAll('.comparison-focus-button').forEach(button => {
            button.setAttribute('aria-pressed', String(Number(button.dataset.connectionIndex) === focusedComparisonIndex));
        });
        linksContainer.querySelectorAll('.comparison-full-explanation').forEach(article => {
            article.hidden = Number(article.dataset.connectionIndex) !== focusedComparisonIndex;
        });
        linksContainer.querySelectorAll('.comparison-full-view .connection-highlight').forEach(term => {
            term.classList.toggle('is-focused-term', focusedComparisonIndex !== null
                && term.classList.contains(`comparison-term-link-${focusedComparisonIndex}`));
        });
        if (options.scroll && focusedComparisonIndex !== null) {
            linksContainer.querySelector(`.comparison-full-view .comparison-term-link-${focusedComparisonIndex}`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const renderRelatedComparisons = (linksContainer, data, links) => {
        links.forEach((connection, index) => {
            const article = document.createElement('article');
            article.className = `comparison-link comparison-link-${connection.directness || 'indirect'}`;
            article.dataset.connectionIndex = String(index);
            const grid = document.createElement('div');
            grid.className = 'comparison-grid';
            grid.append(
                buildComparisonReading('Évangile', data.gospel, 'gospel', connection, { connectionIndex: index }),
                buildComparisonReading('Apôtre', data.apostle, 'apostle', connection, { connectionIndex: index })
            );
            article.append(
                buildComparisonHeader(connection, index),
                buildComparisonBridge(connection, index),
                buildComparisonUseAction(connection),
                grid
            );
            linksContainer.appendChild(article);
        });
    };

    const renderFullComparisons = (linksContainer, data, links) => {
        const focusNav = document.createElement('div');
        focusNav.className = 'comparison-focus-nav';
        focusNav.setAttribute('aria-label', 'Choisir un rapprochement à suivre dans les lectures intégrales');
        links.forEach((connection, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'comparison-focus-button';
            button.dataset.connectionIndex = String(index);
            button.textContent = `${index + 1}. ${connection.title || 'Rapprochement'}`;
            button.setAttribute('aria-pressed', 'false');
            button.addEventListener('click', () => applyComparisonFocus(index, { scroll: true }));
            focusNav.appendChild(button);
        });

        const fullView = document.createElement('section');
        fullView.className = 'comparison-full-view';
        const heading = document.createElement('div');
        heading.className = 'comparison-full-heading';
        const title = document.createElement('h3');
        title.textContent = 'Les deux lectures intégrales';
        const instruction = document.createElement('p');
        instruction.textContent = 'Choisissez un rapprochement : les autres mots s’effacent pour laisser apparaître son parcours dans les deux textes.';
        heading.append(title, instruction);
        const grid = document.createElement('div');
        grid.className = 'comparison-grid';
        grid.append(
            buildComparisonReading('Évangile', data.gospel, 'gospel', null, { fullConnections: links }),
            buildComparisonReading('Apôtre', data.apostle, 'apostle', null, { fullConnections: links })
        );
        fullView.append(heading, grid);

        const explanations = document.createElement('div');
        explanations.className = 'comparison-full-explanations';
        links.forEach((connection, index) => {
            const article = document.createElement('article');
            article.className = 'comparison-full-explanation';
            article.dataset.connectionIndex = String(index);
            article.hidden = true;
            article.append(
                buildComparisonHeader(connection, index),
                buildComparisonBridge(connection, index, false),
                buildComparisonUseAction(connection)
            );
            explanations.appendChild(article);
        });
        linksContainer.append(focusNav, fullView, explanations);
    };

    const renderComparisonView = data => {
        const connections = data?.reading_connections;
        currentReadingView = 'compare';
        const comparisonView = document.getElementById('comparison-view');
        const comparisonTitle = document.getElementById('comparison-title');
        const summary = document.getElementById('comparison-summary');
        const linksContainer = document.getElementById('comparison-links');
        const legend = document.querySelector('.comparison-legend');
        const displayToggle = document.getElementById('comparison-display-toggle');
        const verseTitle = document.getElementById('verse-title');
        const mainText = document.getElementById('gospel-text');
        const notesView = document.getElementById('notes-view');
        const annotationHelp = document.querySelector('.annotation-help');
        if (!comparisonView || !linksContainer) return;

        const links = Array.isArray(connections?.links) ? connections.links : [];

        if (!links.length) {
            if (comparisonTitle) comparisonTitle.textContent = 'Comparaison en préparation';
            if (summary) summary.textContent = 'Cette péricope ne possède pas encore de rapprochements validés entre l’Évangile et l’Apôtre.';
            if (legend) legend.hidden = true;
            if (displayToggle) displayToggle.hidden = true;
            linksContainer.innerHTML = '';
            const notice = document.createElement('p');
            notice.className = 'comparison-empty';
            notice.textContent = 'Le mode Comparer est déjà disponible pour la Pentecôte, le dimanche des Saints Pères du premier Concile et le dimanche du Pardon.';
            linksContainer.appendChild(notice);
        } else {
            if (comparisonTitle) comparisonTitle.textContent = connections.title || 'Unité des lectures';
            if (summary) summary.textContent = connections.summary || '';
            if (legend) legend.hidden = false;
            if (displayToggle) displayToggle.hidden = false;
            linksContainer.innerHTML = '';
            document.querySelectorAll('[data-comparison-mode]').forEach(button => {
                button.classList.toggle('active', button.dataset.comparisonMode === comparisonDisplayMode);
            });
            focusedComparisonIndex = comparisonDisplayMode === 'full' ? 0 : null;
            if (comparisonDisplayMode === 'full') renderFullComparisons(linksContainer, data, links);
            else renderRelatedComparisons(linksContainer, data, links);
            applyComparisonFocus(focusedComparisonIndex);
        }

        if (verseTitle) verseTitle.hidden = true;
        if (mainText) mainText.hidden = true;
        if (notesView) notesView.hidden = true;
        if (annotationHelp) annotationHelp.hidden = true;
        comparisonView.hidden = false;
        document.querySelectorAll('#text-selector button').forEach(button => button.classList.remove('active'));
        document.getElementById('select-compare')?.classList.add('active');
        comparisonView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const loadLiturgicalPathData = () => {
        if (!liturgicalPathDataPromise) {
            liturgicalPathDataPromise = fetch(versionedDataPath('data/liturgical_path.json')).then(response => {
                if (!response.ok) throw new Error('Parcours liturgique indisponible');
                return response.json();
            });
        }
        return liturgicalPathDataPromise;
    };

    const openLiturgicalStageReading = async (stage, readingType, compare = false) => {
        if (!stage?.key) return;
        setSelectionMode('pericope');
        const sundaySelect = document.getElementById('sunday-select');
        if (sundaySelect) sundaySelect.value = stage.key;
        await loadTextContext(stage.key, readingType);
        if (compare && currentLectionaryData?.reading_connections?.links?.length) {
            renderComparisonView(currentLectionaryData);
        }
    };

    const renderLiturgicalStage = stage => {
        const detail = document.getElementById('liturgical-stage-detail');
        if (!detail || !stage) return;
        detail.innerHTML = '';

        const heading = document.createElement('div');
        heading.className = 'liturgical-stage-heading';
        const meta = document.createElement('p');
        meta.className = 'liturgical-stage-meta';
        meta.textContent = stage.position;
        const title = document.createElement('h4');
        title.textContent = stage.title;
        const sense = document.createElement('span');
        sense.className = 'liturgical-stage-sense';
        sense.textContent = stage.sense;
        const summary = document.createElement('p');
        summary.className = 'liturgical-stage-summary';
        summary.textContent = stage.summary;
        heading.append(meta, title, sense, summary);

        const readings = document.createElement('section');
        readings.className = 'liturgical-stage-readings';
        const readingsTitle = document.createElement('h5');
        readingsTitle.textContent = 'Ouvrir la péricope';
        const references = document.createElement('p');
        references.textContent = `Évangile : ${stage.readings.gospel} · Apôtre : ${stage.readings.apostle}`;
        const actions = document.createElement('div');
        actions.className = 'liturgical-stage-actions';
        if (stage.key) {
            const gospelButton = document.createElement('button');
            gospelButton.type = 'button';
            gospelButton.textContent = 'Évangile interlinéaire';
            gospelButton.addEventListener('click', () => openLiturgicalStageReading(stage, 'gospel'));
            const apostleButton = document.createElement('button');
            apostleButton.type = 'button';
            apostleButton.textContent = 'Apôtre interlinéaire';
            apostleButton.addEventListener('click', () => openLiturgicalStageReading(stage, 'apostle'));
            actions.append(gospelButton, apostleButton);
            if (stage.comparison) {
                const compareButton = document.createElement('button');
                compareButton.type = 'button';
                compareButton.className = 'path-compare-button';
                compareButton.textContent = 'Comparer les deux';
                compareButton.addEventListener('click', () => openLiturgicalStageReading(stage, 'gospel', true));
                actions.appendChild(compareButton);
            }
        } else {
            const pending = document.createElement('p');
            pending.className = 'liturgical-stage-pending';
            pending.textContent = 'La place liturgique est décrite ; la fiche interlinéaire de cette fête reste à intégrer.';
            actions.appendChild(pending);
        }
        readings.append(readingsTitle, references, actions);

        const links = document.createElement('section');
        links.className = 'liturgical-stage-links';
        const linksTitle = document.createElement('h5');
        linksTitle.textContent = 'Liens intrinsèques';
        const linksGrid = document.createElement('div');
        linksGrid.className = 'liturgical-stage-links-grid';
        (stage.links || []).forEach(link => {
            const card = document.createElement('article');
            card.className = `liturgical-stage-link path-link-${link.type}`;
            const label = document.createElement('strong');
            label.textContent = link.label;
            const text = document.createElement('p');
            text.textContent = link.text;
            card.append(label, text);
            linksGrid.appendChild(card);
        });
        links.append(linksTitle, linksGrid);
        detail.append(heading, readings, links);
    };

    const renderLiturgicalJourney = journey => {
        const selectors = document.getElementById('liturgical-path-selectors');
        const fixedEncounters = document.getElementById('liturgical-fixed-encounters');
        const track = document.getElementById('paschal-path-track');
        const detail = document.getElementById('liturgical-stage-detail');
        const title = document.getElementById('paschal-prototype-title');
        const introduction = document.getElementById('paschal-prototype-introduction');
        if (!journey || !track || !detail || !title || !introduction) return;

        title.textContent = journey.title;
        introduction.textContent = journey.introduction;
        const stageCount = Math.max((journey.stages || []).length, 1);
        track.setAttribute('aria-label', `Étapes — ${journey.title}`);
        track.style.setProperty('--stage-count', String(stageCount));
        track.classList.toggle('is-long', stageCount > 8);
        if (selectors) {
            selectors.querySelectorAll('button').forEach(button => {
                const selected = button.dataset.journeyId === journey.id;
                button.classList.toggle('active', selected);
                button.setAttribute('aria-selected', String(selected));
                button.tabIndex = selected ? 0 : -1;
            });
        }

        if (fixedEncounters) {
            fixedEncounters.innerHTML = '';
            const encounters = journey.fixed_encounters || [];
            fixedEncounters.hidden = !encounters.length;
            if (encounters.length) {
                const encounterTitle = document.createElement('h4');
                encounterTitle.textContent = 'Fêtes fixes qui traversent ce parcours';
                const encounterNote = document.createElement('p');
                encounterNote.className = 'fixed-encounters-note';
                encounterNote.textContent = 'Leur date demeure fixe ; le dimanche du cycle mobile qu’elles rencontrent varie avec la date de Pâques.';
                const encounterGrid = document.createElement('div');
                encounterGrid.className = 'fixed-encounters-grid';
                encounters.forEach(encounter => {
                    const card = document.createElement('article');
                    const date = document.createElement('span');
                    date.textContent = encounter.date;
                    const name = document.createElement('strong');
                    name.textContent = encounter.title;
                    const echo = document.createElement('p');
                    echo.textContent = encounter.echo;
                    card.append(date, name, echo);
                    encounterGrid.appendChild(card);
                });
                fixedEncounters.append(encounterTitle, encounterNote, encounterGrid);
            }
        }

        track.innerHTML = '';
        (journey.stages || []).forEach((stage, index) => {
            const step = document.createElement('div');
            step.className = 'paschal-path-step';
            step.setAttribute('role', 'listitem');
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'paschal-stage-button';
            button.dataset.stageId = stage.id;
            button.setAttribute('aria-pressed', String(index === 0));
            const number = document.createElement('span');
            number.textContent = String(index + 1).padStart(2, '0');
            const label = document.createElement('strong');
            label.textContent = stage.short_label;
            const sense = document.createElement('small');
            sense.textContent = stage.sense;
            button.append(number, label, sense);
            button.addEventListener('click', () => {
                track.querySelectorAll('.paschal-stage-button').forEach(item => {
                    item.setAttribute('aria-pressed', String(item === button));
                });
                renderLiturgicalStage(stage);
                if (window.matchMedia('(max-width: 700px)').matches) {
                    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            step.appendChild(button);
            track.appendChild(step);
        });
        if (journey.stages?.length) renderLiturgicalStage(journey.stages[0]);
    };

    const renderLiturgicalPath = async () => {
        const view = document.getElementById('liturgical-path-view');
        const overview = document.getElementById('liturgical-year-overview');
        const selectors = document.getElementById('liturgical-path-selectors');
        const detail = document.getElementById('liturgical-stage-detail');
        if (!view || !overview || !selectors || !detail) return;
        detail.innerHTML = '<p class="liturgical-path-loading">Chargement du parcours…</p>';
        try {
            const data = await loadLiturgicalPathData();
            document.getElementById('liturgical-path-title').textContent = data.title;
            document.getElementById('liturgical-path-introduction').textContent = data.introduction;
            overview.innerHTML = '';
            (data.overview || []).forEach(period => {
                const card = document.createElement('article');
                card.className = 'liturgical-period-card';
                const title = document.createElement('h4');
                title.textContent = period.title;
                const mobile = document.createElement('p');
                mobile.className = 'liturgical-period-mobile';
                mobile.innerHTML = '<strong>Cycle mobile</strong>';
                mobile.appendChild(document.createTextNode(period.mobile));
                const fixed = document.createElement('p');
                fixed.className = 'liturgical-period-fixed';
                fixed.innerHTML = '<strong>Cycle fixe</strong>';
                fixed.appendChild(document.createTextNode(period.fixed.join(' · ')));
                card.append(title, mobile, fixed);
                overview.appendChild(card);
            });

            const journeys = [data.prototype, ...(data.additional_paths || [])].filter(Boolean);
            selectors.innerHTML = '';
            journeys.forEach((journey, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = `liturgical-path-selector${index === 0 ? ' active' : ''}`;
                button.dataset.journeyId = journey.id;
                button.setAttribute('role', 'tab');
                button.setAttribute('aria-selected', String(index === 0));
                button.tabIndex = index === 0 ? 0 : -1;
                button.textContent = journey.selector_label || journey.title;
                button.addEventListener('click', () => renderLiturgicalJourney(journey));
                selectors.appendChild(button);
            });
            if (journeys.length) renderLiturgicalJourney(journeys[0]);
        } catch {
            detail.innerHTML = '<p class="comparison-empty">Le parcours liturgique est momentanément indisponible.</p>';
        }
    };

    const showLiturgicalPathView = () => {
        currentReadingView = 'path';
        const pathView = document.getElementById('liturgical-path-view');
        if (!pathView) return;
        ['comparison-view', 'verse-title', 'gospel-text', 'notes-view', 'translation-selector', 'panel-toggles', 'text-selector', 'homily-workspace']
            .forEach(id => {
                const element = document.getElementById(id);
                if (element) element.hidden = true;
            });
        const annotationHelp = document.querySelector('.annotation-help');
        if (annotationHelp) annotationHelp.hidden = true;
        pathView.hidden = false;
        renderLiturgicalPath();
        pathView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // --- 2. FONCTION DE BASCULEMENT ---
    const changeTranslation = (version) => {
        const restoreComparison = currentReadingView === 'compare';
        currentTranslation = version;

        // 1. Gestion visuelle des boutons
        document.querySelectorAll('.version-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById('btn-' + version);
        if (activeBtn) activeBtn.classList.add('active');

        // 2. rafraichissement de  l'affichage pour mettre à jour le panneau latéral
        loadTextContext(currentSundayKey, currentReadingType).then(() => {
            if (restoreComparison && currentLectionaryData) renderComparisonView(currentLectionaryData);
        });
    };

    // --- 3. FONCTION DE CHARGEMENT DES DONNÉES (FETCH) ---
    const loadTextContext = async (sundayKey, readingType) => {
        const existingHomilyFields = document.querySelectorAll('#homily-fields textarea');
        if (existingHomilyFields.length) {
            window.clearTimeout(homilySaveTimer);
            localStorage.setItem(getHomilyStorageKey(), JSON.stringify(collectHomilyDraft()));
        }
        currentSundayKey = sundayKey;
        currentReadingType = readingType;
        currentLectionaryData = null;
        showStandardReadingView(readingType);
        updateComparisonAvailability(null);

        const verseTitle = document.getElementById('verse-title');
        const mainText = document.getElementById('gospel-text');
        const greekFull = document.getElementById('greek-full-text');
        const frenchFull = document.getElementById('french-full-text');
        const myNotes = document.getElementById('my-notes');
        const pdfButtonContainer = document.getElementById('pdf-button-container');
        const homileticAxesContainer = document.getElementById('homiletic-axes-container');
        const homileticAxesList = document.getElementById('homiletic-axes-list');
        const liturgicalEchoesContainer = document.getElementById('liturgical-echoes-container');
        const liturgicalEchoesList = document.getElementById('liturgical-echoes-list');
        const goingFurtherContainer = document.getElementById('going-further-container');
        const goingFurtherList = document.getElementById('going-further-list');
        if(mainText) mainText.innerHTML = '<p style="text-align:center;"><em>Chargement...</em></p>';

        try {
            const response = await fetch(versionedDataPath(`data/${sundayKey}.json`));
            if (!response.ok) throw new Error("Fichier JSON manquant dans le dossier /data/");

            const data = await response.json();
            const reading = data[readingType];

            if (!reading) throw new Error(`Section "${readingType}" manquante dans le fichier JSON.`);
            currentLectionaryData = data;
            updateComparisonAvailability(data);

            const referenceHtml = reading.reference
                ? `<span style="display:block; font-size: 0.7em; color: #d9534f; margin-bottom: 5px;">${reading.reference}</span>`
                : '';

            if(verseTitle) verseTitle.innerHTML = referenceHtml + (reading.title || "Titre inconnu");

            // --- GESTION DE L'AFFICHAGE (ARCHITECTURE DYNAMIQUE) ---
            if (mainText && Array.isArray(reading.interlinear)) {
                let htmlFinal = "";
                let fullFrenchText = "";

                reading.interlinear.forEach(verset => {
                    let wordsHtml = "";

                    // Nvlle MÉTHODE ( - Mot-à-Mot)
                    if (Array.isArray(verset.interlinear)) {
                        verset.interlinear.forEach(word => {

                            //  Gestion des bulles d'info
                            const annotation = word.annotation || word.analyse;
                            const annotationType = inferAnnotationType(annotation);
                            const infoClass = annotation ? `mot-info mot-${annotationType}` : '';
                            const dataAttr = annotation
                                ? `data-annotation="${encodeURIComponent(JSON.stringify(annotation))}" tabindex="0" role="button"`
                                : '';

                            wordsHtml += `
                            <div class="word-unit">
                                <span class="greek-word ${infoClass}" ${dataAttr}>${word.greek}</span>
                                <span class="inter-gloss">${word.gloss}</span>
                            </div>`;
                        });
                    }
                    // ANCIENNE MÉTHODE (Rétrocompatibilité)
                    else if (verset.html_content) {
                        wordsHtml = verset.html_content;
                    }

                    // Ajout du bloc verset à la page
                    htmlFinal += `<div class="verse-row" data-num="${verset.verse_number}.">
                                    ${wordsHtml}
                                  </div>`;

                    // Construction du texte intégral pour le panneau de droite
                    if (verset.translations) {
                        const trans = verset.translations[currentTranslation] || "";
                        if (trans) fullFrenchText += `<strong>${verset.verse_number}.</strong> ${trans}<br><br>`;
                    }
                });

                mainText.innerHTML = htmlFinal;

                // Affichage du Panneau Français Intégral
                if(frenchFull) {
                    if (fullFrenchText) {
                        frenchFull.innerHTML = fullFrenchText;
                    } else {
                        const frenchKey = (currentTranslation === 'darby') ? 'french_darby' : 'french_only';
                        frenchFull.innerHTML = reading[frenchKey] || reading['french_only'] || "Traduction non disponible.";
                    }
                }
            }

            // Textes intégraux supplémentaires
            if(greekFull) greekFull.innerText = reading.greek_only || "";
            if(myNotes) myNotes.innerText = reading.personal_analysis || "Pas d'analyse disponible.";
            if (homileticAxesContainer && homileticAxesList) {
                const axes = Array.isArray(reading.homiletic_axes) ? reading.homiletic_axes : [];
                homileticAxesList.innerHTML = '';
                axes.forEach(axis => {
                    const article = document.createElement('article');
                    article.className = 'homiletic-axis';
                    const title = document.createElement('h5');
                    title.textContent = axis.title || 'Axe';
                    article.appendChild(title);
                    if (axis.content) {
                        const content = document.createElement('p');
                        content.textContent = axis.content;
                        article.appendChild(content);
                    }
                    if (Array.isArray(axis.keywords) && axis.keywords.length) {
                        const keywords = document.createElement('p');
                        keywords.className = 'axis-keywords';
                        keywords.textContent = `Mots-clefs : ${axis.keywords.join(' · ')}`;
                        article.appendChild(keywords);
                    }
                    const addButton = document.createElement('button');
                    addButton.type = 'button';
                    addButton.className = 'axis-add-button';
                    addButton.textContent = 'Utiliser cet axe dans mon brouillon';
                    addButton.addEventListener('click', () => addMaterialToHomily({
                        title: axis.title || 'Axe homilétique',
                        content: axis.content || '',
                        keywords: Array.isArray(axis.keywords) ? axis.keywords : []
                    }));
                    article.appendChild(addButton);
                    homileticAxesList.appendChild(article);
                });
                homileticAxesContainer.hidden = axes.length === 0;
            }
            if (liturgicalEchoesContainer && liturgicalEchoesList) {
                const echoes = Array.isArray(reading.liturgical_echoes) ? reading.liturgical_echoes : [];
                liturgicalEchoesList.innerHTML = '';
                echoes.forEach(echo => {
                    const article = document.createElement('article');
                    article.className = 'liturgical-echo';
                    const heading = document.createElement('h5');
                    heading.textContent = echo.title || 'Écho liturgique';
                    article.appendChild(heading);
                    if (echo.reference) {
                        const reference = document.createElement('p');
                        reference.className = 'liturgical-echo-reference';
                        reference.textContent = echo.reference;
                        article.appendChild(reference);
                    }
                    if (echo.content) {
                        const content = document.createElement('p');
                        content.textContent = echo.content;
                        article.appendChild(content);
                    }
                    if (Array.isArray(echo.connections) && echo.connections.length) {
                        const list = document.createElement('ul');
                        echo.connections.forEach(connection => {
                            const item = document.createElement('li');
                            const label = document.createElement('strong');
                            label.textContent = `${connection.label || 'Rapprochement'} : `;
                            item.appendChild(label);
                            item.appendChild(document.createTextNode(connection.content || ''));
                            list.appendChild(item);
                        });
                        article.appendChild(list);
                    }
                    const addButton = document.createElement('button');
                    addButton.type = 'button';
                    addButton.className = 'axis-add-button';
                    addButton.textContent = 'Garder cet écho dans mon brouillon';
                    addButton.addEventListener('click', () => addMaterialToHomily({
                        title: echo.title || 'Écho liturgique',
                        content: [echo.content, ...(echo.connections || []).map(connection => `${connection.label} : ${connection.content}`)].filter(Boolean).join('\n'),
                        keywords: echo.reference ? [echo.reference] : []
                    }));
                    article.appendChild(addButton);
                    liturgicalEchoesList.appendChild(article);
                });
                liturgicalEchoesContainer.hidden = echoes.length === 0;
            }
            currentHomilyData = data;
            renderHomilyReadingContext(data);
            renderHomilyWorkspace(buildUnifiedHomilyContext(data));

// --- GESTION DE LA SECTION "POUR ALLER PLUS LOIN" ---
            if (goingFurtherContainer && goingFurtherList) {
                goingFurtherList.innerHTML = ''; // On vide la liste précédente

                // On vérifie si le JSON contient le bloc going_further
                if (data.going_further && data.going_further.length > 0) {
                    data.going_further.forEach(item => {
                        const li = document.createElement('li');
                        li.style.marginBottom = "8px";

                        // Définir l'icône selon le type
                        let icon = "🔗";
                        if (item.type === "video") icon = "🎥";
                        else if (item.type === "podcast") icon = "🎧";
                        else if (item.type === "article") icon = "📄";

                        li.innerHTML = `
                            ${icon} <strong>${item.source}</strong> :
                            <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="color: #0056b3; text-decoration: none; font-weight: bold;">
                                ${item.title}
                            </a>
                        `;
                        goingFurtherList.appendChild(li);
                    });
                    goingFurtherContainer.style.display = 'block'; // On affiche le bloc
                } else {
                    goingFurtherContainer.style.display = 'none'; // On cache le bloc s'il n'y a pas de lien
                }
            }
            // --- FIN DE LA GESTION "POUR ALLER PLUS LOIN" ---
            // Gestion PDF
            if (pdfButtonContainer) {
                if (reading.pdf_link && reading.pdf_link !== "") {
                    pdfButtonContainer.href = reading.pdf_link;
                    pdfButtonContainer.style.display = "inline-flex";
                } else {
                    pdfButtonContainer.style.display = "none";
                }
            }

            // Mise à jour visuelle des onglets Évangile/Apôtre
            showStandardReadingView(readingType);

        } catch (error) {
            console.error(error);
            if(mainText) mainText.innerHTML = `<p style="color:red; text-align:center;">Erreur : ${error.message}<br><small>(Vérifiez que le fichier data/${sundayKey}.json existe et est valide)</small></p>`;
            if(verseTitle) verseTitle.textContent = "Erreur de chargement";
            if(pdfButtonContainer) pdfButtonContainer.style.display = "none";
            if(homileticAxesContainer) homileticAxesContainer.hidden = true;
        }
    };

    // --- 4. INITIALISATION ---
    const liturgicalGroups = [
        { title: 'Triode — préparation au Carême', matches: key => /^0[0-3]_/.test(key) },
        { title: 'Grand Carême', matches: key => /^1[0-5]_/.test(key) },
        { title: 'Pentecostaire', matches: key => /^2[1-9]_/.test(key) },
        { title: 'Cycle de Matthieu', matches: key => /^3(0[2-9]|1[0-7])_/.test(key) },
        { title: 'Cycle de Luc', matches: key => /^3(1[8-9]|2[0-9]|3[0-2])_/.test(key) },
        { title: 'Nativité et Théophanie', matches: key => /^9[0-5]_/.test(key) }
    ];

    const normalizeSearch = value => String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const normalizeBibleReference = value => normalizeSearch(value)
        .replace(/\b1\s*(?:corinthiens|cor|co)\b/g, '1co')
        .replace(/\b2\s*(?:corinthiens|cor|co)\b/g, '2co')
        .replace(/\b1\s*(?:timothee|tim|tm)\b/g, '1tm')
        .replace(/\b2\s*(?:timothee|tim|tm)\b/g, '2tm')
        .replace(/\b(?:matthieu|mt)\b/g, 'mt')
        .replace(/\b(?:marc|mc)\b/g, 'mc')
        .replace(/\b(?:luc|lc)\b/g, 'lc')
        .replace(/\b(?:jean|jn)\b/g, 'jn')
        .replace(/\b(?:romains|rom|rm)\b/g, 'rm')
        .replace(/\b(?:hebreux|heb|hb)\b/g, 'hb')
        .replace(/\b(?:actes|ac)\b/g, 'ac')
        .replace(/\b(?:galates|gal|ga)\b/g, 'ga')
        .replace(/\b(?:ephesiens|eph|ep)\b/g, 'ep')
        .replace(/\b(?:philippiens|phil|ph)\b/g, 'ph')
        .replace(/\b(?:colossiens|col|cl)\b/g, 'cl')
        .replace(/[^a-z0-9]/g, '');

    const loadLectionaryData = () => {
        if (lectionaryDataPromise) return lectionaryDataPromise;
        lectionaryDataPromise = Promise.all(Object.keys(liturgicalList).map(async key => {
            try {
                const response = await fetch(versionedDataPath(`data/${key}.json`));
                if (!response.ok) return null;
                return { key, data: await response.json() };
            } catch {
                return null;
            }
        })).then(items => items.filter(Boolean));
        return lectionaryDataPromise;
    };

    const setSelectionMode = mode => {
        const showCalendar = mode === 'calendar';
        const showPericope = mode === 'pericope';
        const showTheme = mode === 'theme';
        const showPath = mode === 'path';
        const calendarPanel = document.getElementById('calendar-panel');
        const pericopePanel = document.getElementById('pericope-panel');
        const themePanel = document.getElementById('theme-panel');
        const pathPanel = document.getElementById('path-panel');
        const calendarButton = document.getElementById('mode-calendar');
        const pericopeButton = document.getElementById('mode-pericope');
        const themeButton = document.getElementById('mode-theme');
        const pathButton = document.getElementById('mode-path');
        if (calendarPanel) calendarPanel.hidden = !showCalendar;
        if (pericopePanel) pericopePanel.hidden = !showPericope;
        if (themePanel) themePanel.hidden = !showTheme;
        if (pathPanel) pathPanel.hidden = !showPath;
        [
            [calendarButton, showCalendar],
            [pericopeButton, showPericope],
            [themeButton, showTheme],
            [pathButton, showPath]
        ].forEach(([button, active]) => {
            if (!button) return;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', String(active));
            button.tabIndex = active ? 0 : -1;
        });
        if (showTheme) prepareThemeSearch();
        if (showPath) showLiturgicalPathView();
        else if (currentReadingView === 'path') showStandardReadingView(currentReadingType);
    };

    const themeDisplayLabel = keyword => {
        const parts = String(keyword || '').split(/\s+[—–-]\s+/);
        return (parts[1] || parts[0]).trim();
    };

    const buildThemeIndex = async () => {
        if (themeIndex) return themeIndex;
        if (themeIndexPromise) return themeIndexPromise;
        const status = document.getElementById('theme-search-status');
        if (status) status.textContent = 'Préparation de l’index thématique…';
        themeIndexPromise = loadLectionaryData().then(items => items.flatMap(({ key, data }) => {
                return ['gospel', 'apostle'].flatMap(type => {
                    const reading = data[type];
                    const axes = (reading?.homiletic_axes || []).map((axis, axisIndex) => ({
                        key,
                        type,
                        kind: 'axis',
                        axisIndex,
                        sunday: liturgicalList[key],
                        reference: reading.reference || '',
                        readingTitle: reading.title || '',
                        title: axis.title || 'Axe homilétique',
                        content: axis.content || '',
                        keywords: Array.isArray(axis.keywords) ? axis.keywords : []
                    }));
                    const seenAnnotations = new Set();
                    const annotations = (reading?.interlinear || []).flatMap(verse =>
                        (verse.interlinear || []).flatMap(word => {
                            const rawAnnotation = word.annotation || word.analyse;
                            if (!rawAnnotation) return [];
                            const annotation = typeof rawAnnotation === 'string'
                                ? { title: word.greek || 'Mot grec', content: rawAnnotation }
                                : rawAnnotation;
                            const signature = `${word.greek || ''}|${annotation.title || ''}|${annotation.content || ''}`;
                            if (seenAnnotations.has(signature)) return [];
                            seenAnnotations.add(signature);
                            const explanation = `${annotation.title || ''} ${annotation.content || ''}`;
                            const greekWord = word.greek || '';
                            const movementTerms = /mont|descen|vertical|haut|bas|élev|relev/i.test(explanation)
                                ? [
                                    /^(ἀνα|Ἀνα|ἀνέ|Ἀνέ)/.test(greekWord) ? 'ana' : '',
                                    /^(κατα|Κατα|κατά|Κατά|κατέ|Κατέ)/.test(greekWord) ? 'kata' : '',
                                    'mouvement vertical'
                                ].filter(Boolean)
                                : [];
                            const lexicalTerms = [
                                ...movementTerms,
                                /^(δια|Δια|δι’|Δι’|διὰ|Διὰ)/.test(greekWord) ? 'dia' : '',
                                /^(συν|Συν|συμ|Συμ|συγ|Συγ|συνα|Συνα|συνο|Συνο)/.test(greekWord) ? 'syn avec ensemble communion' : '',
                                /(στή|στῆ|ἵστη|ἱστή|ἀνέστη|ἀνάστη|ἀναστή)/.test(greekWord)
                                    ? 'histemi anistemi tenir debout relever résurrection'
                                    : ''
                            ].filter(Boolean);
                            return [{
                                key,
                                type,
                                kind: 'annotation',
                                sunday: liturgicalList[key],
                                reference: reading.reference || '',
                                readingTitle: reading.title || '',
                                verse: verse.verse_number,
                                title: annotation.title || word.greek || 'Mot grec',
                                content: annotation.content || '',
                                keywords: [word.greek, word.gloss, ...lexicalTerms].filter(Boolean)
                            }];
                        })
                    );
                    return [...axes, ...annotations];
                });
        }));
        themeIndex = await themeIndexPromise;
        return themeIndex;
    };

    const renderThemeSuggestions = index => {
        const container = document.getElementById('theme-suggestions');
        if (!container || container.childElementCount) return;
        const counts = new Map();
        index.forEach(item => item.keywords.forEach(keyword => {
            const label = themeDisplayLabel(keyword);
            const normalized = normalizeSearch(label);
            if (label.length < 3 || !/[a-zà-ÿ]/i.test(label)) return;
            const current = counts.get(normalized) || { label, count: 0 };
            current.count += 1;
            counts.set(normalized, current);
        }));
        [...counts.values()]
            .filter(item => item.count > 1)
            .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'fr'))
            .slice(0, 12)
            .forEach(item => {
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = item.label;
                button.addEventListener('click', () => {
                    const input = document.getElementById('theme-search');
                    if (input) input.value = item.label;
                    renderThemeResults(index, item.label);
                });
                container.appendChild(button);
            });
    };

    const renderThemeResults = (index, query) => {
        const results = document.getElementById('theme-results');
        const status = document.getElementById('theme-search-status');
        if (!results || !status) return;
        const kindFilter = document.getElementById('theme-kind-filter')?.value || 'all';
        const readingFilter = document.getElementById('theme-reading-filter')?.value || 'all';
        const normalizedQuery = normalizeSearch(query.trim());
        results.innerHTML = '';
        if (normalizedQuery.length < 2) {
            status.textContent = 'Saisissez au moins deux lettres ou choisissez un thème fréquent.';
            return;
        }
        const matches = index.filter(item => {
            if (kindFilter !== 'all' && item.kind !== kindFilter) return false;
            if (readingFilter !== 'all' && item.type !== readingFilter) return false;
            return normalizeSearch([
                item.sunday,
                item.reference,
                item.readingTitle,
                item.title,
                item.content,
                ...item.keywords
            ].join(' ')).includes(normalizedQuery);
        });
        status.textContent = `${matches.length} résultat${matches.length > 1 ? 's' : ''} trouvé${matches.length > 1 ? 's' : ''} dans ${new Set(matches.map(item => item.key)).size} péricope${new Set(matches.map(item => item.key)).size > 1 ? 's' : ''}.`;
        matches.slice(0, 60).forEach(item => {
            const article = document.createElement('article');
            article.className = 'theme-result';
            const context = document.createElement('p');
            context.className = 'theme-result-context';
            const resultKind = item.kind === 'annotation'
                ? `Mot grec${item.verse ? ` · v. ${item.verse}` : ''}`
                : 'Axe homilétique';
            context.textContent = `${item.type === 'gospel' ? 'Évangile' : 'Apôtre'} · ${item.reference} · ${resultKind}`;
            const heading = document.createElement('h4');
            heading.textContent = item.title;
            const sunday = document.createElement('p');
            sunday.className = 'theme-result-sunday';
            sunday.textContent = item.sunday;
            const content = document.createElement('p');
            content.textContent = item.content.length > 320 ? `${item.content.slice(0, 317)}…` : item.content;
            const keywords = document.createElement('p');
            keywords.className = 'theme-result-keywords';
            keywords.textContent = item.keywords.join(' · ');
            const open = document.createElement('button');
            open.type = 'button';
            open.textContent = 'Ouvrir cette péricope';
            open.addEventListener('click', () => {
                currentCalendarEntry = null;
                const calendarSelect = document.getElementById('calendar-select');
                const directSelect = document.getElementById('sunday-select');
                if (calendarSelect) calendarSelect.value = '';
                if (directSelect) directSelect.value = item.key;
                loadTextContext(item.key, item.type);
                document.getElementById('verse-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            article.append(context, heading, sunday, content);
            if (item.keywords.length) article.appendChild(keywords);
            article.appendChild(open);
            results.appendChild(article);
        });
        if (matches.length > 60) {
            const note = document.createElement('p');
            note.className = 'theme-results-limit';
            note.textContent = 'Affinez la recherche pour voir les autres résultats.';
            results.appendChild(note);
        }
    };

    const prepareThemeSearch = async () => {
        const index = await buildThemeIndex();
        renderThemeSuggestions(index);
        const input = document.getElementById('theme-search');
        renderThemeResults(index, input?.value || '');
    };

    const populateSundaySelect = (query = '', dataItems = null) => {
        const select = document.getElementById('sunday-select');
        const status = document.getElementById('sunday-search-status');
        if (!select) return [];

        const sortedKeys = Object.keys(liturgicalList).sort();
        const normalizedQuery = normalizeSearch(query.trim());
        const normalizedReference = normalizeBibleReference(query);
        preferredReadingTypeByKey = new Map();
        const dataByKey = new Map((dataItems || []).map(item => [item.key, item.data]));
        const matchingKeys = sortedKeys.filter(key => {
            if (!normalizedQuery) return true;
            if (normalizeSearch(liturgicalList[key]).includes(normalizedQuery)) return true;
            const data = dataByKey.get(key);
            if (!data) return false;
            const matchingTypes = ['gospel', 'apostle'].filter(type => {
                const reading = data[type];
                return normalizeSearch(reading?.title).includes(normalizedQuery)
                    || normalizeBibleReference(reading?.reference).includes(normalizedReference);
            });
            if (matchingTypes.length === 1) preferredReadingTypeByKey.set(key, matchingTypes[0]);
            return matchingTypes.length > 0;
        });
        select.innerHTML = '';

        liturgicalGroups.forEach(group => {
            const keys = matchingKeys.filter(group.matches);
            if (!keys.length) return;
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.title;
            keys.forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = liturgicalList[key];
                optgroup.appendChild(option);
            });
            select.appendChild(optgroup);
        });
        if (!matchingKeys.length) {
            const empty = document.createElement('option');
            empty.textContent = 'Aucune péricope trouvée';
            empty.disabled = true;
            select.appendChild(empty);
        } else if (matchingKeys.includes(currentSundayKey)) {
            select.value = currentSundayKey;
        } else {
            select.selectedIndex = 0;
        }
        if (status) status.textContent = normalizedQuery
            ? `${matchingKeys.length} résultat${matchingKeys.length > 1 ? 's' : ''} par titre ou référence biblique`
            : `${matchingKeys.length} péricopes classées par période`;
        return matchingKeys;
    };

    const populateCalendarSelect = async (requestedYear = 2026) => {
        const calendarSelect = document.getElementById('calendar-select');
        const calendarYearSelect = document.getElementById('calendar-year-select');
        const calendarStatus = document.getElementById('calendar-status');
        const calendarLegend = document.getElementById('calendar-legend');
        const calendarReadingNote = document.getElementById('calendar-reading-note');
        if (!calendarSelect) return;

        try {
            const response = await fetch(versionedDataPath(`data/calendar_${requestedYear}.json`));
            if (!response.ok) throw new Error('calendrier indisponible');
            const calendar = await response.json();
            const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });
            const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
                weekday: 'long', day: 'numeric', month: 'long'
            });
            calendarSundays = calendar.sundays;
            currentCalendarEntry = null;
            if (calendarYearSelect) calendarYearSelect.value = String(calendar.year);
            if (calendarLegend) calendarLegend.hidden = calendar.status !== 'provisional';
            calendarSelect.innerHTML = '<option value="">Choisir un dimanche…</option>';
            let currentMonth = '';
            let group = null;

            calendar.sundays.forEach(sunday => {
                const date = new Date(`${sunday.date}T12:00:00`);
                const month = monthFormatter.format(date);
                if (month !== currentMonth) {
                    currentMonth = month;
                    group = document.createElement('optgroup');
                    group.label = month.charAt(0).toUpperCase() + month.slice(1);
                    calendarSelect.appendChild(group);
                }
                const option = document.createElement('option');
                option.value = sunday.date;
                const isLinked = Boolean(sunday.key || (
                    sunday.readings?.gospel?.key && sunday.readings?.apostle?.key
                ));
                option.className = isLinked ? 'calendar-option-linked' : 'calendar-option-pending';
                option.dataset.status = isLinked ? 'linked' : 'pending';
                const sourceTitle = sunday.official_title || sunday.doxologia_title;
                const relatedTitle = sunday.key
                    ? liturgicalList[sunday.key] || sourceTitle
                    : sourceTitle || liturgicalList[sunday.related_key];
                const sourceTitleSuffix = sunday.key && sourceTitle && liturgicalList[sunday.key]
                    ? ` (${sourceTitle})`
                    : '';
                const statePrefix = calendar.status === 'provisional'
                    ? `${isLinked ? '● Relié' : '○ À valider'} — `
                    : '';
                option.textContent = `${statePrefix}${dateFormatter.format(date)} — ${relatedTitle}${sourceTitleSuffix}`;
                group.appendChild(option);
            });
            calendarSelect.onchange = event => {
                if (!event.target.value) return;
                const entry = calendarSundays.find(item => item.date === event.target.value);
                if (!entry) return;
                currentCalendarEntry = entry;
                const search = document.getElementById('sunday-search');
                if (search) search.value = '';
                populateSundaySelect();
                const readingKey = entry.key || entry.readings?.[currentReadingType]?.key;
                if (readingKey) {
                    loadTextContext(readingKey, currentReadingType);
                } else {
                    showCalendarReadingPending(entry, currentReadingType);
                }
                const directSelect = document.getElementById('sunday-select');
                if (directSelect && readingKey) directSelect.value = readingKey;
                if (calendarReadingNote) {
                    calendarReadingNote.hidden = !entry.note;
                    calendarReadingNote.textContent = entry.note || '';
                }
            };
            if (calendarStatus) {
                const checks = (calendar.cross_checks || [])
                    .map(source => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a>`)
                    .join(' et ');
                if (calendar.status === 'provisional') {
                    calendarStatus.textContent = `Calendrier ${calendar.year} en préparation : les dimanches non encore confirmés restent volontairement sans lecture.`;
                } else {
                    const officialSource = calendar.source.url
                        ? `<a href="${calendar.source.url}" target="_blank" rel="noopener noreferrer">source officielle ${calendar.source.name}</a>`
                        : `source officielle ${calendar.source.name}`;
                    calendarStatus.innerHTML = `Calendrier ${calendar.year} : ${officialSource}${checks ? `, contrôlé avec ${checks}` : ''}.`;
                }
            }
            const today = new Date();
            if (today.getFullYear() === calendar.year) {
                const localDate = [
                    today.getFullYear(),
                    String(today.getMonth() + 1).padStart(2, '0'),
                    String(today.getDate()).padStart(2, '0')
                ].join('-');
                const nextSunday = calendar.sundays.find(sunday => sunday.date >= localDate)
                    || calendar.sundays[calendar.sundays.length - 1];
                if (nextSunday) {
                    calendarSelect.value = nextSunday.date;
                    calendarSelect.dispatchEvent(new Event('change'));
                }
            }
        } catch (error) {
            calendarSelect.innerHTML = '<option value="">Calendrier momentanément indisponible</option>';
            if (calendarStatus) calendarStatus.textContent = 'La recherche par péricope reste disponible.';
        }
    };

    const showCalendarReadingPending = (entry, readingType) => {
        const reading = entry.readings?.[readingType];
        const typeLabel = readingType === 'gospel' ? 'Évangile' : 'Apôtre';
        const title = document.getElementById('verse-title');
        const mainText = document.getElementById('gospel-text');
        const notes = document.getElementById('my-notes');
        const homileticAxes = document.getElementById('homiletic-axes-container');
        const liturgicalEchoes = document.getElementById('liturgical-echoes-container');
        if (title) title.textContent = `${typeLabel} — ${reading?.reference || entry.official_title || entry.doxologia_title}`;
        const year = entry.date?.slice(0, 4) || '';
        if (mainText) mainText.innerHTML = `<p class="calendar-pending">Cette lecture du calendrier ${year} n’est pas encore reliée à une fiche validée dans l’application.</p>`;
        if (notes) notes.textContent = year === '2027'
            ? 'Cette attribution restera en attente jusqu’à sa vérification dans le calendrier officiel de la Métropole Orthodoxe Roumaine — Doyenné de France.'
            : 'La référence a été vérifiée dans le calendrier officiel. Son contenu ne sera ajouté qu’après identification de la source correspondante dans les données.';
        if (homileticAxes) homileticAxes.hidden = true;
        if (liturgicalEchoes) liturgicalEchoes.hidden = true;
        document.querySelectorAll('#text-selector button').forEach(button => button.classList.remove('active'));
        const activeButton = document.getElementById(`select-${readingType}`);
        if (activeButton) activeButton.classList.add('active');
        currentReadingType = readingType;
    };

    populateSundaySelect();
    populateCalendarSelect();
    loadTextContext(currentSundayKey, currentReadingType);

    // --- 5. ÉCOUTEURS D'ÉVÉNEMENTS ---
    const calendarModeButton = document.getElementById('mode-calendar');
    const calendarYearSelect = document.getElementById('calendar-year-select');
    const pericopeModeButton = document.getElementById('mode-pericope');
    const themeModeButton = document.getElementById('mode-theme');
    const pathModeButton = document.getElementById('mode-path');
    if (calendarModeButton) calendarModeButton.addEventListener('click', () => setSelectionMode('calendar'));
    if (calendarYearSelect) calendarYearSelect.addEventListener('change', event => {
        populateCalendarSelect(Number(event.target.value));
    });
    if (pericopeModeButton) pericopeModeButton.addEventListener('click', () => setSelectionMode('pericope'));
    if (themeModeButton) themeModeButton.addEventListener('click', () => setSelectionMode('theme'));
    if (pathModeButton) pathModeButton.addEventListener('click', () => setSelectionMode('path'));

    const themeSearch = document.getElementById('theme-search');
    if (themeSearch) {
        themeSearch.addEventListener('input', async event => {
            const index = await buildThemeIndex();
            renderThemeResults(index, event.target.value);
        });
    }
    ['theme-kind-filter', 'theme-reading-filter'].forEach(filterId => {
        document.getElementById(filterId)?.addEventListener('change', async () => {
            const index = await buildThemeIndex();
            renderThemeResults(index, themeSearch?.value || '');
        });
    });

    const selectElement = document.getElementById('sunday-select');
    if (selectElement) {
        selectElement.addEventListener('change', (e) => {
            if (e.target.value) {
                currentCalendarEntry = null;
                const calendarSelect = document.getElementById('calendar-select');
                const calendarReadingNote = document.getElementById('calendar-reading-note');
                if (calendarSelect) calendarSelect.value = '';
                if (calendarReadingNote) calendarReadingNote.hidden = true;
                loadTextContext(e.target.value, preferredReadingTypeByKey.get(e.target.value) || currentReadingType);
            }
        });
    }
    const sundaySearch = document.getElementById('sunday-search');
    if (sundaySearch) {
        sundaySearch.addEventListener('input', async event => {
            const query = event.target.value;
            const dataItems = query.trim().length >= 2 ? await loadLectionaryData() : null;
            if (event.target.value !== query) return;
            const matchingKeys = populateSundaySelect(query, dataItems);
            if (query.trim() && matchingKeys.length === 1) {
                currentCalendarEntry = null;
                const calendarSelect = document.getElementById('calendar-select');
                const calendarReadingNote = document.getElementById('calendar-reading-note');
                if (calendarSelect) calendarSelect.value = '';
                if (calendarReadingNote) calendarReadingNote.hidden = true;
                loadTextContext(matchingKeys[0], preferredReadingTypeByKey.get(matchingKeys[0]) || currentReadingType);
            }
        });
    }

    const btnGospel = document.getElementById('select-gospel');
    if (btnGospel) {
        btnGospel.addEventListener('click', () => {
            const key = currentCalendarEntry?.key || currentCalendarEntry?.readings?.gospel?.key;
            if (currentCalendarEntry && !key) showCalendarReadingPending(currentCalendarEntry, 'gospel');
            else loadTextContext(key || currentSundayKey, 'gospel');
        });
    }

    const btnApostle = document.getElementById('select-apostle');
    if (btnApostle) {
        btnApostle.addEventListener('click', () => {
            const key = currentCalendarEntry?.key || currentCalendarEntry?.readings?.apostle?.key;
            if (currentCalendarEntry && !key) showCalendarReadingPending(currentCalendarEntry, 'apostle');
            else loadTextContext(key || currentSundayKey, 'apostle');
        });
    }

    const btnCompare = document.getElementById('select-compare');
    if (btnCompare) {
        btnCompare.addEventListener('click', () => {
            if (currentLectionaryData) renderComparisonView(currentLectionaryData);
        });
    }

    document.querySelectorAll('[data-comparison-mode]').forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.comparisonMode;
            if (!currentLectionaryData || !['related', 'full'].includes(mode)) return;
            comparisonDisplayMode = mode;
            renderComparisonView(currentLectionaryData);
        });
    });

  // --- 5. GESTION DES PANNEAUX LATÉRAUX ---
    const frenchView = document.getElementById('french-view');
    const toggleFrench = document.getElementById('toggle-french');

    if (toggleFrench && frenchView) {
        toggleFrench.addEventListener('click', () => {
            frenchView.classList.toggle('hidden');
        });
    }

    // Fermeture globale via les boutons X
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (frenchView) frenchView.classList.add('hidden');
        });
    });

    // Sélection de la version
    const btnVersionSegond = document.getElementById('btn-segond');
    const btnVersionDarby = document.getElementById('btn-darby');

    if (btnVersionSegond) {
        btnVersionSegond.addEventListener('click', () => changeTranslation('segond'));
    }
    if (btnVersionDarby) {
        btnVersionDarby.addEventListener('click', () => changeTranslation('darby'));
    }

    // --- 6. ATELIER DE CONSTRUCTION DE L'HOMÉLIE ---
    const homilyWorkspace = document.getElementById('homily-workspace');
    const toggleHomily = document.getElementById('toggle-homily');
    const closeHomily = document.getElementById('close-homily');
    if (toggleHomily && homilyWorkspace) {
        toggleHomily.addEventListener('click', () => {
            homilyWorkspace.hidden = !homilyWorkspace.hidden;
            if (!homilyWorkspace.hidden) {
                homilyWorkspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    if (closeHomily && homilyWorkspace) {
        closeHomily.addEventListener('click', () => {
            homilyWorkspace.hidden = true;
        });
    }

    const homilyFields = document.getElementById('homily-fields');
    if (homilyFields) {
        homilyFields.addEventListener('input', () => {
            window.clearTimeout(homilySaveTimer);
            homilySaveTimer = window.setTimeout(saveHomilyDraft, 450);
        });
        homilyFields.addEventListener('change', saveHomilyDraft);
        homilyFields.addEventListener('click', event => {
            const button = event.target.closest('.homily-step-move');
            if (!button) return;
            const step = button.closest('[data-homily-step]');
            const grid = step?.parentElement;
            if (!step || !grid) return;
            if (button.dataset.direction === 'up' && step.previousElementSibling) {
                grid.insertBefore(step, step.previousElementSibling);
            }
            if (button.dataset.direction === 'down' && step.nextElementSibling) {
                grid.insertBefore(step.nextElementSibling, step);
            }
            saveHomilyDraft();
        });
    }

    const homilyDraftSelect = document.getElementById('homily-draft-select');
    if (homilyDraftSelect) {
        homilyDraftSelect.addEventListener('change', event => {
            window.clearTimeout(homilySaveTimer);
            saveHomilyDraft();
            const collection = readHomilyCollection();
            if (!collection.drafts.some(draft => draft.id === event.target.value)) return;
            collection.activeId = event.target.value;
            writeHomilyCollection(collection);
            if (currentHomilyData) renderHomilyWorkspace(buildUnifiedHomilyContext(currentHomilyData));
        });
    }

    const newHomilyDraft = document.getElementById('new-homily-draft');
    if (newHomilyDraft) {
        newHomilyDraft.addEventListener('click', () => {
            saveHomilyDraft();
            const collection = readHomilyCollection();
            const draft = createHomilyDraftRecord({}, `Homélie ${collection.drafts.length + 1}`);
            collection.drafts.push(draft);
            collection.activeId = draft.id;
            writeHomilyCollection(collection);
            if (currentHomilyData) renderHomilyWorkspace(buildUnifiedHomilyContext(currentHomilyData));
            const status = document.getElementById('homily-save-status');
            if (status) status.textContent = `${draft.name} créée. Le nouveau brouillon est vide.`;
        });
    }

    const duplicateHomilyDraft = document.getElementById('duplicate-homily-draft');
    if (duplicateHomilyDraft) {
        duplicateHomilyDraft.addEventListener('click', () => {
            saveHomilyDraft();
            const collection = readHomilyCollection();
            const source = collection.drafts.find(draft => draft.id === collection.activeId);
            if (!source) return;
            const copy = createHomilyDraftRecord(JSON.parse(JSON.stringify(source.content || {})), `Copie de ${source.name}`);
            collection.drafts.push(copy);
            collection.activeId = copy.id;
            writeHomilyCollection(collection);
            if (currentHomilyData) renderHomilyWorkspace(buildUnifiedHomilyContext(currentHomilyData));
            const status = document.getElementById('homily-save-status');
            if (status) status.textContent = `${source.name} a été dupliquée.`;
        });
    }

    const renameHomilyDraft = document.getElementById('rename-homily-draft');
    if (renameHomilyDraft) {
        renameHomilyDraft.addEventListener('click', () => {
            saveHomilyDraft();
            const collection = readHomilyCollection();
            const active = collection.drafts.find(draft => draft.id === collection.activeId);
            if (!active) return;
            const name = window.prompt('Nom de cette homélie :', active.name)?.trim();
            if (!name || name === active.name) return;
            active.name = name.slice(0, 80);
            active.updatedAt = new Date().toISOString();
            writeHomilyCollection(collection);
            renderHomilyDraftManager();
            const status = document.getElementById('homily-save-status');
            if (status) status.textContent = `Cette version s’intitule maintenant « ${active.name} ».`;
        });
    }

    const deleteHomilyDraft = document.getElementById('delete-homily-draft');
    if (deleteHomilyDraft) {
        deleteHomilyDraft.addEventListener('click', () => {
            const collection = readHomilyCollection();
            if (collection.drafts.length < 2) return;
            const active = collection.drafts.find(draft => draft.id === collection.activeId);
            if (!active || !window.confirm(`Supprimer définitivement « ${active.name} » ?`)) return;
            collection.drafts = collection.drafts.filter(draft => draft.id !== active.id);
            collection.activeId = collection.drafts.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0].id;
            writeHomilyCollection(collection);
            if (currentHomilyData) renderHomilyWorkspace(buildUnifiedHomilyContext(currentHomilyData));
            const status = document.getElementById('homily-save-status');
            if (status) status.textContent = `« ${active.name} » a été supprimée.`;
        });
    }

    const addHomilyStep = document.getElementById('add-homily-step');
    if (addHomilyStep) {
        addHomilyStep.addEventListener('click', () => {
            const draft = collectHomilyDraft();
            const id = `personal-${Date.now()}`;
            draft[id] = '';
            draft._steps = [...(draft._steps || []), {
                id,
                title: 'Étape personnelle',
                active: true,
                phase: 'gestation',
                order: (draft._steps || []).length,
                custom: true
            }];
            const collection = readHomilyCollection();
            const active = collection.drafts.find(item => item.id === collection.activeId);
            if (active) {
                active.content = draft;
                active.updatedAt = new Date().toISOString();
                writeHomilyCollection(collection);
            }
            if (currentHomilyData) renderHomilyWorkspace(buildUnifiedHomilyContext(currentHomilyData));
            const titleInput = document.querySelector(`[data-homily-step="${id}"] .homily-step-title`);
            if (titleInput) {
                titleInput.focus();
                titleInput.select();
            }
        });
    }

    const oralReviewList = document.getElementById('oral-review-list');
    if (oralReviewList) {
        oralReviewList.addEventListener('change', saveHomilyDraft);
    }

    const prepareHomilyOutline = document.getElementById('prepare-homily-outline');
    if (prepareHomilyOutline) {
        prepareHomilyOutline.addEventListener('click', () => {
            const planningFields = Array.from(document.querySelectorAll('[data-homily-step]'))
                .filter(step => step.querySelector('.homily-step-active')?.checked !== false)
                .map(step => step.querySelector('textarea:not([data-field-id="oral"])'))
                .filter(Boolean)
                .filter(field => field.value.trim());
            const finalField = document.querySelector('#homily-fields textarea[data-field-id="oral"]');
            const status = document.getElementById('homily-save-status');
            if (!planningFields.length || !finalField) {
                if (status) status.textContent = 'Renseignez d’abord au moins une étape de préparation.';
                return;
            }

            const outline = planningFields
                .map(field => `${field.closest('[data-homily-step]')?.querySelector('.homily-step-title')?.value || field.dataset.fieldTitle}\n${field.value.trim()}`)
                .join('\n\n');
            const block = `TRAME DE RÉDACTION\n\n${outline}`;
            if (!finalField.value.includes(block)) {
                finalField.value = finalField.value.trim()
                    ? `${finalField.value.trim()}\n\n${block}`
                    : block;
                saveHomilyDraft();
                if (status) status.textContent = 'Le plan a été reporté dans la rédaction finale.';
            } else if (status) {
                status.textContent = 'Cette trame figure déjà dans la rédaction finale.';
            }
            finalField.focus({ preventScroll: true });
            finalField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    const escapeHomilyHtml = value => String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const buildHomilyDocumentHtml = (exported, printable = false) => {
        const sections = exported.sections
            .filter(section => section.content)
            .map(section => `<section><h2>${escapeHomilyHtml(section.title)}</h2><p>${escapeHomilyHtml(section.content).replace(/\n/g, '<br>')}</p></section>`)
            .join('');
        return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${escapeHomilyHtml(exported.title)}</title>
            <style>
                @page{size:A4;margin:2cm}
                body{max-width:760px;margin:${printable ? '0 auto' : '2.5cm auto'};font-family:Georgia,serif;line-height:1.58;color:#26221d}
                h1{margin:0 0 .3em;color:#671717;font-size:22pt} .reference{margin:0 0 2em;color:#5b5144;font-size:11pt}
                h2{margin:1.5em 0 .45em;color:#263c5a;font-size:14pt;break-after:avoid} p{margin:.2em 0;font-size:12pt;white-space:normal}
                section{break-inside:avoid-page}
            </style></head><body><h1>${escapeHomilyHtml(exported.title)}</h1><p class="reference"><strong>${escapeHomilyHtml(exported.reference)}</strong></p>${sections}</body></html>`;
    };

    const copyTextToClipboard = async text => {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return;
        }
        const field = document.createElement('textarea');
        field.value = text;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('copy');
    };

    const copyFinalHomily = async (feedbackButton = null) => {
        saveHomilyDraft();
        const oralText = document.querySelector('#homily-fields textarea[data-field-id="oral"]')?.value.trim() || '';
        const status = document.getElementById('homily-save-status');
        if (!oralText) {
            if (status) status.textContent = 'La rédaction finale est encore vide.';
            return;
        }
        try {
            await copyTextToClipboard(oralText);
            if (status) status.textContent = 'Le texte final a été copié.';
            if (feedbackButton) {
                const previousLabel = feedbackButton.textContent;
                feedbackButton.textContent = 'Copié';
                window.setTimeout(() => { feedbackButton.textContent = previousLabel; }, 1400);
            }
        } catch {
            if (status) status.textContent = 'La copie a été refusée par le navigateur. Sélectionnez le texte manuellement.';
        }
    };

    document.getElementById('copy-homily')?.addEventListener('click', event => copyFinalHomily(event.currentTarget));

    const proclamationDialog = document.getElementById('proclamation-dialog');
    const proclamationText = document.getElementById('proclamation-text');
    const proclamationTime = document.getElementById('proclamation-time');
    const proclamationTimerToggle = document.getElementById('proclamation-timer-toggle');
    let proclamationFontSize = 1.45;
    let proclamationElapsed = 0;
    let proclamationTimerId = null;

    const renderProclamationTimer = () => {
        if (!proclamationTime) return;
        const minutes = Math.floor(proclamationElapsed / 60);
        const seconds = proclamationElapsed % 60;
        proclamationTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    const pauseProclamationTimer = () => {
        window.clearInterval(proclamationTimerId);
        proclamationTimerId = null;
        if (proclamationTimerToggle) proclamationTimerToggle.textContent = 'Reprendre';
    };
    const updateProclamationFont = () => {
        if (proclamationText) proclamationText.style.fontSize = `${proclamationFontSize}rem`;
    };

    document.getElementById('open-proclamation-mode')?.addEventListener('click', () => {
        saveHomilyDraft();
        const exported = buildHomilyExport();
        const oralSection = exported.sections.find(section => section.id === 'oral' && section.content);
        const status = document.getElementById('homily-save-status');
        if (!oralSection?.content) {
            if (status) status.textContent = 'Rédigez d’abord le texte final pour ouvrir le mode proclamation.';
            return;
        }
        document.getElementById('proclamation-title').textContent = exported.title;
        document.getElementById('proclamation-reference').textContent = exported.reference;
        proclamationText.textContent = oralSection.content;
        updateProclamationFont();
        if (typeof proclamationDialog?.showModal === 'function') proclamationDialog.showModal();
        else proclamationDialog?.setAttribute('open', '');
    });
    document.getElementById('proclamation-smaller')?.addEventListener('click', () => {
        proclamationFontSize = Math.max(1, proclamationFontSize - .15);
        updateProclamationFont();
    });
    document.getElementById('proclamation-larger')?.addEventListener('click', () => {
        proclamationFontSize = Math.min(2.5, proclamationFontSize + .15);
        updateProclamationFont();
    });
    proclamationTimerToggle?.addEventListener('click', () => {
        if (proclamationTimerId) {
            pauseProclamationTimer();
            return;
        }
        proclamationTimerToggle.textContent = 'Pause';
        proclamationTimerId = window.setInterval(() => {
            proclamationElapsed += 1;
            renderProclamationTimer();
        }, 1000);
    });
    document.getElementById('proclamation-timer-reset')?.addEventListener('click', () => {
        proclamationElapsed = 0;
        renderProclamationTimer();
    });
    document.getElementById('proclamation-copy')?.addEventListener('click', event => copyFinalHomily(event.currentTarget));
    document.getElementById('proclamation-close')?.addEventListener('click', () => proclamationDialog?.close());
    proclamationDialog?.addEventListener('close', pauseProclamationTimer);

    const printHomily = document.getElementById('print-homily');
    if (printHomily) {
        printHomily.addEventListener('click', () => {
            saveHomilyDraft();
            const printWindow = window.open('', '_blank');
            const status = document.getElementById('homily-save-status');
            if (!printWindow) {
                if (status) status.textContent = 'La fenêtre d’impression a été bloquée par le navigateur. Autorisez les fenêtres contextuelles puis réessayez.';
                return;
            }
            printWindow.document.write(buildHomilyDocumentHtml(buildHomilyExport(), true));
            printWindow.document.close();
            printWindow.opener = null;
            window.setTimeout(() => {
                printWindow.focus();
                printWindow.print();
            }, 250);
            if (status) status.textContent = 'La mise en page est prête : choisissez votre imprimante ou « Enregistrer au format PDF ».';
        });
    }

    const exportDoc = document.getElementById('export-homily-doc');
    if (exportDoc) {
        exportDoc.addEventListener('click', () => {
            saveHomilyDraft();
            const exported = buildHomilyExport();
            downloadFile(buildHomilyDocumentHtml(exported), 'application/msword;charset=utf-8', 'doc');
        });
    }

    const exportTxt = document.getElementById('export-homily-txt');
    if (exportTxt) {
        exportTxt.addEventListener('click', () => {
            saveHomilyDraft();
            const exported = buildHomilyExport();
            const sections = exported.sections
                .filter(section => section.content)
                .map(section => `${section.title}\n${section.content}`)
                .join('\n\n');
            downloadFile(`${exported.title}\n${exported.reference}\n\n${sections}\n`, 'text/plain;charset=utf-8', 'txt');
        });
    }

    const homilyStoragePattern = /^lectionnaire:homil(?:y|ies):[a-zA-Z0-9_-]+(?::(?:gospel|apostle))?$/;

    const migrateAllLegacyHomilies = () => {
        const legacyKeys = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
            .filter(key => /^lectionnaire:homily:[a-zA-Z0-9_-]+$/.test(key || ''));
        legacyKeys.forEach(key => {
            const sundayKey = key.replace('lectionnaire:homily:', '');
            if (localStorage.getItem(getHomilyCollectionKey(sundayKey))) return;
            const content = parseStoredDraft(key);
            if (!content || !Object.keys(content).length) return;
            const first = createHomilyDraftRecord(content, 'Homélie 1');
            writeHomilyCollection({ version: 1, activeId: first.id, drafts: [first] }, sundayKey);
        });
    };

    const homilyContentProgress = content => {
        const values = Object.entries(content || {})
            .filter(([key]) => !key.startsWith('_'))
            .map(([, value]) => String(value || '').trim());
        if (!values.length) return 0;
        return Math.round(values.filter(Boolean).length / values.length * 100);
    };

    const formatHomilyDate = value => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return 'date inconnue';
        return new Intl.DateTimeFormat('fr-FR', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(date);
    };

    const renderHomilyLibrary = () => {
        migrateAllLegacyHomilies();
        const list = document.getElementById('homily-library-list');
        const count = document.getElementById('homily-library-count');
        if (!list) return;
        const entries = [];
        for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            const match = /^lectionnaire:homilies:([a-zA-Z0-9_-]+)$/.exec(key || '');
            if (!match) continue;
            const sundayKey = match[1];
            const collection = parseStoredDraft(key);
            if (!Array.isArray(collection.drafts)) continue;
            collection.drafts.forEach(draft => entries.push({ sundayKey, draft, collection }));
        }
        entries.sort((a, b) => new Date(b.draft.updatedAt || 0) - new Date(a.draft.updatedAt || 0));
        const normalizeSearch = value => String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
        const query = normalizeSearch(document.getElementById('homily-library-search')?.value.trim());
        const progressFilter = document.getElementById('homily-library-progress-filter')?.value || 'all';
        const filteredEntries = entries.filter(({ sundayKey, draft }) => {
            const progress = homilyContentProgress(draft.content);
            const matchesText = !query || normalizeSearch(`${draft.name} ${liturgicalList[sundayKey] || sundayKey}`).includes(query);
            const matchesProgress = progressFilter === 'all'
                || (progressFilter === 'empty' && progress === 0)
                || (progressFilter === 'started' && progress > 0)
                || (progressFilter === 'advanced' && progress >= 60);
            return matchesText && matchesProgress;
        });
        list.innerHTML = '';
        if (count) {
            count.textContent = `${filteredEntries.length} homélie${filteredEntries.length > 1 ? 's' : ''}${filteredEntries.length !== entries.length ? ` sur ${entries.length}` : ''}`;
        }
        if (!filteredEntries.length) {
            const empty = document.createElement('p');
            empty.className = 'homily-library-empty';
            empty.textContent = entries.length
                ? 'Aucune homélie ne correspond à cette recherche.'
                : 'Aucune homélie enregistrée pour le moment. Ouvrez une péricope puis commencez un brouillon.';
            list.appendChild(empty);
            return;
        }
        filteredEntries.forEach(({ sundayKey, draft, collection }) => {
            const card = document.createElement('article');
            card.className = 'homily-library-card';
            const text = document.createElement('div');
            const title = document.createElement('h4');
            title.textContent = draft.name || 'Homélie';
            const pericope = document.createElement('p');
            pericope.className = 'homily-library-pericope';
            pericope.textContent = liturgicalList[sundayKey] || sundayKey;
            const meta = document.createElement('p');
            meta.className = 'homily-library-meta';
            meta.textContent = `Modifiée le ${formatHomilyDate(draft.updatedAt)} · ${homilyContentProgress(draft.content)} % renseigné`;
            text.append(title, pericope, meta);
            const open = document.createElement('button');
            open.type = 'button';
            open.className = 'tool-btn';
            open.textContent = 'Ouvrir';
            open.addEventListener('click', async () => {
                collection.activeId = draft.id;
                writeHomilyCollection(collection, sundayKey);
                currentCalendarEntry = null;
                const calendarSelect = document.getElementById('calendar-select');
                if (calendarSelect) calendarSelect.value = '';
                const sundaySelect = document.getElementById('sunday-select');
                if (sundaySelect) sundaySelect.value = sundayKey;
                document.getElementById('homily-library-dialog')?.close();
                await loadTextContext(sundayKey, 'gospel');
                const workspace = document.getElementById('homily-workspace');
                if (workspace) {
                    workspace.hidden = false;
                    workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            card.append(text, open);
            list.appendChild(card);
        });
    };

    const homilyLibraryDialog = document.getElementById('homily-library-dialog');
    const openHomilyLibrary = document.getElementById('open-homily-library');
    const closeHomilyLibrary = document.getElementById('homily-library-close');
    if (openHomilyLibrary && homilyLibraryDialog) {
        openHomilyLibrary.addEventListener('click', () => {
            saveHomilyDraft();
            renderHomilyLibrary();
            if (typeof homilyLibraryDialog.showModal === 'function') homilyLibraryDialog.showModal();
            else homilyLibraryDialog.setAttribute('open', '');
        });
    }
    if (closeHomilyLibrary && homilyLibraryDialog) {
        closeHomilyLibrary.addEventListener('click', () => homilyLibraryDialog.close());
    }
    document.getElementById('homily-library-search')?.addEventListener('input', renderHomilyLibrary);
    document.getElementById('homily-library-progress-filter')?.addEventListener('change', renderHomilyLibrary);
    homilyLibraryDialog?.addEventListener('click', event => {
        if (event.target === homilyLibraryDialog) homilyLibraryDialog.close();
    });

    const collectAllStoredHomilies = () => {
        const drafts = {};
        for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (!key || !homilyStoragePattern.test(key)) continue;
            const value = parseStoredDraft(key);
            if (value && typeof value === 'object' && !Array.isArray(value)) drafts[key] = value;
        }
        return drafts;
    };

    const backupHomilyDrafts = document.getElementById('backup-homily-drafts');
    if (backupHomilyDrafts) {
        backupHomilyDrafts.addEventListener('click', () => {
            saveHomilyDraft();
            const drafts = collectAllStoredHomilies();
            const status = document.getElementById('homily-save-status');
            if (!Object.keys(drafts).length) {
                if (status) status.textContent = 'Aucun brouillon à sauvegarder.';
                return;
            }
            const payload = JSON.stringify({
                format: 'lectionnaire-homelies',
                version: 1,
                exportedAt: new Date().toISOString(),
                drafts
            }, null, 2);
            const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `sauvegarde-homelies-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(link.href);
            if (status) status.textContent = `${Object.keys(drafts).length} brouillon${Object.keys(drafts).length > 1 ? 's' : ''} sauvegardé${Object.keys(drafts).length > 1 ? 's' : ''} dans un fichier.`;
        });
    }

    const restoreHomilyDrafts = document.getElementById('restore-homily-drafts');
    const restoreHomilyFile = document.getElementById('restore-homily-file');
    if (restoreHomilyDrafts && restoreHomilyFile) {
        restoreHomilyDrafts.addEventListener('click', () => restoreHomilyFile.click());
        restoreHomilyFile.addEventListener('change', async () => {
            const status = document.getElementById('homily-save-status');
            const file = restoreHomilyFile.files?.[0];
            if (!file) return;
            let previousValues = null;
            try {
                const payload = JSON.parse(await file.text());
                if (payload?.format !== 'lectionnaire-homelies' || payload?.version !== 1 || !payload.drafts || typeof payload.drafts !== 'object') {
                    throw new Error('format');
                }
                const entries = Object.entries(payload.drafts).filter(([key, value]) =>
                    homilyStoragePattern.test(key)
                    && value
                    && typeof value === 'object'
                    && !Array.isArray(value)
                );
                if (!entries.length) throw new Error('empty');
                const replacements = entries.filter(([key]) => localStorage.getItem(key) !== null).length;
                if (replacements && !window.confirm(`${replacements} brouillon${replacements > 1 ? 's existants seront remplacés' : ' existant sera remplacé'}. Continuer ?`)) {
                    if (status) status.textContent = 'Restauration annulée : aucun brouillon n’a été modifié.';
                    return;
                }
                previousValues = new Map(entries.map(([key]) => [key, localStorage.getItem(key)]));
                entries.forEach(([key, value]) => localStorage.setItem(key, JSON.stringify(value)));
                if (currentHomilyData) renderHomilyWorkspace(buildUnifiedHomilyContext(currentHomilyData));
                if (status) status.textContent = `${entries.length} brouillon${entries.length > 1 ? 's restaurés' : ' restauré'} depuis la sauvegarde.`;
            } catch {
                previousValues?.forEach((value, key) => {
                    if (value === null) localStorage.removeItem(key);
                    else localStorage.setItem(key, value);
                });
                if (status) status.textContent = 'Ce fichier ne constitue pas une sauvegarde valide de l’application.';
            } finally {
                restoreHomilyFile.value = '';
            }
        });
    }

    const clearHomily = document.getElementById('clear-homily');
    if (clearHomily) {
        clearHomily.addEventListener('click', () => {
            if (!window.confirm('Effacer le brouillon de cette péricope sur cet appareil ?')) return;
            window.clearTimeout(homilySaveTimer);
            const collection = readHomilyCollection();
            const active = collection.drafts.find(draft => draft.id === collection.activeId);
            if (active) {
                active.content = {};
                active.updatedAt = new Date().toISOString();
                writeHomilyCollection(collection);
            }
            localStorage.removeItem(getHomilyStorageKey());
            localStorage.removeItem(getLegacyHomilyStorageKey('gospel'));
            localStorage.removeItem(getLegacyHomilyStorageKey('apostle'));
            document.querySelectorAll('#homily-fields textarea').forEach(field => {
                field.value = '';
            });
            document.querySelectorAll('#oral-review-list input').forEach(input => {
                input.checked = false;
            });
            if (currentHomilyData) renderHomilyWorkspace(buildUnifiedHomilyContext(currentHomilyData));
            updateHomilyProgress();
            const status = document.getElementById('homily-save-status');
            if (status) status.textContent = 'Brouillon effacé.';
        });
    }

    const saveCurrentHomilyBeforeLeaving = () => {
        if (!currentHomilyData || !document.querySelector('#homily-fields textarea')) return;
        window.clearTimeout(homilySaveTimer);
        saveHomilyDraft();
    };
    window.addEventListener('pagehide', saveCurrentHomilyBeforeLeaving);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') saveCurrentHomilyBeforeLeaving();
    });
    document.addEventListener('keydown', event => {
        if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 's') return;
        event.preventDefault();
        saveCurrentHomilyBeforeLeaving();
    });

// --- 7. FENÊTRE D'ANALYSE DES MOTS ---
    const analysisDialog = document.getElementById('analysis-dialog');
    const analysisDialogClose = document.getElementById('analysis-dialog-close');
    const addAnnotationToHomily = document.getElementById('add-annotation-to-homily');
    const comparisonTermDialog = document.getElementById('comparison-term-dialog');
    const comparisonTermClose = document.getElementById('comparison-term-close');
    const addComparisonToHomily = document.getElementById('add-comparison-to-homily');
    let currentAnnotationMaterial = null;
    let currentComparisonMaterial = null;

    const decodeTargetAnnotation = target => {
        const encoded = target?.getAttribute('data-annotation');
        if (!encoded) return null;
        try {
            const annotation = JSON.parse(decodeURIComponent(encoded));
            return typeof annotation === 'string'
                ? { type: 'analyse', title: target.textContent, content: annotation }
                : annotation;
        } catch {
            return { type: 'analyse', title: target.textContent, content: decodeURIComponent(encoded) };
        }
    };

    const openComparisonTerm = target => {
        if (!comparisonTermDialog || !target || !currentLectionaryData) return;
        const indexes = String(target.dataset.connectionIndexes || '')
            .split(',')
            .map(value => Number(value))
            .filter(Number.isInteger);
        const connectionIndex = focusedComparisonIndex !== null && indexes.includes(focusedComparisonIndex)
            ? focusedComparisonIndex
            : indexes[0];
        const connection = currentLectionaryData.reading_connections?.links?.[connectionIndex];
        if (!connection) return;
        const side = target.dataset.comparisonSide;
        const token = target.dataset.comparisonToken || normalizeGreekToken(target.textContent);
        const detail = findComparisonTermDetail(connection, side, token) || {};
        const annotation = decodeTargetAnnotation(target) || {};
        const annotationLemma = String(annotation.title || '').split(/\s+[—–-]\s+/)[0].trim();
        const gloss = target.closest('.comparison-word-unit')?.querySelector('.inter-gloss')?.textContent?.trim();
        const bridge = connection.bridge || {};
        const sideLabel = side === 'apostle' ? 'Dans l’Apôtre' : 'Dans l’Évangile';

        document.getElementById('comparison-term-title').textContent = `${target.textContent.trim()} — ${sideLabel}`;
        document.getElementById('comparison-term-form').textContent = target.textContent.trim();
        document.getElementById('comparison-term-lemma').textContent = detail.lemma || annotationLemma || 'Lemme non renseigné';
        document.getElementById('comparison-term-root').textContent = detail.root || 'Racine non renseignée pour cette forme';
        document.getElementById('comparison-term-literal').textContent = detail.literal || gloss || 'Sens littéral non renseigné';
        document.getElementById('comparison-term-role').textContent = detail.role || bridge[side]
            || 'Ce mot appartient au groupe grec encadré dans ce rapprochement.';
        document.getElementById('comparison-term-relation').textContent = bridge.relation || connection.explanation || connection.title;
        document.getElementById('comparison-term-evidence').textContent = bridge.evidence || (connection.directness === 'direct'
            ? 'Correspondance lexicale grecque.'
            : 'Rapprochement de sens sans racine grecque commune.');
        document.getElementById('comparison-term-sentence').textContent = connection.bridge_sentence
            || 'La phrase-pont n’est pas encore formulée pour ce rapprochement.';
        document.getElementById('comparison-term-homily').textContent = connection.homiletic_use
            || 'Ce rapprochement demande encore une formulation homilétique.';
        currentComparisonMaterial = buildComparisonHomilyMaterial(connection);
        applyComparisonFocus(connectionIndex);
        if (typeof comparisonTermDialog.showModal === 'function') comparisonTermDialog.showModal();
        else comparisonTermDialog.setAttribute('open', '');
    };

    const openAnnotation = (target) => {
        if (!analysisDialog || !target) return;
        const encoded = target.getAttribute('data-annotation');
        if (!encoded) return;

        let annotation;
        try {
            annotation = JSON.parse(decodeURIComponent(encoded));
        } catch {
            annotation = decodeURIComponent(encoded);
        }

        const normalized = typeof annotation === 'string'
            ? { type: 'analyse', title: target.textContent, content: annotation }
            : annotation;

        const labels = {
            analyse: 'Analyse',
            racine: 'Racine et étymologie',
            repetition: 'Répétition et structure',
            traduction: 'Choix de traduction',
            theologie: 'Lecture théologique'
        };
        const type = inferAnnotationType(normalized);
        currentAnnotationMaterial = {
            title: normalized.title || target.textContent,
            content: normalized.content || '',
            keywords: [target.textContent.trim()].filter(Boolean)
        };
        document.getElementById('analysis-dialog-type').textContent = labels[type] || labels.analyse;
        document.getElementById('analysis-dialog-title').textContent = normalized.title || target.textContent;
        document.getElementById('analysis-dialog-content').textContent = normalized.content || '';

        const related = document.getElementById('analysis-dialog-related');
        const relatedWords = Array.isArray(normalized.related) ? normalized.related : [];
        related.hidden = relatedWords.length === 0;
        related.textContent = relatedWords.length ? `Mots liés : ${relatedWords.join(', ')}` : '';

        const source = document.getElementById('analysis-dialog-source');
        source.hidden = !normalized.source;
        source.textContent = normalized.source ? `Source : ${normalized.source}` : '';

        if (typeof analysisDialog.showModal === 'function') analysisDialog.showModal();
        else analysisDialog.setAttribute('open', '');
    };

    document.addEventListener('click', (event) => {
        const comparisonTarget = event.target.closest('.comparison-term');
        if (comparisonTarget) {
            event.preventDefault();
            openComparisonTerm(comparisonTarget);
            return;
        }
        const target = event.target.closest('.mot-info');
        if (target) {
            event.preventDefault();
            openAnnotation(target);
        }
    });

    document.addEventListener('keydown', (event) => {
        const comparisonTarget = event.target.closest && event.target.closest('.comparison-term');
        if (comparisonTarget && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            openComparisonTerm(comparisonTarget);
            return;
        }
        const target = event.target.closest && event.target.closest('.mot-info');
        if (target && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            openAnnotation(target);
        }
    });

    if (analysisDialogClose) {
        analysisDialogClose.addEventListener('click', () => analysisDialog.close());
    }
    if (comparisonTermClose) {
        comparisonTermClose.addEventListener('click', () => comparisonTermDialog.close());
    }
    if (addComparisonToHomily) {
        addComparisonToHomily.addEventListener('click', () => {
            if (!currentComparisonMaterial) return;
            addMaterialToHomily(currentComparisonMaterial);
            comparisonTermDialog.close();
        });
    }
    if (comparisonTermDialog) {
        comparisonTermDialog.addEventListener('click', event => {
            if (event.target === comparisonTermDialog) comparisonTermDialog.close();
        });
    }
    if (analysisDialog) {
        analysisDialog.addEventListener('click', event => {
            if (event.target !== analysisDialog) return;
            const rect = analysisDialog.getBoundingClientRect();
            const insideDialog = event.clientX >= rect.left && event.clientX <= rect.right
                && event.clientY >= rect.top && event.clientY <= rect.bottom;
            if (!insideDialog) analysisDialog.close();
        });
    }
    if (addAnnotationToHomily) {
        addAnnotationToHomily.addEventListener('click', () => {
            if (!currentAnnotationMaterial) return;
            addMaterialToHomily(currentAnnotationMaterial);
            analysisDialog.close();
        });
    }
 });
