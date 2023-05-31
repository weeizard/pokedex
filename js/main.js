const pokemonCount = 151;
const pokemonContainer = document.getElementById('pokemon_container');

//gets all pokemon
const fetchAllPokemon = async() =>{
  for(let i = 1; i <= pokemonCount; i++){
    await getPokemon(i);
  }
};

//gets pokemon
const getPokemon = async id =>{
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  console.log(pokemon);
  pokemonCard(pokemon);
}

let isGreen = false;

const pokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement('div');
  pokemonDiv.classList.add('pokemon');
  const{id, name, sprites, types} = pokemon;
  const type1 = types[0].type.name;
  const type2 = types.length > 1 ? types[1].type.name : "";

  const pokeInnerHTML = `
    <span>${id}</span>

    <div class = "img-container">
      <img src="${sprites.front_shiny}" alt="${name}" />
    </div>

    <div class="info">
      <h3 class="name">${name}</h3>
      <span>Types: ${type1}${type2 ? `, ${type2}` : ""}</span>
    </div>
  `;

  pokemonDiv.innerHTML = pokeInnerHTML;

  //toggle the color
  pokemonDiv.addEventListener('click',() =>{
    if(isGreen){
      pokemonDiv.style.backgroundColor = "";
      isGreen = false;
    } else {
      pokemonDiv.style.backgroundColor = "#5C8984";
      isGreen = true;
    }
    
  })

  pokemonContainer.appendChild(pokemonDiv);
}

fetchAllPokemon();
