import NavBar from "./Navigation";
import chooseYourNavBar from "../navBarContent";

const Loading = () => {
  let links = chooseYourNavBar(true);
  return (
    <div className="message-container light-green-bg">
      <NavBar links={links}></NavBar>
      <span className="medium-font">Loading...</span>
    </div>
  );
};

export default Loading;
