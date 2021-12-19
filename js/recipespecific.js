const recipeDetails = document.querySelector(".recipeDetails");

const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal-content");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const urlRecipe = "https://linelind.one/Diningwithendometriosis/wp-json/wp/v2/posts/" + id + "?_embed"; 
const scrollingTitle = document.querySelector(".scrollinformation_smallscreen");
const pageTitle = document.querySelector("title");


async function fetchDetails() {

    try {
        const result = await fetch(urlRecipe);
        const details = await result.json();
        

        createHtml(details);
    

        const mobileImage = document.querySelector(".recipeImage_smallScreen");
        const mobileZoomIcon = document.querySelector(".zoom_smallscreen");
        const laptopImage = document.querySelector(".recipeImage_largeScreen img");
        const laptopZoomImage = document.querySelector(".zoom_largescreen");


        mobileImage.addEventListener("click", displayModal);
        mobileZoomIcon.addEventListener("click", displayModal);
        laptopImage.addEventListener("click", displayModal); 
        laptopZoomImage.addEventListener("click", displayModal);
        
        function displayModal() {
            modal.style.display = "block"; 

            modalImage.innerHTML = `
                                    <div>
                                    <span id="exitModalIcon">&times;</span>
                                        <img src="${details._embedded["wp:featuredmedia"][0].source_url}" alt="${details._embedded["wp:featuredmedia"][0].alt_text}" />
                                    </div>`;  
        }

        modal.onclick = function() {
            modal.style.display = "none";
        }
    }

    catch(error) {
        recipeDetails.innerHTML = createMessage("Oh no! An error occured while fetching the recipe.");
    }
}

fetchDetails();


function createHtml(details) {

    const dateOnly = `${details.date.slice(0, -9)}`;

    recipeDetails.innerHTML = `<div class="recipeContainer">
                                    <div class="recipeImage_smallScreen" style="background-image: url('${details._embedded["wp:featuredmedia"][0].source_url}')"></div>
                                    <i class="fas fa-search-plus zoom_smallscreen"></i> 
                                    <div class="recipeImage_largeScreen">
                                    <i class="fas fa-search-plus zoom_largescreen"></i>
                                        <img src="${details._embedded["wp:featuredmedia"][0].source_url}" alt="${details._embedded["wp:featuredmedia"][0].alt_text}" />
                                    </div>
                                    <div class="recipeIntroContainer">
                                        <h1>${details.title.rendered}</h1>
                                        <p>${details.blocks[0].attrs.content}</p>
                                        <p class="recipeSignature">Hope you enjoy! - Emma</p>
                                        <div class="timeContainer">
                                            <div class="timeContainer-content">
                                                <i class="fas fa-calendar-alt"></i>
                                                <p>${dateOnly}</p>
                                            </div>
                                            <div class="timeContainer-content">
                                                <i class="fas fa-stopwatch"></i>
                                                <p>${details.blocks[1].attrs.content}</p>
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                                <div class="recipeHowToContainer">
                                    <h2 class="decorate">How to make</h2>
                                </div>  
                                <div class="recipeDetailsContainer">   
                                    <div class="recipeIngredientsContainer">
                                        <h3>Ingredients</h3>
                                        <p>${details.blocks[2].attrs.content}</p>
                                    </div>
                                    <div class="recipePreparationContainer">
                                        <h3>Preparation</h3>
                                        <p>${details.blocks[3].attrs.content}</p>
                                    </div>
                                </div>`;
                            

     scrollingTitle.innerHTML = `<p>${details.title.rendered}</p>`;

     pageTitle.innerHTML = `${details.title.rendered} | Dining with Endometriosis`;
                                
}


const postCommentButton = document.querySelector(".cta-postComment");
const commentForm = document.querySelector("form");

const commentName = document.querySelector("#yourname");
const commentNameError = document.querySelector("#yournameError");
const commentMessage = document.querySelector("#comment");
const commentMessageError = document.querySelector("#commentError");


function validateComment(event) {

    event.preventDefault();

    if(checkLen(commentName.value, 1) === true) {
        commentNameError.style.display = "none";
    } 
    else {
        commentNameError.style.display = "block";

        postCommentButton.value = "Post comment";
        postCommentButton.style.background ="#f2a007";

    }
    
    if(checkLen(commentMessage.value, 1) === true) {
        commentMessageError.style.display = "none";
    } 
    else {
        commentMessageError.style.display = "block";

        postCommentButton.value = "Post comment";
        postCommentButton.style.background ="#f2a007";
    } 
} 


function confirmPosting() {
    if (checkLen(commentName.value, 1) && checkLen(commentMessage.value, 1)) {
        
        commentForm.reset();
        
        postCommentButton.value = "Posted!";
        postCommentButton.style.background = "#94bf69";
    } 
}


function checkLen(value, len) {
    if (value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
}

commentForm.addEventListener("submit", validateComment);
commentForm.addEventListener("submit", confirmPosting);