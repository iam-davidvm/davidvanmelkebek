const container = document.getElementById('create').querySelector('.container');

async function getPosts() {
    const url = '../arts/arts.json';
    try {
        let res = await fetch(url);
        let data = await res.json();
        let posts = data.arts;
        return posts;
    } catch (error) {
        console.log('My error: ' + error);
        container.innerText = 'Something went wrong';
    }
}

/* get query param of string */
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const value = params.edit;

let editDate;

const addButton = document.getElementById('add-button');
const editButton = document.getElementById('edit-button');
const addSection = document.getElementById('add');

addButton.addEventListener('click', () => {
    const buttons = document.getElementById('buttons');
    buttons.style.display = 'none'; 
    addSection.classList.remove('d-none');
});


// add page variables
const addTitle = document.getElementById('add-title');
const addCategory = document.getElementById('add-category');
const searchResult = document.getElementById('search-result');
const searchResultList = document.getElementById('search-result-list');
const addTeaser = document.getElementById('add-teaser');
const addHeroImage = document.getElementById('add-hero-image');
const addTextboxButtons = document.getElementById('add-textbox-buttons');
const addButtons = addTextboxButtons.querySelectorAll('button');
const addTextboxText = document.getElementById('add-textbox-text');

//date to show on the preview, when publishing the text, we will use a new precise one
let previewDate = new Date();
previewDate = `${previewDate.getDate()} ${previewDate.toLocaleString('default', {month:'long'})} ${previewDate.getFullYear()}`;

// page preview elements
const pageContentTitle = document.getElementById('page-content-title');
const pageDate = document.getElementById('page-date');
const pageContentBody = document.getElementById('page-content-body');
const submitButton = document.getElementById('publish');

pageDate.innerText = previewDate;

addTitle.addEventListener('input', () => {
    pageContentTitle.innerText = addTitle.value;
});

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

/* you don't need to type the catogory if it already exists */
addCategory.addEventListener('input', async () => {
    const posts = await getPosts();
    const inputValue = addCategory.value;
    const allCategories = [...new Map(posts.map(item => [item.category, item.category])).values()];
    const showCategories = allCategories.filter(category => {
        return category.includes(inputValue.toLowerCase());
    });

    if (showCategories.length > 0 && allCategories.length !== showCategories.length) {
        addCategory.classList.add('show-categories');
        searchResult.classList.remove('d-none');
        let items = '';
        for (let category of showCategories) {
            items += `<li data-result="${category}">${category}</li>`;
        }
        searchResultList.innerHTML = items;
    } else {
        addCategory.classList.remove('show-categories');
        searchResult.classList.add('d-none');
    }
});

searchResultList.addEventListener('click', (e) => {
    let element = e.target;
    if (element.tagName === 'LI') {
        addCategory.value = element.dataset.result;
        addCategory.classList.remove('show-categories');
        searchResult.classList.add('d-none');
    };
})


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    // default fallback image
    const heroImg = addHeroImage.value === '' ? 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80' : addHeroImage.value;
    const publishDate = value === null ? Date.now() : editDate;
    const submitPost = {
        title: `${addTitle.value}`,
        heroImage: `${heroImg}`,
        teaser: `${addTeaser.value}`,
        body: `${addTextboxText.textContent}`,
        date: `${publishDate}`,
        category: `${addCategory.value.toLowerCase()}`,
        author: 'David',
    };

    // Right now I don't know how to create/update a JSON record, that's why I copy to the clipboard
    const jsonPost = JSON.stringify(submitPost);
    navigator.clipboard.writeText(jsonPost);
    console.log('object saved to clipboard');
    container.innerHTML = '<p class="success">The item was succesfully copied to your clipboard!<br><a href="index.html" id="success-link">Return to overview</a></p>';
});

// edit page elements
const editSection = document.getElementById('edit');
const searchPosts = document.getElementById('search');
const postsList = document.getElementById('posts-list');

editButton.addEventListener('click', async() => {
    const buttons = document.getElementById('buttons');
    buttons.style.display = 'none'; 
    editSection.classList.remove('d-none');
    const posts = await getPosts();
    const filteredPosts = [...new Map(posts.map(item => [item.date, [item.title, item.date]])).values()];
    let lis = '';
    for (let item of filteredPosts) {
        lis += `<li><a href="index.html?edit=${item[1]}"><i class="fa-solid fa-pen"></i> ${item[0]}</a></li>`;
    }
    postsList.innerHTML = lis;
});

searchPosts.addEventListener('input', async() => {
    const posts = await getPosts();
    let filteredPosts = [...new Map(posts.map(item => [item.date, [item.title, item.date]])).values()];
    filteredPosts = filteredPosts.filter(item => {
        return item[0].toLowerCase().includes(searchPosts.value.toLowerCase());
    });
    let lis = '';
    for (let item of filteredPosts) {
        lis += `<li><a href="index.html?edit=${item[1]}"><i class="fa-solid fa-pen"></i> ${item[0]}</a></li>`;
    }
    if (lis === '') {
        postsList.innerHTML = 'No posts found.'
    } else {
        postsList.innerHTML = lis;
    }
});

// if there is a value, we need to  get the information of the post
if (value !== null) {
    const addSection = document.getElementById('add');
    
    const buttons = document.getElementById('buttons');
    buttons.style.display = 'none'; 
    addSection.classList.remove('d-none');

    const showPost = async() => {
        const posts = await getPosts();
    
        // Could also to this in the getPost function
        const thisPost = posts.filter(item => {
            return item.date === value;
        });
    
        addTitle.value = `${thisPost[0].title}`;
        addCategory.value = `${thisPost[0].category}`;
        addTeaser.value = `${thisPost[0].teaser}`;
        addHeroImage.value = `${thisPost[0].heroImage}`;
        addTextboxText.innerText = `${thisPost[0].body}`;
        editDate = `${thisPost[0].date}`;
    }

    showPost();
    
}