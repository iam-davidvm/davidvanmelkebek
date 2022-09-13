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
const searchResultList = document.getElementById('search-result-list');
const addTeaser = document.getElementById('add-teaser');
const addHeroImage = document.getElementById('add-hero-image');
const addTextboxButtons = document.getElementById('add-textbox-buttons');
const addButtons = addTextboxButtons.querySelectorAll('button');
const addTextboxText = document.getElementById('add-textbox-text');
//date to show on the preview, when publishing the text, we will use a new precise one
let previewDate = new Date();
previewDate = `${previewDate.getDate()} ${previewDate.toLocaleString('default', {month:'long'})} ${previewDate.getFullYear()}`;

const pageContentTitle = document.getElementById('page-content-title');
const pageDate = document.getElementById('page-date');
const pageContentBody = document.getElementById('page-content-body');

pageDate.innerText = previewDate;

addTitle.addEventListener('input', () => {
    pageContentTitle.innerText = addTitle.value;
});

async function getPosts() {
    const url = '../arts/arts.json';
    try {
        let res = await fetch(url);
        let data = await res.json();
        let posts = data.arts;
        return posts;
    } catch (error) {
        console.log('My error: ' + error);
    }
}


const addMarkUp = (element, sel, selectAll) => {
    // normally this will not fire
    if (sel.focusOffset === sel.anchorOffset) {
        return;
    }
    

    const allText = addTextboxText.innerText.split('\n');

    let selectedText = addTextboxText.innerText;
    let before = '';
    let after = '';
    let textIndex = -1;

    // if it's a particular selection, we have to split the text into arrays, because getSelection only got the start end position of the specific line
    if (!selectAll) {
        textIndex = addTextboxText.innerText.split('\n').indexOf(sel.getRangeAt(0).commonAncestorContainer.data);
        // this won't work if two lines have the same text. 
        const changeText = allText[textIndex];    
    
        const startSelection = sel.anchorOffset > sel.focusOffset ? sel.focusOffset : sel.anchorOffset;
        const endSelection = sel.focusOffset > sel.anchorOffset ? sel.focusOffset : sel.anchorOffset;
        
        selectedText = changeText.slice(startSelection, endSelection);
        before = changeText.slice(0, startSelection);
        after = changeText.slice(endSelection);
        
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
        default:
            // if something goes wrong, we want to return the original text
            text = `${selectedText}`;
    }


    // we want to handle a select all different
    if (selectAll) {
        addTextboxText.innerText = text;
    } else {
        allText[textIndex] = text;
        let markup = '';
        for (let item of allText) {
            markup += `${item}\n`;
        }
        addTextboxText.innerText = markup;
    }

    pageContentBody.innerHTML = addTextboxText.innerText;
    
}

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedNode = window.getSelection();

        // check if all text is selected
        const selectAll = addTextboxText.textContent === selectedNode.anchorNode.textContent;

        const element = e.target.tagName === 'BUTTON' ? e.target.dataset.element : e.target.parentElement.dataset.element;

        addMarkUp(element, selectedNode, selectAll);

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
});

addCategory.addEventListener('input', async () => {
    const posts = await getPosts();
    const categories = [...new Map(posts.map(item => [item.category, item.category])).values()];
    console.log(categories);
});

searchResultList.addEventListener('click', (e) => {
    let element = e.target;
    if (element.tagName === 'LI') {
        addCategory.value = element.dataset.result;
    };
})