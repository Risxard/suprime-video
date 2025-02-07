import { useState, useEffect } from "react";
import { guestApiKey } from "../../../Services/guestApi";

const useTop10 = (SectionData) => {

  const APIKey = guestApiKey;

  const api_path = "https://api.themoviedb.org/";
  const [movies, setMovies] = useState([]);

  const NextButton = idParam + "-NextBtn";
  const PrevButton = idParam + "-PrevBtn";
  const SlideList = idParam + "-Slide-List";
  const SlideItem = idParam + "-Slide-Item";

  useEffect(() => {
    fetch(`${api_path}${API_ADRESS}&api_key=${APIKey}`)
      .then((response) => response.json())
      .then((data) => {
        const dados = data.results;
        const filtered_data = dados.filter(
          (item) => item.backdrop_path !== null
        );
        setMovies(filtered_data);
      });
  }, [API_ADRESS, APIKey]);

  useEffect(() => {
    const NextBtn = document.getElementById("posterNextBtn");
    const PrevBtn = document.getElementById("posterPrevBtn");

    PrevBtn.addEventListener("click", function () {
      const slideList = document.getElementById(SlideList);
      const slideItem = document.getElementById(SlideItem);

      if (slideList && slideItem) {
        const scrollValue = slideItem.offsetWidth * 2;
        slideList.scrollLeft -= scrollValue;
      }
    });

    NextBtn.addEventListener("click", function () {
      const slideList = document.getElementById(SlideList);
      const slideItem = document.getElementById(SlideItem);

      if (slideList && slideItem) {
        const scrollValue = slideItem.offsetWidth * 2;
        slideList.scrollLeft += scrollValue;
      }
    });
  }, [NextButton, PrevButton, SlideList, SlideItem]);

  return { movies };
};

export default useTop10;
