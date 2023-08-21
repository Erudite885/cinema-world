import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";

// import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList, Pagination, FeaturedMovie } from "../../components";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  const lgDevice = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMoviesToShow = lgDevice ? 17 : 19;

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

  if (error)
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">An error occured.</Typography>
      </Box>
    );

  return (
    <>
      <FeaturedMovie movie={data?.results[0]} />
      <MovieList
        movies={data}
        numberOfMovies={numberOfMoviesToShow}
        excludeFirst
      />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data?.total_pages}
      />
    </>
  );
};

export default Movies;
