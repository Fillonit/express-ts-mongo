import express from "express";

import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductById,
	getProductsByName,
	getProductsByNameRegex,
	searchProducts,
	getRecentProducts,
	getRecentProductsByStore,
	addPriceToProduct,
	deleteProductById,
	getProductByStore,
	getProductsWithPriceHistory,
} from "../db/products";

export const getAllProducts = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const products = await getProducts();

		return res.status(200).json({ products }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getProduct = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const product = await getProductById(id);

		if (!product || product === null || product === undefined) {
			return res.status(400).json({ message: "Product not found" });
		}

		return res.status(200).json({ product }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const createNewProduct = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { name, description, store, prices } = req.body;

		const product = await createProduct({
			name,
			description,
			store,
			prices,
		});

		return res.status(200).json({ product }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const updateExistingProduct = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const product = await getProductById(id);

		if (!product || product === null || product === undefined) {
			return res.status(400).json({ message: "Product not found" });
		}

		const { name, description, store, prices } = req.body;

		const updatedProduct = await updateProduct(id, {
			name,
			description,
			store,
			prices,
		});

		return res.status(200).json({ product: updatedProduct }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteExistingProduct = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const product = await getProductById(id);

		if (!product || product === null || product === undefined) {
			return res.status(400).json({ message: "Product not found" });
		}

		await deleteProductById(id);

		return res
			.status(200)
			.json({ message: "Product deleted successfully" })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const searchForProducts = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { search } = req.params;

		const products = await searchProducts(search);

		return res.status(200).json({ products }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getSomeRecentProducts = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { limit } = req.params;

		const products = await getRecentProducts(parseInt(limit));

		return res.status(200).json({ products }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getSomeRecentProductsByStore = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { store, limit } = req.params;

		const products = await getRecentProductsByStore(store, parseInt(limit));

		return res.status(200).json({ products }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const addPriceToExistingProduct = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const product = await getProductById(id);

		if (!product || product === null || product === undefined) {
			return res.status(400).json({ message: "Product not found" });
		}

		const { price } = req.body;

		const updatedProduct = await addPriceToProduct(id, {
			price,
		});

		return res.status(200).json({ product: updatedProduct }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getProductWithPriceHistory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const productWithPriceHistory = await getProductsWithPriceHistory();

		return res.status(200).json({ product: productWithPriceHistory }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getProductByStoreName = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { store } = req.params;

		const products = await getProductByStore(store);

		return res.status(200).json({ products }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
