import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Download from "./Download";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const MovieList = (props) => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [alert, setAlert] = useState(false);
  const [spinner, setSpinner] = useState(false);

  function searchMovies() {
    try {
      setSpinner(true);
      console.log(spinner);
      axios
        .get("http://www.omdbapi.com/?s=" + search + "&apikey=5a7c6087")
        .then((res) => setMovies(res.data.Search), setSpinner(false))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }
  function downloadMovie(movie) {
    setAlert(true);
    downloads.push(movie);
    setTimeout(function () {
      setAlert(false);
    }, 2000);
    localStorage.setItem("movies", JSON.stringify(downloads));
  }

  return (
    <Container className="Container">
      <Navbar>
        <Container className="nav-bar">
          <Navbar.Brand style={{ color: "white" }}>
            <h1>Movie App</h1>

            {/* <BrowserRouter>
              <Routes>
                <Route path="/download" element={<Download />} />
              </Routes>
            </BrowserRouter> */}
          </Navbar.Brand>
          {alert && (
            <div className="Alert">
              {["success"].map((variant) => (
                <Alert key={variant} variant={variant}>
                  <Alert.Link href="#">Downloaded</Alert.Link>
                </Alert>
              ))}
            </div>
          )}
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
      <Link to="/download" element={<Download />}>
        Downloads
      </Link>

      <Row>
        {/* {spinner && (
          <div className="spinner">
            {" "}
            <Spinner variant="success" />
          </div>
        )} */}
        {movies.map((movie, index) => (
          <Col className="pt-2" key={index}>
            <div className="border-success movie-box">
              <img src={movie.Poster} className="movie-img" alt="movie"></img>{" "}
              <div className="movie-info">
                <h1
                  style={{
                    id: "text1",
                    fontWeight: "800",
                    color: "white",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  Title : {movie.Title}
                </h1>
                <h1
                  style={{
                    fontWeight: "800",
                    id: "text1",
                    color: "white",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  {" "}
                  Year : {movie.Year}
                </h1>

                <h1
                  style={{
                    fontWeight: "800",
                    id: "text1",
                    color: "white",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  {" "}
                  Type : {movie.Type}
                </h1>
                <div>
                  <button
                    onClick={() => downloadMovie(movie)}
                    className="download-btn"
                  >
                    Download
                  </button>
                </div>
              </div>{" "}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
