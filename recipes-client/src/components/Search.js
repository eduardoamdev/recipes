import NavBar from "./Navigation";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import chooseYourNavBar from "../navBarContent";

const Search = (props) => {
  let [info, setInfo] = useState({
    auth: false,
    title: "",
    name: "",
    message: "",
  });

  let history = useHistory();

  let links = chooseYourNavBar(true);

  const getInfo = async () => {
    if (info.name === "") {
      setInfo({
        ...info,
        message: "Write something.",
      });
    } else {
      if (props.typeOfElement === "recipe") {
        let responseFromGet = await fetch(
          `https://recipes-network-api.herokuapp.com/searchRecipe/${info.name}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token: window.localStorage.token,
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            return result;
          });
        if (responseFromGet.auth === true) {
          if (responseFromGet.recipes === null) {
            setInfo({
              ...info,
              message: responseFromGet.message,
              auth: true,
            });
          } else {
            history.push(`/recipes/${responseFromGet.recipeName}`);
          }
        } else if (responseFromGet.auth === false) {
          history.push("/notPermitted");
        }
      } else if (props.typeOfElement === "user") {
        let responseFromGet = await fetch(
          `https://recipes-network-api.herokuapp.com/searchUser/${info.name}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token: window.localStorage.token,
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            return result;
          });
        if (responseFromGet.auth === true) {
          if (responseFromGet.user === null) {
            setInfo({
              ...info,
              message: responseFromGet.message,
              auth: true,
            });
          } else {
            history.push(`/user/${responseFromGet.user._id}`);
          }
        } else if (responseFromGet.auth === false) {
          history.push("/notPermitted");
        }
      }
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    getInfo();
  };

  useEffect(() => {
    if (props.typeOfElement === "recipe") {
      setInfo({
        ...info,
        title: "Search recipe",
      });
    } else if (props.typeOfElement === "user") {
      setInfo({
        ...info,
        title: "Search user",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="long-form-container light-green-bg">
      <NavBar links={links}></NavBar>
      <form onSubmit={handleFormSubmit} className="form white-border-radius">
        <h2 className="margin-bottom-2-dot-5 medium-font kalam-font bold-font white-font">
          {info.title}
        </h2>
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Name</p>
        </label>
        <input
          type="text"
          name="name"
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

export default Search;
