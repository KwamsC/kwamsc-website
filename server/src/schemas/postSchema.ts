export const postSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    content: { type: "string" },
    author: { type: "string" },
    published: { type: "boolean" },
    createdAt: { type: "number" },
    tags: { type: "array" },
    updatedAt: { type: "number", nullable: true },
    imageUrl: { type: "string" },
  },
  required: ["title", "content", "published", "author", "tags"],
} as const; // don't forget to use const !

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { required, ...postPutSchema } = postSchema;

export const putSchema = {
  body: postPutSchema,
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const getAllSchema = {
  querystring: {
    type: "object",
    properties: {
      count: { type: "number", maximum: 100 },
    },
  },
  response: {
    200: {
      type: "array",
    },
  },
};

export const getSchema = {
  params: {
    id: { type: "string" },
  },
  response: {
    200: postPutSchema,
  },
};

export const deleteSchema = {
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
  body: postSchema,
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
