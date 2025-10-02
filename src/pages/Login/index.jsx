import { useState } from "react";
import { Link } from "react-router-dom";
import EmailSection from "./components/EmailSection";
import PasswordSection from "./components/./PasswordSection";
import LoaderOverlooping from "./assets/LoaderOverlooping";
import LoginDialog from "./components/LoginDialog";
import Footer from "../../components/Footer/Footer";
import useLogin from "../../hooks/Auth/useLogin";
import logo from "../../assets/acaiwaveLogo.png";
import logoblack from "../../assets/acaiwaveLogoBlack.png";

import './styles.css';

function Login() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  const [showDialog, setShowDialog] = useState(false);
  const { login, loading } = useLogin();


  const handleEmailSubmit = (emailInput) => {
    setEmail(emailInput);
    setStep("password");
  };

  // Usuário envia senha
  const handlePasswordSubmit = async (passwordInput) => {
    try {

      console.log('chegou aqui')
      await login(email, passwordInput);

    } catch (err) {
      console.error(err);

      setShowDialog(true);
    }
  };


  const handleDialogConfirm = () => {
    setShowDialog(false);
    setStep("signup");
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
    setEmail("");
    setStep("email");
  };

  return (
    <div className="Login">
      {showDialog && (
        <LoginDialog
          email={email}
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogCancel}
        />
      )}

      <div className="login-container">
        <Link to="/" className="login-logo">
          <img src={logo} alt="logo" />
        </Link>

        <div className="login-box">
          <Link to="/" className="login-logo-black">
            <img src={logoblack} alt="logo black" />
          </Link>

          {loading ? (
            <LoaderOverlooping />
          ) : step === "email" ? (
            <EmailSection onSubmit={handleEmailSubmit} />
          ) : step === "password" ? (
            <PasswordSection email={email} onSubmit={handlePasswordSubmit} />
          ) : (
            // <SignUpSection email={email} />
            null
          )}
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
