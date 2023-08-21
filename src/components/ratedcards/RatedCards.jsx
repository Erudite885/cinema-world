import React from "react";
import { Typography, Box } from "@mui/material";

import { Movie } from "..";

const RatedCards = ({ title, data }) => {
  return (
    <Box>
      <Typography>{title}</Typography>
      <Box>
        {data?.results?.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
