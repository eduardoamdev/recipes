import NavBar from "./Navigation";
import chooseYourNavBar from "../navBarContent";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const ChangePassword = () => {
  let [info, setInfo] = useState({
    currentPassword: "",
    newPassword: "",
    message: "",
  });

  let links = chooseYourNavBar(true);

  let history = useHistory();

  const handleChange = (event) => {
    event.preventDefault();
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const changePassword = async () => {
    let responseFromPut = await fetch("https://recipes-network-api.herokuapp.com/changePassword", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: window.localStorage.token,
      },
      body: JSON.stringify({
        currentPassword: info.currentPassword,
        newPassword: info.newPassword,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    console.log(responseFromPut);
    if (responseFromPut.auth === false) {
      history.push("/notPermitted");
    } else if (responseFromPut.auth === true) {
      setInfo({
        ...info,
        currentPassword: "",
        newPassword: "",
        message: responseFromPut.message,
      });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    changePassword();
  };

  return (
    <div className="long-form-container light-green-bg">
      <NavBar links={links}></NavBar>
      <form onSubmit={handleFormSubmit} className="form white-border-radius">
        <h2 className="margin-bottom-2-dot-5 medium-font kalam-font bold-font white-font">
          Change your password
        </h2>
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Current password</p>
        </label>
        <input
          type="text"
          name="currentPassword"
          value={info.currentPassword}
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
        />
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">New password</p>
        </label>
        <input
          type="text"
          name="newPassword"
          value={info.newPassword}
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
        />
        <input
          type="submit"
          value="Submit"
          className="little-font button white-border-radius margin-bottom-1-dot-2"
        />
        <div className="form-message-container">
          <p className="little-font red-font align-center">{info.message}</p>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
