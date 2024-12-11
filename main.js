
const books = [
    "Acts", "Romans", "1 Corinthians", "2 Corinthians",
    "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
    "1 John", "2 John", "3 John", "Jude", "Revelation"
];

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    onStart();
});

const chapterSelection = document.getElementById('chapter-selection');
const chapterOverview = document.getElementById('chapter-overview');
const studyButton = document.getElementById('study-button');
const dropdown = document.getElementById('chapter-dropdown');
const chapterTitle = document.getElementById('chapter-title');
const chapterSummary = document.getElementById('chapter-summary');
let bookSummaries = {};

function onStart() {
    //populate chapters from json
    const dropdown = document.getElementById('chapter-dropdown');
    books.forEach(chapter => {
    const option = document.createElement('option');
    option.value = chapter;
    option.textContent = chapter;
    dropdown.appendChild(option);
    });

    getJson();
}

function chapterSelectionChanged() {
    studyButton.style.visibility = 'visible';
}

function backToChapterSelection() {
    chapterSelection.style.display = 'grid';   
    studyButton.style.display = 'block';
    chapterOverview.style.display = 'none';
    dropdown.selectedIndex = 0;
}

function studyChapter() {
    currentChapter = document.getElementById('chapter-dropdown').value;

    if (currentChapter) {
        chapterSelection.style.display = 'none';   
        studyButton.style.display = 'none';
        chapterOverview.style.display = 'block';

        chapterTitle.textContent = currentChapter;
        chapterSummary.textContent = getSummary(currentChapter);

    }
}

function getSummary(currentChapter) {
    let summary = bookSummaries[currentChapter];
    return summary;
}

function getJson() {
    fetch('bookSummaries.json')
    .then(response => response.json())
    .then(data => {
        bookSummaries = data;
    }); 
}