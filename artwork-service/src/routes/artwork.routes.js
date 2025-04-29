const express = require('express');
const router = express.Router();

const artworkController = require('../controllers/artwork.controller');

/**
 * @swagger
 * tags:
 *   name: Artworks
 *   description: API de gestion des œuvres d'art
 */

/**
 * @swagger
 * /api/artworks:
 *   post:
 *     summary: Créer une nouvelle œuvre d'art
 *     tags: [Artworks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Mona Lisa
 *               artist:
 *                 type: string
 *                 example: Léonard de Vinci
 *               year:
 *                 type: integer
 *                 example: 1503
 *               description:
 *                 type: string
 *                 example: Portrait célèbre exposé au Louvre.
 *     responses:
 *       201:
 *         description: Œuvre créée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', artworkController.createArtwork);

/**
 * @swagger
 * /api/artworks:
 *   get:
 *     summary: Récupérer toutes les œuvres
 *     tags: [Artworks]
 *     responses:
 *       200:
 *         description: Liste des œuvres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artwork'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', artworkController.getAllArtworks);

/**
 * @swagger
 * /api/artworks/{id}:
 *   put:
 *     summary: Mettre à jour une œuvre par ID
 *     tags: [Artworks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'œuvre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               year:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Œuvre mise à jour
 *       404:
 *         description: Œuvre non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', artworkController.updateArtwork);

/**
 * @swagger
 * /api/artworks/{id}:
 *   delete:
 *     summary: Supprimer une œuvre par ID
 *     tags: [Artworks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'œuvre
 *     responses:
 *       204:
 *         description: Œuvre supprimée avec succès
 *       404:
 *         description: Œuvre non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', artworkController.deleteArtwork);

module.exports = router;
