import genres from '../../Services/genres/genres.json'




export function runtimeConverter(minutos) {
  if (isNaN(minutos) || minutos < 0) {
    return "Tempo inválido";
  }

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  const horasPlural = horas === 1 ? "h" : "h";
  const minutosPlural = minutosRestantes === 1 ? "m" : "m";

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
  const movieGenres = genres.movie || {};
  const tvGenres = genres.tv || {};

  let selectedGenres = type === "movie" ? movieGenres : tvGenres;

  let langFiltered = lang === "pt-BR" ? selectedGenres.pt_br : selectedGenres.en_us;

  let findIdGenre = langFiltered;

  let foundGenre = findIdGenre.find((genre) => genre.id === genre_id);

  return foundGenre ? foundGenre.name : 'Gênero não encontrado';
}