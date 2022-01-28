import NavBar from "./Navigation";
import Loading from "./Loading";
import chooseYourNavBar from "../navBarContent";
import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

const Recipes = () => {
  let [info, setInfo] = useState({
    recipes: [],
    loaded: false,
  });

  let recipeName = useParams().name;
  let links = chooseYourNavBar(true);
  let history = useHistory();

  const getInfo = async () => {
    let responseFromGet = await fetch(
      `https://recipes-network-api.herokuapp.com/recipes/${recipeName}`,
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
    setInfo({
      ...info,
      recipes: responseFromGet.recipes,
      loaded: true,
    });
    if (responseFromGet.auth === false) {
      history.push("/notPermitted");
    } else {
      setInfo({
        ...info,
        recipes: responseFromGet.recipes,
        loaded: true,
      });
    }
  };

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (info.loaded === false) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="session-container light-green-bg">
        <NavBar links={links}></NavBar>
        <h2 className="margin-bottom-2-dot-5 medium-font kalam-font">
          Found recipes
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
            {info.recipes.map((recipe) => {
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
  }
};

export default Recipes;
