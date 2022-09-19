import React, { useEffect, useState } from "react";
import Contents from "../Contents/Contents";
import Info from "../Intro/Intro";
import Menu from "../Menu/Menu";
import MoviesDetail from "../MoviesDetail/MoviesDetail";

import { useSelector } from "react-redux";

function Home(props) {
  const { MovieDetail } = useSelector((state) => state.infoMovies);
  const [isShowMovieDetail, setIsShowMovieDetail] = useState(false);

  useEffect(() => {
    setIsShowMovieDetail(MovieDetail ? true : false);
  }, [MovieDetail]);

  return (
    <div>
      <Info />
      <Contents />
      <Menu />
      <MoviesDetail
        movie={MovieDetail}
        showModal={isShowMovieDetail}
      />
    </div>
  );
}

export default Home;
