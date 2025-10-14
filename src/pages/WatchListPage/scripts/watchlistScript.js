export const toggleFilterChecked = (filter) => {
    const contentTypeBtn = document.querySelector(".content-type-filter");

    switch (filter) {
      case 1:
        contentTypeBtn.classList.remove("selectedFilter");
        break;
      case 2:
        contentTypeBtn.classList.toggle("selectedFilter");

        break;
      default:
        contentTypeBtn.classList.remove("selectedFilter");
        break;
    }
  };