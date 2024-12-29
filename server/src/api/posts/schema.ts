// Common Schemas
const idParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
};

const messageResponse = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

// Post Base Schema
const basePostSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    content: { type: "string" },
    author: { type: "string" },
    published: { type: "boolean" },
    createdAt: { type: "number" },
    tags: { type: "array", items: { type: "string" } },
    updatedAt: { type: "number", nullable: true },
    imageUrl: { type: "string" },
  },
};

// Full Post Schema
export const postSchema = {
  ...basePostSchema,
  required: ["title", "content", "published", "author"],
};

// Partial Post Schema for PUT
export const postPutSchema = {
  type: "object",
  properties: basePostSchema.properties,
  required: [], // No required fields for partial updates
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
      items: postSchema,
    },
  },
};

export const getSchema = {
  params: idParamSchema,
  response: {
    200: postSchema,
  },
};

export const putSchema = {
  body: postPutSchema,
  params: idParamSchema,
  response: {
    200: messageResponse,
  },
};

export const deleteSchema = {
  params: idParamSchema,
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
