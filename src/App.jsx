import React, { useRef } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { ActorCredits, Navbar } from "./components";
import { Actors, Movies, MovieInfo, Profile } from "./pages";
import useAlan from "./components/alan/Alan";
import useStyles from "./styles";

const App = () => {
  const Layout = () => {
    const classes = useStyles();
    const alanBtnContainer = useRef();
    useAlan();

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <main className={classes.content}>
          <div className={classes.toolbar}></div>
          <Outlet />
        </main>

        <div ref={alanBtnContainer}></div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Movies /> },
        { path: "/approved", element: <Movies /> },
        { path: "/movie/:id", element: <MovieInfo /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/actors/:id", element: <Actors /> },
        { path: "/actors/movie_credits/:id", element: <ActorCredits /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
