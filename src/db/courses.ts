import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	thumbnail: { type: String, required: true },
	lessons: [
		{
			title: { type: String, required: true },
			description: { type: String, required: true },
			video: { type: String, required: true },
			thumbnail: { type: String, required: true },
			order: { type: Number, required: true },
		},
	],
	resources: [
		{
			title: { type: String, required: true },
			thumbnail: {
				type: String,
				required: false,
				default:
					"https://cdn-icons-png.flaticon.com/512/3858/3858629.png",
			},
			description: { type: String, required: true },
			URL: { type: String, required: true },
			order: { type: Number, required: true },
		},
	],
	tags: [{ type: String, required: true }],
});

export const CourseModel = mongoose.model("Course", CourseSchema);

export const getCourses = () => CourseModel.find();

export const getCourseById = (id: string) => CourseModel.findById(id);

export const createCourse = (values: Record<string, any>) =>
	new CourseModel(values).save().then((course) => course.toObject());

export const updateCourse = (id: string, values: Record<string, any>) =>
	CourseModel.findByIdAndUpdate(id, values).then((course) =>
		course.toObject()
	);

export const deleteCourseById = (id: string) =>
	CourseModel.findOneAndDelete({ _id: id });

export const getCourseLessons = (id: string) =>
	CourseModel.findById(id).select("lessons");

export const getCourseResources = (id: string) =>
	CourseModel.findById(id).select("resources");

export const getCourseTags = (id: string) =>
	CourseModel.findById(id).select("tags");

export const getCoursesByTag = (tag: string) =>
	CourseModel.find({ tags: tag }).select("title description thumbnail tags");

export const getCoursesByTags = (tags: string[]) =>
	CourseModel.find({ tags: { $in: tags } }).select(
		"title description thumbnail tags"
	);

export const addCourseLesson = (id: string, values: Record<string, any>) =>
	CourseModel.findByIdAndUpdate(id, {
		$push: { lessons: values },
	}).then((course) => course.toObject());

export const addCourseResource = (id: string, values: Record<string, any>) =>
	CourseModel.findByIdAndUpdate(id, {
		$push: { resources: values },
	}).then((course) => course.toObject());

export const addCourseTag = (id: string, values: Record<string, any>) =>
	CourseModel.findByIdAndUpdate(id, {
		$push: { tags: values },
	}).then((course) => course.toObject());

export const deleteCourseLesson = (id: string, lessonId: string) =>
	CourseModel.findByIdAndUpdate(id, {
		$pull: { lessons: { _id: lessonId } },
	}).then((course) => course.toObject());

export const deleteCourseResource = (id: string, resourceId: string) =>
	CourseModel.findByIdAndUpdate(id, {
		$pull: { resources: { _id: resourceId } },
	}).then((course) => course.toObject());

export const deleteCourseTag = (id: string, tagId: string) =>
	CourseModel.findByIdAndUpdate(id, {
		$pull: { tags: { _id: tagId } },
	}).then((course) => course.toObject());

export const updateCourseLesson = (
	id: string,
	lessonId: string,
	values: Record<string, any>
) =>
	CourseModel.findOneAndUpdate(
		{ _id: id, "lessons._id": lessonId },
		{ $set: { "lessons.$": values } }
	).then((course) => course.toObject());

export const updateCourseResource = (
	id: string,
	resourceId: string,
	values: Record<string, any>
) =>
	CourseModel.findOneAndUpdate(
		{ _id: id, "resources._id": resourceId },
		{ $set: { "resources.$": values } }
	).then((course) => course.toObject());

export const updateCourseTag = (
	id: string,
	tagId: string,
	values: Record<string, any>
) =>
	CourseModel.findOneAndUpdate(
		{ _id: id, "tags._id": tagId },
		{ $set: { "tags.$": values } }
	).then((course) => course.toObject());

export const getCourseLesson = (id: string, lessonId: string) =>
	CourseModel.findOne({ _id: id, "lessons._id": lessonId }).select(
		"lessons.$"
	);

export const getCourseResource = (id: string, resourceId: string) =>
	CourseModel.findOne({ _id: id, "resources._id": resourceId }).select(
		"resources.$"
	);

export const getCourseTag = (id: string, tagId: string) =>
	CourseModel.findOne({ _id: id, "tags._id": tagId }).select("tags.$");

export const getCourseLessonByOrder = (id: string, order: number) =>
	CourseModel.findOne({ _id: id, "lessons.order": order }).select(
		"lessons.$"
	);

export const getCourseResourceByOrder = (id: string, order: number) =>
	CourseModel.findOne({ _id: id, "resources.order": order }).select(
		"resources.$"
	);
