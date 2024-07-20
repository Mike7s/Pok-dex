export function setColorCard(container, types) {
    if (types.includes('grass')) {
        container.style.backgroundColor = '#45C456';
    } else if (types.includes('fire')) {
        container.style.backgroundColor = '#E22712';
    } else if (types.includes('water')) {
        container.style.backgroundColor = '#10A1E5';
    } else if (types.includes('electric')) {
        container.style.backgroundColor = '#F4FE34';
    } else if (types.includes('normal')) {
        container.style.backgroundColor = '#A8A8A880';
    } else if (types.includes('ground')) {
        container.style.backgroundColor = '#A75D25';
    } else if (types.includes('poison')) {
        container.style.backgroundColor = '#842DB4';
    } else if (types.includes('bug')) {
        container.style.backgroundColor = '#4F7A2A';
    } else if (types.includes('fairy')) {
        container.style.backgroundColor = '#EA9AB2';
    } else if (types.includes('fighting')) {
        container.style.backgroundColor = '#972D07';
    } else if (types.includes('ice')) {
        container.style.backgroundColor = '#0573B3';
    } else if (types.includes('rock')) {
        container.style.backgroundColor = '#5E5A5A';
    } else if (types.includes('steel')) {
        container.style.backgroundColor = '#DFE2E2';
    } else if (types.includes('dragon')) {
        container.style.backgroundColor = '#1B079D';
    } else {
        container.style.backgroundColor = 'cyan';
    }
}

export function createCard(name, image, types, description) {
    const container = document.createElement('div');
    container.classList.add('card');
    const pokemonContainer = document.querySelector('.pokemon');
    pokemonContainer.appendChild(container);
    setColorCard(container, types);

    const nameHtml = document.createElement('h1');
    nameHtml.textContent = name;
    container.appendChild(nameHtml);

    const imageHtml = document.createElement('img');
    imageHtml.src = image;
    container.appendChild(imageHtml);

    const typeHtml = document.createElement('h3');
    typeHtml.textContent = types.join('-');
    container.appendChild(typeHtml);

    const descriptionHtml = document.createElement('p');
    descriptionHtml.textContent = description;
    container.appendChild(descriptionHtml);
}

export async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function fetchDataUrl(page) {
    try {
        const offset = (page - 1) * 20;
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
        const pokemonDataurl = await fetchData(url);
        const pokemonUrls = pokemonDataurl.results.map(pokemon => pokemon.url);

        const pokemonContainer = document.querySelector('.pokemon');
        pokemonContainer.replaceChildren();

        for (const url of pokemonUrls) {
            const pokemon = await fetchData(url);
            const imageUrl = pokemon.sprites.front_default;
            const types = [pokemon.types[0].type.name];
            if (pokemon.types.length === 2) {
                types.push(pokemon.types[1].type.name);
            }
            const descriptionData = await fetchData(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
            const description = descriptionData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
            createCard(pokemon.name, imageUrl, types, description);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
