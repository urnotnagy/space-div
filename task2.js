const NUM_ASTEROIDS = 50;
const ASTEROID_IMAGES = [
    "https://i.imgur.com/yIbmDYw.png",
    "https://i.imgur.com/MZutMpv.png",
    "https://i.imgur.com/AZumOFI.png"
];

const PLANETS_DATA = [
    { id: 'planet-1', containerId: 'planet-1-container', text: 'Planet Alpha', revealDepth: 600, factor: 0.3, image: 'assets/img/planet_alpha.webp' },
    { id: 'planet-2', containerId: 'planet-2-container', text: 'Planet Beta', revealDepth: 1500, factor: 0.25, image: 'assets/img/planet_beta.webp' },
    { id: 'planet-3', containerId: 'planet-3-container', text: 'Planet Gamma', revealDepth: 1900, factor: 0.10, image: 'assets/img/planet_gamma.png' }
];

function createPlanets() {
    PLANETS_DATA.forEach(planetData => {
        const planetContainer = document.getElementById(planetData.containerId);
        if (planetContainer) {
            const planetElement = document.createElement('img');
            planetElement.id = planetData.id;
            planetElement.classList.add('planet');
            planetElement.src = planetData.image;
            planetElement.alt = planetData.text;
            planetElement.style.opacity = '0'; // Start hidden, reveal on scroll

            planetElement.dataset.factor = planetData.factor;
            planetElement.dataset.revealDepth = planetData.revealDepth;
            
            planetContainer.appendChild(planetElement);
        } else {
            console.error(`Container with ID ${planetData.containerId} not found for planet ${planetData.id}`);
        }
    });
}

// Function to create and append asteroids
function createAsteroids() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < NUM_ASTEROIDS; i++) {
        const asteroid = document.createElement('img');
        asteroid.classList.add('asteroid'); // Removed 'rocks' class if not used elsewhere
        asteroid.src = ASTEROID_IMAGES[Math.floor(Math.random() * ASTEROID_IMAGES.length)];
        
        const minWidth = 30;
        const maxWidth = 120;
        asteroid.style.width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth) + 'px';
        asteroid.style.opacity = (Math.random() * 0.3 + 0.7).toFixed(2);

        asteroid.dataset.factor = (Math.random() * -0.6 - 0.2).toFixed(2);
        asteroid.dataset.horizontalFactor = (Math.random() * 0.5 - 0.25).toFixed(2);
        asteroid.dataset.rotationFactor = (Math.random() * 0.1 - 0.05).toFixed(2);
        
        fragment.appendChild(asteroid);
    }
    document.body.appendChild(fragment); // Append asteroids to body
}

// Function to scatter asteroids
function scatterAsteroids() {
    const asteroids = document.querySelectorAll('.asteroid');
    const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const viewportWidth = window.innerWidth;

    asteroids.forEach(asteroid => {
        asteroid.style.top = Math.random() * (scrollHeight * 0.9) + 'px'; // Scatter within 90% of scroll height
        asteroid.style.left = Math.random() * viewportWidth + 'px';
    });
}


window.addEventListener('load', () => {
    createPlanets(); // Create planets
    createAsteroids();
    scatterAsteroids();
});


// Listen for the scroll event on the window
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;



    // Handle parallax for the new star layer
    const parallaxStarsLayer = document.getElementById('parallax-stars-layer');
    if (parallaxStarsLayer) {
        const parallaxFactorStars = -0.1; // Negative value to move stars upwards on scroll
        parallaxStarsLayer.style.transform = `translateY(${scrollY * parallaxFactorStars}px)`;
    }


    // Handle asteroids parallax
    const asteroids = document.querySelectorAll('.asteroid');
    asteroids.forEach(asteroid => {
        const factor = parseFloat(asteroid.dataset.factor);
        const horizontalFactor = parseFloat(asteroid.dataset.horizontalFactor);
        const rotationFactor = parseFloat(asteroid.dataset.rotationFactor);

        const verticalMove = scrollY * factor;
        const horizontalMove = scrollY * horizontalFactor;
        const rotation = scrollY * rotationFactor;
        asteroid.style.transform = `translateY(${verticalMove}px) translateX(${horizontalMove}px) rotate(${rotation}deg)`;
    });

    // Handle planets reveal and parallax
    PLANETS_DATA.forEach(planetData => {
        const planetElement = document.getElementById(planetData.id);
        if (planetElement) {
            const revealDepth = parseFloat(planetElement.dataset.revealDepth);
            const factor = parseFloat(planetElement.dataset.factor);

            if (scrollY >= revealDepth) {
                planetElement.style.opacity = '1';
            } else {
                planetElement.style.opacity = '0'; // Hide if scrolled back up
            }

            // Apply parallax only if visible or partially visible for smoother appearance
            if (planetElement.style.opacity === '1' || scrollY > revealDepth - window.innerHeight) {
                 planetElement.style.transform = `translateY(${ (scrollY - revealDepth) * factor}px)`;
            }
        }
    });
});
