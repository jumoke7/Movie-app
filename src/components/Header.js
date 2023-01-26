import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Header = () => {
  // const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = (e) => {
    {
      axios
        .get("http://www.omdbapi.com/?s=" + search + "&apikey=5a7c6087")
        .then((res) => console.log(res.data.Search))
        .catch((err) => console.log(err));
    }
    // await axios
    //   .get(`http://www.omdbapi.com/?s=${searchString}&apikey=5a7c6087`)
    //   .then((res) => {
    //     setMovies(res.data.Search);
    //     console.log("response", movies);
    //     localStorage.setItem("movies", JSON.stringify(movies));
    //   });
  };

  return <></>;
};

export default Header;
