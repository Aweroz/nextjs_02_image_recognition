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
        <div className="left">
        <div className="dish_name">{dish.name} / <span className="cooking_time">{dish.cooking_time} min</span></div>
          <div className="tags">{dish.tags.join(', ')}</div>
          <br/>
          <div>
            <Ingredients list={dish.ingredients} />
          </div>
          <br/>
          <div>
            <RecipeSteps steps={dish.recipe} />
          </div>
        </div>
        <div className="right">
          <button className="red rounded" onClick={handleClickLess}>less...</button>
        </div>
      </div>
      ) :
      (
        <div className="recipe_short">
          <div className="left">
            <div className="dish_name">{dish.name} / <span className="cooking_time">{dish.cooking_time} min</span></div>
            <div className="tags">{dish.tags.join(', ')}</div>
          </div>
          <div className="right">
            <button className="red rounded" onClick={handleClickMore}>more...</button>
          </div>
        </div>
      )}
    </>
  )
}