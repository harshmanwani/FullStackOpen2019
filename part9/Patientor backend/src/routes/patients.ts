import express from 'express';
import patientsService from '../services/patientsService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req,res) => {
    res.send(patientsService.getAllPatientsNonSensitive());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.getOnePatient(req.params.id);
    if(patient) {
        res.send(patient);
    } else {
        res.status(404).end();
    }
});

router.post('/', (req,res) => {
    try {
        const newPatient = utils.toNewPatient(req.body);
        
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch(e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);   
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const newEntry = utils.toNewEntry(req.body);
        
        const addedEntry = patientsService.addEntry(newEntry, id);
        res.json(addedEntry);
    } catch(e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

export default router;