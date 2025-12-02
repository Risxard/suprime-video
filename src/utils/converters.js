import genres from "./genresList.json";

/**
 * Converte minutos em formato "Xh Ym"
 */
export function runtimeConverter(minutos) {
  if (isNaN(minutos) || minutos < 0) return "Tempo inválido";

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  return `${horas}h ${minutosRestantes}m`;
}

/**
 * Retorna apenas o ano
 */
export function dateConverter(date) {
  if (!date) return "";
  return date.split("-")[0];
}

/**
 * Converte ID de gênero usando seu JSON real
 */
export function genreConverter(
  genre_id,
  lang = "pt-BR",
  type = "movie"
) {
  if (!genre_id) return "";

  const list = type === "movie" ? genres.movies : genres.tv;

  if (!Array.isArray(list)) return "";

  const found = list.find((g) => g.id === genre_id);
  if (!found) return "";

  return (
    found.name?.[lang] ||
    found.name?.["pt-BR"] ||
    found.name?.["en-US"] ||
    found.name?.["es-ES"] ||
    ""
  );
}
