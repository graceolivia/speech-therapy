let currentWordId = null;
const appState = {
    childName: '',
    childBirthdate: '',
    childAgeMonths: 0,
    words: [],
    categories: ['nouns', 'verbs', 'adjectives', 'social', 'other'],
    selectedCategory: ''
};

const elements = {
    welcome: document.getElementById('welcome'),
    setup: document.getElementById('setup'),
    mainContent: document.getElementById('mainContent'),
    getStartedBtn: document.getElementById('getStartedBtn'),
    saveSetupBtn: document.getElementById('saveSetupBtn'),
    childName: document.getElementById('childName'),
    childBirthdate: document.getElementById('childBirthdate'),
    ageBanner: document.getElementById('ageBanner'),
    updateName: document.getElementById('updateName'),
    updateBirthdate: document.getElementById('updateBirthdate'),
    updateSettingsBtn: document.getElementById('updateSettingsBtn'),
    resetAppBtn: document.getElementById('resetAppBtn'),
    showAddWordBtn: document.getElementById('showAddWordBtn'),
    showAddWordListBtn: document.getElementById('showAddWordListBtn'),
    addWordForm: document.getElementById('addWordForm'),
    newWord: document.getElementById('newWord'),
    wordStatus: document.getElementById('wordStatus'),
    teachingNotes: document.getElementById('teachingNotes'),
    saveWordBtn: document.getElementById('saveWordBtn'),
    cancelAddWordBtn: document.getElementById('cancelAddWordBtn'),
    categoryTags: document.querySelectorAll('.category-tag'),
    masteredWordsContainer: document.getElementById('masteredWordsContainer'),
    learningWordsContainer: document.getElementById('learningWordsContainer'),
    nextUpWordsContainer: document.getElementById('nextUpWordsContainer'),
    masteredCount: document.getElementById('masteredCount'),
    learningCount: document.getElementById('learningCount'),
    nextUpCount: document.getElementById('nextUpCount'),
    wordDetailModal: document.getElementById('wordDetailModal'),
    closeModal: document.querySelector('.close-modal'),
    wordDetailTitle: document.getElementById('wordDetailTitle'),
    wordDetailCategory: document.getElementById('wordDetailCategory'),
    wordDetailStatus: document.getElementById('wordDetailStatus'),
    wordDetailNotes: document.getElementById('wordDetailNotes'),
    wordTeachingTips: document.getElementById('wordTeachingTips'),
    editWordBtn: document.getElementById('editWordBtn'),
    deleteWordBtn: document.getElementById('deleteWordBtn'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    currentWords: document.getElementById('currentWords'),
    resourcesContainer: document.getElementById('resourcesContainer'),
    navTabs: document.querySelectorAll('.nav-tab'),
    tabContents: document.querySelectorAll('.tab-content')
};

const milestones = [
    { age: 12, words: 2, label: 'First words' },
    { age: 18, words: 10, label: 'Growing' },
    { age: 24, words: 50, label: '2 years' },
    { age: 30, words: 200, label: 'Expanding' },
    { age: 36, words: 300, label: '3 years' }
];

const teachingStrategies = {
    nouns: [
        "Point to objects repeatedly while saying the word",
        "Use real objects when possible instead of pictures",
        "Practice with different examples (different balls, different dogs)",
        "Create opportunities to request the object",
        "Make the object do something interesting to capture attention"
    ],
    verbs: [
        "Act out the action while saying the word",
        "Use gestures consistently with the word",
        "Practice during daily routines",
        "Use the word just before you do the action",
        "Exaggerate actions to make them more noticeable"
    ],
    adjectives: [
        "Use contrasting pairs (big/small, hot/cold)",
        "Emphasize the quality you're describing",
        "Connect to sensory experiences",
        "Use with familiar objects",
        "Show multiple examples of the same quality"
    ],
    social: [
        "Use in natural social contexts",
        "Create routines that incorporate the word",
        "Respond enthusiastically when the word is used",
        "Model in turn-taking activities",
        "Practice during favorite activities for motivation"
    ],
    other: [
        "Repeat the word in many different contexts",
        "Connect to your child's interests",
        "Use simple, clear sentences",
        "Provide immediate feedback when the word is attempted",
        "Practice during enjoyable activities"
    ]
};

const resources = [
    {
        title: "Using Focused Stimulation for New Words",
        content: `
            <p>Focused stimulation is a powerful technique where you deliberately create opportunities to use the target word multiple times in meaningful contexts.</p>
            <h4>How to do it:</h4>
            <ul>
                <li>Choose 2-3 target words to focus on for a week</li>
                <li>Create opportunities to use each word at least 10 times daily</li>
                <li>Emphasize the word with your voice (slightly louder, slightly longer)</li>
                <li>Don't require your child to repeat the word</li>
                <li>Just model naturally in meaningful situations</li>
            </ul>
            <p>Example: For "ball," play with different balls, read books about balls, point out balls during the day, talk about what you can do with a ball.</p>
        `
    },
    {
        title: "Creating Communication Temptations",
        content: `
            <p>Communication temptations are situations you set up to encourage your child to communicate.</p>
            <h4>Effective strategies:</h4>
            <ul>
                <li>Give a small portion (then they need to ask for more)</li>
                <li>Place favorite toys in sight but out of reach</li>
                <li>Provide help for a few seconds, then stop (creating a need to request help)</li>
                <li>Do something silly or unexpected (prompting a reaction)</li>
                <li>Start a familiar routine and pause (waiting for child to indicate continuation)</li>
            </ul>
            <p>The key is to create a genuine need to communicate while keeping the interaction fun and pressure-free.</p>
        `
    },
    {
        title: "Following Your Child's Lead",
        content: `
            <p>Following your child's lead is about joining them in what interests them rather than directing their attention elsewhere.</p>
            <h4>Why it works:</h4>
            <ul>
                <li>Children learn language best when talking about what already interests them</li>
                <li>Builds on intrinsic motivation</li>
                <li>Creates more meaningful learning opportunities</li>
                <li>Reduces frustration and increases engagement</li>
            </ul>
            <h4>How to do it:</h4>
            <ul>
                <li>Observe what captures your child's attention</li>
                <li>Join in their activity at their level</li>
                <li>Comment on what they're doing using simple language</li>
                <li>Add new information or vocabulary related to their focus</li>
            </ul>
        `
    },
    {
        title: "Everyday Routines as Language Opportunities",
        content: `
            <p>Daily routines provide predictable contexts that make it easier for children to learn and use new words.</p>
            <h4>Making routines language-rich:</h4>
            <ul>
                <li>Use consistent, simple language during routines (diaper changes, bath time, meals)</li>
                <li>Create pauses to encourage your child to fill in words</li>
                <li>Add songs or rhymes to familiar routines</li>
                <li>Comment on each step as you do it</li>
                <li>Gradually expand the vocabulary you use</li>
            </ul>
            <p>Example: During hand washing, you might say "water on," "soap," "rub," "rinse," "dry" - creating multiple opportunities to hear and eventually use these words.</p>
        `
    },
    {
        title: "Reading for Language Development",
        content: `
            <p>Book reading is one of the most effective ways to build vocabulary and language skills.</p>
            <h4>Tips for reading with early talkers:</h4>
            <ul>
                <li>Choose books with simple, clear pictures</li>
                <li>You don't have to read all the text - just talk about the pictures</li>
                <li>Point to pictures as you name them</li>
                <li>Make connections to your child's experiences</li>
                <li>Read favorite books repeatedly - repetition helps learning</li>
                <li>Make reading interactive - ask simple questions, pause for responses</li>
            </ul>
            <p>Focus on enjoyment rather than "teaching" during reading time. The learning happens naturally when the experience is positive.</p>
        `
    }
];

function initApp() {

    loadAppData();

    setupEventListeners();

    if (appState.childBirthdate) {
        showMainContent();
        updateAgeBanner();
        renderWordLists();
        renderResources();
        updateProgress();
        renderMilestones();
    } else {
        elements.welcome.style.display = 'block';
    }
}

function loadAppData() {
    const savedData = localStorage.getItem('littleTalkerData');
    if (savedData) {
        const data = JSON.parse(savedData);
        appState.childName = data.childName || '';
        appState.childBirthdate = data.childBirthdate || '';
        appState.words = data.words || [];

        if (appState.childBirthdate) {
            calculateAge();
        }

        elements.updateName.value = appState.childName;
        elements.updateBirthdate.value = appState.childBirthdate;
    }
}

function saveAppData() {
    localStorage.setItem('littleTalkerData', JSON.stringify({
        childName: appState.childName,
        childBirthdate: appState.childBirthdate,
        words: appState.words
    }));
}

function calculateAge() {
    if (!appState.childBirthdate) return;

    const birthdate = new Date(appState.childBirthdate);
    const today = new Date();

    let months = (today.getFullYear() - birthdate.getFullYear()) * 12;
    months -= birthdate.getMonth();
    months += today.getMonth();

    appState.childAgeMonths = months;
}

function setupEventListeners() {

    elements.getStartedBtn.addEventListener('click', () => {
        elements.welcome.style.display = 'none';
        elements.setup.style.display = 'block';
    });

    elements.saveSetupBtn.addEventListener('click', saveSetup);
    elements.updateSettingsBtn.addEventListener('click', updateSettings);
    elements.resetAppBtn.addEventListener('click', resetApp);

    elements.showAddWordBtn.addEventListener('click', showAddWordForm);
    elements.showAddWordListBtn.addEventListener('click', showAddWordForm);
    elements.saveWordBtn.addEventListener('click', saveWord);
    elements.cancelAddWordBtn.addEventListener('click', hideAddWordForm);

    elements.categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            elements.categoryTags.forEach(t => t.classList.remove('selected'));
            tag.classList.add('selected');
            appState.selectedCategory = tag.dataset.category;
        });
    });

    elements.closeModal.addEventListener('click', () => {
        elements.wordDetailModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === elements.wordDetailModal) {
            elements.wordDetailModal.style.display = 'none';
        }
    });

    elements.editWordBtn.addEventListener('click', editWord);
    elements.deleteWordBtn.addEventListener('click', deleteWord);

    elements.navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;

            elements.navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            elements.tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function saveSetup() {
    appState.childName = elements.childName.value.trim();
    appState.childBirthdate = elements.childBirthdate.value;

    if (!appState.childBirthdate) {
        alert('Please enter your child\'s birth date');
        return;
    }

    calculateAge();
    saveAppData();
    showMainContent();
    updateAgeBanner();
    renderMilestones();
}

