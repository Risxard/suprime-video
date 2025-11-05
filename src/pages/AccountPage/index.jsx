import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import AcaiwaveSVG from "../../assets/AcaiwaveSVG";
import ShowPassword from "../../assets/ShowPassword";
import logo from "../../assets/acaiwaveLogo.png";
import UserMenuSA from "../../components/Navigation/UserMenu/UserMenuSA";
import LoadingComponent from "../../components/utils/LoadingComponent";

import { db } from "../../services/firebase/firebaseconfig";
import { showPopup } from "../../store/slices/popupSlice";
import "./styles.css";

const AccountPage = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isRestricted, setIsRestricted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const accountPage = t("account-page", { returnObjects: true });

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
  const handleToggleClick = () => setShowDialog(true);

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password.trim().length < 6) {
      setError(accountPage.dialog.errors.shortPassword);
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError(accountPage.dialog.errors.unauthenticated);
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

      dispatch(
        showPopup({
          message: accountPage.alerts.updated,
          iconType: "done",
        })
      );
    } catch (error) {
      dispatch(
        showPopup({
          message: accountPage.alerts.failed,
          iconType: "fail",
        })
      );
      setError(accountPage.dialog.errors.invalidPassword);
    }
  };

  if (loading) return <LoadingComponent />;

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
            <h1>{accountPage.title}</h1>
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
                    <span>{accountPage.labels.passwordHidden}</span>
                  </div>
                </li>

                <li className="account-page-section-actions">
                  <div>
                    <button>
                      <NavLink to="/identity/update-credentials/change-password">
                        <span>{accountPage.actions.changePassword}</span>
                      </NavLink>
                    </button>
                  </div>
                </li>
              </ul>
            </section>

            <section className="account-page-section">
              <div className="account-page-section-title-container">
                <div className="account-page-section-title">
                  {accountPage.sections.security}
                </div>
              </div>
              <ul>
                <li>
                  <div className="account-page-section-settings-action-description">
                    <span>{accountPage.delete.title}</span>
                    <span>{accountPage.delete.description}</span>
                  </div>
                </li>

                <li className="account-page-section-actions">
                  <div>
                    <button>
                      <NavLink to="/identity/delete-account/confirm-deletion">
                        <span>{accountPage.delete.action}</span>
                      </NavLink>
                    </button>
                  </div>
                </li>
              </ul>
            </section>

            {/* <section className="account-page-section">
              <div className="account-page-section-title-container">
                <div className="account-page-section-title">
                  {accountPage.sections.otherSettings}
                </div>
              </div>
              <ul>
                <li className="account-page-section-settings-actions">
                  <button onClick={handleToggleClick}>
                    <div className="account-page-section-settings-action-description">
                      <span>{accountPage.restrict.title}</span>
                      <span>{accountPage.restrict.description}</span>
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
            </section> */}
          </div>
        </div>
      </div>

      {showDialog && (
        <div className="dialog-backdrop">
          <div className="dialog">
            <div>
              <h2>{accountPage.dialog.title}</h2>
              <div>
                <p>{accountPage.dialog.subtitle}</p>
                <form onSubmit={handleConfirmPassword}>
                  <div className="dialog-input-container">
                    <div className="dialog-input-content">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={accountPage.dialog.placeholder}
                      />
                      <div className="show-password">
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          aria-label={
                            showPassword
                              ? accountPage.dialog.hidePassword
                              : accountPage.dialog.showPassword
                          }
                        >
                          <ShowPassword showPassword={showPassword} />
                        </button>
                      </div>
                    </div>
                    <p>{accountPage.dialog.notice}</p>
                  </div>

                  {error && <p className="dialog-error">{error}</p>}

                  <div className="dialog-actions">
                    <button type="submit">{accountPage.dialog.confirm}</button>
                    <button
                      type="button"
                      onClick={() => setShowDialog(false)}
                    >
                      {accountPage.dialog.cancel}
                    </button>
                  </div>
                </form>
              </div>
              <NavLink to="/help/account-recovery">
                {accountPage.dialog.forgotPassword}
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <div className="app-background" />
    </div>
  );
};

export default AccountPage;
