import NavBar from "./Navigation";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import chooseYourNavBar from "../navBarContent";

const NewAndUpdate = (props) => {
  let [info, setInfo] = useState({
    name: "",
    country: "",
    ingredients: "",
    preparation: "",
    loading: true,
    title: "",
    url: "",
    form: "",
  });

  let params = useParams();

  let history = useHistory();

  let links = chooseYourNavBar(true);

  const selectForm = () => {
    if (props.typeOfForm === "new-recipe") {
      setInfo({
        ...info,
        title: "New recipe",
        url: "https://recipes-network-api.herokuapp.com/newRecipe",
        form: "new",
      });
    } else if (props.typeOfForm === "update-recipe") {
      setInfo({
        ...info,
        title: "Update recipe",
        name: params.name,
        country: params.country,
        ingredients: params.ingredients,
        preparation: params.preparation,
        url: `https://recipes-network-api.herokuapp.com/updateRecipe/${params.id}`,
        form: "update",
      });
    }
  };

  const postInfo = async () => {
    if (info.form === "new") {
      let responseFromPost = await fetch(info.url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: window.localStorage.token,
        },
        body: JSON.stringify({
          name: info.name,
          country: info.country,
          ingredients: info.ingredients,
          preparation: info.preparation,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          return result;
        });
      if (responseFromPost.auth === true) {
        history.push(`/myRecipe/${responseFromPost.recipe._id}`);
      } else if (responseFromPost.auth === false) {
        history.push("/notPermitted");
      }
    } else if (info.form === "update") {
      let responseFromPost = await fetch(info.url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: window.localStorage.token,
        },
        body: JSON.stringify({
          name: info.name,
          country: info.country,
          ingredients: info.ingredients,
          preparation: info.preparation,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          return result;
        });
      if (responseFromPost.auth === true) {
        history.push(`/myRecipe/${responseFromPost.recipe._id}`);
      } else if (responseFromPost.auth === false) {
        history.push("/notPermitted");
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
    postInfo();
  };

  useEffect(() => {
    selectForm();
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
          value={info.name}
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
        />
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Country</p>
        </label>
        <input
          type="text"
          name="country"
          value={info.country}
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
        />
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Ingredients</p>
        </label>
        <input
          type="text"
          name="ingredients"
          value={info.ingredients}
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
        />
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Preparation</p>
        </label>
        <textarea
          type="text"
          name="preparation"
          value={info.preparation}
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
          rows="10"
        />
        <input
          type="submit"
          value="Submit"
          className="little-font button white-border-radius margin-bottom-1-dot-2"
        />
      </form>
    </div>
  );
};

export default NewAndUpdate;
