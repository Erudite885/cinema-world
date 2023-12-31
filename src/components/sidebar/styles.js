import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  // fix below section
  logo: {
    // padding: "2px",
    color: theme.palette.mode === "light" ? "orange" : "tomato",
  },
  // fix above section
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
    textDecoration: "none",
  },
  image: { width: "70%" },
  links: { color: theme.palette.text.primary, textDecoration: "none" },
  genreImages: { filter: theme.palette.mode === "dark" && "invert(1)" },
}));