function showMainContent() {
    elements.setup.style.display = 'none';
    elements.welcome.style.display = 'none';
    elements.mainContent.classList.remove('hidden');
}

function updateSettings() {
    appState.childName = elements.updateName.value.trim();
    appState.childBirthdate = elements.updateBirthdate.value;

    if (!appState.childBirthdate) {
        alert('Please enter your child\'s birth date');
        return;
    }

    calculateAge();
    saveAppData();
    updateAgeBanner();
    renderMilestones();
    alert('Settings updated successfully');
}

function resetApp() {
    if (confirm('Are you sure you want to reset all app data? This will delete all words and settings.')) {
        localStorage.removeItem('littleTalkerData');
        location.reload();
    }
}

function updateAgeBanner() {
    if (appState.childAgeMonths > 0) {
        let years = Math.floor(appState.childAgeMonths / 12);
        let months = appState.childAgeMonths % 12;
        let ageText = '';

        if (years > 0) {
            ageText += `${years} year${years > 1 ? 's' : ''}`;
            if (months > 0) {
                ageText += ` and ${months} month${months > 1 ? 's' : ''}`;
            }
        } else {
            ageText = `${months} month${months > 1 ? 's' : ''}`;
        }

        const namePrefix = appState.childName ? `${appState.childName} is ` : 'Age: ';
        elements.ageBanner.textContent = namePrefix + ageText + ' old';
        elements.ageBanner.style.display = 'block';
    }
}

