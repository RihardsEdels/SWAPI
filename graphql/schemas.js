import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    characters(page: String,value:String): CharactersResponse
    character(id: String): Character
  }

  type CharactersResponse {
    total: String
    next:String
    previous:String
    characters: [Character]
  }

  type Character {
    id:String
    name: String
    created:String
    birthYear:String
    gender:String
    hairColor:String
    height:String
    homeworld: Homeworld
    filmConnection:Films
    species: Species
  }

  type Homeworld {
    name:String
    population:String
    orbitalPeriod:String
  }

  type Films {
    films: [Film]
  }

  type Film {
    title:String
  }

  type Species{
    name:String
    classification:String
  }

  
`;

export default typeDefs;