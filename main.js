
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
const author = document.getElementById('author-span');
const chapterNumber = document.getElementById('chapter-span');
const chaptersDiv = document.getElementById('chapters-div');
let bookSummaries = {};
let bookAuthors = {};
let chapterNumbers = {};

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
        chapterNumber.textContent = chapterNumbers[currentChapter];
        author.textContent = bookAuthors[currentChapter];
        chapterSummary.textContent = getSummary(currentChapter);

        populateChaptersDiv(currentChapter);
        
    }
}

function populateChaptersDiv(currentChapter) {
    let chapterNum = chapterNumbers[currentChapter];

    // Clear all child nodes
    while (chaptersDiv.firstChild) {
        chaptersDiv.removeChild(chaptersDiv.firstChild);
    }

    for (let i = 1; i <= chapterNum; i++) {
        const chapter = document.createElement('button');
        chapter.className = 'chapter-button';
        chapter.onclick = () => openChapter(currentChapter, i);
        chapter.textContent = i;
        chaptersDiv.appendChild(chapter);
    }
}

function openChapter(book, chapter) {
    console.log("Opening " + book + " Chapter " + chapter);
    let reader = document.getElementById('reader');
    reader.style.display = "block";
    

    let readerBackground = document.getElementById('reader-background');
    readerBackground.style.display = "absolute";

    let readerTitle = document.getElementById('reader-title');

    readerTitle.textContent = "Chapter " + chapter;

    fetch(`/JSON/${book}/${chapter}.json`)
        .then(response => response.json())
        .then(data => {
            let readerContent = document.getElementById('verses');
            readerContent.innerHTML = ''; // Clear previous content

            data.verses.forEach(verse => {
                let verseElement = document.createElement('p');
                verseElement.textContent = `${verse.verse}: ${verse.text}`;
                readerContent.appendChild(verseElement);
            });
        })
        .catch(error => console.error('Error fetching chapter:', error));
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

    fetch('bookAuthors.json')
    .then(response => response.json())
    .then(data => {
        bookAuthors = data;
    }); 

    fetch('chapterNumbers.json')
    .then(response => response.json())
    .then(data => {
        chapterNumbers = data;
    }); 
}