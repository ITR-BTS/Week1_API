import express from 'express';
import {createPatient, getAllPatients} from '../../controllers/patientController.js';

const patientRouter = express.Router();
patientRouter.post('/create', createPatient);
patientRouter.get('/get-all', getAllPatients);
export default patientRouter;