let selectedCategory = 'all';
let searchTerm = '';
const paginationNumbers = document.getElementById('pagination-numbers');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const paginationLimit = 6;
let currentPage;
let pageNum = 1;
const htmlPosts = document.querySelector('#posts');
let categories = [];

/* get json file */

async function getPosts() {
    const url = 'arts/arts.json';
    try {
        let res = await fetch(url);
        let data = await res.json();
        let posts = data.arts;

        categories = [...new Set(posts.map(post => post.category))];

        renderPage(posts);
        
        /* change page */
        document.querySelector('#pagination-numbers').addEventListener('click', (e) => {
            if(e.target.getAttribute('page-index')) {
                pageNum = Number(e.target.getAttribute('page-index'));
                renderPage(posts);
            };
        });

        prevButton.addEventListener('click', () => {
            console.log('before', pageNum);
            pageNum = currentPage - 1;
            console.log('after', pageNum);
            renderPage(posts);
        });
        
        nextButton.addEventListener('click', () => {
            console.log('before', pageNum);
            pageNum = currentPage + 1;
            console.log('after', pageNum);
            renderPage(posts);
        });

        /* end of change page */

    } catch (error) {
        console.log('My error: ' + error);
        htmlPosts.innerText = 'Couldn\'t find any posts :(';
    }
}

getPosts();

/* end of get json file */

/* Pagination */
const appendPageNumber = (index) => {
        
    const pageNumber = document.createElement('button');
    pageNumber.classList.add('pagination','pagination-number');
    pageNumber.innerHTML = index;
    pageNumber.setAttribute('page-index', index);
    pageNumber.setAttribute('aria-label', 'Page ' + index);

    paginationNumbers.appendChild(pageNumber);
};
/* end of Pagination */

function renderPage (posts)  {
    console.log('load', pageNum);
      
    let selectedPosts = posts;

    /* render posts */  

        /* if the categories is changed, we only want to show the specific posts */
        if (selectedCategory !== 'all') {
            selectedPosts = posts.filter(item => {
                return item.category === selectedCategory;
            })
        }
        /* end of change category */

        /* show the correct articles based on the search term*/
        if (searchTerm !== '') {
            selectedPosts = posts.filter(item => {
                return item.title.toLowerCase().includes(searchTerm.toLowerCase());
            })
        }
        /* end search title */
        
        /* Pagination */
        const pageCount = Math.ceil(selectedPosts.length / paginationLimit);
        
        // only show the next and previous button on certain occasions
        if (pageCount === 1) {
            prevButton.classList.add('d-none');
            nextButton.classList.add('d-none');
        } else if (pageNum === 1) {
            prevButton.classList.add('d-none');
            nextButton.classList.remove('d-none');
        } else if (pageNum === pageCount) {
            prevButton.classList.remove('d-none');
            nextButton.classList.add('d-none');
        } else {
            prevButton.classList.remove('d-none');
            nextButton.classList.remove('d-none');
        }

        paginationNumbers.innerHTML = '';

        // if the screen gets to small I only want to show the next & previous button
        const windowSize = window.innerWidth;
        const paginationSize = (50 * pageCount + 2) + 80;
        
        if (paginationSize <= windowSize) {
            for (let i = 1; i <= pageCount; i++) {
                appendPageNumber(i);
            }
        }

        currentPage = pageNum;
        
        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;

        document.querySelectorAll('.pagination-number').forEach((button) => {
            button.classList.remove('active');
            const pageIndex = Number(button.getAttribute('page-index'));
            if (pageIndex === currentPage) {
            button.classList.add('active');
            button.disabled = true;
            }
        });

        selectedPosts = selectedPosts.slice(prevRange, currRange);

        /* End of Pagination */
        
        let html = '';
        selectedPosts.forEach(post => {
            const postArticle = `<article class="post">
            <figure>
            <a href="/pages/index.html?art=${post.date}" class="overlay">
            <div class="center">
            <p>Read More</p>
            <i class="fa-solid fa-eye fa-xl"></i>
            </div>
            </a>
            <img src="${post.heroImage}" alt="${post.title}">
            </figure>
            <p><span class="category-pill">${post.category}</span></p>
            <h1>${post.title}</h1>
            <p>${post.teaser}</p>
            </article>`;
            
            html += postArticle;
        });
        
        
        htmlPosts.innerHTML = html;
        if (selectedPosts.length === 0) {
            htmlPosts.innerText = 'No posts available';
        }



    /* end of render page */



    /* fill dropdown with categories */

    const selectCategories = document.getElementById('select-categories');
        
        selectCategories.innerHTML = '<option value="all">All categories</option>';
        for(let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const option = document.createElement('option');
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);;
            option.value = category;
            if (category === selectedCategory) {
                option.selected = true;
            }
            selectCategories.appendChild(option);
        }

    // getCategories();

    /* end of fill dropdown */

    /* change dropdown */

    selectCategories.addEventListener('change', (e) => {
        selectedCategory = e.target.value;
        pageNum = 1;
        renderPage(posts);
    });

    /* end of change dropdown */

    /* search for title */

    const searchTitles = document.getElementById('search');

    searchTitles.addEventListener('input', () => {
        searchTerm = searchTitles.value;
        pageNum = 1;
        renderPage(posts);
    });

    /* end search for title */

    /* control pagination state when screen size changes */
    window.addEventListener('resize', () => {
        renderPage(posts);
    });
    /* end of screensize changes */

}