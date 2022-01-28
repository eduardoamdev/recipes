import NavBar from "./Navigation";
import chooseYourNavBar from "../navBarContent";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favourites = () => {
  let [info, setInfo] = useState({
    favourites: [],
  });

  let links = chooseYourNavBar(true);

  const getUser = async () => {
    let responseFromGet = await fetch("https://recipes-network-api.herokuapp.com/user", {
      method: "GET",
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
    setInfo({
      favourites: responseFromGet.user.favourites,
    });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="session-container light-green-bg">
      <NavBar links={links}></NavBar>
      <h2 className="margin-bottom-2-dot-5 medium-font kalam-font">
        Your favourite recipes
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="align-center">Recipe</div>
            </th>
            <th>
              <div className="align-center">Country of origin</div>
            </th>
            <th>
              <div className="align-center">Recipe detail</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {info.favourites.map((recipe) => {
            return (
              <tr key={`${recipe._id}`}>
                <td>
                  <div className="align-center">{recipe.name}</div>
                </td>
                <td>
                  <div className="align-center">{recipe.country}</div>
                </td>
                <td>
                  <Link
                    to={`/othersRecipe/${recipe._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="align-center">{recipe.name} detail</div>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Favourites;
