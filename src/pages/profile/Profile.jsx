import React from "react";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

import { userSelector } from "../../features/auth";

const Profile = () => {
  const { user } = useSelector(userSelector);

  const favMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favMovies.length ? (
        <Typography variant="h5">
          Add Favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>Favorite Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
