import "./App.css";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { Download } from "./components/Download.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import MovieList from "./components/MovieList";
import { Error } from "./components/Error";
const App = () => {
  return (
    <div className="movie-container">
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/download" element={<Download />} />
        <Route path="*" element={<Error />} />
        <Route />
      </Routes>
    </div>
  );
};

export default App;
