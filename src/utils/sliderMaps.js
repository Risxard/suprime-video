import BackdropSlider from "../components/Sliders/BackdropSlider/BackdropSlider.jsx";
import PosterSlider from "../components/Sliders/PosterSlider/PosterSlider.jsx";

export const image_path_original = "https://image.tmdb.org/t/p/original";
export const image_path_92 = "https://image.tmdb.org/t/p/w92";
export const image_path_154 = "https://image.tmdb.org/t/p/w154";
export const image_path_185 = "https://image.tmdb.org/t/p/w185";
export const image_path_342 = "https://image.tmdb.org/t/p/w342";
export const image_path_500 = "https://image.tmdb.org/t/p/w500";
export const image_path_780 = "https://image.tmdb.org/t/p/w780";




const backdropGenresMovie = [
    28,   // Action
    14,   // Fantasy
    878,  // Science Fiction
    53,   // Thriller
    10752,// War
    37,   // Western
    99,   // Documentary
];


const posterGenresMovie = [
    12,   // Adventure
    16,   // Animation
    35,   // Comedy
    80,   // Crime
    18,   // Drama
    10751,// Family
    36,   // History
    10402,// Music
    9648, // Mystery
    10749,// Romance
    10770,// TV Movie
    27,   // Horror
];


export const movieSliderMap = {};

backdropGenresMovie.forEach((id) => {
    movieSliderMap[id] = BackdropSlider;
});

posterGenresMovie.forEach((id) => {
    movieSliderMap[id] = PosterSlider;
});


const backdropGenresTV = [
    10759, // Action & Adventure
    10765, // Sci-Fi & Fantasy
    10768, // War & Politics
    37,    // Western
    99,    // Documentary
];

const posterGenresTV = [
    16, 35, 80, 18, 10751, 10762, 9648, 10763, 10764, 10766, 10767
];



export const tvSliderMap = {};

backdropGenresTV.forEach((id) => {
    tvSliderMap[id] = BackdropSlider;
});

posterGenresTV.forEach((id) => {
    tvSliderMap[id] = PosterSlider;
}
);
