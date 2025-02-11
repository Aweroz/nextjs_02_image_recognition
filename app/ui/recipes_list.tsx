import { Dish } from "../lib/definitions";
import Recipe from "./recipe";

export default function RecipesList({ dishes }: { dishes: Dish[] }) {
  const content = (
    <>
    {dishes?.map((dish) => (
        <Recipe dish={dish} key={dish.name} />
      )
    )}
    </>
  )

  return (
    <div className="recipes">
      <h2>Recipes</h2>
      <div className="recipes_list">{content}</div>
    </div>
  )
}
