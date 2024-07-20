import { createCard, fetchDataUrl, fetchData } from "./function.js";
const btnNext = document.querySelector('.btn-next');
const btnPrevious = document.querySelector('.btn-previous');
const pokemonContainer = document.querySelector('.pokemon');
let pageOrGeneration = 1;
const form = document.querySelector('.form-data');
const input = document.querySelector('#searchInput');

btnNext.addEventListener('click', () => {
    if (pageOrGeneration < 9) {
        pageOrGeneration++;
        fetchDataUrl(pageOrGeneration);
    }
});

btnPrevious.addEventListener('click', () => {
    if (pageOrGeneration > 1) {
        pageOrGeneration--;
        fetchDataUrl(pageOrGeneration);
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (input.value === '') {
        alert('Inserisci Un Nome o un Id');
        return;
    }
    const pokemon = await fetchData(`https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`);
    pokemonContainer.replaceChildren();
    const imageUrl = pokemon.sprites.front_default;
    const types = [pokemon.types[0].type.name];
    if (pokemon.types.length === 2) {
        types.push(pokemon.types[1].type.name);
    }

    const descriptionData = await fetchData(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
    const description = descriptionData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
    createCard(pokemon.name, imageUrl, types, description);
});
fetchDataUrl(pageOrGeneration);
