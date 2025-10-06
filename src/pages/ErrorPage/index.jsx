import { useTranslation } from "react-i18next";
import "./styles.css";

const Errorpage = () => {
  const { t } = useTranslation();
  const errorPage = t("errorPage");
  const { title, description, button } = errorPage;

  return (
    <section className="error-page">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href="/">{button}</a>
      </div>
    </section>
  );
};

export default Errorpage;
