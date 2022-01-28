import NavBar from "./Navigation";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import favourite from "../images/favourite.png";
import notFavourite from "../images/notFavourite.png";
import chooseYourNavBar from "../navBarContent";

const Recipe = (props) => {
  let [info, setInfo] = useState({
    id: useParams().id,
    name: "",
    country: "",
    ingredients: "",
    preparation: "",
    loaded: false,
    auth: false,
    creatorName: "",
    creatorId: "",
    isFavourite: false,
  });

  let links = chooseYourNavBar(true);

  let history = useHistory();

  const getRecipe = async () => {
    let responseFromGet = await fetch(
      `https://recipes-network-api.herokuapp.com/recipe/${info.id}`,
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
    if (responseFromGet.auth === false) {
      history.push("/notPermitted");
    } else {
      setInfo({
        ...info,
        name: responseFromGet.recipe.name,
        country: responseFromGet.recipe.country,
        ingredients: responseFromGet.recipe.ingredients,
        preparation: responseFromGet.recipe.preparation,
        loaded: true,
        creatorName: responseFromGet.recipe.creator.username,
        creatorId: responseFromGet.recipe.creator._id,
        isFavourite: responseFromGet.favourite,
      });
    }
  };

  const followUnfollow = async (event) => {
    event.preventDefault();
    let responseFromGet = await fetch(
      `https://recipes-network-api.herokuapp.com/favouriteRecipe/${info.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: window.localStorage.token,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        return result;
      });

    if (responseFromGet.auth === false) {
      history.push("/notPermitted");
    } else {
      if (info.isFavourite === false) {
        setInfo({
          ...info,
          isFavourite: true,
        });
      } else if (info.isFavourite === true) {
        setInfo({
          ...info,
          isFavourite: false,
        });
      }
    }
  };

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (info.loaded === false) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="session-container light-green-bg">
        <NavBar links={links}></NavBar>
        {props.owner === "me" ? (
          <div className="options-container margin-bottom-4">
            <Link
              to={`/updateRecipe/${info.id}/${info.name}/${info.country}/${info.ingredients}/${info.preparation}`}
              style={{ textDecoration: "none" }}
            >
              <div className="link option-link">Update</div>
            </Link>
            <Link
              to={`/deleteRecipe/${info.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="link delete-link">Delete</div>
            </Link>{" "}
          </div>
        ) : (
          <div className="options-container margin-bottom-4">
            <h2 className="margin-bottom-2-dot-5 medium-font kalam-font">
              <Link
                to={`/user/${info.creatorId}`}
                style={{ textDecoration: "none" }}
              >
                Owner: {info.creatorName}
              </Link>
            </h2>
            {info.isFavourite === true ? (
              <button className="following-button" onClick={followUnfollow}>
                <img src={favourite} alt="Followed" className="follow-img" />
              </button>
            ) : (
              <button className="following-button" onClick={followUnfollow}>
                <img
                  src={notFavourite}
                  alt="Not followed"
                  className="follow-img"
                />
              </button>
            )}
          </div>
        )}
        <table className="table">
          <tbody>
            <tr>
              <td>Name: {info.name}</td>
            </tr>
            <tr>
              <td>Country: {info.country}</td>
            </tr>
            <tr>
              <td>Ingredients: {info.ingredients}</td>
            </tr>
            <tr>
              <td>
                Preparation:
                <span className="line-height-2"> {info.preparation}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Recipe;
