import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useGetBooks } from "../services/useGetBooks";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { storeSearchResponse } from "../actions/index";
export default function Home({
  searchQuery,
  page,
  loader,
  setLoader,
  setSearchHistory,
}: {
  searchQuery: any;
  page: number;
  loader: boolean;
  setLoader: any;
  setSearchHistory: any;
}) {
  const { searchBooks } = useGetBooks();
  const [data, setData] = useState([]);
  const myState = useSelector((state: any) => state.storeTheSearch);
  const mySearchedData=useSelector((state: any) => state.storeTheSearchData);
  const dispatch = useDispatch();

  const getSeachedBookList = async () => {
    try {
      setLoader(true);
      const res = await searchBooks(page, myState);
      if (res) {
        dispatch(storeSearchResponse(res));
        setData(res.docs);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };


  

  useEffect(() => {
    if(!mySearchedData ||(mySearchedData &&( mySearchedData.q !== myState || mySearchedData.offset !== (page-1)*8))){
    const getData = setTimeout(() => {
      getSeachedBookList();
      const storedHistory = localStorage.getItem("searchHistory");
      let updatedHistory: any[] =[];
      if (storedHistory &&  !storedHistory.includes(myState)) {
        const parsedStoredHistory=JSON.parse(storedHistory)
         updatedHistory = [...parsedStoredHistory, myState];
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }
      else if(!storedHistory){
         updatedHistory = [myState];
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      } else {
        updatedHistory = JSON.parse(storedHistory)
      }

      setSearchHistory(updatedHistory)
    }, 2000);
    return () => clearTimeout(getData);
  }
  }, [myState, page]);

  return !loader ? (
    <div className="mainContainer m-auto justify-content-center align-items-center">
      {mySearchedData &&
        mySearchedData.docs.map((item: any, index: number) => (
          <BookCard
            item={item}
            key={index}
            cover_id={item.cover_id ? item.cover_id : item.cover_i}
          />
        ))}
    </div>
  ) : (
    <div className="spinnerDiv">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
