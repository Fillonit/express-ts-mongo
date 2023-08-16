import express from "express";
import authentication from "./authentication";
import users from "./users";
import posts from "./posts";

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	users(router);
	posts(router);

	return router;
};
