/* get query param of string to see which post is requested */
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const value = params.art;

const content = document.getElementById('page-content-article');

// get the post information where the query string matches
async function getPosts() {
    const url = '../arts/arts.json';
    try {
        let res = await fetch(url);
        let data = await res.json();
        let posts = data.arts;
        post = posts.filter(item => {
            return item.date === value;
        })[0];
        renderPage(post);
        showRelated(posts, post.category);
    } catch (error) {
        console.log('My error: ' + error);
        content.innerText = 'Couldn\'t find this post :('
    }
}

getPosts();


function renderPage(post) {
    const articleCategory = document.getElementById('page-hero-category');
    const pageHeroImg = document.getElementById('page-hero-image');
    const dateObject = new Date(parseInt(post.date));
    
    pageHeroImg.src = post.heroImage;
    pageHeroImg.alt = post.title;
    articleCategory.innerHTML = `<span class="category-pill">${post.category}</span>`;

    const date = `${dateObject.getDate()} ${dateObject.toLocaleString('default', {month:'long'})} ${dateObject.getFullYear()}`;
    content.innerHTML = `<h1>${post.title}</h1>
    <p id="page-date">${date}</p>
    ${post.body}`
}

function showRelated(posts, category) {
    const content = document.getElementById('page-related-content');
    const moreCategoryPill = content.getElementsByClassName('more-category-pill')[0];
    
    // if there are related posts, show them but not more then 3 items
    const relatedPosts = posts.filter(item => {
        if (item.date !== value) {
            return item.category === category;
        } else {
            return false;
        }
    }).slice(0, 3);

    if (relatedPosts.length > 0) {
        moreCategoryPill.classList.add('category-pill');
        moreCategoryPill.innerText = `other ${category}:`;
    } else {
        moreCategoryPill.id = 'no-related';
    }

    let html = '';

    for (let i = 0; i < relatedPosts.length; i++){
        html += `<article class="post">
        <figure>
            <a href="/pages/index.html?art=${relatedPosts[i].date}" class="overlay">
                <div class="center">
                                    <p>Read More</p>
                                    <i class="fa-solid fa-eye fa-xl"></i>
                </div>
            </a>
            <img src="${relatedPosts[i].heroImage}" alt="${relatedPosts[i].title}">
        </figure>
        <p><span class="category-pill">${category}</span></p>
        <h1>${relatedPosts[i].title}</h1>
        <p>${relatedPosts[i].teaser}</p>
    </article>`;
    }
    const showRelatedPosts = document.getElementById('posts');
    showRelatedPosts.innerHTML = html;
}