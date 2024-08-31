import express from 'express';
import AppController from "../controllers/AppController.js"; // eslint-disable-line
import UsersController from "../controllers/UsersController.js"; // eslint-disable-line

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.get('/users', UsersController.postNew);

export default router;
