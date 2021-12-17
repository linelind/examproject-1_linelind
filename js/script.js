const viewMoreButton = document.querySelector(".cta-viewMore");
const allSelect = document.querySelector("#all");
const allButton = document.querySelector("#allButton");
const scrollingtitleNav = document.querySelector(".scrollinformation_smallscreen");
const recipeGridContainer = document.querySelector(".recipeGridContainer");
const loader = document.querySelector(".loader_Container");
const newurl = "https://linelind.one/Diningwithendometriosis/wp-json/wp/v2/posts?_embed&page=";  
let count = 1;

window.addEventListener('load', fetchPosts());

viewMoreButton.onclick = addPageNumer;

async function fetchPosts() {

    try {
        const response = await fetch(newurl + count);
        const details = await response.json();

        loader.innerHTML="";

        for(let i = 0; i < details.length; i++) {

            recipeGridContainer.innerHTML+= `<a href="recipespecific.html?id=${details[i].id}" class="recipeCard">
                                                <div class="recipeCard_image">
                                                    <img src="${details[i]._embedded["wp:featuredmedia"][0].source_url}" alt="${details[i]._embedded["wp:featuredmedia"][0].alt_text}" />
                                                </div>
                                                <div class="recipeCard_text">
                                                    <h2>${details[i].title.rendered}</h2>
                                                </div>
                                            </a>`;
        }

        if(details.code === "rest_post_invalid_page_number") {
            viewMoreButton.style.display="none";
            loader.innerHTML = "There are no more posts.";
            loader.classList.add("loadMessage");
        }
    }
    catch(error) {
        loader.innerHTML="";
        viewMoreButton.style.display="none";
        recipeGridContainer.innerHTML = createMessage("Oh no! An error occured while fetching the recipes.");
    }
};

function addPageNumer() {
    count++;
    fetchPosts();   
}

allSelect.addEventListener('click',function() {
    recipeGridContainer.innerHTML="";
    loader.innerHTML="";
    loader.classList.remove("loadMessage");
    count = 1;
    fetchPosts();
    viewMoreButton.style.display="inline-block";
    scrollingtitleNav.innerHTML = `<p>Dining With Endometriosis - Recipes</p>`;
}) 

allButton.addEventListener('click',function() {
    recipeGridContainer.innerHTML="";
    loader.innerHTML="";
    loader.classList.remove("loadMessage");
    count = 1;
    fetchPosts();
    viewMoreButton.style.display="inline-block";
}) 