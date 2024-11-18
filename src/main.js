import './style.css'

// Set this to true for demo mode, false for real weather
const DEMO_MODE = true;

let shakeTimeouts = [];

const weatherTypes = [
    'clear',
    'rain',
    'drizzle',
    'snow',
    'thunderstorm',
    'clouds',
    'mist'
];

const yesNoResponses = {
    yes: [
        "JA!",
        "Jazeker!",
        "100% JA!",
        "Absoluut!",
        "Natuurlijk!",
        "Zeker weten!",
        "JA JA JA!",
        "Neem maar mee!",
        "Doe maar wel!",
        "Anders word je nat!",
        "Ja, duh!",
        "Tuurlijk!"
    ],
    no: [
        "NEE!",
        "Nee hoor!",
        "Laat maar thuis!",
        "Hoeft niet!",
        "Vandaag niet!",
        "Nope!",
        "Echt niet!",
        "Nergens voor nodig!",
        "Geen paraplu dag!",
        "Blijft droog!",
        "Lekker niet!",
        "Nee joh!"
    ]
};

const funnyResponses = {
    rain: [
        "Een paraplu is geen overbodige luxe!",
        "Zelfs de eenden zoeken een schuilplek.",
        "Perfect weer voor Nederlanders!",
        "De hemel huilt weer eens.",
        "Tijd voor die fancy regenjas!",
        "Nederlandse zomer op z'n best.",
        "Regent het? Dan maar binnen Netflix kijken.",
        "Waterpret van boven!"
    ],
    drizzle: [
        "Miezer miezer, paraplu wijzer!",
        "Typisch Nederlands weertje weer.",
        "Net genoeg regen om je kapsel te verpesten.",
        "Motregentje? Gewoon doorlopen!",
        "Niet echt regen, meer een vochtige high-five uit de hemel.",
        "Wel nat, niet zeiken.",
        "Miezeren... Het kan altijd erger!"
    ],
    snow: [
        "Winter wonderland alert!",
        "Tijd voor een sneeuwballengevecht!",
        "Het land kleurt weer even wit.",
        "Eindelijk wat anders dan regen!",
        "Pak je slee maar uit de schuur.",
        "Code geel? Nee, code wit!",
        "Sneeuwen in Nederland? Dat betekent chaos!"
    ],
    thunderstorm: [
        "Thor is weer aan het bowlen daarboven!",
        "Tijd om binnen te schuilen!",
        "Dit is wat je krijgt als je sokken in sandalen draagt.",
        "Het dondert en het bliksemt en het regent meters bier... of niet.",
        "Zelfs je paraplu is nu bang.",
        "Onweer? Tijd voor pannenkoeken!",
        "De goden zijn boos vandaag."
    ],
    clouds: [
        "Grijs is ook een kleur!",
        "De zon heeft even pauze.",
        "Wolken zijn ook maar zwevende watjes.",
        "Typisch Nederlands dekentje boven ons.",
        "Fifty shades of grey, meteorologische editie.",
        "Bewolkt? Noem het maar gezellig binnen-weer.",
        "De wolken houden een vergadering."
    ],
    mist: [
        "Silent Hill in Nederland!",
        "Waar is die kerktoren gebleven?",
        "Mistig als erwtensoep.",
        "Zelfs de GPS is de weg kwijt.",
        "Perfect weer voor verstoppertje.",
        "Die mist is dikker dan moeders stamppot!",
        "Het lijkt Silent Hill wel, maar dan Nederlandser."
    ],
    clear: [
        "Geen paraplu nodig, geniet ervan!",
        "Eindelijk! De zon heeft Nederland gevonden!",
        "Snel, naar buiten voor het weer regent!",
        "Een zeldzaam meteorologisch verschijnsel: de zon!",
        "Bewaar deze dag in je geheugen.",
        "Zonnig? In Nederland? Is dit een droom?",
        "Quick, maak foto's voordat de wolken terugkomen!"
    ]
};

