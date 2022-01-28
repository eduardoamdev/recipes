import NavBar from "./Navigation";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import chooseYourNavBar from "../navBarContent";
const useState = React.useState;

const LoginAndSignup = (props) => {
  let [info, setInfo] = useState({
    username: "",
    password: "",
    auth: null,
    message: "",
    links: [],
    title: "",
    url: "",
  });

  const selectForm = () => {
    if (props.typeOfForm === "login") {
      setInfo({
        ...info,
        title: "Log in",
        links: chooseYourNavBar(false),
        url: "https://recipes-network-api.herokuapp.com/login",
      });
    } else if (props.typeOfForm === "signup") {
      setInfo({
        ...info,
        title: "Sign up",
        links: chooseYourNavBar(false),
        url: "https://recipes-network-api.herokuapp.com/signup",
      });
    }
  };

  let history = useHistory();

  const handleChange = (event) => {
    event.preventDefault();
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let myToken = await postInfo(info.url);
    if (myToken !== null) {
      saveToken(myToken);
      redirect("/session");
    }
  };

  const postInfo = async () => {
    let responseFromPost = await fetch(info.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: info.username,
        password: info.password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    setInfo({
      ...info,
      auth: responseFromPost.auth,
      message: responseFromPost.message,
    });
    return responseFromPost.token;
  };

  const saveToken = (tokenElement) => {
    window.localStorage.setItem("token", tokenElement);
  };

  const redirect = (route) => {
    history.push(route);
  };

  useEffect(() => {
    selectForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hundred-per-cent-container">
      <NavBar links={info.links}></NavBar>
      <form onSubmit={handleFormSubmit} className="form white-border-radius">
        <h2 className="margin-bottom-2-dot-5 medium-font kalam-font bold-font white-font">
          {info.title}
        </h2>
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">User name</p>
        </label>
        <input
          type="text"
          name="username"
          placeholder="User name"
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
        />
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Password</p>
        </label>
        <input
          type="text"
          name="password"
          placeholder="Password"
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

export default LoginAndSignup;
