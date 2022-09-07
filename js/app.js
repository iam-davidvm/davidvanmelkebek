/* get json file */

async function getPosts() {
    const url = 'arts/arts.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log("My error: " + error);
    }
}

/* end of get json file */

/* render page */

async function renderPage() {
    const posts = await getPosts();
    let html = '';
    posts.arts.forEach(post => {
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
}

renderPage();

/* end of render page */

/* fill dropdown with categories */

const selectCategories = document.getElementById('select-categories');

async function getCategories() {
    let posts = await getPosts();
    let categories = [].concat(...posts.arts.map((item) => {
        return [item["category"]];
    }));
    for(let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const option = document.createElement("option");
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);;
        option.value = category;
        selectCategories.appendChild(option);
    }
}

getCategories();

/* end of fill dropdown */


const searchTitles = document.getElementById('search');

const newPost = getPosts().then(
    function(result) {
        return result;
    },
    function(error) {
        console.log(error);
    }
);
console.log(newPost);


// searchTitles.addEventListener('change', getTitles);