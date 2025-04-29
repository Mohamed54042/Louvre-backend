const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media.controller');
const multer = require('multer');
const path = require('path');

// Configuration du stockage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // dossier local
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filtre type fichier + limite taille 5 Mo
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jfif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'), false);
    }
  }
});

router.get('/', mediaController.getAllMedia);
router.get('/:id', mediaController.getMediaById);
router.get('/', mediaController.getMediaPagined);
router.delete('/:id', mediaController.deleteMediaWithFile);

router.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, mediaController.uploadMedia);

router.put('/:id', mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;