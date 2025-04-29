const Media = require('../models/media.model');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
// Fonction pour vérifier l'existence d'un événement via event-service
const checkEventExists = async (eventId) => {
  try {
    const response = await axios.get(`http://localhost:3003/api/events/${eventId}`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
exports.getAllMedia = async (req, res) => {
  try {
    const medias = await Media.findAll();
    res.json(medias);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.getMediaPagined = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, eventId } = req.query;
    const filters = {};
    if (type) filters.type = type;
    if (eventId) filters.eventId = eventId;

    const offset = (page - 1) * limit;
    const medias = await Media.findAndCountAll({
      where: filters,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: medias.count,
      page: parseInt(page),
      pages: Math.ceil(medias.count / limit),
      data: medias.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media non trouvé' });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const axios = require('axios');
const Media = require('../models/media.model');

exports.uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    const { description, eventId } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'Aucun fichier envoyé' });
    }

    // Vérifie si l'eventId est fourni et s'il existe dans event-service
    if (eventId) {
      try {
        const response = await axios.get(`http://localhost:3003/api/events/${eventId}`);
        if (response.status !== 200) {
          return res.status(400).json({ message: `L'événement avec l'ID ${eventId} n'existe pas.` });
        }
      } catch (err) {
        return res.status(400).json({ message: `Échec de la vérification de l'événement avec l'ID ${eventId}` });
      }
    }

    const newMedia = await Media.create({
      type: file.mimetype,
      url: `/uploads/${file.filename}`,
      description,
      eventId: eventId ? parseInt(eventId) : null,
    });

    res.status(201).json(newMedia);
  } catch (error) {
    console.error('Erreur uploadMedia:', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


exports.updateMedia = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media non trouvé' });

    const { type, description, eventId } = req.body;
    await media.update({ type, description, eventId });

    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.deleteMediaWithFile = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media non trouvé' });

    // Chemin complet vers le fichier stocké
    const filepath = path.join(__dirname, '..', media.url);

    // Supprimer le fichier (ignore l'erreur si le fichier n'existe pas)
    fs.unlink(filepath, (err) => {
      if (err) console.error('Erreur suppression fichier:', err);
    });

    // Supprimer la ligne en base
    await media.destroy();

    res.json({ message: 'Media supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media non trouvé' });

    await media.destroy();
    res.json({ message: 'Media supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
