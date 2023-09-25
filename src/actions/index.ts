export const storeOnChange=(inputValue:string)=>{
    return {
        type:"SEARCH_STORE",
        payload: inputValue,
    }
}
export const storeSearchResponse=(data:any)=>{
    return {
        type:"STORE_SEARCHED_DATA",
        payload: data,
    }
}
export const storePage=(inputValue:number)=>{
    return {
        type:"STORE_PAGE_NUMBER",
        payload: inputValue,
    }
}