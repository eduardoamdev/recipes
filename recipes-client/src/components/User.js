import NavBar from "./Navigation";
import chooseYourNavBar from "../navBarContent";
import Loading from "./Loading";
import followed from "../images/followed.png";
import notFollowed from "../images/notFollowed.png";
import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

const User = () => {
  let [info, setInfo] = useState({
    userId: useParams().userId,
    loaded: false,
    name: "",
    recipes: [],
    followed: false,
  });

  let history = useHistory();

  let links = chooseYourNavBar(true);

  const getUser = async () => {
    let responseFromGet = await fetch(
      `https://recipes-network-api.herokuapp.com/user/${info.userId}`,
      {
        method: "GET",
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
      setInfo({
        ...info,
        name: responseFromGet.user.username,
        recipes: responseFromGet.user.recipes,
        followed: responseFromGet.followed,
        loaded: true,
      });
    }
  };

  const followUnfollow = async (event) => {
    event.preventDefault();
    let responseFromGet = await fetch(
      `https://recipes-network-api.herokuapp.com/followUser/${info.userId}`,
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
      if (info.followed === false) {
        setInfo({
          ...info,
          followed: true,
        });
      } else if (info.followed === true) {
        setInfo({
          ...info,
          followed: false,
        });
      }
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (info.loaded === false) {
    return <Loading></Loading>;
  } else if (info.loaded === true) {
    return (
      <div className="session-container light-green-bg">
        <NavBar links={links}></NavBar>
        <div className="options-container margin-bottom-4">
          <h2 className="margin-bottom-2-dot-5 medium-font kalam-font">
            {info.name}
          </h2>
          {info.followed === true ? (
            <button className="following-button" onClick={followUnfollow}>
              <img src={followed} alt="Followed" className="follow-img" />
            </button>
          ) : (
            <button className="following-button" onClick={followUnfollow}>
              <img
                src={notFollowed}
                alt="Not followed"
                className="follow-img"
              />
            </button>
          )}
        </div>
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

export default User;
