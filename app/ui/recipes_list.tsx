import { Dish } from "../lib/definitions";

export default function RecipesList({ dishes }: { dishes: Dish[] }) {
  console.log(dishes);
  return (
    <div>recipes_list</div>
  )
}
