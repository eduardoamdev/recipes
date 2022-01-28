import NavBar from "./Navigation";
import chooseYourNavBar from "../navBarContent";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  let links = chooseYourNavBar(true);

  return (
    <div className="message-container light-green-bg">
      <NavBar links={links}></NavBar>
      <div className="settings-container">
        <Link className="settings-link option-link" to="/changePassword">
          Change password
        </Link>
        <Link
          className="settings-link delete-link"
          to={`/deleteAccount`}
        >
          Delete account
        </Link>
      </div>
    </div>
  );
};

export default AccountSettings;
