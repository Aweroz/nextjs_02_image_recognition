import { useState } from "react";
import { Dish } from "../lib/definitions";
import Ingredients from "./ingredients";
import RecipeSteps from "./recipe_steps";

export default function Recipe({ dish }: { dish: Dish }) {
  const [open, setOpen] = useState<boolean>(false);

  function handleClickMore() {
    setOpen(true);
  }

  function handleClickLess() {
    setOpen(false);
  }
  
  return (
    <>
      {open ? (
        <div className="recipe_short">
        <div>
          <div className="dish_name">{dish.name}</div>
          <div className="tags">{dish.tags.join(', ')}</div>
          <div>
            <Ingredients list={dish.ingredients} />
          </div>
          <div>
            <RecipeSteps steps={dish.recipe} />
          </div>
        </div>
        <div>
          <button onClick={handleClickLess}>less...</button>
        </div>
      </div>
      ) :
      (
        <div className="recipe_short">
          <div>
            <div className="dish_name">{dish.name}</div>
            <div className="tags">{dish.tags.join(', ')}</div>
          </div>
          <div>
            <button onClick={handleClickMore}>more...</button>
          </div>
        </div>
      )}
    </>
  )
}