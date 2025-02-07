import { useEffect } from "react";

const CheckComponent = () => {


useEffect(() =>{
    console.log('Componente de checagem foi renderizado!')
},[])

  return (
    <div style={{ width: "100vw", height: "100vh" , backgroundColor: "white"}}>
      <h1 style={{ color: "white" }}>
        O COMPONENTE DE CHECAGEM ESTÁ EM TELA
      </h1>
    </div>
  );
};

export default CheckComponent
