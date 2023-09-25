
const searchedData=null;
interface SearchActionData {
    type: string;
    payload: any; 
  }
  
  const storeTheSearchData = (state = searchedData, action: SearchActionData) => {
    switch (action.type) {
      case "STORE_SEARCHED_DATA":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default storeTheSearchData;