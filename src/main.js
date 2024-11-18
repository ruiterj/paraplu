import './style.css'

let shakeTimeouts = [];

function clearAnimations() {
    const container = document.querySelector('.animation-container');
    if (container) container.remove();
    
    // Remove any weather-specific classes from body
    document.body.className = '';
    
    // Reset any transform effects from thunder
    document.body.style.transform = 'none';
    
    // Clear shake timeouts
    shakeTimeouts.forEach(timeout => clearTimeout(timeout));
    shakeTimeouts = [];
}

function createRain(intensity = 'normal') {
    clearAnimations();
    document.body.classList.add('weather-rain');
    
    const container = document.createElement('div');
    container.className = 'animation-container';
    document.body.prepend(container);
    
    let numberOfDrops, speedRange, dropClass;
    
    switch(intensity) {
        case 'heavy':
            numberOfDrops = 150;
            speedRange = { min: 0.5, max: 0.8 }; // Faster
            dropClass = 'rain-drop heavy';
            break;
        case 'light':
            numberOfDrops = 50;
            speedRange = { min: 1, max: 1.5 }; // Slower
            dropClass = 'rain-drop light';
            break;
        default:
            numberOfDrops = 100;
            speedRange = { min: 0.7, max: 1.2 };
            dropClass = 'rain-drop';
    }
    
    for (let i = 0; i < numberOfDrops; i++) {
        const drop = document.createElement('div');
        drop.className = dropClass;
        
        const left = Math.random() * 100;
        const startingTop = Math.random() * -100;
        const animationDuration = Math.random() * (speedRange.max - speedRange.min) + speedRange.min;
        const delay = Math.random() * -2;
        
        drop.style.left = `${left}%`;
        drop.style.top = `${startingTop}%`;
        drop.style.animationDuration = `${animationDuration}s`;
        drop.style.animationDelay = `${delay}s`;
        
        container.appendChild(drop);
    }
}

function createSnow() {
    clearAnimations();
    document.body.classList.add('weather-snow');
    
    const container = document.createElement('div');
    container.className = 'animation-container';
    document.body.prepend(container);
    
    const numberOfFlakes = 50;
    
    for (let i = 0; i < numberOfFlakes; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        
        const left = Math.random() * 100;
        const drift = Math.random() * 200 - 100;
        const animationDuration = Math.random() * 3 + 5;
        const delay = Math.random() * -5;
        
        flake.style.left = `${left}%`;
        flake.style.setProperty('--drift', `${drift}px`);
        flake.style.animationDuration = `${animationDuration}s`;
        flake.style.animationDelay = `${delay}s`;
        
        container.appendChild(flake);
    }
}

function createClouds() {
    clearAnimations();
    document.body.classList.add('weather-clouds');
    
    const container = document.createElement('div');
    container.className = 'animation-container';
    document.body.prepend(container);
    
    const numberOfClouds = 8;
    
    for (let i = 0; i < numberOfClouds; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        const top = Math.random() * 100;
        const width = Math.random() * 200 + 100;
        const height = width * 0.6;
        const animationDuration = Math.random() * 20 + 30;
        const delay = Math.random() * -20;
        
        cloud.style.top = `${top}%`;
        cloud.style.width = `${width}px`;
        cloud.style.height = `${height}px`;
        cloud.style.animationDuration = `${animationDuration}s`;
        cloud.style.animationDelay = `${delay}s`;
        
        container.appendChild(cloud);
    }
}

function createThunderstorm() {
    clearAnimations();
    document.body.classList.add('weather-thunderstorm');
    
    const container = document.createElement('div');
    container.className = 'animation-container';
    document.body.prepend(container);
    
    // Add dark storm clouds
    const numberOfClouds = 6;
    for (let i = 0; i < numberOfClouds; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'thunder-clouds';
        
        const top = Math.random() * 60;
        const width = Math.random() * 300 + 200;
        const height = width * 0.6;
        const animationDuration = Math.random() * 30 + 40;
        const delay = Math.random() * -20;
        
        cloud.style.top = `${top}%`;
        cloud.style.width = `${width}px`;
        cloud.style.height = `${height}px`;
        cloud.style.animationDuration = `${animationDuration}s`;
        cloud.style.animationDelay = `${delay}s`;
        
        container.appendChild(cloud);
    }
    
    // Add heavy rain
    createRain('heavy');
    
    // Add lightning effect
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    container.appendChild(lightning);
    
    function flashLightning() {
        lightning.style.animation = 'none';
        lightning.offsetHeight; // Trigger reflow
        lightning.style.animation = 'lightning 1s';
        
        // Enhanced thunder shake effect
        const shakeAmount = 15;
        const shakeSequence = [
            { x: shakeAmount, y: -shakeAmount/2, duration: 50 },
            { x: -shakeAmount, y: shakeAmount/2, duration: 50 },
            { x: shakeAmount/2, y: -shakeAmount/4, duration: 50 },
            { x: -shakeAmount/2, y: shakeAmount/4, duration: 50 },
            { x: shakeAmount/4, y: -shakeAmount/8, duration: 50 },
            { x: -shakeAmount/4, y: shakeAmount/8, duration: 50 },
            { x: 0, y: 0, duration: 50 }
        ];
        
        let delay = 0;
        shakeSequence.forEach(shake => {
            const timeout = setTimeout(() => {
                document.body.style.transform = `translate(${shake.x}px, ${shake.y}px)`;
            }, delay);
            shakeTimeouts.push(timeout);
            delay += shake.duration;
        });
        
        const nextFlash = Math.random() * 3000 + 1000;
        const nextFlashTimeout = setTimeout(flashLightning, nextFlash);
        shakeTimeouts.push(nextFlashTimeout);
    }
    
    flashLightning();
    setTimeout(flashLightning, 200);
    setTimeout(flashLightning, 500);
}

