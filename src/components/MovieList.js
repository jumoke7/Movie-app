import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Logo from "../assets/images/Logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Error } from "./Error";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Download from "./Download";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import Alert from "react-bootstrap/Alert";

const MovieList = (props) => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [alert, setAlert] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function searchMovies() {
    try {
      setSpinner(true);
      const result = await axios.get(
        "http://www.omdbapi.com/?s=" + search + "&apikey=5a7c6087"
      );
      const response = result.data.Search;
      const isTrue = result.data.Response;
      const isError = result.data.Error;

      console.log(isError);

      setMovies(response);
      setSpinner(false);

      if (isTrue === "True") {
        // setSpinner(false);
      }

      if (isTrue === "False") {
        setError(true);
        setErrorMessage(isError);
        console.log("my error", error);
      }
    } catch (error) {
      console.log("my error", error);
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
            {/* <img src={Logo} alt="Logo" className="movie-logo"></img> */}
            <h1>My Movie App</h1>
            {/* <BrowserRouter>
              <Routes>
                <Route path="/download" element={<Download />} />
              </Routes>
            </BrowserRouter> */}
          </Navbar.Brand>

          <Form className="d-flex">
            {alert && (
              <div className="Alert">
                {["success"].map((variant) => (
                  <Alert key={variant} variant={variant}>
                    <Alert.Link href="#">Downloaded</Alert.Link>
                  </Alert>
                ))}
              </div>
            )}
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
      <Link to="/download" element={<Download />} className="download-link">
        Downloads
      </Link>
      <Row>
        {movies?.map((movie, index) => (
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
                  {spinner && <Spinner>LOADING......</Spinner>}

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
        <div className="error-message">
          {error && <h1 style={{ color: "white" }}>{errorMessage}</h1>}
        </div>
      </Row>
    </Container>
  );
};

export default MovieList;
