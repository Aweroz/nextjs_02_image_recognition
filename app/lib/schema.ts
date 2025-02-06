export const schemaIngredients = {
  title: "ingredients",
  description: "recognized ingredients",
  type: "object",
  properties: {
    ingredients: {
      type: "array",
      description: "list of ingredients found in picture",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          amount: { type: "number" },
          unit: { type: "string" }
        },
        required: ["name", "amount", "unit"]
      }
    },
  },
  required: ["ingredients"]
}


export const schemaReciepies = {
  title: "dishes",
  description: "dish and recipe",
  type: "object",
  properties: {
    dishes: {
      type: "array",
      description: "list of various dishes",
      uniqueItems: true,
      items: {
        description: "dish and recipe",
        type: "object",
        properties: {
          name: { type: "string", description: "name of the dish" },
          tags: {
            type: "array",
            description: "Tags for the dish such as: vege, spicy, chinese, etc.",
            items: { type: "string" },
            minItems: 1,
            uniqueItems: true
          },
          ingredients: {
            type: "array",
            description: "list of ingredients required for the dish",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                amount: { type: "number" },
                unit: { type: "string" }
              },
              required: ["name", "amount", "unit"]
            }
          },
          cooking_time: { type: "integer", description: "How long takes preparation of the dish" },
          recipe: { type: "string", description: "steps to do to preapre dish" }
        },
        required: ["name", "tags", "ingredients", "cooking_time", "recipe"]
      }
    }
  },
  required: ["dishes"]
}


export const schemaReciepe = {
  title: "dishes",
  description: "dish and recipe",
  type: "object",
  properties: {
    name: { type: "string", description: "name of the dish" },
    tags: {
      type: "array",
      description: "Tags for the dish such as: vege, spicy, chinese, etc.",
      items: { type: "string" },
      minItems: 1,
      uniqueItems: true
    },
    ingredients: {
      type: "array",
      description: "list of ingredients required for the dish",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          amount: { type: "number" },
          unit: { type: "string" }
        },
        required: ["name", "amount", "unit"]
      }
    },
    cooking_time: { type: "integer", description: "How long takes preparation of the dish" },
    recipe: { type: "string", description: "steps to do to preapre dish" }
  },
  required: ["name", "tags", "ingredients", "cooking_time", "recipe"]
}


export const schemaDishes = {
  title: "dishes",
  description: "list of dish names and ingredients",
  type: "object",
  properties: {
    dishes: {
      type: "array",
      uniqueItems: true,
      items: {
        description: "dish and ingredients",
        type: "object",
        properties: {
          name: { type: "string", description: "name of the dish" },
          ingredients: {
            type: "array",
            description: "list of ingredients required for the dish",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                amount: { type: "number" },
                unit: { type: "string" }
              },
              required: ["name", "amount", "unit"]
            }
          }
        },
        required: ["name", "ingredients"]
      }
    }
  },
  required: ["dishes"]
}