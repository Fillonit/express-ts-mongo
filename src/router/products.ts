import express from "express";

import { isAuthenticated, isAdmin } from "../middlewares";

import {
	getAllProducts,
	getProduct,
	createNewProduct,
	updateExistingProduct,
	deleteExistingProduct,
	searchForProducts,
	getSomeRecentProducts,
	getSomeRecentProductsByStore,
	addPriceToExistingProduct,
	getProductWithPriceHistory,
	getProductByStoreName,
} from "../controllers/products";

export default (router: express.Router) => {
	router.get("/products", getAllProducts);
	router.get("/products/:id", getProduct);
	router.get("/products/:store", getProductByStoreName);
	router.get("/products/:search", searchForProducts);
	router.get("/products/recent/:limit", getSomeRecentProducts);
	router.get("/products/recent/:store/:limit", getSomeRecentProductsByStore);
	router.get("/products/:id/price-history", getProductWithPriceHistory);
	router.post("/products", isAuthenticated, isAdmin, createNewProduct);
	router.patch(
		"/products/:id",
		isAuthenticated,
		isAdmin,
		updateExistingProduct
	);
	router.patch(
		"/products/:id/add-price",
		isAuthenticated,
		isAdmin,
		addPriceToExistingProduct
	);
	router.delete(
		"/products/:id",
		isAuthenticated,
		isAdmin,
		deleteExistingProduct
	);
};
