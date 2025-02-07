export const prevSlider = (sliderRef) => {
  if (sliderRef.current) {
    sliderRef.current.scrollLeft -= window.innerWidth;
  }
}

export const nextSlider = (sliderRef) => {
  if (sliderRef.current) {
    sliderRef.current.scrollLeft += window.innerWidth;
  }
}

const calcularExpressaoCSS = (expressaoCSS) => {
  const dummy = document.createElement('div');
  dummy.style.width = '0px';
  dummy.style.height = '0px';
  dummy.style.display = 'none';
  dummy.style.width = expressaoCSS;

  document.body.appendChild(dummy);

  const valorCalculado = getComputedStyle(dummy).width;

  dummy.parentNode.removeChild(dummy);

  return parseFloat(valorCalculado);
}





export const alignSnapScroll = (index, sliderRef, posterRef) => {
  const slidelist = document.querySelector(".poster-slide-list");
  const firstHover = slidelist.getAttribute("align");

  const slidesNumber = window.innerWidth < 1400 ? 4 : 5;
  const first = index % slidesNumber === 0;
  const double = (index - 1) % slidesNumber === 0 && index > 0;
  const triple = (index - 2) % slidesNumber === 0 && index > 0;

  const listItems = document.querySelectorAll(".poster-slide-list li");
  const listItemWidth = listItems[0].offsetWidth;
  const listItemTarget = listItems[2].offsetWidth;
  const sliderContainer = sliderRef.current;


  const carouselColumnGap = getComputedStyle(posterRef.current)
    .getPropertyValue('--dv-carousel-column-gap');
  const columnMargin = getComputedStyle(posterRef.current)
    .getPropertyValue('--dv-column-margin');
  const superExtendedCardWidth = getComputedStyle(posterRef.current)
    .getPropertyValue('--supercarousel-expanded-card-width');
  const btnWidthValue = getComputedStyle(posterRef.current)
    .getPropertyValue('--dv-carousel-min-target');


  const btnWidth = parseInt(btnWidthValue)
  const sliderGap = parseInt(carouselColumnGap);
  const sliderColumnMargin = parseInt(columnMargin);
  const superWidthCard = calcularExpressaoCSS(superExtendedCardWidth);



  if (window.innerWidth > 880 && window.innerWidth < 1400) {
    const quadruple = (index + 1) % 4 === 0;
    if (index !== null) {
      if (firstHover === "default-start") {
        if (double || first) {
          const alignType = "left-one-two";
          setTimeout(() => {
            slidelist.setAttribute("align", alignType);
          }, 500);
        } else if (triple) {
          setTimeout(() => {
            const alignType = "right-three-two";
            slidelist.setAttribute("align", alignType);
          }, 500);

        } else if (quadruple) {
          const alignType = "right-four-three";
          setTimeout(() => {
            slidelist.setAttribute("align", alignType);
          }, 500);
        }
      } else {
        if (firstHover === "left-one-two") {
          if (triple) {
            const alignType = "right-three-two";
            setTimeout(() => {
              slidelist.setAttribute("align", alignType);
            }, 500);
          }
        } else if (firstHover === "right-three-two") {
          if (first) {
            setTimeout(() => {
              const alignType = "left-one-two";
              slidelist.setAttribute("align", alignType);
            }, 500);
          }
        } else if (firstHover === "right-four-three") {
          if (double) {
            const alignType = "left-two-three";
            setTimeout(() => {
              slidelist.setAttribute("align", alignType);
            }, 500);
          }
        } else if (firstHover === "left-two-three") {
          if (quadruple) {
            const alignType = "right-four-three";
            setTimeout(() => {
              slidelist.setAttribute("align", alignType);
            }, 500);
          }
        }
      }
    }
  }
  if (window.innerWidth >= 1400) {
    const quadruple = (index - 3) % 5 === 0 && index > 0;
    const quintuple = (index - 4) % 5 === 0 && index > 0;

    if (index !== null) {
      if (firstHover === "default-start") {
        if (first || double || triple) {

          const alignType = "left-one-two-three";
          setTimeout(() => {
            slidelist.setAttribute("align", alignType);
          }, 500);

        }
        if (quadruple) {
          const alignType = "right-four-three-two";
          setTimeout(() => {
            slidelist.setAttribute("align", alignType);
          }, 500);


        }
        if (quintuple) {

          const alignType = "right-five-four-three";
          setTimeout(() => {
            slidelist.setAttribute("align", alignType);
          }, 500);

        }
      } else {
        if (firstHover === "left-one-two-three") {
          if (quadruple) {

            const alignType = "right-four-three-two";
            setTimeout(() => {
              slidelist.setAttribute("align", alignType);
            }, 500);

          }
        } else if (firstHover === "right-four-three-two") {
          if (first) {
            const alignType = "left-one-two-three";
            setTimeout(() => {
              slidelist.setAttribute("align", alignType);
            }, 500);

          }
        } else if (firstHover === "right-five-four-three") {
          if (double) {
            const alignType = "left-two-three-four";
            setTimeout(() => {
              slidelist.setAttribute("align", alignType);
            }, 500);

          }
        } else if (firstHover === "left-two-three-four") {
          if (quintuple) {
            const alignType = "right-five-four-three";
            setTimeout(() => {
              slidelist.setAttribute("align", alignType);
            }, 500);
          }
        }
      }
    }
  }
};