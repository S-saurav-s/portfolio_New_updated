const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const projectController = require('../controllers/projectController');

// All routes are protected
router.use(isAuthenticated);

// @route   GET /admin/projects
router.get('/', projectController.getAdminProjects);

// @route   GET /admin/projects/new
router.get('/new', projectController.getNewProject);

// @route   POST /admin/projects
router.post('/', projectController.createProject);

// @route   GET /admin/projects/:id/edit
router.get('/:id/edit', projectController.getEditProject);

// @route   PUT /admin/projects/:id
router.put('/:id', projectController.updateProject);

// @route   DELETE /admin/projects/:id
router.delete('/:id', projectController.deleteProject);

module.exports = router;
