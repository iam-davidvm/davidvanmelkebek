let selectedCategory = 'all';
let searchTerm = '';
const paginationNumbers = document.getElementById("pagination-numbers"); // NAV
const nextButton = document.getElementById("next-button"); // NAV
const prevButton = document.getElementById("prev-button"); // NAV
const paginationLimit = 6; // NAV
let currentPage; // NAV
let pageNum = 1;

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

/* Pagination */
const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    // pageNumber.className = "pagination";
    pageNumber.classList.add("pagination","pagination-number");
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);
   
    paginationNumbers.appendChild(pageNumber);
  };
 /* end of Pagination */

/* render page */

function renderPage(posts) {
    
    /* change category */
    if (selectedCategory !== 'all') {
        posts = posts.filter(item => {
            return item.category === selectedCategory;
        })
    }

    /* end of change category */

    /* search title */
    if (searchTerm !== '') {
        posts = posts.filter(item => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        })
    }
    /* end search title */
    


    /* TODO */
    // REFACTOR PAGINATION CODE > NOK
    // SEARCH DOESN'T WORK ANYMORE  > OK
    // CATEGORY FILTER DOESN'T SHOW UNIQUE VALUES > OK





    /* Pagination */
    const pageCount = Math.ceil(posts.length / paginationLimit); // NAV

    paginationNumbers.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
    }

    
    currentPage = pageNum;
    
    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    document.querySelectorAll(".pagination-number").forEach((button) => {
        console.log(button)
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex === currentPage) {
          button.classList.add("active");
          button.disabled = true;
        }
      });


    let shownPosts = posts.slice(prevRange, currRange);
    console.log(shownPosts);

    /* End of Pagination */
    
    let html = '';
    shownPosts.forEach(post => {
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

    const categories = [...new Map(posts.map(item => [item.category, item.category])).values()];
    
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

/* change page */

document.querySelector('#pagination-numbers').addEventListener('click', (e) => {
    if(e.target.getAttribute('page-index')) {
        pageNum = Number(e.target.getAttribute('page-index'));
        getPosts();
    };
});

/* end of change page */