import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	price: { type: Number, required: true },
	store: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema({
	name: { type: String, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	description: { type: String, required: false, default: "" },
	URL: { type: String, required: true, unique: true },
	imageURL: { type: String, required: false, default: "" },
	stores: [{ type: String, required: true }],
	prices: { type: [PriceSchema], required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model("Product", ProductSchema);

export const getProducts = () => ProductModel.find();

export const createProduct = (values: Record<string, any>) =>
	new ProductModel(values).save().then((product) => product.toObject());

export const updateProduct = (id: string, values: Record<string, any>) =>
	ProductModel.findByIdAndUpdate(id, values).then((product) =>
		product.toObject()
	);

export const deleteProduct = (id: string) => ProductModel.findByIdAndDelete(id);

export const getProductById = (id: string) => ProductModel.findById(id);

export const getProductsByName = (name: string) => ProductModel.find({ name });

export const getProductsByNameRegex = (name: string) =>
	ProductModel.find({ name: { $regex: name, $options: "i" } });

export const searchProducts = (search: string) =>
	ProductModel.find({
		$or: [
			{ name: { $regex: search, $options: "i" } },
			{ description: { $regex: search, $options: "i" } },
		],
	});

export const getRecentProducts = (limit: number) =>
	ProductModel.find().sort({ createdAt: -1 }).limit(limit);

export const getRecentProductsByStore = (store: string, limit: number) =>
	ProductModel.find({ store }).sort({ createdAt: -1 }).limit(limit);

export const addPriceToProduct = (
	productId: string,
	priceData: Record<string, any>
) =>
	ProductModel.findByIdAndUpdate(
		productId,
		{ $push: { prices: priceData } },
		{ new: true }
	).then((product) => product.toObject());

export const deleteProductById = (productId: string) =>
	ProductModel.findOneAndDelete({ _id: productId });

export const getProductByStore = (store: string) =>
	ProductModel.find({ store });

export const getProductsWithPriceHistory = () =>
	ProductModel.find().populate("prices");

export default ProductModel;
