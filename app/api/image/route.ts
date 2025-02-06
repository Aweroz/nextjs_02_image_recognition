export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
export async function POST(request: Request) {

  const formData = await request.json();
  const { prompt, quality, image } = formData;
  
  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0
  });

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

  const response = await model.invoke(messages);

  const json_schema = {
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
  const structuredLlm = model.withStructuredOutput(json_schema)

  //
  const systemTemplate = "Find and propose 10 recipies for a dinner dish based on the list of available ingredients: {ingredients}";
  const dishesPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate]
  ]);
  const chain = dishesPrompt.pipe(structuredLlm);
  const promptValue = await chain.invoke({
    ingredients: response.content,
  });

  console.log(promptValue);



  return Response.json({ingredients: response.content, recipies: promptValue});
}