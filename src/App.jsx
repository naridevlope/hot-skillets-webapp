import { VscAdd, VscListFilter } from "react-icons/vsc";
import { VscMenu } from "react-icons/vsc";
import "./App.css";
import { useEffect, useState } from "react";
import { getRecipes } from "./services/getRecipesService";

// import de images
import pancake from "./images/panqueca.png";
import fritada from "./images/fritada.png";
import waffles from "./images/Waffles.png";
import capeletti from "./images/Capeletti.png";

const images = [pancake, fritada, waffles, capeletti];

function App() {
  const styleMenus = {
    color: "161616",
    fontSize: "1.5rem",
    cursor: "pointer",
    strokeWidth: "0.3px",
  };

  const createRecipeBtn = {
    color: "fbfbfb",
    fontSize: "1.2rem",
    strokeWidth: "1px",
  };

  const [selectedLi, setSelectedLi] = useState(0);
  const [recipes, setRecipes] = useState([]);

  function handleClick(index) {
    setSelectedLi(index);
    // Preciso modificar o index do li selecionado
  }
  let lis = images.map((_, index) => {
    // Tenho que percorrer pelo index clicado e modificar a classe da li
    let toggleClassCheck = selectedLi === index ? "selected" : "";
    return (
      <li
        key={index}
        onClick={() => handleClick(index)}
        className={toggleClassCheck}
      ></li>
    );
  });

  // Fazendo get Recipes
  useEffect(() => {
    getRecipes()
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <div className="header-presentation">
        <VscMenu style={styleMenus} />
        <h2>Hi,John</h2>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search" />
        <VscListFilter style={styleMenus} />
      </div>

      <div
        className="show-recipes-images"
        style={{
          backgroundImage: `url(${recipes[selectedLi]?.image})`,
          transition: "0.3s",
        }}
      >
        <div id="image-picker">
          <ul>{lis}</ul>
        </div>
      </div>

      <div className="favorite-recipes">
        <h2>Favorite recipes:</h2>
        <span>See all</span>
        <div className="recipe-images">
          {recipes
            .map((recipeImage) => (
              <img key={recipeImage.id} src={recipeImage.image} />
            ))
            .slice(6, 9)}
        </div>
      </div>
      <div className="suggestion-recipes">
        <h2>Suggestion recipes:</h2>
        <span>See all</span>
        <div className="wrapper">
          {recipes.map((recipeImage) => (
            <div key={recipeImage.id}>
              <img src={recipeImage.image} id="imageRecipes" />
              <span>{recipeImage.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="my-recipes">
        <h2>My recipes:</h2>
        <span>See all</span>
        <div className="wrapper">
          {recipes
            .map((recipeImage) => (
              <div key={recipeImage.id}>
                <img src={recipeImage.image} id="imageRecipes" />
                <span>{recipeImage.name}</span>
              </div>
            ))
            .slice(7, 14)}
        </div>
        <button className="addRecipeBtn">
          <VscAdd style={createRecipeBtn} />
        </button>
      </div>
    </div>
  );
}

export default App;
