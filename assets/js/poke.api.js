// Objeto com funções de manipulações da API do Poke

const pokeApi = {}

// Conversão do detalhe da API para pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

// Pega o detalhe dos pokemons
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

// Pega os Pokemons
pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)                                             //Requisição trazendo a lista de pokemons
    .then((response) => response.json())                        //Convertento o responde para json
    .then((jsonBody) => jsonBody.results)                       //Pegando a lista de pokemons   
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //Promessa - Conversão do detalhe da lista de Pokemons
    .then((detailRequests) => Promise.all(detailRequests))      //Lista de promessas sendo resolvidas
    .then((pokemonsDetails) => pokemonsDetails)                 //lista de detalhes dos Pokemons  
                 
  }


// Promise.all - recebe um array de promise
// Promise.all([
//   //transformando lista de pokemons em novas requisições
//   fetch('https://pokeapi.co/api/v2/pokemon/1'),
//   fetch('https://pokeapi.co/api/v2/pokemon/2'),
//   fetch('https://pokeapi.co/api/v2/pokemon/3'),
//   fetch('https://pokeapi.co/api/v2/pokemon/4')
// ]).then(results => {
//   console.log(results)
// })
