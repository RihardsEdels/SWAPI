import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    characters(page: String,value:String): CharactersResponse
    searchCharacter(value: String): [Character]
  }

  type CharactersResponse {
    total: String
    next:String
    previous:String
    characters: [Character]
  }

  type Character {
    name: String
    pagination: String
    url:String
  }
`;

export default typeDefs;