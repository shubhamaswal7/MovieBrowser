import React from "react";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/Pages/MovieDetails"
import List from "./components/Pages/List";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/details/:movieId" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
