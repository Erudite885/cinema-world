import { light } from "@mui/material/styles/createPalette";
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  image: {
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #1976d2",
  },
  mainList: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "900px",
    margin: "20px auto",
    justifyContent: "space-between",
  },
  insideList: {
    display: "flex",
    justifyContent: "space-between",
  },
  creditImage: {
    width: "70px",
    height: "70px",
    marginRight: "10px",
    borderRadius: "50%",
  },
}));
