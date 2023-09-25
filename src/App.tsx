import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import BookDetail from "./components/BookDetail";
import { Routes, Route } from "react-router-dom";
import {Provider} from "react-redux"
import store from "./store";

function App() {
  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/book/:id" element={<BookDetail/>} />
    </Routes>
    </Provider>
  );
}

export default App;
