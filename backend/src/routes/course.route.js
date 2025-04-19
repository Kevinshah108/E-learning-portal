import express from "express";
import courses from "../lib/courses.js";

const router = express.Router();

let userProgress = {};

router.get('/courses', (req, res) => {
  const courseList = courses.map(({ id, title, description, thumbnail, assigned }) => ({ id, title, description, thumbnail, assigned }));
  res.json(courseList);
});

router.get('/courses/:courseId', (req, res) => {
  const course = courses.find(c => c.id === req.params.courseId);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
});

router.post('/progress', (req, res) => {
  const { studentId, courseId, moduleId } = req.body;

  if (!studentId || !courseId || !moduleId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  if (!userProgress[studentId]) {
    userProgress[studentId] = {};
  }
  if (!userProgress[studentId][courseId]) {
    userProgress[studentId][courseId] = [];
  }

  const completedModules = userProgress[studentId][courseId];

  if (completedModules.includes(moduleId)) {
    userProgress[studentId][courseId] = completedModules.filter(m => m !== moduleId);
  } else {
    userProgress[studentId][courseId].push(moduleId);
  }

  res.json({ message: "Progress updated", progress: userProgress[studentId][courseId] });
});

router.get('/progress/:studentId/:courseId', (req, res) => {
  const { studentId, courseId } = req.params;
  const progress = userProgress[studentId]?.[courseId] || [];
  res.json({ progress });
});

export default router;
