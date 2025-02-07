import genresTemplate from '../Services/genres/genres.json'


export function runtimeConverter(minutos) {
  if (isNaN(minutos) || minutos < 0) {
    return "Tempo inválido";
  }

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  const horasPlural = horas === 1 ? " h" : " h";
  const minutosPlural = minutosRestantes === 1 ? " min" : " min";

  const resultado = `${horas}${horasPlural} ${minutosRestantes}${minutosPlural}`;

  return resultado;
}

export function dateConverter(date) {

  if (date) {
    const data = date.split('-');
    const ano = data[0];
    return ano;
  }
}


export function genreConverter(genre_id, lang, type) {
  
  const movieGenres = genresTemplate.movie || {};
  const tvGenres = genresTemplate.tv || {};

  let selectedGenres = type === "movie" ? movieGenres : tvGenres;

  let langFiltered = lang === "pt-BR" ? selectedGenres.pt_br : selectedGenres.en_us;

  let findIdGenre = langFiltered;

  let foundGenre = findIdGenre.find((genre) => genre.id === genre_id);

  return foundGenre ? foundGenre.name : 'Gênero não encontrado';
}

export const setDate = (date) => {
  if (date) {
    const partes = date.split("-");
    if (partes.length >= 1) {
      return partes[0];
    } else {
      return null;
    }
  }
};

export const setSectionTitle = (genre, media_type, language) => {
  let sectionTitle

  const genreName = genreConverter(genre, language, media_type);

  const tvBase = language === 'pt-BR' ? "Séries de " : " TV Series"
  const movieBase = language === "pt-BR" ? "Filmes de " : " movies";

  if (media_type === "movie") {
    switch (genre) {
      case 99:
        sectionTitle = language === 'pt-BR' ? "Documentários" : "Documentaries";
        break;
      case 53:
        sectionTitle = language === 'pt-BR' ? movieBase + "Suspense" : genreName + movieBase;
        break;
      case 10770:
        sectionTitle = language === 'pt-BR' ? "TeleFilmes" : "TV Movies";
        break;
      case 10751:
        sectionTitle = language === 'pt-BR' ? "Filmes para Família" : "Movies for Family";
        break;
      case 10402:
        sectionTitle = language === 'pt-BR' ? "Filmes Musicais" : genreName + movieBase ;
        break;
      case 80:
        sectionTitle = language === 'pt-BR' ? "Filmes Criminais" : 'Criminal ' + movieBase ;
        break;

      default:
        sectionTitle =  language === "pt-BR" ? movieBase + genreName : genreName + movieBase;
        break;
    }
  } else {
    switch (genre) {
      case 53:
        sectionTitle = tvBase + "Suspense";
        break;
      case 10762:
        sectionTitle = language === "pt-BR" ? "Séries para crianças" : genreName + tvBase;
        break;
        case 99:
          sectionTitle = language === 'pt-BR' ? "Séries Documentais" : "Documentaries" ;
          break;
      case 10763:
        sectionTitle = language === "pt-BR" ? "Notícias da TV" : genreName;
        break;
      case 10764:
        sectionTitle = 'Reality Shows';
        break;
      case 10767:
        sectionTitle = 'Talk Shows';
        break;
      case 10766:
        sectionTitle = language === "pt-BR" ? "Telenovelas" : genreName + 's';
        break;
      case  80:
        sectionTitle = language === "pt-BR" ? "Séries Criminais" : 'Criminal ' + tvBase;
        break;

      default:
        sectionTitle =  language === "pt-BR" ? tvBase + genreName : genreName + tvBase;
        break;
    }
  }

  return sectionTitle;
};

export function bgDetect(classId) {
  switch (classId) {
    case "14":
      return "#EF762D";
    case "16":
      return "#E4322E";
    case "12":
      return "#F7B12B";
    case "L":
      return "#32A540";
    case "10":
      return "#5BA0BD";
    case "18":
      return "#19140E";
    default:
      return "none";
  }
}


export const filteredMediaType = (movie, mediaType) => {
  const mediaTypeCheck = mediaType ? mediaType : null;
  const alternativeMedia = movie.first_air_date ? "tv" : "movie";
  const newMediaType =
    mediaTypeCheck === null ? alternativeMedia : mediaTypeCheck;

  return newMediaType;
};