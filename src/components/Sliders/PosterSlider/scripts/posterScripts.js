import { alignSnapScroll } from "../../../../functions/carousels/carouselScripts";

export const posterHandleCallback = (index, sliderRef, posterRef) => {
    if (!sliderRef.current) {
        return;
    }
    const listItems = sliderRef.current.querySelectorAll("li");
    alignSnapScroll(index, sliderRef, posterRef);
    listItems.forEach((item, i) => {
        if (i === index) {
            item.setAttribute("data-active-card", "true");
        } else {
            item.removeAttribute("data-active-card");
        }
    });
};

export const posterHandleEnterSectionHover = (posterRef) => {
    if (!posterRef.current) {
        return;
    }
    posterRef.current.classList.add("KRgchP");
};

export const posterHandleLeaveSectionHover = (posterRef, sliderRef) => {
    if (!posterRef.current) {
        return;
    }

    posterRef.current.classList.remove("KRgchP");
    const slidelist = document.querySelector(".poster-slide-list");
    const firstHover = slidelist.getAttribute("align");
    const listItems = document.querySelectorAll(".poster-slide-list li");

    if (firstHover !== "default-start") {
        setTimeout(() => {
            slidelist.setAttribute("align", "default-start");
        }, 300);
    }

    listItems.forEach((item) => {
        item.removeAttribute("data-active-card");
    });

};

