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
  required: ["title", "content", "published", "author"],
} as const; // don't forget to use const !

const messageResponse = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { required, ...postPutSchema } = postSchema;

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
      items: postSchema,
    },
  },
};

export const getSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: postSchema,
  },
};

export const putSchema = {
  body: postPutSchema,
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: messageResponse,
  },
};

export const deleteSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: messageResponse,
  },
};

export const AddSchema = {
  body: postSchema,
  response: {
    201: messageResponse,
  },
};
