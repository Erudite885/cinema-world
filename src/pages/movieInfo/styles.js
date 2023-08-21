import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  poster: {
    borderRadius: "20px",
    boxShadow: "0.5rem 1rem 1rem rgb(64,64,70)",
    width: "80%",
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
      width: "50%",
      height: "350px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "50%",
      height: "350px",
      marginBottom: "30px",
    },
  },
  genresContainer: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    flexWrap: "wrap",
  },
  genreImage: {
    filter: theme.palette.mode === "dark" && "incert(1)",
    marginRight: "10px",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1rem",
    },
  },
  castImage: {
    width: "100%",
    maxWidth: "7rem",
    height: "8rem",
    objectFit: "cover",
    borderRadius: "28px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  modal: { display: "flex", justifyContent: "center", alignItem: "center" },
  video: {
    width: "50%",
    height: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "90%",
    },
  },
}));
