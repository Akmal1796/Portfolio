                                                            /* Enable hidden nav bar */
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

                                                            /*  hide/show navbar */

const sidebar = document.querySelector('.sidebar');

function showSidebar() {
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    sidebar.style.display = 'none';
}

                                                            /* Reveal Elements on Scroll */

window.addEventListener('scroll', reveal);

function reveal() {
    let reveals = document.querySelectorAll('.reveal');

    for(let i=0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 150;

        if(revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}


    /**
   * Animation on scroll
   */
    window.addEventListener('load', () => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        })
      });

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

    /**
   * Navbar links active state on scroll
   */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

 /**
   * Back to top button
   */
    let backtotop = select('.back-to-top');
    if (backtotop) {
    const toggleBacktotop = () => {
        if (window.scrollY > 100) {
        backtotop.classList.add('active')
        } else {
        backtotop.classList.remove('active')
        }
    }
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
    }


                                                            /* hide/show projects */

/* document.addEventListener('DOMContentLoaded', function () {
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
}); */

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.projects-preview-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.project-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

                                                            /* Infinite slider for review messages */

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