function createMist() {
    clearAnimations();
    document.body.classList.add('weather-mist');
    
    const container = document.createElement('div');
    container.className = 'animation-container';
    document.body.prepend(container);
    
    const numberOfMistElements = 10;
    
    for (let i = 0; i < numberOfMistElements; i++) {
        const mist = document.createElement('div');
        mist.className = 'mist';
        
        const y = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 30;
        const delay = Math.random() * -20;
        
        mist.style.setProperty('--y', `${y}%`);
        mist.style.animationDuration = `${animationDuration}s`;
        mist.style.animationDelay = `${delay}s`;
        
        container.appendChild(mist);
    }
}

function createSun() {
    clearAnimations();
    document.body.classList.add('weather-clear');
    
    const container = document.createElement('div');
    container.className = 'animation-container';
    document.body.prepend(container);
    
    const sun = document.createElement('div');
    sun.className = 'sun';
    sun.style.left = '75%';
    sun.style.top = '15%';
    
    // Add rays
    for (let i = 0; i < 12; i++) {
        const ray = document.createElement('div');
        ray.className = 'sun-ray';
        ray.style.transform = `translate(-50%, -50%) rotate(${i * 30}deg)`;
        sun.appendChild(ray);
    }
    
    container.appendChild(sun);
}

const weatherTypes = [
    'clear',
    'rain',
    'drizzle',
    'snow',
    'thunderstorm',
    'clouds',
    'mist'
];

function demoWeatherEffect(weatherType) {
    const weatherInfo = document.getElementById('weather-info');
    
    // Clear previous animations
    clearAnimations();
    
    // Create appropriate weather animation
    switch (weatherType) {
        case 'rain':
            createRain('heavy');
            document.body.classList.add('weather-rain');
            weatherInfo.innerHTML = `
                <div class="result">Heavy Rain</div>
                <div class="message">Absolutely! The clouds are having an emotional moment.</div>
                <div class="location">Demo Mode</div>
            `;
            break;
        case 'drizzle':
            createRain('light');
            document.body.classList.add('weather-drizzle');
            weatherInfo.innerHTML = `
                <div class="result">Light Drizzle</div>
                <div class="message">Better safe than sorry!</div>
                <div class="location">Demo Mode</div>
            `;
            break;
        case 'snow':
            createSnow();
            document.body.classList.add('weather-snow');
            weatherInfo.innerHTML = `
                <div class="result">Snow</div>
                <div class="message">Time for a different kind of umbrella!</div>
                <div class="location">Demo Mode</div>
            `;
            break;
        case 'thunderstorm':
            createThunderstorm();
            document.body.classList.add('weather-thunderstorm');
            weatherInfo.innerHTML = `
                <div class="result">Thunderstorm</div>
                <div class="message">Stay inside or bring the whole rain gear collection!</div>
                <div class="location">Demo Mode</div>
            `;
            break;
        case 'clouds':
            createClouds();
            document.body.classList.add('weather-clouds');
            weatherInfo.innerHTML = `
                <div class="result">Cloudy</div>
                <div class="message">Just cloudy, no umbrella needed!</div>
                <div class="location">Demo Mode</div>
            `;
            break;
        case 'mist':
            createMist();
            document.body.classList.add('weather-mist');
            weatherInfo.innerHTML = `
                <div class="result">Misty</div>
                <div class="message">Spooky, but your umbrella can sit this one out.</div>
                <div class="location">Demo Mode</div>
            `;
            break;
        default:
            createSun();
            document.body.classList.add('weather-clear');
            weatherInfo.innerHTML = `
                <div class="result">Clear</div>
                <div class="message">Clear skies ahead! Leave the umbrella at home.</div>
                <div class="location">Demo Mode</div>
            `;
    }
}

let currentWeatherIndex = 0;

function cycleWeather() {
    demoWeatherEffect(weatherTypes[currentWeatherIndex]);
    currentWeatherIndex = (currentWeatherIndex + 1) % weatherTypes.length;
}

// Initial weather effect
cycleWeather();

// Cycle every 5 seconds
setInterval(cycleWeather, 5000);