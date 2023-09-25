const initialState = "calculus";

interface SearchAction {
  type: string;
  payload: string; 
}

const storeTheSearch = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case "SEARCH_STORE":
      return action.payload;
    default:
      return state;
  }
};

export default storeTheSearch;