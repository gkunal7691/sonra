import React, { useState } from "react";
import Home from "./Home";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { storeOnChange,storePage } from "../actions/index";


export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("calculus");
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const myPage = useSelector((state: any) => state.storeThePage);
  const dispatch = useDispatch();
  const handleSearchInputChange = (e: any) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    dispatch(storeOnChange(inputValue));
    dispatch(storePage(1))
  };
  return (
    <div className="App h-100">
      <header className="App-header p-4 px-4">
        <div className="inputContainer d-flex flex-column">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">Books</InputGroup.Text>
            <Form.Control
              placeholder="Type here"
              aria-describedby="basic-addon1"
              onChange={handleSearchInputChange}
              onFocus={() => setIsHistoryVisible(true)}
              onBlur={() => setIsHistoryVisible(false)}
            />
          </InputGroup>
          {isHistoryVisible && (
            <div className="searchHistory">
              {searchHistory.map((item, index) => {
                return (
                  <div key={index} className="searchListItem">
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </header>
      <Home
        searchQuery={searchQuery}
        page={myPage}
        loader={loader}
        setLoader={setLoader}
        setSearchHistory={setSearchHistory}
      />
      <footer className="App-header footerContainer">
        <div></div>{" "}
        <div className="d-flex ">
          <Pagination>
            <Pagination.Prev
              onClick={() => myPage > 1 && dispatch(storePage(myPage-1))}
              disabled={loader}
            />
            <Pagination.Item>{myPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => dispatch(storePage(myPage+1))}
              disabled={loader}
            />
          </Pagination>
        </div>
      </footer>
    </div>
  );
}
