import { type NextFunction, type Request, type Response } from "express";

export const setCache = async (req: Request, res: Response, next: NextFunction) => {
  const period = 60 * 5;

  if (req.method === "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    res.set("Cache-control", "no-store");
  }

  next();
};
