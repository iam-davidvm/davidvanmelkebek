const addButton = document.getElementById('add-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('publish');
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


const addMarkUp = (element, text) => {
    
    console.log(element);

    const sel = window.getSelection();

    // can we use the array and find the selected node in the array?
    // the div.innerText splitten op /n?
    console.log("sel.getRangeAt(0)", sel.getRangeAt(0).commonAncestorContainer);
    console.log("text.length", text.length);
    console.log(addTextboxText.innerText.split('\n'));
    console.log(addTextboxText.innerText.split('\n').indexOf(sel.getRangeAt(0).commonAncestorContainer.data));

    
    const startSelection = sel.anchorOffset > sel.focusOffset ? sel.focusOffset : sel.anchorOffset;
    const endSelection = sel.focusOffset > sel.anchorOffset ? sel.focusOffset : sel.anchorOffset;
    
    // if ctrlA is used to select the text, the behaviour is different
    const ctrlA = sel.anchorNode.data ? false : true;
    const allText = ctrlA ? sel.anchorNode.textContent : sel.anchorNode.data;
    
    console.log("sel", sel.anchorNode.childNodes)
    console.log("ctrlA", ctrlA)
    console.log("allText", allText);

    const selectedText = ctrlA ? allText : text.slice(startSelection, endSelection);
    const before = ctrlA ? '' : text.slice(0, startSelection);
    const after = ctrlA ? '' : text.slice(endSelection);

    console.log("before", before);
    console.log("selectedText", selectedText);
    console.log("after", after);

    if (startSelection === endSelection) {
        return;
    }


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
        case 'a':
            text = `${before}<${element} href="" target="_blank">${selectedText}</${element}>${after}`;
            break;
        case 'img':
            text = `${before}<${element} src="${selectedText}" alt="${addTitle.value}">${after}`;
            break;
        case 'div':
            text = `${before}<${element} class="columns">${selectedText}</${element}>${after}`;
            break;
        case 'quote': 
            text = `${before}<p class="page-content-quote">${selectedText}</p>${after}`;
            break;
    }

    console.log("text", text);

    addTextboxText.innerText = text;
}

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // const text = addTextboxText.innerText.replaceAll('\n', ' ');
        const text = addTextboxText.innerText;

        // break it
        // setTimeOut(addMarkUp(e.target.dataset.element, multiLines), 3000);

        addMarkUp(e.target.dataset.element, text);
    });
});

addTextboxText.addEventListener('input', () => {
    pageContentBody.innerHTML = addTextboxText.innerText;
});

addTextboxText.addEventListener('change', () => {
    pageContentBody.innerHTML = addTextboxText.innerText;
});

submitButton.addEventListener('submit', (e) => {
    e.preventDefault();
})