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

  return foundGenre && foundGenre.name;
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
  const genreName = genreConverter(genre, language, media_type);

  let sectionTitle = "";

  const movieTitles = {
    28: { "pt-BR": "Ação de tirar o fôlego", "en-US": "Action-Packed Adventures", "es-ES": "Acción a toda marcha" },
    12: { "pt-BR": "Grandes Aventuras", "en-US": "Epic Adventures", "es-ES": "Grandes Aventuras" },
    16: { "pt-BR": "Animações Encantadoras", "en-US": "Charming Animations", "es-ES": "Animaciones Encantadoras" },
    35: { "pt-BR": "Comédias Imperdíveis", "en-US": "Must-Watch Comedies", "es-ES": "Comedias Imperdibles" },
    80: { "pt-BR": "Crimes e Mistérios", "en-US": "Crime & Mystery", "es-ES": "Crimen y Misterio" },
    99: { "pt-BR": "Documentários Fascinantes", "en-US": "Fascinating Documentaries", "es-ES": "Documentales Fascinantes" },
    18: { "pt-BR": "Dramas Emocionantes", "en-US": "Emotional Dramas", "es-ES": "Dramas Emocionantes" },
    10751: { "pt-BR": "Filmes para Toda a Família", "en-US": "Family-Friendly Movies", "es-ES": "Películas para toda la familia" },
    14: { "pt-BR": "Fantasia e Magia", "en-US": "Fantasy & Magic", "es-ES": "Fantasía y Magia" },
    36: { "pt-BR": "Histórias Inspiradoras", "en-US": "Historical Stories", "es-ES": "Historias Inspiradoras" },
    27: { "pt-BR": "Terror de Arrepiar", "en-US": "Spine-Chilling Horror", "es-ES": "Terror Escalofriante" },
    10402: { "pt-BR": "Musicais Vibrantes", "en-US": "Vibrant Musicals", "es-ES": "Musicales Vibrantes" },
    9648: { "pt-BR": "Mistérios Intrigantes", "en-US": "Intriguing Mysteries", "es-ES": "Misterios Intrigantes" },
    10749: { "pt-BR": "Romances Apaixonantes", "en-US": "Heartwarming Romances", "es-ES": "Romances Apasionantes" },
    878: { "pt-BR": "Ficção Científica Impressionante", "en-US": "Mind-Blowing Sci-Fi", "es-ES": "Ciencia Ficción Asombrosa" },
    10770: { "pt-BR": "Telefilmes Populares", "en-US": "Popular TV Movies", "es-ES": "Telefilmes Populares" },
    53: { "pt-BR": "Suspense Emocionante", "en-US": "Exciting Thrillers", "es-ES": "Suspense Emocionante" },
    10752: { "pt-BR": "Filmes de Guerra Épicos", "en-US": "Epic War Movies", "es-ES": "Películas de Guerra Épicas" },
    37: { "pt-BR": "Western Clássicos", "en-US": "Classic Westerns", "es-ES": "Western Clásicos" },
  };

  const tvTitles = {
    10759: { "pt-BR": "Ação & Aventura", "en-US": "Action & Adventure", "es-ES": "Acción y Aventura" },
    16: { "pt-BR": "Animações Encantadoras", "en-US": "Charming Animations", "es-ES": "Animaciones Encantadoras" },
    35: { "pt-BR": "Comédias Imperdíveis", "en-US": "Must-Watch Comedies", "es-ES": "Comedias Imperdibles" },
    80: { "pt-BR": "Séries Policiais", "en-US": "Crime TV Shows", "es-ES": "Series de Crimen" },
    99: { "pt-BR": "Documentários Fascinantes", "en-US": "Fascinating Documentaries", "es-ES": "Documentales Fascinantes" },
    18: { "pt-BR": "Dramas Emocionantes", "en-US": "Emotional Dramas", "es-ES": "Dramas Emocionantes" },
    10751: { "pt-BR": "Séries para Família", "en-US": "Family-Friendly TV", "es-ES": "Series para toda la familia" },
    10762: { "pt-BR": "Séries Infantis", "en-US": "Kids TV Shows", "es-ES": "Series Infantiles" },
    9648: { "pt-BR": "Mistérios Intrigantes", "en-US": "Intriguing Mysteries", "es-ES": "Misterios Intrigantes" },
    10763: { "pt-BR": "Notícias e Atualidades", "en-US": "News & Updates", "es-ES": "Noticias y Actualidad" },
    10764: { "pt-BR": "Reality Shows Engajantes", "en-US": "Engaging Reality Shows", "es-ES": "Reality Shows Atractivos" },
    10765: { "pt-BR": "Sci-Fi & Fantasia", "en-US": "Sci-Fi & Fantasy", "es-ES": "Sci-Fi & Fantasía" },
    10766: { "pt-BR": "Telenovelas Populares", "en-US": "Popular Soap Operas", "es-ES": "Telenovelas Populares" },
    10767: { "pt-BR": "Talk Shows Divertidos", "en-US": "Fun Talk Shows", "es-ES": "Talk Shows Divertidos" },
    10768: { "pt-BR": "Guerras & Política", "en-US": "War & Politics", "es-ES": "Guerras y Política" },
    37: { "pt-BR": "Western Clássicos", "en-US": "Classic Westerns", "es-ES": "Western Clásicos" },
  };

  const map = media_type === "movie" ? movieTitles : tvTitles;
  sectionTitle = map[genre]?.[language] || genreName;

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


export const filteredMediaType = ({ movie }) => {
  if (!movie || typeof movie.episode_count === "undefined") {
    return "movie";
  } else {
    return "tv";
  }
};