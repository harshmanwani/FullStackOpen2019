import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addEntry, setDiagnoses, updatePatient, useStateValue } from "../state";
import { Header, Icon, Button } from "semantic-ui-react";
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, HealthCheckRating, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, EntryType, NewEntry } from '../types';
import AddEntryModal from "../AddEntryModal";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const OccupationalHealthcareEntryJSX: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
    const [{diagnoses}] = useStateValue();
    return (
        <>
            <div style={{"border":"1px solid lightgrey", "padding": "15px", "marginBottom": "10px"}}>
                <Header>
                    {entry.date}
                    <Icon name="suitcase" size="large"/>
                    {entry.employerName}
                </Header>
                <p style={{"fontSize": "15px"}}>{entry.description}</p>
                {
                    entry.diagnosisCodes
                    ?
                    <ul>
                        {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
                    </ul>
                    :
                    null
                }
                {
                    entry.sickLeave
                    ?  
                    <p style={{fontWeight: "bold", textAlign: "center"}}>SICKLEAVE PRESCRIBED FROM {entry.sickLeave?.startDate} TILL {entry.sickLeave?.endDate}</p>
                    :
                    null
                }
            </div>
        </>
    );
};

const HospitalEntryJSX: React.FC<{entry: HospitalEntry}> = ({entry}) => {
    const [{diagnoses}] = useStateValue();
    return (
        <>
            <div style={{"border":"1px solid lightgrey", "padding": "15px", "marginBottom": "10px"}}>
                <div style={{backgroundColor: "lightgreen"}}>
                    <Header>
                        Discharged at {entry.discharge.date}
                    </Header>
                    <p style={{"fontSize": "15px"}}>{entry.discharge.criteria}</p>
                </div>
                <Header>
                    {entry.date}
                    <Icon name="hospital" size="large"/>
                </Header>
                <p style={{"fontSize": "15px"}}>{entry.description}</p>
                {
                    entry.diagnosisCodes
                    ?
                    <ul>
                        {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
                    </ul>
                    :
                    null
                }
            </div>
        </>
    );
};

const HealthCheckEntryJSX: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    const [{diagnoses}] = useStateValue();
    const getColorFromRating = (rating: HealthCheckRating) => {
        switch(rating) {
            case HealthCheckRating.Healthy:
                return "green";
            case HealthCheckRating.LowRisk:
                return "yellow";
            case HealthCheckRating.HighRisk:
                return "orange";
            case HealthCheckRating.CriticalRisk:
                return "red";
            default:
                return assertNever(rating);
        }
    };

    return (
    <>
        <div style={{"border":"1px solid lightgrey", "padding": "15px", "marginBottom": "10px"}}>
            <Header>
                {entry.date}
                <Icon name="doctor" size="large"/>
            </Header>
            <p style={{"fontSize": "15px"}}>{entry.description}</p>
            {
                entry.diagnosisCodes
                ?
                <ul>
                    {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
                </ul>
                :
                null
            }
            <Icon name="heart" color={getColorFromRating(entry.healthCheckRating)} size="large"></Icon>
        </div>
    </>
    );
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntryJSX entry={entry}/>;
    case EntryType.Hospital:
      return <HospitalEntryJSX entry={entry}/>;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntryJSX entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

const SinglePatient: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, dispatch] = useStateValue();
    const patient = state.patients[`${Object.keys(state.patients).find(p => p === id)}`];
    const diagnoses = state.diagnoses;
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const openModal = (): void => {
        setModalOpen(true);
    };

    const cleanUp = (obj: NewEntry): NewEntry => {
        switch(obj.type) {
            case EntryType.HealthCheck:
                return {
                    type: EntryType.HealthCheck,
                    date: obj.date,
                    description: obj.description,
                    specialist: obj.specialist,
                    diagnosisCodes: obj.diagnosisCodes,
                    healthCheckRating: Number(obj.healthCheckRating)
                };
            case EntryType.Hospital:
                return {
                    type: EntryType.Hospital,
                    date: obj.date,
                    description: obj.description,
                    specialist: obj.specialist,
                    diagnosisCodes: obj.diagnosisCodes,
                    discharge: obj.discharge
                };
            case EntryType.OccupationalHealthcare:
                const newObj: NewEntry = {
                    type: EntryType.OccupationalHealthcare,
                    date: obj.date,
                    description: obj.description,
                    specialist: obj.specialist,
                    diagnosisCodes: obj.diagnosisCodes,
                    employerName: obj.employerName
                };
                if(obj.sickLeave) {
                    if(Boolean(Date.parse(obj.sickLeave.startDate)) && Boolean(Date.parse(obj.sickLeave.endDate))) {
                        newObj.sickLeave = obj.sickLeave;
                    }
                }
                return newObj;
        }
    };

    const submitNewEntry = async (obj: NewEntry) => {
        try {
            console.log(obj);
            const cleanedUpEntry = cleanUp(obj);
            console.log(cleanedUpEntry);
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                cleanedUpEntry
            );
            dispatch(addEntry(newEntry, id));
            closeModal();
        } catch(e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    useEffect(() => {
        if(patient && !patient.ssn) {
            axios.get(`${apiBaseUrl}/patients/${patient.id}`).then(({data}) => {
                console.log(`Fetching more information about ${patient.name}`);
                dispatch(updatePatient({...data}));
                
            });
            if(!diagnoses.length) {
                axios.get(`${apiBaseUrl}/diagnoses`).then(({data}) => {
                    console.log("Fetching Diagnoses.");
                    dispatch(setDiagnoses(data));
                });
            }
        }
    }, [patient, dispatch, diagnoses.length]);
    return (
        <>  
            {
                patient && patient.ssn
                ?
                <>
                    <Header as="h2">
                        {patient.name} 
                        <Icon name={patient.gender === 'male' ? 'man' : patient.gender === 'female' ? 'woman' : 'genderless'} size="big"/> 
                    </Header>
                    <p style={{"fontSize": "16px"}}>
                        ssn: {patient.ssn} <br/>
                        occupation: {patient.occupation} <br/>
                        date of birth: {patient.dateOfBirth} <br/>
                    </p>
                    <Button onClick={() => openModal()}>Add New Entry</Button>
                    <Header as="h3">
                        entries 
                    </Header>
                    {patient.entries?.map(e => <EntryDetails key={e.id} entry={e}/>)}
                    
                    <AddEntryModal 
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                    />
                </>
                :
                <Header>unknown id.</Header>
            }
        </>
    );
};

export default SinglePatient;