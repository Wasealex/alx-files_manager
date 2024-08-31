import express from 'express';
import AppController from "../controllers/AppController.js"; // eslint-disable-line

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

export default router;
