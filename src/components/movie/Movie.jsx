import React from "react";
import { Link } from "react-router-dom";
import { Grid, Grow, Rating, Tooltip, Typography } from "@mui/material";

import useStyles from "./styles";

const Movie = ({ movie, i }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.movie} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link to={`/movie/${movie.id}`} className={classes.links}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://www.fillmurray.com/200/300"
            }
            alt={movie.title}
            className={classes.image}
          />
        </Link>
      </Grow>
      <Typography className={classes.title} variant="h5">
        {movie.title}
      </Typography>
    </Grid>
  );
};

export default Movie;
