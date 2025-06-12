import React from "react";
import "./styles.css";
import { getAuth, sendEmailVerification } from "firebase/auth";

const PageTest = () => {
  
  const handleSendVerification = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      sendEmailVerification(user)
        .then(() => {
          console.log("E-mail de verificação enviado!");
        })
        .catch((error) => {
          console.error("Erro ao enviar e-mail de verificação:", error);
        });
    } else {
      console.error("Nenhum usuário autenticado.");
    }
  };

  return (
    <div className="page-test-container">
      <h1>Gabriel é <span>viadinho</span></h1>
    </div>
  );
};

export default PageTest;
