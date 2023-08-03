import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies.sessionToken;

    if (!sessionToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    merge(req, { identity: user });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const identity = get(req, "identity._id") as string;
    const { id } = req.params;

    if (!identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (identity.toString() !== id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};
