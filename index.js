console.log("Hello World!");

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
