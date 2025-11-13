import React, { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { Top5Movies } from "./api/tmdbApi";
import { globalStyles } from "./styles/globalStyle";
import { MovieCard } from "./components/MovieCard";
import { TheHeader } from "./components/TheHeader";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const top = await Top5Movies();
        setMovies(top);
        setTitle("인기 Top 5 영화");
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <Container>
      <Global styles={globalStyles} />
      <TheHeader setMovies={setMovies} setTitle={setTitle} setError={setError} />
      <Main>
        <Title>{title}</Title>
        <ErrorMessage>{error}</ErrorMessage>
        <Grid>
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </Grid>
      </Main>

      <Footer>2025 Movie Search Project</Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  padding: 10px;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 50px;
  width: 100%;
  max-width: 2000px;
  margin-top: 16px;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(4, minmax(180px, 1fr));
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(180px, 1fr));
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
`;

const Footer = styled.footer`
  height: 4vh;
  background-color: #252525;
  color: white;
  text-align: center;
  width: 100%;
  padding: 8px 0;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 0;
`;

const ErrorMessage = styled.p`
  font-size: 20px;
  color: #c0392b;
  font-weight: 700;
`;
