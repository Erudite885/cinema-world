import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemButton,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to={`/`} className={classes.imageLink}>
        <h2 className={classes.logo}>CINEMA WORLD</h2>{" "}
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              {
                <ListItemIcon>
                  <img
                    src={genreIcons[label.toLowerCase()]}
                    alt={label}
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
              }
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data?.genres?.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                {
                  <ListItemIcon>
                    <img
                      src={genreIcons[name.toLowerCase()]}
                      alt={name}
                      className={classes.genreImages}
                      height={30}
                    />
                  </ListItemIcon>
                }
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
