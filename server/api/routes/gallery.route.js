import express from 'express'
import { Gallerys } from '../controllers/gallery.controller.js';

const router = express.Router();


router.get('/gallerys',Gallerys)

export default router;