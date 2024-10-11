export const recipeSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    author: { type: "string" },
    description: { type: "string" },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          quantity: { type: "string" },
        },
        required: ["name", "quantity"],
      },
    },
    instructions: {
      type: "array",
      items: { type: "string" },
    },
    servings: { type: "number" },
    prepTime: { type: "string" },
    cookTime: { type: "string" },
    totalTime: { type: "string" },
    difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
    cuisine: { type: "string" },
    mealType: { type: "string" },
    published: { type: "boolean" },
    imageUrl: { type: "string" },
  },
  required: [
    "title",
    "author",
    "description",
    "ingredients",
    "instructions",
    "cuisine",
    "published",
  ],
} as const;

export const getAllJsonSchema = {
  querystring: {
    type: "object",
    properties: {
      count: { type: "number", maximum: 100 },
    },
  },
  response: {
    200: {
      type: "array",
      items: recipeSchema,
    },
  },
};

export const getJsonSchema = {
  params: {
    id: { type: "string" },
  },
  response: {
    200: recipeSchema,
  },
};

export const deleteJsonSchema = {
  params: {
    id: { type: "string" },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const postJsonSchema = {
  body: recipeSchema,
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { required, ...recipePutSchema } = recipeSchema;

export const putJsonSchema = {
  body: recipePutSchema,
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
