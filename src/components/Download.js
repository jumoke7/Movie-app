import React from "react";
import MovieList from "./MovieList";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Download() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  });

  function getMovies() {
    const movies = localStorage.getItem("movies");
    setMovies(JSON.parse(movies));
  }

  return (
    <div>
      <div className="download-header">Downloads</div>
      <Row>
        {movies.map((movie, i) => (
          <Col className="pt-2" key={i}>
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
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Download;
