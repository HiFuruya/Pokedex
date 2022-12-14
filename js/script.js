const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonCry = document.querySelector('.pokemon_cry');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const sound = document.querySelector('.soundwave');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonSound = document.querySelector('.btn-sound');

let atual = 1;

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) 
        return APIResponse.json();
} 

const fetchDescricao = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);

    return APIResponse.json();
}

const renderData = async (pokemon) =>{

    const descricao = await fetchDescricao(pokemon);

    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data) {

        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        pokemonCry.src = `cries/${data.id}.wav`;

        atual = data.id;

    }else{

        pokemonName.innerHTML = "Not Found :(";

    }
    

}

renderData(atual);

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderData(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () => {
    if (atual > 1) {
        atual--;
        renderData(atual);
    }
});

buttonNext.addEventListener('click', ()=>{
    atual++;
    renderData(atual);
})

buttonSound.addEventListener('click', () => {
    pokemonCry.play();
})

