import deadpool from "../assets/avatars/marvel/deadpool.png";
import wolverine from "../assets/avatars/marvel/wolverine.png";
import daredevil from "../assets/avatars/marvel/daredevil.png";
import fisk from "../assets/avatars/marvel/fisk.png";
import deadpool2 from "../assets/avatars/marvel/deadpool2.png";
import wanda from "../assets/avatars/marvel/wanda.png";
import loki from "../assets/avatars/marvel/loki.png";
import thor from "../assets/avatars/marvel/thor.png";
import doctorstrange from "../assets/avatars/marvel/doctorstrange.png";
import ironman from "../assets/avatars/marvel/ironman.png";

import selma from "../assets/avatars/simpsons/selma.png";
import bart from "../assets/avatars/simpsons/bart.png";
import lisa from "../assets/avatars/simpsons/lisa.png";
import maggie from "../assets/avatars/simpsons/maggie.png";
import krusty from "../assets/avatars/simpsons/krusty.png";
import ralph from "../assets/avatars/simpsons/ralph.png";
import hibbert from "../assets/avatars/simpsons/hibbert.png";
import homer from "../assets/avatars/simpsons/homer.png";

import bela from "../assets/avatars/princesses/bela.png";
import brancadeneve from "../assets/avatars/princesses/brancadeneve.png";
import cinderela from "../assets/avatars/princesses/cinderela.png";
import merida from "../assets/avatars/princesses/merida.png";
import moana from "../assets/avatars/princesses/moana.png";
import rapunzel from "../assets/avatars/princesses/rapunzel.png";
import scale from "../assets/avatars/princesses/scale.png";
import tiana from "../assets/avatars/princesses/tiana.png";

import ahsoka from "../assets/avatars/starwars/ahsoka.png";
import mandalorian from "../assets/avatars/starwars/mandalorian.png";
import grogu from "../assets/avatars/starwars/grogu.png";
import bokatan from "../assets/avatars/starwars/bokatan.png";
import darthvader from "../assets/avatars/starwars/darthvader.png";
import bobafett from "../assets/avatars/starwars/bobafett.png";
import r2d2 from "../assets/avatars/starwars/r2d2.png";
import c3po from "../assets/avatars/starwars/c3po.png";
import bb8 from "../assets/avatars/starwars/bb8.png";
import stormtrooper from "../assets/avatars/starwars/stormtrooper.png";
import obiwan from "../assets/avatars/starwars/obiwan.png";

import mickey from "../assets/avatars/mickey/mickey.png";
import minnie from "../assets/avatars/mickey/minnie.png";
import donald from "../assets/avatars/mickey/donald.png";
import daisy from "../assets/avatars/mickey/daisy.png";
import goofy from "../assets/avatars/mickey/goofy.png";
import pluto from "../assets/avatars/mickey/pluto.png";
import store from "../store/store";



const names = {
  marvel: {
    "pt-BR": "Marvel",
    "en-US": "Marvel",
    "es-ES": "Marvel",
  },
  simpsons: {
    "pt-BR": "Os Simpsons",
    "en-US": "The Simpsons",
    "es-ES": "Los Simpson",
  },
  princesses: {
    "pt-BR": "Princesas da Disney",
    "en-US": "Disney Princesses",
    "es-ES": "Princesas de Disney",
  },
  starwars: {
    "pt-BR": "Star Wars",
    "en-US": "Star Wars",
    "es-ES": "Star Wars",
  },
  "mickey-friends": {
    "pt-BR": "Mickey e Amigos",
    "en-US": "Mickey and Friends",
    "es-ES": "Mickey y sus Amigos",
  },
};

function getLanguage() {
  return store.getState().lang.language || "pt-BR";
}

export const avatarCategories = [
  {
    id: "marvel",
    get name() {
      return names.marvel[getLanguage()];
    },
    avatars: [
      { id: "deadpool", img: { url: deadpool } },
      { id: "wolverine", img: { url: wolverine } },
      { id: "daredevil", img: { url: daredevil } },
      { id: "fisk", img: { url: fisk } },
      { id: "deadpool2", img: { url: deadpool2 } },
      { id: "wanda", img: { url: wanda } },
      { id: "loki", img: { url: loki } },
      { id: "thor", img: { url: thor } },
      { id: "doctorstrange", img: { url: doctorstrange } },
      { id: "ironman", img: { url: ironman } },
    ],
  },

  {
    id: "simpsons",
    get name() {
      return names.simpsons[getLanguage()];
    },
    avatars: [
      { id: "selma", img: { url: selma } },
      { id: "bart", img: { url: bart } },
      { id: "lisa", img: { url: lisa } },
      { id: "maggie", img: { url: maggie } },
      { id: "krusty", img: { url: krusty } },
      { id: "ralph", img: { url: ralph } },
      { id: "hibbert", img: { url: hibbert } },
      { id: "homer", img: { url: homer } },
    ],
  },

  {
    id: "princesses",
    get name() {
      return names.princesses[getLanguage()];
    },
    avatars: [
      { id: "bela", img: { url: bela } },
      { id: "brancadeneve", img: { url: brancadeneve } },
      { id: "cinderela", img: { url: cinderela } },
      { id: "merida", img: { url: merida } },
      { id: "moana", img: { url: moana } },
      { id: "rapunzel", img: { url: rapunzel } },
      { id: "scale", img: { url: scale } },
      { id: "tiana", img: { url: tiana } },
    ],
  },

  {
    id: "starwars",
    get name() {
      return names.starwars[getLanguage()];
    },
    avatars: [
      { id: "ahsoka", img: { url: ahsoka } },
      { id: "mandalorian", img: { url: mandalorian } },
      { id: "grogu", img: { url: grogu } },
      { id: "bokatan", img: { url: bokatan } },
      { id: "darthvader", img: { url: darthvader } },
      { id: "bobafett", img: { url: bobafett } },
      { id: "r2d2", img: { url: r2d2 } },
      { id: "c3po", img: { url: c3po } },
      { id: "bb8", img: { url: bb8 } },
      { id: "stormtrooper", img: { url: stormtrooper } },
      { id: "obiwan", img: { url: obiwan } },
    ],
  },

  {
    id: "mickey-friends",
    get name() {
      return names["mickey-friends"][getLanguage()];
    },
    avatars: [
      { id: "mickey", img: { url: mickey } },
      { id: "minnie", img: { url: minnie } },
      { id: "donald", img: { url: donald } },
      { id: "daisy", img: { url: daisy } },
      { id: "goofy", img: { url: goofy } },
      { id: "pluto", img: { url: pluto } },
    ],
  },
];
