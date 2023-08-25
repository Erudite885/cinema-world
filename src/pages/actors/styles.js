import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  image: {
    maxWidth: "90%",
    borderRadius: "20px",
    objectFit: "cover",
    boxShadow: "0.5em 0.5em 1em",
    margin: "20px auto",
  },
  link: {
    justifyContent: "center",
    display: "inline-flex",
    position: "relative",
    boxSizing: "border-box",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "500",
    lineHeight: "1.75",
    letterSpacing: "0.02857rem",
    minWidth: "64px",
    textTransform: "uppercase",
    padding: "6px 16px",
    borderRadius: "4px",
    backgroundColor: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
    color: theme.palette.mode === "dark" ? "rgba(0,0,0,.85)" : "#fff",
    textDecoration: "none",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    transition:
      "background-color 250ms cubic-bezier(0.4,0,0.2,1) 0ms, box-shadow 250ms cubic-bezier(0.4,0,0.2,1) 0ms, border-color 250ms cubic-bezier(0.4,0,0.2,1) 0ms, color 250ms cubic-bezier(0.4,0,0.2,1) 0ms",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
}));