function showAddWordForm() {
    elements.addWordForm.style.display = 'block';
    elements.mainContent.style.display = 'none';

    elements.newWord.value = '';
    elements.teachingNotes.value = '';
    elements.wordStatus.value = 'nextUp';
    elements.categoryTags.forEach(tag => tag.classList.remove('selected'));
    appState.selectedCategory = '';
    currentWordId = null;
}

function hideAddWordForm() {
    elements.addWordForm.style.display = 'none';
    elements.mainContent.style.display = 'block';
}

function saveWord() {
    const word = elements.newWord.value.trim().toLowerCase();
    const status = elements.wordStatus.value;
    const notes = elements.teachingNotes.value.trim();
    const category = appState.selectedCategory;

    if (!word) {
        alert('Please enter a word');
        return;
    }

    if (!category) {
        alert('Please select a category');
        return;
    }

    if (currentWordId === null) {

        const newWord = {
            id: Date.now().toString(),
            word: word,
            status: status,
            category: category,
            notes: notes,
            dateAdded: new Date().toISOString(),
            dateModified: new Date().toISOString()
        };

        appState.words.push(newWord);
    } else {

        const wordIndex = appState.words.findIndex(w => w.id === currentWordId);
        if (wordIndex !== -1) {
            appState.words[wordIndex] = {
                ...appState.words[wordIndex],
                word: word,
                status: status,
                category: category,
                notes: notes,
                dateModified: new Date().toISOString()
            };
        }
    }

    saveAppData();
    renderWordLists();
    updateProgress();
    hideAddWordForm();
}

