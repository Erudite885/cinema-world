import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "../../components";

const Movies = () => {
  const { data, isFetching, error } = useGetMoviesQuery();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">No Match. Please try again</Typography>
      </Box>
    );
  }

  if (error) return "An error has occured.";

  console.log(data);

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
