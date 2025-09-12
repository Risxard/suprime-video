import React, { useEffect, useState } from "react";
import "./styles.css";
import { profileService } from "../../services/firebase/profileServices";
import { userServices } from "../../services/firebase/userServices";
import { set } from "react-hook-form";

const Pagetest = () => {
  const [resultado, setResultado] = useState(0);

  const handleFunction = (horario) => {
    const horarioPronto = horario.split(":");
    const horas = parseInt(horarioPronto[0]);
    const minutos = parseInt(horarioPronto[1]);
    const segundos = parseInt(horarioPronto[2]);

    const horasEmMinutos = 60 * horas;
    const somaMinutosESegundos = parseInt(horasEmMinutos + minutos);

    const resultado = somaMinutosESegundos * 60 + segundos;

    return setResultado(resultado);
  };

  return (
    <div className="pagetest" style={{ padding: "2rem" }}>
      <div className="desafio-container">
        <div className="display-bubbles">
          <p>{resultado}</p>
        </div>

        <span className="bubble-btn">
          <button onClick={() => handleFunction("00:01:0")}>Executar</button>
        </span>
      </div>
    </div>
  );
};

export default Pagetest;
