import "./styles.css";

const AccountPage = () => {
  return (
    <div className="account-page">
      <div className="account-page-container">
        <div className="account-page-content">
          <div className="account-page-title">
            <h1>Gerencie sua conta</h1>
          </div>

          <div>
            <section className="account-page-section">
              <div className="account-page-section-title-container">
                <div className="account-page-section-title">
                  Seus planos e cobranças
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="app-background" />
    </div>
  );
};

export default AccountPage;
