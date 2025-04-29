module.exports = {
    openapi: "3.0.0",
    info: {
      title: "Media Service API",
      version: "1.0.0",
      description: "API pour gérer les médias (images, vidéos, textes) liés aux événements",
    },
    servers: [
      {
        url: "http://localhost:3000/api/media",
        description: "Serveur local"
      }
    ],
    paths: {
      "/upload": {
        post: {
          summary: "Uploader un média",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    mediaFile: {
                      type: "string",
                      format: "binary",
                      description: "Fichier média à uploader"
                    },
                    title: { type: "string" },
                    description: { type: "string" },
                    type: { type: "string", enum: ["image", "video", "texte"] },
                    event_id: { type: "integer" }
                  },
                  required: ["mediaFile", "title", "type"]
                }
              }
            }
          },
          responses: {
            201: {
              description: "Média créé avec succès"
            },
            400: {
              description: "Données invalides"
            }
          }
        }
      },
      "/{id}": {
        get: {
          summary: "Récupérer un média par ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: {
            200: { description: "Média trouvé" },
            404: { description: "Média non trouvé" }
          }
        },
        put: {
          summary: "Modifier un média",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Média modifié" },
            404: { description: "Média non trouvé" }
          }
        },
        delete: {
          summary: "Supprimer un média",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: {
            200: { description: "Média supprimé" },
            404: { description: "Média non trouvé" }
          }
        }
      },
      "/": {
        get: {
          summary: "Lister les médias avec filtres",
          parameters: [
            { name: "type", in: "query", schema: { type: "string" }, description: "Filtrer par type" },
            { name: "event_id", in: "query", schema: { type: "integer" }, description: "Filtrer par event" },
            { name: "limit", in: "query", schema: { type: "integer" }, description: "Limiter le nombre" },
            { name: "offset", in: "query", schema: { type: "integer" }, description: "Offset pagination" }
          ],
          responses: {
            200: { description: "Liste des médias" }
          }
        }
      }
    }
  };
  