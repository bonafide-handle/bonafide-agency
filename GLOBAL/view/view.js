function goBack() {
    if (document.referrer && !document.referrer.includes(window.location.hostname)) {
        // If the referrer is from another site, redirect to home
        window.location.href = "../../EN/home.html";
    } else if (window.history.length > 1) {
        // If there's a page in the session history
        window.history.back();
    } else {
        // As a last resort
        window.location.href = "../../EN/home.html";
    }
}

const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('video-id');
const text = urlParams.get('text');

document.getElementById('video-player').src = `https://www.youtube.com/embed/${videoId}`;
document.getElementById('video-text').textContent = decodeURIComponent(text);