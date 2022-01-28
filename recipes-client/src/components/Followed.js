import NavBar from "./Navigation";
import chooseYourNavBar from "../navBarContent";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Followed = () => {
  let [info, setInfo] = useState({
    followed: [],
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
      followed: responseFromGet.user.following,
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
        Your followed users
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="align-center">Nombre</div>
            </th>
            <th>
              <div className="align-center">User detail</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {info.followed.map((user) => {
            return (
              <tr key={`${user._id}`}>
                <td>
                  <div className="align-center">{user.username}</div>
                </td>
                <td>
                  <Link
                    to={`/user/${user._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="align-center">{user.username} detail</div>
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

export default Followed;
