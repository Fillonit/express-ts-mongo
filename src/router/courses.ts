import express from "express";

import {
	getAllCourses,
	createNewCourse,
	getCourse,
	updateExistingCourse,
	deleteExistingCourse,
	getCourseLessonsById,
	getCourseResourcesById,
	getCourseTagsById,
	getCoursesByTagOrTags,
	addCourseLessonById,
	addCourseResourceById,
	addCourseTagById,
	deleteCourseLessonById,
	deleteCourseResourceById,
	deleteCourseTagById,
} from "../controllers/courses";

import { isAuthenticated, isOwner, isAdmin } from "../middlewares";

export default (router: express.Router) => {
	router.get("/courses", isAuthenticated, getAllCourses);
	router.get("/courses/:id", isAuthenticated, getCourse);
	router.get("/courses/:id/lessons", isAuthenticated, getCourseLessonsById);
	router.get(
		"/courses/:id/resources",
		isAuthenticated,
		getCourseResourcesById
	);
	router.get("/courses/:id/tags", isAuthenticated, getCourseTagsById);
	router.get("/courses/tags/:tag", isAuthenticated, getCoursesByTagOrTags);
	router.post("/courses", isAuthenticated, createNewCourse);
	router.post("/courses/:id/lessons", isAuthenticated, addCourseLessonById);
	router.post(
		"/courses/:id/resources",
		isAuthenticated,
		addCourseResourceById
	);
	router.post("/courses/:id/tags", isAuthenticated, addCourseTagById);
	router.put(
		"/courses/:id",
		isAuthenticated,
		isOwner || isAdmin,
		updateExistingCourse
	);
	router.delete(
		"/courses/:id",
		isAuthenticated,
		isOwner || isAdmin,
		deleteExistingCourse
	);
	router.delete(
		"/courses/:id/lessons/:lessonId",
		isAuthenticated,
		isOwner || isAdmin,
		deleteCourseLessonById
	);
	router.delete(
		"/courses/:id/resources/:resourceId",
		isAuthenticated,
		isOwner || isAdmin,
		deleteCourseResourceById
	);
	router.delete(
		"/courses/:id/tags/:tagId",
		isAuthenticated,
		isOwner || isAdmin,
		deleteCourseTagById
	);
};
