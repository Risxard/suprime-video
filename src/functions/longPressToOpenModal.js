import MovieOptionsModal from "../components/Modals/MovieOptionsModal/MovieOptionsModal";
import { useDispatch } from "react-redux";



const handleSetGlobalModal = (movie) => {
    const dispatch = useDispatch();
    dispatch(setGlobalModal(<MovieOptionsModal props={movie} />));
};


export const longPressToOpenModal = (e, movie) => {
    e.preventDefault();

    let isScrolling = false;

    const handleScroll = () => {
        isScrolling = true;
    };

    const handleTouchMove = () => {
        isScrolling = true;
    };

    const handleTouchEnd = () => {
        clearTimeout(timeout);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("touchmove", handleTouchMove);
    };

    const timeout = setTimeout(() => {
        if (!isScrolling) {
            handleSetGlobalModal(movie);
        }
    }, 500);

    e.target.addEventListener("touchend", handleTouchEnd, { once: true });
    window.addEventListener("scroll", handleScroll, { once: true });
    window.addEventListener("touchmove", handleTouchMove, { once: true });
};

