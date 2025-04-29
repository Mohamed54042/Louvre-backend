const Artwork = require('../models/artwork.model');

module.exports = {
  // Créer une œuvre
  async createArtwork(req, res) {
    try {
        const { title, artist, year, description } = req.body;
    
        const newArtwork = await Artwork.create({ title, artist, year, description });
    
        res.status(201).json({ message: 'Œuvre créée avec succès', artwork: newArtwork });
      } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
      }
    },
  // Récupérer toutes les œuvres
  async getAllArtworks(req, res) {
    try {
      const artworks = await Artwork.findAll();
      res.status(200).json(artworks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching artworks', error });
    }
  },

  // Récupérer une œuvre par ID
  async getArtworkById(req, res) {
    try {
      const artwork = await Artwork.findByPk(req.params.id);
      if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
      res.status(200).json(artwork);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching artwork', error });
    }
  },

  // Mettre à jour une œuvre
  async updateArtwork(req, res) {
    try {
      const { title, artist, year, description } = req.body;
      const artwork = await Artwork.findByPk(req.params.id);
      if (!artwork) return res.status(404).json({ message: 'Artwork not found' });

      artwork.title = title;
      artwork.artist = artist;
      artwork.year = year;
      artwork.description = description;

      await artwork.save();
      res.status(200).json({ message: 'Artwork updated successfully', artwork });
    } catch (error) {
      res.status(500).json({ message: 'Error updating artwork', error });
    }
  },

  // Supprimer une œuvre
  async deleteArtwork(req, res) {
    try {
      const artwork = await Artwork.findByPk(req.params.id);
      if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
  
      await artwork.destroy();
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ message: 'Error deleting artwork', error });
    }
  }
  
};
