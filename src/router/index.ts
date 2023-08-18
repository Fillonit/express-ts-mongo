import express from "express";
import authentication from "./authentication";
import users from "./users";
import posts from "./posts";
import messages from "./messages";
import products from "./products";

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	users(router);
	posts(router);
	messages(router);
	products(router);

	return router;
};
