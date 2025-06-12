import React, { useState, useEffect } from "react";

import "./styles.css";
import SearchItem from "../Search/SearchMediaList/Searchitem/SearchItem";
import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";

import { toggleFilterChecked } from "./scripts/watchlistScript";
import { guestApiKey } from "../../Services/guestApi";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

const WatchListPage = () => {
  const { filterId } = useParams();

  const [medias, setMedias] = useState({ movies: [], tv: [] });
  const [filterType, setFilterType] = useState(filterId);

  const watchlist = useSelector((state) => state.auth.watchList);
  const language = useSelector((state) => state.lang.language);
  const { t } = useTranslation();

  const watchlistPage = t("watchlistPage");
  const watchlistButtonsPage = t("watchlistPage.buttons");
  const { genres, featuredCollections } = watchlistPage;
  const { all, moviesLang, tvShowsLang, mostRecent, orderAz, orderZa } =
    watchlistButtonsPage;

  const rawApiKey = `?api_key=${guestApiKey}`;

  useEffect(() => {
    const fetchMedia = async () => {
      const fetchedMovies = watchlist.movie
        ? await Promise.all(
            watchlist.movie.map(async (id) => {
              const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}${rawApiKey}&language=${language}`
              );
              const data = await response.json();
              return data;
            })
          )
        : [];

      const fetchedTVShows = watchlist.tv
        ? await Promise.all(
            watchlist.tv.map(async (id) => {
              const response = await fetch(
                `https://api.themoviedb.org/3/tv/${id}${rawApiKey}&language=${language}`
              );
              const data = await response.json();
              return data;
            })
          )
        : [];

      setMedias({ movies: fetchedMovies, tv: fetchedTVShows });
    };

    fetchMedia();
  }, [watchlist]);

  const mostRecentSort = mostRecent;
  const azSort = orderAz;
  const zaSort = orderZa;
  const [mediaSort, setMediaSort] = useState(mostRecentSort);

  const movies = medias.movies;
  const tv = medias.tv;

  const sortedMovies = [...movies].sort((a, b) => {
    if (mediaSort === azSort) {
      return a.title.localeCompare(b.title);
    } else if (mediaSort === zaSort) {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const sortedTV = [...tv].sort((a, b) => {
    if (mediaSort === azSort) {
      return a.name.localeCompare(b.name);
    } else if (mediaSort === zaSort) {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const filteredMedia =
    filterType === "movies"
      ? sortedMovies
      : filterType === "tv"
      ? sortedTV
      : [...sortedMovies, ...sortedTV];

  return (
    <div className="watchlistPage">
      <h1>Watchlist</h1>

      <div className="filter-watchlist">
        <div className="filters-btns-container">
          <div className="inner-btn">
            <button
              className={`filter-btn ${filterType === "all" ? "active" : ""}`}
              onClick={() => setFilterType("all")}
            >
              {all}
            </button>
          </div>
          <div className="inner-btn">
            <button
              className={`filter-btn ${
                filterType === "movies" ? "active" : ""
              }`}
              onClick={() => setFilterType("movies")}
            >
              {moviesLang}
            </button>
          </div>
          <div className="inner-btn">
            <button
              className={`filter-btn ${filterType === "tv" ? "active" : ""}`}
              onClick={() => setFilterType("tv")}
            >
              {tvShowsLang}
            </button>
          </div>
        </div>

        <div className="inner-btn content-type-filter">
          <button className="filter-btn" onClick={() => toggleFilterChecked(2)}>
            {mediaSort}
            <ChevronDown />
          </button>

          <ul>
            <li
              onClick={() => {
                setMediaSort(mostRecentSort);
                toggleFilterChecked(2);
              }}
              className={`${
                mediaSort === mostRecentSort ? "selected-filter" : ""
              }`}
            >
              {mostRecentSort}
            </li>
            <li
              onClick={() => {
                setMediaSort(azSort);
                toggleFilterChecked(2);
              }}
              className={`${mediaSort === azSort ? "selected-filter" : ""}`}
            >
              {azSort}
            </li>
            <li
              onClick={() => {
                setMediaSort(zaSort);
                toggleFilterChecked(2);
              }}
              className={`${mediaSort === zaSort ? "selected-filter" : ""}`}
            >
              {zaSort}
            </li>
          </ul>
        </div>
      </div>
      <div className="column-container-items">
        {filteredMedia.length > 0 ? (
          <ul>
            {filteredMedia.map((media) => {
              return <SearchItem key={media.id} movie={media} />;
            })}
          </ul>
        ) : (
          <div className="empty-watchlist">
            <p>{watchlistPage.emptyMessage.title}</p>
            <p>
              <Trans
                i18nKey={watchlistPage.emptyMessage.description}
                components={[<Link to="/movies" />, <Link to="/tv-series" />]}
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchListPage;
