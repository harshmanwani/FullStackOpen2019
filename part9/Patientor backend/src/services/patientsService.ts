import patientsData from '../../data/patients';
import {Patient, NonSensitivePatient, NewPatient, Entry, NewEntry} from '../types/types';

let patients: Array<Patient> = patientsData;

const getAllPatients = (): Patient[]  => {
    return patients;
};

const getAllPatientsNonSensitive = (): NonSensitivePatient[] => {
    return patients.map(({id,name,dateOfBirth,gender,occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getOnePatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: String(Math.floor(Math.random() * Math.floor(100000))),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
    const newEntry = {
        id: String(Math.floor(Math.random() * Math.floor(100000))),
        ...entry
    };
    patients = patients.map(patient => patient.id === id ? {...patient, entries: [...patient.entries, newEntry]} : patient);
    return newEntry;
};

export default {
    getAllPatients,
    getAllPatientsNonSensitive,
    addPatient,
    getOnePatient,
    addEntry
};