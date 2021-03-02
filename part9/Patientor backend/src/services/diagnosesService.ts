import diagnoses from '../../data/diagnoses.json';
import {Diagnosis} from '../types/types';

const getAllDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {getAllDiagnoses};