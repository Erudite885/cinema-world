import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";

import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "../../components";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

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
