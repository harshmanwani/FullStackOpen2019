/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, EntryType, NewEntry, HealthCheckRating, Diagnosis } from "./types/types";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isEntryType = (entryType: any): entryType is EntryType => {
    return Object.values(EntryType).includes(entryType);
};

const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseName = (name: any): string => {
    if(!name || !isString(name)) {
        throw new Error(`Name unspecified or invalid.`);
    }

    return name;
};

const parseDate = (date: any): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Date unspecified or invalid.');
    }

    return date;
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('SSN unspecified or invalid.');
    }

    return ssn;
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Gender unspecified or invalid.');
    }

    return gender;
};

const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Occupation unspecified or invalid.');
    }

    return occupation;
};

const parseEntryType = (entryType: any): EntryType => {
    if(!entryType || !isEntryType(entryType)) {
        throw new Error('Entrytype unspecified or invalid.');
    }

    return entryType;
};

const parseDescription = (description: any): string => {
    if(!description || !isString(description)) {
        throw new Error('Description unspecified or invalid.');
    }
    
    return description;
};

const parseSpecialist = (specialist: any): string => {
    if(!specialist || !isString(specialist)) {
        throw new Error('Specialist unspecified or invalid.');
    }

    return specialist;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if(!isHealthCheckRating(healthCheckRating)) {
        throw new Error('HealthCheckRating unspecified or invalid.');
    }

    return healthCheckRating;
};

const parseCriteria = (criteria: any): string => {
    if(!criteria || !isString(criteria)) {
        throw new Error('Criteria unspecified or invalid.');
    }

    return criteria;
};

const parseDischarge = (discharge: any): {date: string, criteria: string} => {
    if(!discharge) {
        throw new Error('Discharge unspecified or invalid.');
    }

    return {date: parseDate(discharge.date), criteria: parseCriteria(discharge.criteria)};
};

const parseEmployerName = (employerName: any): string => {
    if(!employerName || !isString(employerName)) {
        throw new Error('EmployerName unspecified or invalid.');
    }

    return employerName;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
    if(!Array.isArray(diagnosisCodes) || !diagnosisCodes.every(isString)) {
        throw new Error('DiagnosisCode/s invalid.');
    } 

    return diagnosisCodes;
};

const parseSickLeave = (sickLeave: any): {startDate: string, endDate: string} => {
    return {startDate: parseDate(sickLeave.startDate), endDate: parseDate(sickLeave.endDate)};
};

const toNewPatient = (obj: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseSsn(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseOccupation(obj.occupation),
        entries: []
    };
    
    return newPatient;
};

const toNewEntry = (obj: any): NewEntry => {
    const type = parseEntryType(obj.type);
    switch(type) {
        case EntryType.HealthCheck:
            const newHealthCheckEntry: NewEntry = {
                type,
                description: parseDescription(obj.description),
                date: parseDate(obj.date),
                specialist: parseSpecialist(obj.specialist),
                healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
            };
            if(obj.diagnosisCodes) {
                newHealthCheckEntry.diagnosisCodes = parseDiagnosisCodes(obj.diagnosisCodes);
            }
            return newHealthCheckEntry;
        case EntryType.Hospital:
            const newHospitalEntry: NewEntry = {
                type,
                description: parseDescription(obj.description),
                date: parseDate(obj.date),
                specialist: parseSpecialist(obj.specialist),
                discharge: parseDischarge(obj.discharge)
            };
            if(obj.diagnosisCodes) {
                newHospitalEntry.diagnosisCodes = parseDiagnosisCodes(obj.diagnosisCodes);
            }
            return newHospitalEntry;
        case EntryType.OccupationalHealthcare:
            const newOccupationalHealthCareEntry: NewEntry = {
                type,
                description: parseDescription(obj.description),
                date: parseDate(obj.date),
                specialist: parseSpecialist(obj.specialist),
                employerName: parseEmployerName(obj.employerName)
            };
            if(obj.diagnosisCodes) {
                newOccupationalHealthCareEntry.diagnosisCodes = parseDiagnosisCodes(obj.diagnosisCodes);
            }
            if(obj.sickLeave) {
                newOccupationalHealthCareEntry.sickLeave = parseSickLeave(obj.sickLeave);
            }
            return newOccupationalHealthCareEntry;
        default:
            return assertNever(type);
    }
};

export default {toNewPatient, toNewEntry};