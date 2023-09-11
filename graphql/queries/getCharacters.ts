import gql from "graphql-tag";

export const GET_CHARACTERS = gql`
    query getPeople($page: String, $value: String) {
      characters(page: $page, value: $value) {
        total
        characters {
          id
          name
          height
          birthYear
          hairColor
          homeworld {
            name
          }
        }
      }
    }
  `;