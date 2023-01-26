import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

const MovieList = (props) => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [downloads, setDownloads] = useState([]);

  const searchMovies = (e) => {
    {
      axios
        .get("http://www.omdbapi.com/?s=" + search + "&apikey=5a7c6087")
        .then((res) => setMovies(res.data.Search))
        .catch((err) => console.log(err));
    }
  };

  function downloadMovie(movie) {
    console.log(movie);
    downloads.push(movie);
    localStorage.setItem("movies", JSON.stringify(downloads));
  }

  return (
    <Container>
      <Navbar className="nav-bar">
        <Container>
          <Navbar.Brand style={{ color: "white" }}>
            <h1>Movie App</h1>

            {/* <BrowserRouter>
              <Routes>
                <Route path="/download" element={<Download />} />
              </Routes>
            </BrowserRouter> */}
          </Navbar.Brand>

          <Form className="d-flex">
            <Form.Control
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick={searchMovies} variant="outline-success">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
      <Row>
        {movies.map((movie, index) => (
          <Col className="pt-2" key={index}>
            <div className="border-success movie-box">
              <img src={movie.Poster} className="movie-img" alt="movie"></img>
              <div className="movie-details">
                {" "}
                <h1
                  style={{
                    color: "white",
                    fontSize: "12px",
                    marginTop: "10px",
                    overflowWrap: "break-word",
                  }}
                >
                  Title: {movie.Title}
                </h1>
                <div className="movie-info">
                  <h1
                    style={{
                      color: "white",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  >
                    {" "}
                    Year: {movie.Year}
                  </h1>
                  <h1
                    style={{
                      color: "white",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  >
                    {" "}
                    Type: {movie.Type}
                  </h1>
                  <button onClick={() => downloadMovie(movie)}>Download</button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
