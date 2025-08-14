import React, { useEffect, useState } from "react";
import "./styles.css";
import { profileService } from "../../services/firebase/profileServices";
import { userServices } from "../../services/firebase/userServices";

const Pagetest = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProfiles = async () => {
    try {
      const data = await userServices.getUserData();
      console.log(data.email);
      setProfiles(data);
    } catch (err) {
      console.error("Erro ao buscar perfis:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="pagetest" style={{ padding: "2rem" }}>
      <p>Esta é uma página de teste para o projeto.</p>

      {loading && <p>Carregando perfis...</p>}

      {!loading &&
        profiles.length > 0 &&
        profiles.map((profile) => (
          <p key={profile.id}>
            <img src={profile.userInfoData.img.url} alt="" />
            {profile.userInfoData.name}
          </p>
        ))}

      {!loading && profiles.length === 0 && <p>Nenhum perfil encontrado.</p>}

      <button onClick={getProfiles}>Recarregar Perfis</button>
    </div>
  );
};

export default Pagetest;
