const pageNumber=1
interface StorePageData {
    type: string;
    payload: number; 
  }
const storeThePage = (state = pageNumber, action:StorePageData) => {
    switch (action.type) {
      case "STORE_PAGE_NUMBER":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default storeThePage;