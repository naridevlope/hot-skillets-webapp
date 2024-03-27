import axios from "axios";

export async function getRecipes() {
  const response = await axios.get("https://dummyjson.com/recipes");
  return response.data.recipes;
}