function clearAnimations() {
    const container = document.querySelector('.animation-container');
    if (container) container.remove();
    
    document.body.className = '';
    document.body.style.transform = 'none';
    
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
            speedRange = { min: 0.5, max: 0.8 };
            dropClass = 'rain-drop heavy';
            break;
        case 'light':
            numberOfDrops = 50;
            speedRange = { min: 1, max: 1.5 };
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
    
    createRain('heavy');
    
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    container.appendChild(lightning);
    
    function flashLightning() {
        lightning.style.animation = 'none';
        lightning.offsetHeight;
        lightning.style.animation = 'lightning 1s';
        
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
    
    for (let i = 0; i < 12; i++) {
        const ray = document.createElement('div');
        ray.className = 'sun-ray';
        ray.style.transform = `translate(-50%, -50%) rotate(${i * 30}deg)`;
        sun.appendChild(ray);
    }
    
    container.appendChild(sun);
}

function demoWeatherEffect(weatherType) {
    const weatherInfo = document.getElementById('weather-info');
    
    clearAnimations();
    
    const getRandomResponse = (array) => array[Math.floor(Math.random() * array.length)];
    
    switch (weatherType) {
        case 'rain':
            createRain('heavy');
            document.body.classList.add('weather-rain');
            weatherInfo.innerHTML = `
                <div class="umbrella-needed">${getRandomResponse(yesNoResponses.yes)}</div>
                <div class="message">${getRandomResponse(funnyResponses.rain)}</div>
                <div class="location">${DEMO_MODE ? 'Demo Modus' : ''}</div>
            `;
            break;
        case 'drizzle':
            createRain('light');
            document.body.classList.add('weather-drizzle');
            weatherInfo.innerHTML = `
                <div class="umbrella-needed">${getRandomResponse(yesNoResponses.yes)}</div>
                <div class="message">${getRandomResponse(funnyResponses.drizzle)}</div>
                <div class="location">${DEMO_MODE ? 'Demo Modus' : ''}</div>
            `;
            break;
        case 'snow':
            createSnow();
            document.body.classList.add('weather-snow');
            weatherInfo.innerHTML = `
                <div class="umbrella-needed">${getRandomResponse(yesNoResponses.no)}</div>
                <div class="message">${getRandomResponse(funnyResponses.snow)}</div>
                <div class="location">${DEMO_MODE ? 'Demo Modus' : ''}</div>
            `;
            break;
        case 'thunderstorm':
            createThunderstorm();
            document.body.classList.add('weather-thunderstorm');
            weatherInfo.innerHTML = `
                <div class="umbrella-needed">${getRandomResponse(yesNoResponses.yes)}</div>
                <div class="message">${getRandomResponse(funnyResponses.thunderstorm)}</div>
                <div class="location">${DEMO_MODE ? 'Demo Modus' : ''}</div>
            `;
            break;
        case 'clouds':
            createClouds();
            document.body.classList.add('weather-clouds');
            weatherInfo.innerHTML = `
                <div class="umbrella-needed">${getRandomResponse(yesNoResponses.no)}</div>
                <div class="message">${getRandomResponse(funnyResponses.clouds)}</div>
                <div class="location">${DEMO_MODE ? 'Demo Modus' : ''}</div>
            `;
            break;
        case 'mist':
            createMist();
            document.body.classList.add('weather-mist');
            weatherInfo.innerHTML = `
                <div class="umbrella-needed">${getRandomResponse(yesNoResponses.no)}</div>
                <div class="message">${getRandomResponse(funnyResponses.mist)}</div>
                <div class="location">${DEMO_MODE ? 'Demo Modus' : ''}</div>
            `;
            break;
        default:
            createSun();
            document.body.classList.add('weather-clear');
            weatherInfo.innerHTML = `
                <div class="umbrella-needed">${getRandomResponse(yesNoResponses.no)}</div>
                <div class="message">${getRandomResponse(funnyResponses.clear)}</div>
                <div class="location">${DEMO_MODE ? 'Demo Modus' : ''}</div>
            `;
    }
}

async function checkWeather() {
    try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        
        if (!response.ok) {
            throw new Error(`Weer API fout: ${response.status}`);
        }
        
        const data = await response.json();
        const weatherType = data.weather[0].main.toLowerCase();
        
        demoWeatherEffect(weatherType);
        const weatherInfo = document.getElementById('weather-info');
        const locationDiv = weatherInfo.querySelector('.location');
        if (locationDiv) {
            locationDiv.textContent = `📍 ${data.name}`;
        }
        
    } catch (error) {
        console.error('Weer check fout:', error);
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <div class="error">
                Oeps! We kunnen het weer momenteel niet checken.<br>
                Fout: ${error.message}<br>
                Probeer het later nog eens!
            </div>
        `;
    }
}

let currentWeatherIndex = 0;
let demoInterval;

function cycleWeather() {
    demoWeatherEffect(weatherTypes[currentWeatherIndex]);
    currentWeatherIndex = (currentWeatherIndex + 1) % weatherTypes.length;
}

// Initialize based on mode
if (DEMO_MODE) {
    cycleWeather();
    demoInterval = setInterval(cycleWeather, 5000);
} else {
    checkWeather();
}