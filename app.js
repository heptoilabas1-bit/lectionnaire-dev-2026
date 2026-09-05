// Fichier: app.js (VERSION FRANÇAISE ÉPURÉE - JSON MOT-À-MOT + BULLES D'INFO)

document.addEventListener('DOMContentLoaded', () => {

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
        '27_holy_fathers_1': 'Saints Pères du 1er Concile (7e de Pâques)',
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
        '329_after_pentecost_29': 'Les Saints Ancêtres (Grand Souper)',
        '330_after_pentecost_30': 'Le Jeune Homme Riche (13e de Luc)',
        '331_after_pentecost_31': 'L\'Aveugle de Jéricho (14e de Luc)',
        '332_after_pentecost_32': 'Zachée (15e de Luc)',

        // --- Cycle de la Nativité et de la Théophanie ---
        '90_advent_2': 'Les Saints Ancêtres (2e dimanche avant la Nativité)',
        '91_advent_1': 'Généalogie du Seigneur (Dimanche avant la Nativité)',
        '92_nativity_after': 'La Fuite en Égypte (Dimanche après la Nativité)',
        '93_theophany_before': 'Commencement de l’Évangile (Dimanche avant la Théophanie)',
        '94_theophany_after': 'Le début de la Prédication (Dimanche après la Théophanie)',
        '95_canaanite': 'La Cananéenne (Dimanche tampon de janvier)'
    };

    // --- SÉCURITÉ : CHOIX PAR DÉFAUT ---
    let currentSundayKey = '00_publican_pharisee';
    let currentReadingType = 'gospel';
    let currentTranslation = 'segond';
    let currentHomilyReference = '';
    let currentHomilyReadingTitle = '';
    let calendarSundays = [];
    let currentCalendarEntry = null;

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
        `lectionnaire:homily:${currentSundayKey}:${currentReadingType}`;

    const readHomilyDraft = () => {
        try {
            return JSON.parse(localStorage.getItem(getHomilyStorageKey())) || {};
        } catch {
            return {};
        }
    };

    const collectHomilyDraft = () => {
        const draft = {};
        document.querySelectorAll('#homily-fields textarea').forEach(field => {
            draft[field.dataset.fieldId] = field.value;
        });
        draft._oralReview = Array.from(document.querySelectorAll('#oral-review-list input:checked'))
            .map(input => input.value);
        return draft;
    };

    const updateHomilyProgress = () => {
        const fields = Array.from(document.querySelectorAll('#homily-fields textarea'));
        const completed = fields.filter(field => field.value.trim()).length;
        const label = document.getElementById('homily-progress-label');
        const bar = document.getElementById('homily-progress-bar');
        if (label) label.textContent = `${completed} ${completed > 1 ? 'étapes renseignées' : 'étape renseignée'} sur ${fields.length}`;
        if (bar) {
            bar.setAttribute('aria-valuemax', String(fields.length));
            bar.setAttribute('aria-valuenow', String(completed));
            const fill = bar.querySelector('span');
            if (fill) fill.style.width = fields.length ? `${(completed / fields.length) * 100}%` : '0%';
        }
    };

    const saveHomilyDraft = () => {
        localStorage.setItem(getHomilyStorageKey(), JSON.stringify(collectHomilyDraft()));
        updateHomilyProgress();
        const status = document.getElementById('homily-save-status');
        if (status) {
            status.textContent = `Brouillon sauvegardé sur cet appareil à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}.`;
        }
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

    const renderHomilyWorkspace = (reading) => {
        const fields = document.getElementById('homily-fields');
        const title = document.getElementById('homily-workspace-title');
        const status = document.getElementById('homily-save-status');
        if (!fields) return;

        currentHomilyReference = reading.reference || '';
        currentHomilyReadingTitle = reading.title || '';
        const template = Array.isArray(reading.homily_template) && reading.homily_template.length
            ? reading.homily_template
            : defaultHomilyTemplate;
        const draft = readHomilyDraft();

        if (title) title.textContent = `Construire l’homélie — ${currentHomilyReference || currentHomilyReadingTitle}`;
        if (status) status.textContent = Object.keys(draft).length
            ? 'Brouillon sauvegardé retrouvé sur cet appareil.'
            : 'Le brouillon sera sauvegardé automatiquement sur cet appareil.';

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

            const label = document.createElement('label');
            label.htmlFor = `homily-${section.id}`;
            label.textContent = section.title;

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

            wrapper.append(label, help, textarea);
            phaseGrid.appendChild(wrapper);
        });
        const checkedReviewItems = Array.isArray(draft._oralReview) ? draft._oralReview : [];
        document.querySelectorAll('#oral-review-list input').forEach(input => {
            input.checked = checkedReviewItems.includes(input.value);
        });
        updateHomilyProgress();
    };

    const buildHomilyExport = () => {
        const sections = Array.from(document.querySelectorAll('#homily-fields textarea')).map(field => ({
            title: field.dataset.fieldTitle,
            content: field.value.trim()
        }));
        return {
            title: currentHomilyReadingTitle || 'Homélie',
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

    // --- 2. FONCTION DE BASCULEMENT ---
    const changeTranslation = (version) => {
        currentTranslation = version;

        // 1. Gestion visuelle des boutons
        document.querySelectorAll('.version-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById('btn-' + version);
        if (activeBtn) activeBtn.classList.add('active');

        // 2. rafraichissement de  l'affichage pour mettre à jour le panneau latéral
        loadTextContext(currentSundayKey, currentReadingType);
    };

    // --- 3. FONCTION DE CHARGEMENT DES DONNÉES (FETCH) ---
    const loadTextContext = async (sundayKey, readingType) => {
        currentSundayKey = sundayKey;
        currentReadingType = readingType;

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
            const response = await fetch(`data/${sundayKey}.json`);
            if (!response.ok) throw new Error("Fichier JSON manquant dans le dossier /data/");

            const data = await response.json();
            const reading = data[readingType];

            if (!reading) throw new Error(`Section "${readingType}" manquante dans le fichier JSON.`);

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
            renderHomilyWorkspace(reading);

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

                        // On prépare le texte de l'auteur seulement s'il existe dans le JSON
                        let authorText = item.author ? ` <em>(par ${item.author})</em>` : "";

                        li.innerHTML = `
                            ${icon} <strong>${item.source}</strong> : 
                            <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="color: #0056b3; text-decoration: none; font-weight: bold;">
                                ${item.title}
                            </a>${authorText}
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
            document.querySelectorAll('#text-selector button').forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.getElementById(`select-${readingType}`);
            if(activeBtn) activeBtn.classList.add('active');

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

    const setSelectionMode = mode => {
        const showCalendar = mode === 'calendar';
        const calendarPanel = document.getElementById('calendar-panel');
        const pericopePanel = document.getElementById('pericope-panel');
        const calendarButton = document.getElementById('mode-calendar');
        const pericopeButton = document.getElementById('mode-pericope');
        if (calendarPanel) calendarPanel.hidden = !showCalendar;
        if (pericopePanel) pericopePanel.hidden = showCalendar;
        [
            [calendarButton, showCalendar],
            [pericopeButton, !showCalendar]
        ].forEach(([button, active]) => {
            if (!button) return;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', String(active));
            button.tabIndex = active ? 0 : -1;
        });
    };

    const populateSundaySelect = (query = '') => {
        const select = document.getElementById('sunday-select');
        const status = document.getElementById('sunday-search-status');
        if (!select) return [];

        const sortedKeys = Object.keys(liturgicalList).sort();
        const normalizedQuery = normalizeSearch(query.trim());
        const matchingKeys = sortedKeys.filter(key =>
            !normalizedQuery || normalizeSearch(liturgicalList[key]).includes(normalizedQuery)
        );
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
            ? `${matchingKeys.length} résultat${matchingKeys.length > 1 ? 's' : ''}`
            : `${matchingKeys.length} péricopes classées par période`;
        return matchingKeys;
    };

    const populateCalendarSelect = async () => {
        const calendarSelect = document.getElementById('calendar-select');
        const calendarStatus = document.getElementById('calendar-status');
        const calendarReadingNote = document.getElementById('calendar-reading-note');
        if (!calendarSelect) return;

        try {
            const response = await fetch('data/calendar_2026.json');
            if (!response.ok) throw new Error('calendrier indisponible');
            const calendar = await response.json();
            const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });
            const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
                weekday: 'long', day: 'numeric', month: 'long'
            });
            calendarSundays = calendar.sundays;
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
                const sourceTitle = sunday.official_title || sunday.doxologia_title;
                const relatedTitle = sunday.key
                    ? liturgicalList[sunday.key]
                    : sourceTitle || liturgicalList[sunday.related_key];
                const sourceTitleSuffix = sunday.key && sourceTitle
                    ? ` (${sourceTitle})`
                    : '';
                option.textContent = `${dateFormatter.format(date)} — ${relatedTitle}${sourceTitleSuffix}`;
                group.appendChild(option);
            });
            calendarSelect.addEventListener('change', event => {
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
            });
            if (calendarStatus) {
                const checks = (calendar.cross_checks || [])
                    .map(source => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a>`)
                    .join(' et ');
                calendarStatus.innerHTML = `Calendrier ${calendar.year} : <a href="${calendar.source.url}" target="_blank" rel="noopener noreferrer">source officielle ${calendar.source.name}</a>${checks ? `, contrôlée avec ${checks}` : ''}.`;
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
        if (mainText) mainText.innerHTML = '<p class="calendar-pending">Cette lecture propre au calendrier 2026 n’est pas encore reliée à une fiche dans l’application.</p>';
        if (notes) notes.textContent = 'La référence a été vérifiée dans le calendrier officiel de la Patriarhie roumaine. Son contenu ne sera ajouté qu’après identification de la source correspondante dans les données.';
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
    const pericopeModeButton = document.getElementById('mode-pericope');
    if (calendarModeButton) calendarModeButton.addEventListener('click', () => setSelectionMode('calendar'));
    if (pericopeModeButton) pericopeModeButton.addEventListener('click', () => setSelectionMode('pericope'));

    const selectElement = document.getElementById('sunday-select');
    if (selectElement) {
        selectElement.addEventListener('change', (e) => {
            if (e.target.value) {
                currentCalendarEntry = null;
                const calendarSelect = document.getElementById('calendar-select');
                const calendarReadingNote = document.getElementById('calendar-reading-note');
                if (calendarSelect) calendarSelect.value = '';
                if (calendarReadingNote) calendarReadingNote.hidden = true;
                loadTextContext(e.target.value, currentReadingType);
            }
        });
    }
    const sundaySearch = document.getElementById('sunday-search');
    if (sundaySearch) {
        sundaySearch.addEventListener('input', event => {
            const query = event.target.value;
            const matchingKeys = populateSundaySelect(query);
            if (query.trim() && matchingKeys.length === 1) {
                currentCalendarEntry = null;
                const calendarSelect = document.getElementById('calendar-select');
                const calendarReadingNote = document.getElementById('calendar-reading-note');
                if (calendarSelect) calendarSelect.value = '';
                if (calendarReadingNote) calendarReadingNote.hidden = true;
                loadTextContext(matchingKeys[0], currentReadingType);
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
    let homilySaveTimer;

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
    }

    const oralReviewList = document.getElementById('oral-review-list');
    if (oralReviewList) {
        oralReviewList.addEventListener('change', saveHomilyDraft);
    }

    const prepareHomilyOutline = document.getElementById('prepare-homily-outline');
    if (prepareHomilyOutline) {
        prepareHomilyOutline.addEventListener('click', () => {
            const planningFields = Array.from(document.querySelectorAll('#homily-fields textarea:not([data-field-id="oral"])'))
                .filter(field => field.value.trim());
            const finalField = document.querySelector('#homily-fields textarea[data-field-id="oral"]');
            const status = document.getElementById('homily-save-status');
            if (!planningFields.length || !finalField) {
                if (status) status.textContent = 'Renseignez d’abord au moins une étape de préparation.';
                return;
            }

            const outline = planningFields
                .map(field => `${field.dataset.fieldTitle}\n${field.value.trim()}`)
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

    const exportDoc = document.getElementById('export-homily-doc');
    if (exportDoc) {
        exportDoc.addEventListener('click', () => {
            saveHomilyDraft();
            const exported = buildHomilyExport();
            const escapeHtml = value => String(value || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
            const sections = exported.sections
                .filter(section => section.content)
                .map(section => `<h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.content).replace(/\n/g, '<br>')}</p>`)
                .join('');
            const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(exported.title)}</title>
                <style>body{font-family:Georgia,serif;line-height:1.55;margin:2.5cm}h1{color:#671717}h2{margin-top:1.4em;color:#263c5a;font-size:15pt}p{font-size:12pt}</style>
                </head><body><h1>${escapeHtml(exported.title)}</h1><p><strong>${escapeHtml(exported.reference)}</strong></p>${sections}</body></html>`;
            downloadFile(html, 'application/msword;charset=utf-8', 'doc');
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

    const clearHomily = document.getElementById('clear-homily');
    if (clearHomily) {
        clearHomily.addEventListener('click', () => {
            if (!window.confirm('Effacer le brouillon de cette lecture sur cet appareil ?')) return;
            localStorage.removeItem(getHomilyStorageKey());
            document.querySelectorAll('#homily-fields textarea').forEach(field => {
                field.value = '';
            });
            document.querySelectorAll('#oral-review-list input').forEach(input => {
                input.checked = false;
            });
            updateHomilyProgress();
            const status = document.getElementById('homily-save-status');
            if (status) status.textContent = 'Brouillon effacé.';
        });
    }

// --- 7. FENÊTRE D'ANALYSE DES MOTS ---
    const analysisDialog = document.getElementById('analysis-dialog');
    const analysisDialogClose = document.getElementById('analysis-dialog-close');
    const addAnnotationToHomily = document.getElementById('add-annotation-to-homily');
    let currentAnnotationMaterial = null;

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
        const target = event.target.closest('.mot-info');
        if (target) {
            event.preventDefault();
            openAnnotation(target);
        }
    });

    document.addEventListener('keydown', (event) => {
        const target = event.target.closest && event.target.closest('.mot-info');
        if (target && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            openAnnotation(target);
        }
    });

    if (analysisDialogClose) {
        analysisDialogClose.addEventListener('click', () => analysisDialog.close());
    }
    if (addAnnotationToHomily) {
        addAnnotationToHomily.addEventListener('click', () => {
            if (!currentAnnotationMaterial) return;
            addMaterialToHomily(currentAnnotationMaterial);
            analysisDialog.close();
        });
    }
 });
