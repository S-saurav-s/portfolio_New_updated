const Project = require('../models/Project');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary");


const deleteCloudinaryImage = async (imageUrl) => {
  if (imageUrl && !imageUrl.includes('default_projectImage.png')) {
    try {
      // Extract public_id from Cloudinary URL
      const publicId = imageUrl.split('/portfolio/')[1]?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`portfolio/${publicId}`);
      }
    } catch (err) {
      console.error('Failed to delete old image:', err);
    }
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

const upload = multer({ storage });

// @desc    Show all projects in admin panel
// @route   GET /admin/projects
exports.getAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.render('admin/projects/index', { 
      title: 'Manage Projects',
      projects 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};



// @desc    Show create project form
// @route   GET /admin/projects/new
exports.getNewProject = (req, res) => {
  res.render('admin/projects/form', { 
    title: 'Add New Project',
    project: null,
    error: null 
  });
};

// @desc    Create new project
// @route   POST /admin/projects
exports.createProject = async (req, res) => {
  try {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        return res.render('admin/projects/form', { 
          title: 'Add New Project',
          project: null,
          error: err.message 
        });
      }

      const { title, description, technologies, projectUrl, githubUrl, featured, order } = req.body;
      
      const projectData = {
        title,
        description,
        technologies: technologies ? technologies.split(',').map(t => t.trim()) : [],
        projectUrl,
        githubUrl,
        featured: featured === 'on',
        order: order || 0,
        image: '/images/default_projectImage.png' // Default image
      };

      if (req.file) {
       projectData.image = req.file.path;
      }

      const project = new Project(projectData);
      await project.save();

      res.redirect('/admin/projects');
    });
  } catch (error) {
    console.error(error);
    res.render('admin/projects/form', { 
      title: 'Add New Project',
      project: null,
      error: 'Error creating project' 
    });
  }
};

// @desc    Show edit project form
// @route   GET /admin/projects/:id/edit
exports.getEditProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.render('admin/projects/form', { 
      title: 'Edit Project',
      project,
      error: null 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @desc    Update project
// @route   PUT /admin/projects/:id
exports.updateProject = async (req, res) => {
  try {
    // 1. Get existing project from database
    const existingProject = await Project.findById(req.params.id);
    
    // 2. Start multer upload
    upload.single('image')(req, res, async function (err) {
      
      // 3. Handle upload errors
      if (err) {
        return res.render('admin/projects/form', { 
          title: 'Edit Project',
          project: existingProject,
          error: err.message 
        });
      }

      // 4. Extract form data
      const { title, description, technologies, projectUrl, githubUrl, featured, order } = req.body;
      
      // 5. Prepare update data
      const projectData = {
        title,
        description,
        technologies: technologies ? technologies.split(',').map(t => t.trim()).filter(t => t) : [],
        projectUrl,
        githubUrl,
        featured: featured === 'on',
        order: order || 0
      };

      // 6. 🔴 HANDLE IMAGE UPDATE HERE (your code goes here)
      if (req.file) {
        if (existingProject.image && !existingProject.image.includes('default_projectImage.png')) {
          await deleteCloudinaryImage(existingProject.image);
        }
        projectData.image = req.file.path;
      } else {
        projectData.image = existingProject.image || '/images/default_projectImage.png';
      }

      // 7. Update database
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        projectData,
        { new: true, runValidators: true }
      );

      // 8. Redirect
      res.redirect('/admin/projects');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete project
// @route   DELETE /admin/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    
    // Delete image from Cloudinary (if not default)
    if (project.image && !project.image.includes('default_projectImage.png')) {
      await deleteCloudinaryImage(project.image);
    }
    
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/admin/projects');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};