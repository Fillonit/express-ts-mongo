import express from "express";

import {
	getCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourseById,
	getCourseLessons,
	getCourseResources,
	getCourseTags,
	getCoursesByTag,
	getCoursesByTags,
	addCourseLesson,
	addCourseResource,
	addCourseTag,
	deleteCourseLesson,
	deleteCourseResource,
	deleteCourseTag,
} from "../db/courses";

export const getAllCourses = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const courses = await getCourses();

		return res.status(200).json({ courses }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCourse = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Course id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		return res.status(200).json({ course }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const createNewCourse = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { title, description, thumbnail, tags } = req.body;

		if (!title || !description || !thumbnail || !tags) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const course = await createCourse(req.body);

		return res.status(200).json({ course }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const updateExistingCourse = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Course id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		const updatedCourse = await updateCourse(id, req.body);

		return res.status(200).json({ course: updatedCourse }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteExistingCourse = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Course id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		await deleteCourseById(id);

		return res.status(200).json({ course }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCourseLessonsById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Course id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		const lessons = await getCourseLessons(id);

		return res.status(200).json({ lessons }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCourseResourcesById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Course id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		const resources = await getCourseResources(id);

		return res.status(200).json({ resources }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCourseTagsById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Course id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		const tags = await getCourseTags(id);

		return res.status(200).json({ tags }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCoursesByTagOrTags = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { tag, tags } = req.query;

		if (!tag && !tags) {
			return res
				.status(400)
				.json({ message: "Tag or tags not provided" });
		}

		if (tag && !tags) {
			const courses = await getCoursesByTag(tag as string);

			return res.status(200).json({ courses }).end();
		}

		if (!tag && tags) {
			const courses = await getCoursesByTags(tags as string[]);

			return res.status(200).json({ courses }).end();
		}

		return res.status(400).json({ message: "Invalid query" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const addCourseLessonById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Course id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		const lesson = await addCourseLesson(id, req.body);

		return res.status(200).json({ lesson }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const addCourseResourceById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Course id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		const resource = await addCourseResource(id, req.body);

		return res.status(200).json({ resource }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const addCourseTagById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Course id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		const tag = await addCourseTag(id, req.body);

		return res.status(200).json({ tag }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteCourseLessonById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id, lessonId } = req.params;

		if (!id || !lessonId) {
			return res
				.status(400)
				.json({ message: "Course id or lesson id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		await deleteCourseLesson(id, lessonId);

		return res
			.status(200)
			.json({ message: "Lesson deleted successfully" })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteCourseResourceById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id, resourceId } = req.params;

		if (!id || !resourceId) {
			return res
				.status(400)
				.json({ message: "Course id or resource id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		await deleteCourseResource(id, resourceId);

		return res
			.status(200)
			.json({ message: "Resource deleted successfully" })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteCourseTagById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id, tagId } = req.params;

		if (!id || !tagId) {
			return res
				.status(400)
				.json({ message: "Course id or tag id not provided" });
		}

		const course = await getCourseById(id);

		if (!course || course === null || course === undefined) {
			return res.status(400).json({ message: "Course not found" });
		}

		await deleteCourseTag(id, tagId);

		return res
			.status(200)
			.json({ message: "Tag deleted successfully" })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
