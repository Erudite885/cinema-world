import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  ListItem,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import {
  useGetActorsDetailsQuery,
  useGetActorMovieCreditDetailsQuery,
} from "../../services/TMDB";

import useStyles from "./styles";

const ActorCredits = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  const { data: base } = useGetActorsDetailsQuery(id);
  const { data, isFetching, error } = useGetActorMovieCreditDetailsQuery(id);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          color="primary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    );
  }
  console.log(data)
  const movie = [...data.cast];
  movie.sort((a, b) => {
    return b.popularity - a.popularity;
  });
  console.log(movie)
  return (
    <>
      <Grid>
        <img
          className={classes.image}
          src={`https://image.tmdb.org/t/p/w780/${base?.profile_path}`}
          alt={base.name}
        />
        <Typography variant="h2" gutterBottom marginTop="12px">
          {base?.name}
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          color="primary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Grid>

      <div className={classes.mainList}>
        {movie
          ?.map((i) => (
            <div key={i.credit_id}>
              <List className={classes.insideList}>
                <ListItem >
                  <Link to={`/movie/${i?.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${
                        i?.poster_path ? i?.poster_path : base?.poster_path
                      }`}
                      alt={base.name}
                    />
                  </Link>
                  <ListItemText
                    style={{ marginTop: "0" }}
                    primary={i?.original_title}
                    secondary={i?.character}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText style={{ textAlign: "end" }}>
                    {i.release_date.split("-")[0]}
                  </ListItemText>
                </ListItem>
              </List>
              <Divider style={{ borderWidth: "1.5px" }} />
            </div>
          ))
          .slice(0, 15)}
      </div>
    </>
  );
};

export default ActorCredits;
