const pokeCard = document.querySelector('[data-poke_card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#fada20',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#ab4bfa',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
    fairy: '#ed8cbe',
};
/* se ingresa nuestra data */
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}
/* Cuando recibe la data */
const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


/* Funcion que trae el tipo del pokemon */
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}
/* Funcion que trae de la consola los stats de los pokmemons consultados de la poke api */
const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}
/* funcion cuando no se encuentra ningun pokemon */
const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './img/Icons/Missingo.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}


/* musica */
const audio = document.querySelector('audio'),
    songLength = document.getElementById('SongLength'),
    currentTime = document.getElementById('CurrentSongTime');

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60),
        seconds = Math.floor(secs % 60),
        returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    songLength.innerHTML = calculateTime(audio.duration);
}
if (audio.readyState > 0) {
    displayDuration();
    currentTime.innerHTML = calculateTime(audio.currentTime);
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
    })
}
audio.ontimeupdate = function () {
    currentTime.innerHTML = calculateTime(audio.currentTime);
    setProgress();
}
function setProgress() {
    let percentage = (audio.currentTime / audio.duration) * 100;
    document.querySelector('.progress').style.width = percentage + '%';
}

/* Audio controls */
const playPause = document.getElementById('PlayPause'),
    plus10 = document.getElementById('Plus10'),
    back10 = document.getElementById('Back10');

playPause.addEventListener('click', () => {
    if (audio.paused) {
        playPause.src = './img/Icons/pause.png';
        audio.play();
    } else {
        playPause.src = './img/Icons/play.png';
        audio.pause();
    }
})


plus10.addEventListener('click', () => {
    audio.currentTime += 10;
})
back10.addEventListener('click', () => {
    audio.currentTime -= 10;
})
