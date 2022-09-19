import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import { useViewport } from "../hooks";
import { getSearchMovies, setMovieDetail } from "../store/actions";

const moviesList = [
  "https://youthvietnam.vn/wp-content/uploads/2021/06/Cac-yeu-to-giup-poster-phim-thanh-cong.jpg",
  "https://d1j8r0kxyu9tj8.cloudfront.net/images/1566809317niNpzY2khA3tzMg.jpg",
  "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg",
  "https://i.vietgiaitri.com/2021/1/31/1977-vlog-bat-ngo-xuat-hien-trong-poster-phim-chieu-rap-cu-debut-dang-mong-cho-cuoi-nam-a52-5554018.jpg",
  "https://photo-cms-plo.zadn.vn/w850/Uploaded/2022/ernccqrwq/2022_04_03/thuong-ngay-nang-ve_3png_qjct.jpg",
  "https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/7/4/photo-1-1625408523609334435779.jpg",
  "https://afamilycdn.com/150157425591193600/2021/4/18/37451990-16187141763661128825153-16187387624661143149292.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD0JXIiwO4Bx0qpxinBlrIXoE20saVZL2fxw&usqp=CAU",
];

const useQuery = () => new URLSearchParams(useLocation().search);

function SearchMovies(props) {
  const [windowWidth] = useViewport();
  const dispatch = useDispatch();
  const { SearchMovies } = useSelector((state) => state.infoMovies);
  const keywords = useQuery().get("keywords");

  useEffect(() => {
    if (keywords) dispatch(getSearchMovies(keywords));
  }, [keywords, dispatch]);

  return (
    <SearchPane>
      {SearchMovies && SearchMovies.length > 0 ? (
        <div
          className="searchContent"
          style={{
            gridTemplateColumns: `repeat(${
              windowWidth > 1200
                ? 5
                : windowWidth > 992
                ? 4
                : windowWidth > 768
                ? 3
                : windowWidth > 600
                ? 2
                : 1
            }, auto)`,
          }}
        >
          {SearchMovies.map((movie, index) => {
            if (movie.backdrop_path !== null && movie.media_type !== "person") {
              const imageUrl = `https://image.tmdb.org/t/p/w500/${
                movie.backdrop_path
              }`;
              return (
                <div className="movieItem" key={index}
                  onClick={()=>dispatch(setMovieDetail(movie))}
                >
                  <img src={imageUrl} alt={movie.title || movie.name} />
                  <span>{movie.title || movie.name}</span>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <NotFound>
          <h1>Your search for "keywords" did not have any matches.</h1>
        </NotFound>
      )}
    </SearchPane>
  );
}

export default SearchMovies;

const SearchPane = styled.div`
  width: 100%;
  min-height: 92vh;
  padding-top: 80px;
  background: var(--color-background);
  transition: all 0.3 linear;

  .searchContent {
    padding: 40px 60px;
    display: grid;
    gap: 8px;

    &:hover .movieItem {
      opacity: 0.7;
    }

    .movieItem {
      position: relative;
      max-width: 400px;
      width: 100%;
      height: 200px;
      border-radius: 12px;
      margin: 20px 0;
      overflow: hidden;
      transform: scale(1);
      transition: all 0.3s linear;

      &:hover {
        transform: scale(1.2);
        z-index: 10;
        opacity: 1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      span {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        padding: 4px;
        background: rgba(0, 0, 0, 0.5);
        color: var(--color-white);
        font-weight: bold;
      }
    }
  }
`;

const NotFound = styled.div`
  padding: 5rem 8rem;
  color: var(--color-white);
`;
