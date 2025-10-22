import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import AcaiwaveSVG from "../../assets/AcaiwaveSVG";
import ShowPassword from "../../assets/ShowPassword";
import logo from "../../assets/acaiwaveLogo.png";
import UserMenuSA from "../../components/Navigation/UserMenu/UserMenuSA";
import "./styles.css";
import { db } from "../../services/firebase/firebaseconfig";
import LoadingComponent from "../../components/utils/LoadingComponent";
import PopUpMessage from "../../components/PopUpMessage";
import { useDispatch } from "react-redux";
import { showPopup } from "../../store/slices/popupSlice";

const AccountPage = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isRestricted, setIsRestricted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.uid);
      } else {
        setEmail("");
        setUserId("");
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const fetchSettings = async () => {
      if (!userId) return;

      try {
        const settingsRef = doc(db, "users", userId, "mainAccount", "settings");
        const snap = await getDoc(settingsRef);

        if (snap.exists()) {
          const data = snap.data();
          setIsRestricted(data.new_profiles_protection || false);
        } else {

          await setDoc(settingsRef, {
            theme: "light",
            language: "pt-BR",
            new_profiles_protection: false,
          });
          setIsRestricted(false);
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [userId]);


  useEffect(() => {
    document.body.style.overflow = showDialog ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDialog]);


  const toggleShowPassword = () => setShowPassword((prev) => !prev);


  const handleToggleClick = () => {
    setShowDialog(true);
  };


  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password.trim().length < 6) {
      setError("Senha inválida. Insira pelo menos 6 caracteres.");
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError("Usuário não autenticado.");
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, password);


      await reauthenticateWithCredential(user, credential);


      const settingsRef = doc(db, "users", user.uid, "mainAccount", "settings");
      await setDoc(
        settingsRef,
        { new_profiles_protection: !isRestricted },
        { merge: true }
      );


      setIsRestricted((prev) => !prev);
      setShowDialog(false);
      setPassword("");

      handleSuccess();
    } catch (error) {
      handleFail();
      setError("Senha incorreta ou erro ao atualizar.");
    }
  };

  const dispatch = useDispatch();

  const handleSuccess = () => {
    dispatch(
      showPopup({
        message: "Atualizado",
        iconType: "done",
      })
    );
  };

  const handleFail = () => {
    dispatch(
      showPopup({
        message: "Falha ao atualizar",
        iconType: "fail",
      })
    );
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="account-page">
      <nav>
        <NavLink to="/home" className="NavLogo">
          <img src={logo} alt="acaiwaveplus logo" />
        </NavLink>
        <UserMenuSA />
      </nav>

      <div className="account-page-container">
        <div className="account-page-content">
          <div className="account-page-title">
            <h1>Gerencie sua conta</h1>
          </div>

          <div className="account-page-sections-wrapper">

            <section className="account-page-section">
              <div className="account-page-section-title-container">
                <div className="account-page-section-title">
                  <AcaiwaveSVG />
                </div>
              </div>
              <ul>
                <li>
                  <div>
                    <span>{email}</span>
                    <span>Senha: ••••••</span>
                  </div>
                </li>

                <li className="account-page-section-actions">
                  <div>
                    <button>
                      <NavLink to="/identity/update-credentials/change-password">
                        <span>Alterar senha</span>
                      </NavLink>
                    </button>
                  </div>
                </li>
              </ul>
            </section>


            <section className="account-page-section">
              <div className="account-page-section-title-container">
                <div className="account-page-section-title">
                  Acesso e segurança
                </div>
              </div>
              <ul>
                <li>
                  <div className="account-page-section-settings-action-description">
                    <span>Excluir conta</span>
                    <span>
                      Tenha certeza antes de prosseguir: a exclusão é
                      irreversível.
                    </span>
                  </div>
                </li>

                <li className="account-page-section-actions">
                  <div>
                    <button>
                      <span>Excluir minha conta</span>
                    </button>
                  </div>
                </li>
              </ul>
            </section>


            <section className="account-page-section">
              <div className="account-page-section-title-container">
                <div className="account-page-section-title">
                  Outras configurações
                </div>
              </div>
              <ul>
                <li className="account-page-section-settings-actions">
                  <button onClick={handleToggleClick}>
                    <div className="account-page-section-settings-action-description">
                      <span>Restringir a criação de perfis</span>
                      <span>
                        Para criar novos perfis, será necessário inserir uma
                        senha.
                      </span>
                    </div>

                    <div
                      className={`account-page-section-settings-action-toggle ${
                        isRestricted ? "active" : ""
                      }`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={isRestricted}
                          readOnly
                        />
                        <span></span>
                      </label>
                    </div>
                  </button>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>


      {showDialog && (
        <div className="dialog-backdrop">
          <div className="dialog">
            <div>
              <h2>Confirme sua senha</h2>
              <div>
                <p>
                  Para alterar as configurações do controle parental, é preciso
                  inserir a senha da sua conta.
                </p>
                <form onSubmit={handleConfirmPassword}>
                  <div className="dialog-input-container">
                    <div className="dialog-input-content">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                      />
                      <div className="show-password">
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          aria-label={
                            showPassword ? "Ocultar senha" : "Mostrar senha"
                          }
                        >
                          <ShowPassword showPassword={showPassword} />
                        </button>
                      </div>
                    </div>
                    <p>(diferencia maiúsculas e minúsculas)</p>
                  </div>
                  {error && <p className="dialog-error">{error}</p>}

                  <div className="dialog-actions">
                    <button type="submit">Continuar</button>
                    <button type="button" onClick={() => setShowDialog(false)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
              <NavLink to="/help/account-recovery">Esqueceu a senha?</NavLink>
            </div>
          </div>
        </div>
      )}

      <div className="app-background" />
    </div>
  );
};

export default AccountPage;
