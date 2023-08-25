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
                : `https://statisc2.bigstockphoto.com/3/5/3/large2/353144237.jpg`
            }
            alt={movie.title}
            className={classes.image}
          />
          <Tooltip disableTouchListener title={movie.title}>
            <div>
              <Typography className={classes.title} variant="h5">
                {movie.title}
              </Typography>
            </div>
          </Tooltip>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
