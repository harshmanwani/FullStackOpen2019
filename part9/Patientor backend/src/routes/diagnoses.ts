import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(diagnosesService.getAllDiagnoses()).end();
});

export default router;