function renderWordLists() {

    elements.masteredWordsContainer.innerHTML = '';
    elements.learningWordsContainer.innerHTML = '';
    elements.nextUpWordsContainer.innerHTML = '';

    const mastered = appState.words.filter(word => word.status === 'mastered');
    const learning = appState.words.filter(word => word.status === 'learning');
    const nextUp = appState.words.filter(word => word.status === 'nextUp');

    elements.masteredCount.textContent = mastered.length;
    elements.learningCount.textContent = learning.length;
    elements.nextUpCount.textContent = nextUp.length;

    mastered.forEach(word => {
        const wordItem = createWordItem(word);
        elements.masteredWordsContainer.appendChild(wordItem);
    });

    learning.forEach(word => {
        const wordItem = createWordItem(word);
        elements.learningWordsContainer.appendChild(wordItem);
    });

    nextUp.forEach(word => {
        const wordItem = createWordItem(word);
        elements.nextUpWordsContainer.appendChild(wordItem);
    });
}

function createWordItem(word) {
    const item = document.createElement('div');
    item.className = 'word-item';

    const wordText = document.createElement('span');
    wordText.textContent = word.word;
    item.appendChild(wordText);

    const actions = document.createElement('div');
    actions.className = 'word-actions';

    const viewBtn = document.createElement('button');
    viewBtn.className = 'icon-button';
    viewBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
    viewBtn.addEventListener('click', () => showWordDetails(word.id));
    actions.appendChild(viewBtn);

    if (word.status === 'nextUp') {
        const upBtn = document.createElement('button');
        upBtn.className = 'icon-button';
        upBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        upBtn.title = 'Move to Learning';
        upBtn.addEventListener('click', () => changeWordStatus(word.id, 'learning'));
        actions.appendChild(upBtn);
    } else if (word.status === 'learning') {
        const upBtn = document.createElement('button');
        upBtn.className = 'icon-button';
        upBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        upBtn.title = 'Move to Mastered';
        upBtn.addEventListener('click', () => changeWordStatus(word.id, 'mastered'));
        actions.appendChild(upBtn);

        const downBtn = document.createElement('button');
        downBtn.className = 'icon-button';
        downBtn.innerHTML = '<i class="fas fa-arrow-down"></i>';
        downBtn.title = 'Move to Next Up';
        downBtn.addEventListener('click', () => changeWordStatus(word.id, 'nextUp'));
        actions.appendChild(downBtn);
    } else if (word.status === 'mastered') {
        const downBtn = document.createElement('button');
        downBtn.className = 'icon-button';
        downBtn.innerHTML = '<i class="fas fa-arrow-down"></i>';
        downBtn.title = 'Move to Learning';
        downBtn.addEventListener('click', () => changeWordStatus(word.id, 'learning'));
        actions.appendChild(downBtn);
    }

    item.appendChild(actions);
    return item;
}

function changeWordStatus(wordId, newStatus) {
    const wordIndex = appState.words.findIndex(w => w.id === wordId);
    if (wordIndex !== -1) {
        appState.words[wordIndex].status = newStatus;
        appState.words[wordIndex].dateModified = new Date().toISOString();
        saveAppData();
        renderWordLists();
        updateProgress();
    }
}

function showWordDetails(wordId) {
    const word = appState.words.find(w => w.id === wordId);
    if (!word) return;

    currentWordId = wordId;

    elements.wordDetailTitle.textContent = word.word;
    elements.wordDetailCategory.textContent = `Category: ${word.category.charAt(0).toUpperCase() + word.category.slice(1)}`;

    let statusText = '';
    if (word.status === 'mastered') {
        statusText = 'Status: Mastered';
    } else if (word.status === 'learning') {
        statusText = 'Status: Currently Learning';
    } else {
        statusText = 'Status: Next Up';
    }
    elements.wordDetailStatus.textContent = statusText;

    elements.wordDetailNotes.textContent = word.notes ? `Notes: ${word.notes}` : 'No notes added';

    const strategies = teachingStrategies[word.category] || teachingStrategies.other;
    let tipsHTML = '<ul>';
    strategies.forEach(tip => {
        tipsHTML += `<li>${tip}</li>`;
    });
    tipsHTML += '</ul>';
    elements.wordTeachingTips.innerHTML = tipsHTML;

    elements.wordDetailModal.style.display = 'block';
}

