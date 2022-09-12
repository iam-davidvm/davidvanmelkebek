const addButton = document.getElementById('add-button');
const editButton = document.getElementById('edit-button');
const addSection = document.getElementById('add');


addButton.addEventListener('click', () => {
    const buttons = document.getElementById('buttons');
    buttons.style.display = 'none'; 
    addSection.classList.remove('d-none');
});

const addTitle = document.getElementById('add-title');
const addCategory = document.getElementById('add-category');
const addTeaser = document.getElementById('add-teaser');
const addHeroImage = document.getElementById('add-hero-image');
const addTextboxButtons = document.getElementById('add-textbox-buttons');
const addButtons = addTextboxButtons.querySelectorAll('button');
const addTextboxText = document.getElementById('add-textbox-text');
let previewDate = new Date();
previewDate = `${previewDate.getDate()} ${previewDate.toLocaleString('default', {month:'long'})} ${previewDate.getFullYear()}`;

const pageContentTitle = document.getElementById('page-content-title');
const pageDate = document.getElementById('page-date');
const pageContentBody = document.getElementById('page-content-body');

pageDate.innerText = previewDate;

addTitle.addEventListener('input', () => {
    pageContentTitle.innerText = addTitle.value;
});


const addMarkUp = (element) => {
    const sel = document.getSelection();

    const startSelection = sel.anchorOffset > sel.focusOffset ? sel.focusOffset : sel.anchorOffset;
    const endSelection = sel.focusOffset > sel.anchorOffset ? sel.focusOffset : sel.anchorOffset;

    // if ctrlA is used to select the text, the behaviour is different
    const ctrlA = sel.anchorNode.data ? false : true;
    const allText = ctrlA ? sel.anchorNode.textContent : sel.anchorNode.data;

    const selectedText = ctrlA ? allText : allText.slice(startSelection, endSelection);
    const before = ctrlA ? '' : allText.slice(0, startSelection);
    const after = ctrlA ? '' : allText.slice(endSelection);

    if (startSelection === endSelection) {
        return;
    }

    let text = '';

    switch (element) {
        case 'b':
        case 'strong':
        case 'i':
        case 'u':
        case 'h2':
        case 'h3':
        case 'p':
            text = `${before}<${element}>${selectedText}</${element}>${after}`;
            break;
    }

    addTextboxText.innerText = text;
}

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        addMarkUp(e.target.dataset.element);
    })
});

addTextboxText.addEventListener('input', () => {
    pageContentBody.innerHTML = addTextboxText.innerText;
});

addTextboxText.addEventListener('change', () => {
    pageContentBody.innerHTML = addTextboxText.innerText;
});