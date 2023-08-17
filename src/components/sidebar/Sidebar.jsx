import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";

const Categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const dummyCategory = [
  { label: "Comedy", value: "comedy" },
  { label: "Action", value: "action" },
  { label: "Horror", value: "horror" },
  { label: "Animation", value: "animation" },
];

const Sidebar = ({ setMobileOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Link to={`/`} className={classes.imageLink}>
        {/* <img
          src={theme.palette.mode === "light" ? "" : ""}
          alt="logo"
          className={classes.image}
        /> */}
        <h2 className={classes.logo}>CINEMA WORLD</h2> {/*temporary, image will come later*/}
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories </ListSubheader>
        {Categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                <img
                  src={""}
                  alt=""
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> fix img later */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres </ListSubheader>
        {dummyCategory.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                <img
                  src={""}
                  alt=""
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> fix img later */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
