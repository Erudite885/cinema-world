import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
  Tooltip,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useStyles from "./styles";
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetUsersListQuery,
} from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { MovieList } from "../../components";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { userSelector } from "../../features/auth";

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

const MovieInfo = () => {
  const history = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector(userSelector);
  const [isMovieFav, setIsMovieFav] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  const { data, isFetching, error } = useGetMovieQuery(id);

  const addToFav = async () => {
    const baseUrl = "https://api.themoviedb.org/3";
    await axios.post(
      `${baseUrl}/account/${user.id}/favorite?api_key=${tmdbApiKey}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFav,
      }
    );
  };
  const addToWatchList = async () => {
    const baseUrl = "https://api.themoviedb.org/3";
    await axios.post(
      `${baseUrl}/account/${
        user.id
      }/watchlist?api_key=${tmdbApiKey}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchListed,
      }
    );
  };

  const { data: favoriteMovies, refetch: refetchFavorited } =
    useGetUsersListQuery({
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
      list: "favorite/movies",
    });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetUsersListQuery({
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
      list: "watchlist/movies",
    });

  useEffect(() => {
    refetchFavorited();
    refetchWatchlisted();
  }, []);

  useEffect(() => {
    setIsMovieFav(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({ movieId: id, list: "/recommendations" });

  const [open, setOpen] = useState(false);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong. Please go back to Home</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          src={data?.poster_path && `https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{ marginTop: "1.5rem" }}
        >
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min |
            {data?.spoken_languages.length > 0
              ? data?.spoken_languages[0].name
              : ""}
          </Typography>
        </Grid>

        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              to="/"
              key={genre.name}
              className={classes.links}
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
                alt=""
              />
              <Typography variant="subtitle1" color="textPrimary">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>

        <Grid item container spacing={2}>
          {data?.credits?.cast?.slice(0, 6).map(
            (character, i) =>
              character.profile_path && (
                <Grid
                  key={i}
                  item
                  xs={4}
                  md={2}
                  component={Link}
                  to={`/actors/${character.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Tooltip title={`${character.name}`}>
                    <img
                      className={classes.castImage}
                      src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                      alt={character.name}
                    />
                  </Tooltip>
                  <Typography color="textPrimary">{character?.name}</Typography>
                  <Typography color="textSecondary">
                    {character.character.split("/")[0]}
                  </Typography>
                </Grid>
              )
          )}
        </Grid>

        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFav}
                  endIcon={
                    isMovieFav ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFav ? "unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}
                >
                  WatchList
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                    style={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      {/* recommended movies */}
      <Box width="100%" marginTop="5rem">
        <Typography variant="h3" align="center" gutterBottom>
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} 
          numberOfMovies={12} />
        ) : (
          <Box>
            <Typography variant="h6" align="center">
              Sorry nothing was found.
            </Typography>
          </Box>
        )}
      </Box>

      {/* movie trailer */}
      {data?.videos?.results.length > 0 && (
        <Modal
          closeAfterTransition
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
        >
          <iframe
            autoPlay
            className={classes.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}?autoplay=1`}
            allow="autoplay"
            allowFullScreen
          />
        </Modal>
      )}
    </Grid>
  );
};

export default MovieInfo;
