const Event = require('../models/event.model');
const axios = require('axios');

module.exports = {
  async createEvent(req, res) {
    try {
      const { title, description, date, location, civilization, theme } = req.body;
      const newEvent = await Event.create({ title, description, date, location, civilization, theme });
      res.status(201).json({ message: 'Événement créé avec succès', event: newEvent });
    } catch (error) {
      console.error('Erreur serveur:', error);  
      res.status(500).json({ message: 'Erreur serveur', error: error.message || error });
    }
  },

  async getAllEvents(req, res) {
    try {
      const events = await Event.findAll();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  },

  async getEventById(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  },

  async getEventWithMedia(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ message: 'Événement non trouvé' });

      const medias = await axios.get(`http://localhost:3004/api/media?eventId=${event.id}`);
      res.json({ event, medias: medias.data });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  },

  async updateEvent(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ message: 'Événement non trouvé' });

      const { title, description, date, location, civilization, theme } = req.body;
      await event.update({ title, description, date, location, civilization, theme });

      res.status(200).json({ message: 'Événement mis à jour', event });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  },

  async deleteEvent(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ message: 'Événement non trouvé' });

      await event.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  }
};
