import { Dish } from "../lib/definitions";
import Recipe from "./recipe";

export default function RecipesList({ dishes }: { dishes: Dish[] }) {
  const content = (
    <div>
    {dishes?.map((dish) => (
        <Recipe dish={dish} key={dish.name} />
      )
    )}
    </div>
  )

  return (
    <>
      <div>recipes_list</div>
      <div>{content}</div>
    </>
  )
}
