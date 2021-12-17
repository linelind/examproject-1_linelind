const breakfastSelect = document.querySelector("#breakfast");
const lunchSelect = document.querySelector("#lunch");
const dinnerSelect = document.querySelector("#dinner");
const dessertsSelect = document.querySelector("#desserts");
const snacksSelect = document.querySelector("#snacks");
const drinksSelect = document.querySelector("#drinks");

const breakfastButton = document.querySelector("#breakfastButton");
const lunchButton = document.querySelector("#lunchButton");
const dinnerButton = document.querySelector("#dinnerButton");
const dessertsButton = document.querySelector("#dessertsButton");
const snacksButton = document.querySelector("#snacksButton");
const drinksButton = document.querySelector("#drinksButton");

const scrolltitleSmallnav = document.querySelector(".scrollinformation_smallscreen");
const loadingAnimation = document.querySelector(".loader_Container");
const ctaViewMore = document.querySelector(".cta-viewMore");
const recipesContainer = document.querySelector(".recipeGridContainer");

const urlAllPosts = "https://linelind.one/Diningwithendometriosis/wp-json/wp/v2/posts?_embed&per_page=20";

async function sortFood(categoryId){

    try {
        const result = await fetch(urlAllPosts);
        const detailsCategory = await result.json();

        recipesContainer.innerHTML="";
        loadingAnimation.innerHTML="";
        loadingAnimation.classList.remove("loadMessage");
        ctaViewMore.style.display="none";

        for(let i = 0; i < detailsCategory.length; i++) {
            
            const category = detailsCategory[i].categories;

            if (category[0] === categoryId || category[1] === categoryId || category[2] === categoryId) {
               
                recipesContainer.innerHTML += `<a href="recipespecific.html?id=${detailsCategory[i].id}" class="recipeCard">
                                                    <div class="recipeCard_image">
                                                        <img src="${detailsCategory[i]._embedded["wp:featuredmedia"][0].source_url}" />
                                                    </div>
                                                    <div class="recipeCard_text">
                                                        <h2>${detailsCategory[i].title.rendered}</h2>
                                                    </div>
                                                </a>`;
            }
        
        }
    }

    catch(error) {
        loadingAnimation.innerHTML="";
        ctaViewMore.style.display="none";
        recipesContainer.innerHTML = createMessage("Oh no! An error occured while fetching the recipes.");
    }
};
  


breakfastSelect.addEventListener('click',function() {
    sortFood(11)
    scrolltitleSmallnav.innerHTML = `<p>Dining With Endometriosis - Breakfast</p>`;
})

breakfastButton.addEventListener('click',function() {
    sortFood(11)
})



lunchSelect.addEventListener('click',function() {
    sortFood(8)
    scrolltitleSmallnav.innerHTML = `<p>Dining With Endometriosis - Lunch</p>`;
})

lunchButton.addEventListener('click',function() {
    sortFood(8)
})



dinnerSelect.addEventListener('click',function() {
    sortFood(12)
    scrolltitleSmallnav.innerHTML = `<p>Dining With Endometriosis - Dinner</p>`;
})

dinnerButton.addEventListener('click',function() {
    sortFood(12)
})



dessertsSelect.addEventListener('click',function() {
    sortFood(4)
    scrolltitleSmallnav.innerHTML = `<p>Dining With Endometriosis - Desserts</p>`;
})

dessertsButton.addEventListener('click',function() {
    sortFood(4)
})



snacksSelect.addEventListener('click',function() {
    sortFood(5)
    scrolltitleSmallnav.innerHTML = `<p>Dining With Endometriosis - Snacks</p>`;
})

snacksButton.addEventListener('click',function() {
    sortFood(5)
})



drinksSelect.addEventListener('click',function() {
    sortFood(3)
    scrolltitleSmallnav.innerHTML = `<p>Dining With Endometriosis - Drinks</p>`;
})

drinksButton.addEventListener('click',function() {
    sortFood(3)
})
 
 

