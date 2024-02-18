//Enable hidden nav bar
{
    const nav = document.querySelector(".nav");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if(lastScrollY < window.scrollY) {
            nav.classList.add("nav--hidden");
        }
        else {
            nav.classList.remove("nav--hidden");
        }

        lastScrollY = window.scrollY;
    });
}

/* console.log("Hello World!"); */

const sidebar = document.querySelector('.sidebar');

function showSidebar() {
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    sidebar.style.display = 'none';
}

/* 
let projectsPreview = document.querySelector('.projects-preview');

let seemoreBTN = document.querySelector('.seemore-btn'); */

/* document.querySelector('.seemore-btn').addEventListener('click', function() {
    let hiddenProject = document.querySelectorAll('.hidden');

    hiddenProject.forEach(element => {
        element.classList.remove('hidden');
    });
    
    document.querySelector('.seemore-btn').innerHTML = 'See Less';
}) */

document.addEventListener('DOMContentLoaded', function () {
    const hiddenProjects = document.querySelectorAll('.projects-preview .project');
    const seeMoreBtn = document.querySelector('.seemore-btn');

    // Function to toggle visibility of projects
    function toggleProjects() {
        hiddenProjects.forEach((project, index) => {
            if (index < 3) {
                // Show the first 5 projects
                project.classList.remove('hidden');
            } else {
                // Hide the rest
                project.classList.add('hidden');
            }
        });
    }

    // Event listener for the "See More" button
    seeMoreBtn.addEventListener('click', function () {
        if (seeMoreBtn.innerHTML === 'See More') {
            // Show all projects
            hiddenProjects.forEach(project => {
                project.classList.remove('hidden');
            });

            // Change button text to "See Less"
            seeMoreBtn.innerHTML = 'See Less';
        } else {
            // Toggle visibility of projects based on the "See Less" state
            toggleProjects();

            // Change button text to "See More"
            seeMoreBtn.innerHTML = 'See More';
        }
    });

    // Initial setup to show the first 5 projects
    toggleProjects();
});

const feedbackContainer = document.querySelector('.feddback-container');
const feedbackBox = document.querySelector('.feddback-message-container');
const arrowBtns = document.querySelectorAll('.feddback-container i');
const firstCardWidth = feedbackBox.querySelector(".feedback").offsetWidth;
const feedbackChildren = [...feedbackBox.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

//Get the number of cards that can fit the feedbackBox at once
let cardPerView = Math.round(feedbackBox.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of the feedbackBox for infinite scrolling
feedbackChildren.slice(-cardPerView).reverse().forEach(card => {
    feedbackBox.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of the feedbackBox for infinite scrolling
feedbackChildren.slice(0, cardPerView).forEach(card => {
    feedbackBox.insertAdjacentHTML("beforeend", card.outerHTML);
});


//Add event listeners for the arrow button to scroll the feedbackBox left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        feedbackBox.scrollLeft += btn.id === "left" ? - firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    feedbackBox.classList.add("dragging");
    //record the initial cursor and scroll position of the feedbackBox
    startX = e.pageX;
    startScrollLeft = feedbackBox.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return //if isDragging is false return from here
    //Updates the scroll position of the feedbackBox based on the cursor movement
    feedbackBox.scrollLeft = startScrollLeft-(e.pageX - startX);
}

const draggStop = () => {
    isDragging = false;
    feedbackBox.classList.remove("dragging");
}

const autoPlay = () =>  {
    if(window.innerWidth < 800) return; //Return if window is smaller than 800
    // Autoplay the feedbckBox after every 2.5 s
    timeoutId = setTimeout(() => feedbackBox.scrollLeft += firstCardWidth, 2500);
}

autoPlay();

const infiniteScroll = () => {
    //If the feedbackBox is at the beginning, scroll to the end
    if(feedbackBox.scrollLeft === 0) {
        feedbackBox.classList.add("no-transition");
        feedbackBox.scrollLeft = feedbackBox.scrollWidth - (2 * feedbackBox.offsetWidth);
        feedbackBox.classList.remove("no-transition");
    }
    // If the feedbackBox is at the end, scroll to the beginning
    else if(Math.ceil(feedbackBox.scrollLeft) === feedbackBox.scrollWidth - feedbackBox.offsetWidth) {
        feedbackBox.classList.add("no-transition");
        feedbackBox.scrollLeft = feedbackBox.offsetWidth;
        feedbackBox.classList.remove("no-transition");
    }

    //Clear existing timeout & start autoplay if mouse is not hovering over feedbackBox
    clearTimeout(timeoutId);
    if(feedbackContainer.matches(":hover")) autoPlay();

}

feedbackBox.addEventListener("mousedown", dragStart);
feedbackBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", draggStop);
feedbackBox.addEventListener("scroll", infiniteScroll);
feedbackContainer.addEventListener("mouseenter", () => clearTimeout(timeoutId));
feedbackContainer.addEventListener("mouseleave", autoPlay);