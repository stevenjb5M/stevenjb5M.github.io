import bookSummaries from 'bookSummaries.json' assert { type: 'json' };

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
const chapterTitle = document.getElementById('chapter-title');
const chapterSummary = document.getElementById('chapter-summary');
const bookSummariesString = JSON.stringify(bookSummaries);

function onStart() {
    //populate chapters from jason
    const dropdown = document.getElementById('chapter-dropdown');
    books.forEach(chapter => {
    const option = document.createElement('option');
    option.value = chapter;
    option.textContent = chapter;
    dropdown.appendChild(option);
    });
}

function chapterSelectionChanged() {
    studyButton.style.visibility = 'visible';

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
    summary = bookSummaries[currentChapter];
    return summary;
}