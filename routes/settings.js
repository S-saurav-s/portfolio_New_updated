const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const settingsController = require('../controllers/settingsController');

// All routes are protected
router.use(isAuthenticated);

// Main settings page
router.get('/', settingsController.getSettings);

// Profile update
router.post('/profile', settingsController.updateProfile);

// Social links update
router.post('/social', settingsController.updateSocial);

// Skills management
router.post('/skills', settingsController.updateSkills);
router.post('/skills/upload/:skillId', settingsController.uploadSkillIcon);
router.delete('/skills/:skillId', settingsController.deleteSkill);  // ⬅️ CRITICAL

// About section update
router.post('/about', settingsController.updateAbout);

module.exports = router;