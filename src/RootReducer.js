import chatReducer from "./components/Chatbox/reducers/ChatReducer";
import { PUBLISH_ENVIRONMENT, PUBLISH_GRAPHQLCLIENT } from "./GlobalActions";
import { errorReducer } from "./api/ErrorReducer";
import { loadingReducer } from "./api/LoadingReducer";
import playgroundReducer from "./components/Playground/PlaygroundReducer";
import navigationReducer from "./navigation/NavigationReducer";
import { fetchDetailsReducer } from "./api/FetchDetailsReducer";

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case PUBLISH_ENVIRONMENT:
      return {
        ...state,
        environmentProperties: action.environmentProperties
      }
    case PUBLISH_GRAPHQLCLIENT:
      return {
        ...state,
        graphQLClient: action.client
      }
    default:
      return  ({
        ...state,
        chat:     chatReducer(state.chat, action),
        playgrounds: playgroundReducer(state.playgrounds, action),
        navigation: navigationReducer(state.navigation, action),
        loading:  loadingReducer(state.loading, action),
        error:    errorReducer(state.error, action),
        fetchDetails: fetchDetailsReducer(state.fetchDetails, action)
        })
  }
}
  export default rootReducer