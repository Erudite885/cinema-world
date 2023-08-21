import { useEffect, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ColorModeContext } from "../../utils/ToggleColorMode";
import { fetchToken } from "../../utils";
import {
  selectGenreOrCategory,
  searchMovie,
} from "../../features/currentGenreOrCategory";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: "",
      onCommand: ({ command, mode, genreOrCategory, genre, query }) => {
        if (command === "changeMode") {
          if (mode === "light") setMode("light");
          else setMode("dark");
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          window.location.href = "/";
        } else if (command === "chooseGenreOrCategory") {
          const foundGenre = genre.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else if (genreOrCategory) {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "search") {
          dispatch(searchMovie(query));
        } else if (command === "goback") {
          navigate(-1);
        }
      },
    });
  }, []);
};

export default useAlan;
