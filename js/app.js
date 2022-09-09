let selectedCategory = 'all';
let searchTerm = '';

/* get json file */

async function getPosts() {
    const url = 'arts/arts.json';
    try {
        let res = await fetch(url);
        let data = await res.json();
        let posts = data.arts;
        renderPage(posts);
        showCategories(posts);
    } catch (error) {
        console.log('My error: ' + error);
    }
}

getPosts();

/* end of get json file */

/* render page */

function renderPage(posts) {
    
    if (selectedCategory !== 'all') {
        posts = posts.filter(item => {
            return item.category === selectedCategory;
        })
    }

    if (searchTerm !== '') {
        posts = posts.filter(item => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        })
    }

    let html = '';
    posts.forEach(post => {
        const postArticle = `<article class="post">
        <figure>
            <a href="/pages/index.html?art=${post.random}" class="overlay">
                <div class="center">
                                    <p>Read More</p>
                                    <i class="fa-solid fa-eye fa-xl"></i>
                </div>
            </a>
            <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80" alt="${post.title}">
        </figure>
        <p><span class="category-pill">${post.category}</span></p>
        <h1>${post.title}</h1>
        <p>${post.teaser}</p>
    </article>`;

        html += postArticle;
    });

    const htmlPosts = document.querySelector('#posts');
    htmlPosts.innerHTML = html;
    if (posts.length === 0) {
        htmlPosts.innerText = 'No posts available';
    }
}

/* end of render page */

/* fill dropdown with categories */

const selectCategories = document.getElementById('select-categories');

function showCategories(posts) {
    // let posts = await getPosts();
    let categories = [].concat(...posts.map((item) => {
        return [item["category"]];
    }));
    selectCategories.innerHTML = '<option value="all">All categories</option>';
    for(let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const option = document.createElement("option");
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);;
        option.value = category;
        if (category === selectedCategory) {
            option.selected = true;
        }
        selectCategories.appendChild(option);
    }
}

// getCategories();

/* end of fill dropdown */

/* change dropdown */

selectCategories.addEventListener('change', (e) => {
    console.log(e.target.value);
    selectedCategory = e.target.value;
    getPosts();
})

/* end of change dropdown */

/* search for title */

const searchTitles = document.getElementById('search');

searchTitles.addEventListener('input', () => {
    searchTerm = searchTitles.value;
    getPosts();
})

/* end search for title */