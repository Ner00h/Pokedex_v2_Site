const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="displayInformation(this)" onmouseover="addHoverAnimation(this)" onmouseout="removeHoverAnimation(this)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <span class="height">${pokemon.height}</span>
            <span class="weight">${pokemon.weight}</span>
            <span class="base">${pokemon.base}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

function displayInformation(element) {
    // Obter as informações do Pokémon
    const name = element.querySelector('.name').textContent;
    const height = element.querySelector('.height').textContent;
    const weight = element.querySelector('.weight').textContent;
    const base = element.querySelector('.base').textContent;

    // Exibir um alerta com as informações do Pokémon
    alert(`Informações sobre ${name}:\nAltura (m): ${height}\nPeso (kg): ${weight}\nExperiencia Base: ${base}`);
}

function addHoverAnimation(element) {
    element.classList.add('hover');
}

function removeHoverAnimation(element) {
    element.classList.remove('hover');
}
