export type Dish = {
  _id: string,
  name: string,
  tags: string[],
  cooking_time: number,
  ingredients: { name: string, amount: number, unit: string }[],
  recipe: string
}

export type Response = {
    dishes: Dish[]
}
