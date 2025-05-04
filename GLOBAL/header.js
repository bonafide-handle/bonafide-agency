// Trigger parallax update on page load
window.addEventListener('load', function () {
    updateParallaxBackground();
});

// Header Scroll Change + Parallax
let ticking = false;

function updateParallaxBackground() {
    const background = document.querySelector('body');
    const offset = window.pageYOffset;
    background.style.backgroundPosition = `center ${offset * -0.1}px`;
}

// Mobile Menu Toggle
const menuHamburger = document.getElementById("menu-hamburger");
const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("close-menu");

menuHamburger.addEventListener("click", function() {
    toggleOverlay(true);
    document.body.classList.add("no-scroll");
});

closeMenu.addEventListener("click", function() {
    toggleOverlay(false);
    document.body.classList.remove("no-scroll");
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 920) {
        toggleOverlay(false);
        document.body.classList.remove("no-scroll");
    }
});

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const header = document.querySelector("header");
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

            updateParallaxBackground();
            ticking = false;
        });
        ticking = true;
    }
});

// Toggle Overlay Function (with smooth transition)
function toggleOverlay(show) {
    const overlay = document.querySelector('.overlay');

    if (show) {
        overlay.style.display = 'flex';
        requestAnimationFrame(() => {
            overlay.classList.add('show');
        });
    } else {
        overlay.classList.remove('show');
        overlay.addEventListener('transitionend', function handler() {
            overlay.style.display = 'none';
            overlay.removeEventListener('transitionend', handler);
        });
    }
}

// Tile Click Redirect with Data Attributes
document.querySelectorAll('.tile-link').forEach(tile => {
    tile.addEventListener('click', function(event) {
        event.preventDefault();
        const item = event.target.closest('.item');
        const videoId = item.getAttribute('data-video-id');
        const text = item.getAttribute('data-text');
        const link = item.getAttribute('data-link');
        const url = new URL(link, window.location.href);
        url.searchParams.append('video-id', videoId);
        url.searchParams.append('text', encodeURIComponent(text));
        window.location.href = url.toString();
    });
});