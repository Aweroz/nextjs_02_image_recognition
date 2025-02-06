export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

import { schemaDishes, schemaIngredients, schemaReciepe } from "@/app/lib/schema";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const origin = request.nextUrl.origin;

  const formData = await request.json();
  const { prompt, quality, image } = formData;
  
  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0
  });

  // first recognize food in the image
  const messages = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: prompt,
        },
        {
          type: "image_url",
          image_url: {
            "url": image,
            "detail": quality
            },
        },
      ],
    }
  ];

  const ingredientsModel = model.withStructuredOutput(schemaIngredients);
  const imageResponse = await ingredientsModel.invoke(messages);
  // console.log(imageResponse);

  // propose 10 dishes - only names and ingredients
  const dishesModel = model.withStructuredOutput(schemaDishes);
  const systemTemplate = 
    "Find and propose 10 recipies for a dinner dish based on the list of available ingredients: {ingredients}." +
    "Return only names of that dishes and required ingredients.";
  const dishesPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate]
  ]);
  const chain = dishesPrompt.pipe(dishesModel);
  const dishesResponse = await chain.invoke({
    ingredients: imageResponse.ingredients,
  });
  // console.log(dishesResponse);

  // prepare final list of the dishes
  const dishes = [];
  for (const dish of dishesResponse.dishes) {
    const response = await axios.get(`${origin}/api/recipe?name=${encodeURI(dish.name)}`);
    if (!response.data) {
      // no recipe found in data base -> get recipe from AI
      const recipeModel = model.withStructuredOutput(schemaReciepe);
      const systemTemplate2 = "Find a recipie for dish with name {dish_name} and the list of ingredients {ingredients}";
      const recipePrompt = ChatPromptTemplate.fromMessages([
        ["system", systemTemplate2]
      ]);
      const chain = recipePrompt.pipe(recipeModel);
      const recipeResponse = await chain.invoke({
        dish_name: dish.name,
        ingredients: dish.ingredients,
      });
      // console.log(recipeResponse);

      // add dish to the database
      await axios.post(`${origin}/api/recipe`, recipeResponse);

      dishes.push(recipeResponse);
      // console.log(`dish from AI: ${recipeResponse.name}`);
    } else {
      // recipe exists in the DB -> get it from DB
      dishes.push(response.data);
      // console.log(`dish from DB: ${response.data.name}`);
    }
  }

  // return dishes
  return Response.json({dishes});
}