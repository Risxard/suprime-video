import "./styles.css";

const BrowsePage = ({ children }) => {
  return (
    <div className="app-browse">
      {children}
      <div className="app-background" />
    </div>
  );
};

export default BrowsePage;
