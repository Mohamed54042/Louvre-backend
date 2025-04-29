const express = require('express');
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/event.controller');

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API pour la gestion des événements historiques
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Créer un nouvel événement
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Bataille de Waterloo
 *               description:
 *                 type: string
 *                 example: Une bataille historique majeure.
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 1815-06-18
 *               location:
 *                 type: string
 *                 example: Belgique
 *               civilization:
 *                 type: string
 *                 example: Europe
 *               theme:
 *                 type: string
 *                 example: Guerre
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', createEvent);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Récupérer tous les événements
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Liste des événements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getAllEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Récupérer un événement par ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement trouvé
 *       404:
 *         description: Événement non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', getEventById);
router.get('/:id/with-media', eventController.getEventWithMedia);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Mettre à jour un événement par ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               civilization:
 *                 type: string
 *               theme:
 *                 type: string
 *     responses:
 *       200:
 *         description: Événement mis à jour
 *       404:
 *         description: Événement non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Supprimer un événement par ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     responses:
 *       204:
 *         description: Événement supprimé avec succès
 *       404:
 *         description: Événement non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', deleteEvent);

module.exports = router;
