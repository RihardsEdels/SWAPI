import gql from "graphql-tag";

export const GET_CHARACTER = gql`
    query getCharacter($id: String) {
      character(id: $id) {
        name
        birthYear
        gender
        hairColor
        height
        homeworld {
          name
          population
          orbitalPeriod
        }

        species {
          name
          classification
        }
      }
    }
  `;