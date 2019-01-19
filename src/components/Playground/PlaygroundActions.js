import gql from 'graphql-tag';
import { fetchGraphQL, mutationGraphQL } from '../../GlobalActions';


export const GET_PLAYGROUNDS = 'GET_PLAYGROUNDS'
export const REQUIRE_PLAYGROUND_DETAILS = 'REQUIRE_PLAYGROUND_DETAILS'
export const GET_PLAYGROUND_DETAILS = 'GET_PLAYGROUND_DETAILS'

export const CREATE_INITIATIVE = 'CREATE_INITIATIVE'


const getPlaygroundsQuery = gql`
  {
    playgrounds {
      id
      name
      lng
      lat
      status
      volunteerCount
      votes
    }
  }
`;

const getPlaygroundDetailsQuery = gql`
    query Query($playgroundId: String!) {
        playground(id: $playgroundId) {
            id
            name
            lng
            lat
            status
            smokeFreeDate
            volunteerCount
            votes
            managers {
                id
                username
            }
        }
    }
`;

const createInitiativeQuery = gql`
    mutation CreateInitiative($input: CreateInitiativeInput!) {
        createInitiative(input: $input) {
          id
          name
          lng
          lat
          status
          volunteerCount
          votes
        }
    }
`;

export const fetchPlaygrounds = () => fetchGraphQL(GET_PLAYGROUNDS, getPlaygroundsQuery)

export const fetchPlaygroundDetails = (playgroundId) => fetchGraphQL(GET_PLAYGROUND_DETAILS, getPlaygroundDetailsQuery, {playgroundId}, playgroundId)

export const createInitiative = (name, lat, lng) => {
  return mutationGraphQL(CREATE_INITIATIVE, createInitiativeQuery, {
    input: {
      initiativeId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // generate a uuid
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
        }),
      name,
      lat,
      lng,
      type: "smokefree",
      status: "not_started",
    }
  })
}
    
    

