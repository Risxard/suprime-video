import { useEffect, useState } from "react";
import AcaiwaveSVG from "../../assets/AcaiwaveSVG";
import "./styles.css";
import ShowPassword from "../../assets/ShowPassword";
import { NavLink } from "react-router-dom";

const AccountPage = () => {
  const [email, setEmail] = useState("");
  const [isRestricted, setIsRestricted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleClick = () => {
    setShowDialog(true);
  };

  const handleConfirmPassword = () => {
    if (password.trim().length < 6) {
      setError("Senha inválida. Insira pelo menos 6 caracteres.");
      return;
    }

    setIsRestricted(!isRestricted);
    setShowDialog(false);
    setPassword("");
    setError("");
  };

  useEffect(() => {
    const userData = localStorage.getItem("auth-data");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.email) {
          setEmail(parsedData.email);
        }
      } catch (error) {
        console.error("Erro ao parsear localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (showDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDialog]);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="account-page">
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
                      <span>Alterar senha</span>
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

                    <div className="account-page-section-settings-action-toggle">
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
                <form action="">
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
                    <button onClick={handleConfirmPassword}>Continuar</button>
                    <button onClick={() => setShowDialog(false)}>
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
