const latestSection = document.querySelector(".latestPostsSection");
const latestPosts = document.querySelector(".latestPostsContainer");
const url = "https://linelind.one/Diningwithendometriosis/wp-json/wp/v2/posts?_embed&page=1";

async function getPosts() {

    try {

        const response = await fetch(url);
        const details = await response.json();

        latestPosts.innerHTML="";

        for(let i = 0; i < details.length; i++) {

            if (details) {
                latestSection.classList.remove("hideSection");
            }

            latestPosts.innerHTML+= `<a href="recipespecific.html?id=${details[i].id}" class="recipeCard">
                                        <div class="recipeCard_image">
                                            <img src="${details[i]._embedded["wp:featuredmedia"][0].source_url}" alt="${details[i]._embedded["wp:featuredmedia"][0].alt_text}" />
                                        </div>
                                        <div class="recipeCard_text">
                                            <p>${details[i].title.rendered}</p>
                                        </div>
                                    </a>`;
        }

        const slideRight = document.querySelector(".fa-arrow-right");
        const slideLeft = document.querySelector(".fa-arrow-left");
        let pixelsRight = 180;
        let pixelsLeft = -180;
        
        if (window.innerWidth > 600 ) {
            pixelsRight = 360;
            pixelsLeft = -360;
        }  
        if (window.innerWidth > 900 ) {
            pixelsRight = 540; 
            pixelsLeft = -540; 
        }  
     
        slideRight.onclick = function() {
            latestPosts.scrollLeft += pixelsRight;
        }

        slideLeft.onclick = function() {
            latestPosts.scrollLeft += pixelsLeft;
        }

    }

    catch(error) {
        console.log(error);
    }

};

getPosts();
