// Function to scatter asteroids
function scatterAsteroids() {
    const asteroids = document.querySelectorAll('.asteroid');
    const scrollHeight = document.body.scrollHeight;
    const viewportWidth = window.innerWidth;

    asteroids.forEach(asteroid => {
        // Ensure the asteroid has position: fixed or absolute for top/left to work as expected.
        // This should ideally be set in CSS.
        asteroid.style.top = Math.random() * (scrollHeight * 0.8) + 'px';
        asteroid.style.left = Math.random() * viewportWidth + 'px';
    });
}

// Scatter asteroids on page load
window.addEventListener('load', scatterAsteroids);


// Listen for the scroll event on the window
window.addEventListener('scroll', function() {
    // Get the current vertical scroll position
    const scrollY = window.scrollY;

    // --- Handle the four main parallax layers ---
    // These layers will move downwards at different speeds.
    const layerBg = document.getElementById('parallax-layer-bg');
    const layerMid1 = document.getElementById('parallax-layer-mid1');
    const layerMid2 = document.getElementById('parallax-layer-mid2');
    const layerFg = document.getElementById('parallax-layer-fg');

    if (layerBg) {
        // Background layer moves the slowest
        layerBg.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
    if (layerMid1) {
        // Mid-ground layer 1 moves at a moderate speed
        layerMid1.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    if (layerMid2) {
        // Mid-ground layer 2 moves a bit faster
        layerMid2.style.transform = `translateY(${scrollY * 0.6}px)`;
    }
    if (layerFg) {
        // Foreground layer moves the fastest (or nearly with the scroll)
        layerFg.style.transform = `translateY(${scrollY * 0.9}px)`;
    }

    // --- Handle the "asteroids" (rock layers) ---
    // These layers will move upwards at different speeds as the page scrolls down.
    // Factors are derived from the original script.
    // Initial positions are now set by scatterAsteroids().
    const rocksData = [
        { selector: '#rock-1', factor: -0.8, horizontalFactor: 0.2, rotationFactor: 0.05 },
        { selector: '#rock-2', factor: -0.6, horizontalFactor: -0.15, rotationFactor: -0.03 },
        { selector: '#rock-3', factor: -0.4, horizontalFactor: 0.1, rotationFactor: 0.02 },
        { selector: '#rock-4', factor: -0.5, horizontalFactor: -0.25, rotationFactor: -0.04 },
        { selector: '#rock-5', factor: -0.7, horizontalFactor: 0.18, rotationFactor: 0.06 },
        { selector: '#rock-6', factor: -0.7, horizontalFactor: -0.1, rotationFactor: -0.025 },
        { selector: '#rock-7', factor: -0.5, horizontalFactor: 0.22, rotationFactor: 0.035 },
        { selector: '#rock-8', factor: -0.2, horizontalFactor: -0.05, rotationFactor: -0.01 },
        { selector: '#rock-9', factor: -0.4, horizontalFactor: 0.12, rotationFactor: 0.015 }
    ];

    rocksData.forEach(rockInfo => {
        const rockElement = document.querySelector(rockInfo.selector);
        if (rockElement) {
            // The transform is relative to the initial scattered position.
            // We are NOT re-setting top/left here, only transform.
            const verticalMove = scrollY * rockInfo.factor;
            const horizontalMove = scrollY * rockInfo.horizontalFactor;
            const rotation = scrollY * rockInfo.rotationFactor;
            rockElement.style.transform = `translateY(${verticalMove}px) translateX(${horizontalMove}px) rotate(${rotation}deg)`;
        }
    });
});
