import NavBar from "./Navigation";
import goOutGift from "../images/giphy.gif";
import chooseYourNavBar from "../navBarContent";

const GoOut = () => {
  let links = chooseYourNavBar(false);
  return (
    <div className="message-container light-green-bg">
      <NavBar links={links}></NavBar>
      <img src={goOutGift} alt="You are not permitted here." />
    </div>
  );
};

export default GoOut;
