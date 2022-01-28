import NavBar from "./Navigation";
import chooseYourNavBar from "../navBarContent";

const Home = () => {
  let links = chooseYourNavBar(false);

  return (
    <div className="hundred-per-cent-container">
      <NavBar links={links}></NavBar>
      <div className="title-container">
        <h1 className="white-font big-font kalam-font bold-font">
          Welcome to Recipes
        </h1>
      </div>
    </div>
  );
};

export default Home;
