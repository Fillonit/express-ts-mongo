import express from "express";
import authentication from "./authentication";
import users from "./users";
import posts from "./posts";
import messages from "./messages";

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	users(router);
	posts(router);
	messages(router);

	return router;
};