function editWord() {
    const word = appState.words.find(w => w.id === currentWordId);
    if (!word) return;

    elements.newWord.value = word.word;
    elements.wordStatus.value = word.status;
    elements.teachingNotes.value = word.notes;

    elements.categoryTags.forEach(tag => {
        if (tag.dataset.category === word.category) {
            tag.classList.add('selected');
        } else {
            tag.classList.remove('selected');
        }
    });
    appState.selectedCategory = word.category;

    elements.wordDetailModal.style.display = 'none';
    showAddWordForm();
}

function deleteWord() {
    if (confirm('Are you sure you want to delete this word?')) {
        appState.words = appState.words.filter(w => w.id !== currentWordId);
        saveAppData();
        renderWordLists();
        updateProgress();
        elements.wordDetailModal.style.display = 'none';
    }
}

function updateProgress() {
    const masteredCount = appState.words.filter(w => w.status === 'mastered').length;
    const totalWordCount = appState.words.length;

    elements.currentWords.innerHTML = `Current vocabulary: <strong>${masteredCount} words</strong>`;

    let targetWords = 0;
    let nextMilestone = null;

    for (const milestone of milestones) {
        if (appState.childAgeMonths <= milestone.age) {
            targetWords = milestone.words;
            nextMilestone = milestone;
            break;
        }
    }

    if (!nextMilestone && milestones.length > 0) {
        nextMilestone = milestones[milestones.length - 1];
        targetWords = nextMilestone.words;
    }

    let progressPercentage = 0;
    if (targetWords > 0) {
        progressPercentage = Math.min((masteredCount / targetWords) * 100, 100);
    }

    elements.progressBar.style.width = `${progressPercentage}%`;

    if (appState.childAgeMonths > 0 && nextMilestone) {
        if (masteredCount >= targetWords) {
            elements.progressText.textContent = `Amazing! ${appState.childName ? appState.childName + ' has' : 'Your child has'} reached or exceeded the typical word count for their age.`;
        } else {
            const wordsToGo = targetWords - masteredCount;
            elements.progressText.textContent = `Working toward ${targetWords} words by ${nextMilestone.age} months (${wordsToGo} more to go)`;
        }
    } else {
        elements.progressText.textContent = `Vocabulary: ${masteredCount} words mastered`;
    }
}

function renderMilestones() {
    const milestoneContainer = document.querySelector('.milestone-container');
    milestoneContainer.innerHTML = '<div class="milestone-track"></div>';

    milestones.forEach((milestone, index) => {
        const position = `${(index / (milestones.length - 1)) * 100}%`;

        const milestoneElement = document.createElement('div');
        milestoneElement.className = 'milestone';
        milestoneElement.style.left = position;

        const dot = document.createElement('div');
        dot.className = 'milestone-dot';
        if (appState.childAgeMonths >= milestone.age) {
            dot.classList.add('active');
        }

        const label = document.createElement('div');
        label.className = 'milestone-label';
        label.textContent = milestone.label;

        const age = document.createElement('div');
        age.className = 'milestone-age';
        age.textContent = `${milestone.age}m`;

        milestoneElement.appendChild(dot);
        milestoneElement.appendChild(label);
        milestoneElement.appendChild(age);

        milestoneContainer.appendChild(milestoneElement);
    });
}

function renderResources() {
    elements.resourcesContainer.innerHTML = '';

    resources.forEach((resource, index) => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card card';

        const title = document.createElement('div');
        title.className = 'resource-title';
        title.textContent = resource.title;

        const preview = document.createElement('div');
        preview.className = 'resource-preview';
        preview.textContent = resource.content.replace(/<[^>]*>/g, '').slice(0, 100) + '...';

        const expanded = document.createElement('div');
        expanded.className = 'resource-expanded';
        expanded.style.display = 'none';
        expanded.innerHTML = resource.content;

        resourceCard.appendChild(title);
        resourceCard.appendChild(preview);
        resourceCard.appendChild(expanded);

        resourceCard.addEventListener('click', function() {
            if (expanded.style.display === 'none') {
                expanded.style.display = 'block';
                preview.style.display = 'none';
            } else {
                expanded.style.display = 'none';
                preview.style.display = 'block';
            }
        });

        elements.resourcesContainer.appendChild(resourceCard);
    });
}

initApp();