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
  const { data } = useGetMoviesQuery();
  console.log(data);
  
  return <div><MovieList /></div>;
};

export default Movies;
