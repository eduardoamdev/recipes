import NavBar from "./Navigation";
import chooseYourNavBar from "../navBarContent";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";

const DeleteConfirmation = (props) => {
  let id = useParams().id;

  let history = useHistory();

  let links = chooseYourNavBar(true);

  let elementToDelete = props.element;

  let url = "";

  let redirect = "";

  let backRoute = "";

  const selectUrl = () => {
    if (elementToDelete === "recipe") {
      url = `https://recipes-network-api.herokuapp.com/deleteRecipe/${id}`;
      redirect = "/session";
      backRoute = `/myRecipe/${id}`;
    } else if (elementToDelete === "account") {
      url = `https://recipes-network-api.herokuapp.com/deleteUser`;
      redirect = "/signup";
      backRoute = "/session";
    }
  };

  const deleteButtonClick = async (event) => {
    event.preventDefault();
    await deleteRecipe();
    history.push(redirect);
  };

  const deleteRecipe = async () => {
    await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: window.localStorage.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      });
  };

  const back = (event) => {
    event.preventDefault();
    history.push(backRoute);
  };

  useEffect(() => {
    selectUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="message-container light-green-bg">
      <NavBar links={links}></NavBar>
      <span className="little-font align-center line-height-2 margin-bottom-2-dot-5">
        Are you sure?
      </span>
      <div className="buttons-container">
        <button
          className="confirmation-button delete-link"
          onClick={deleteButtonClick}
        >
          Sí
        </button>
        <button className="confirmation-button option-link" onClick={back}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
