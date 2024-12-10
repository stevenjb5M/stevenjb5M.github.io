const books = [
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
    "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
    "1 John", "2 John", "3 John", "Jude", "Revelation"
];

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    onStart();
});

const studyButton = document.getElementById('study-button');


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