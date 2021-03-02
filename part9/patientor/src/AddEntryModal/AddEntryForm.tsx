import { Form, Formik, Field, isString } from 'formik';
import { Button, Grid, Form as FormSemantic } from 'semantic-ui-react';
import React from 'react';
import { useStateValue } from '../state';
import {EntryType, HealthCheckRating, NewEntry} from '../types';
import { EntryTypeOption, HealthCheckRatingOption, SelectField, TextField, DiagnosisSelection } from './FormField';



interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const entryTypeOptions: EntryTypeOption[] = [
    {value: EntryType.HealthCheck, label: 'Health Check'},
    {value: EntryType.Hospital, label: 'Hospital'},
    {value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare'}
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
    {value: HealthCheckRating.Healthy, label: 'Healthy'},
    {value: HealthCheckRating.LowRisk, label: 'Low Risk'},
    {value: HealthCheckRating.HighRisk, label: 'High Risk'},
    {value: HealthCheckRating.CriticalRisk, label: 'Critical Risk'}
];

const validateDate = (value: string) => {
    let error;
    if(!isDate(value)) {
        error = 'Date must be specified and of format YYYY-MM-DD';
    }

    return error;
};

const validateText = (value: string) => {
    let error;
    if(!value || !isString(value)) {
        error = 'Field must be specified';
    }
    
    return error;
};


const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const AdditionalFields: React.FC<{type: EntryType}> = ({type}) => {
    const [prescribeSickLeave, setPrescribeSickLeave] = React.useState<boolean>(false);
    switch(type){
        case EntryType.HealthCheck:
            return (
                <>
                    <SelectField 
                        label="Health Rating *"
                        name="healthCheckRating"
                        options={healthCheckRatingOptions}
                    />
                </>
            );
        case EntryType.Hospital:
            return (
                <>
                    <Field 
                        label="Discharged at *"
                        name="discharge.date"
                        placeholder="YYYY-MM-DD"
                        component={TextField}
                        validate={validateDate}
                    />
                    <Field 
                        label="Criteria *"
                        name="discharge.criteria"
                        placeholder="Criteria"
                        component={TextField}
                        validate={validateText}
                    />
                </>
            );
        case EntryType.OccupationalHealthcare:
            return (
                <>
                    <Field 
                        label="Employer Name *"
                        name="employerName"
                        placeholder="Employer Name"
                        component={TextField}
                        validate={(value: string) => value ? null : 'Field must be specified.'}
                    />
                    <FormSemantic.Field>
                        <label>Prescribe sick leave?</label>
                        <input type="checkbox" onClick={() => {setPrescribeSickLeave(!prescribeSickLeave);}}/>
                    </FormSemantic.Field>
                    {
                        prescribeSickLeave
                        ?
                        <>
                            <Field
                                label="From *"
                                name="sickLeave.startDate"
                                placeholder="YYYY-MM-DD"
                                component={TextField}
                                validate={validateDate}
                            />
                            <Field
                                label="Till *"
                                name="sickLeave.endDate"
                                placeholder="YYYY-MM-DD"
                                component={TextField}
                                validate={validateDate}
                            />
                        </>
                        :
                        null
                    }
                    
                </>
            );
        default:
            return assertNever(type);
    }
};

export const AddEntryForm: React.FC<Props> = ({onSubmit, onCancel}) => {
    const [{diagnoses}] = useStateValue();

    return (
    <Formik
        initialValues={{
            type: EntryType.HealthCheck,
            date: "",
            description: "",
            specialist: "",
            healthCheckRating: HealthCheckRating.Healthy,
            sickLeave: {
                startDate: "",
                endDate: ""
            },
            diagnosisCodes: [],
            employerName: "",
            discharge: {
                date: "",
                criteria: ""
            }

        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field must be specified.";
            const errors: { [field: string]: string } = {};
            if(!values.description) {
                errors.description = requiredError;
            }
            if(!values.specialist) {
                errors.specialist = requiredError;
            }
            if(!isDate(values.date)) {
                errors.date = "Date must be specified and of format YYYY-MM-DD";
            }
            return errors;
        }}
    > 
        {({ values, setFieldValue, setFieldTouched, dirty, isValid }) => {
            return(
                <Form className="form ui">
                    <SelectField 
                        label="Entry Type *"
                        name="type"
                        options={entryTypeOptions}
                    />
                    <Field 
                        label="Date *"
                        name="date"
                        placeholder="YYYY-MM-DD"
                        component={TextField}
                    />
                    <Field
                        label="Description *"
                        name="description"
                        placeholder="Description"
                        component={TextField}
                    />
                    <Field 
                        label="Specialist *"
                        name="specialist"
                        placeholder="Specialist"
                        component={TextField}
                    />
                    <DiagnosisSelection
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        diagnoses={Object.values(diagnoses)}
                    />
                    <AdditionalFields type={values.type}/>
                    <Grid>
                        <Grid.Column floated="left" width={5}>
                            <Button type="button" onClick={onCancel} color="red">
                            Cancel
                            </Button>
                        </Grid.Column>
                        <Grid.Column floated="right" width={5}>
                            <Button
                            type="submit"
                            floated="right"
                            color="green"
                            disabled={!dirty || !isValid}
                            >
                            Add
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Form>
                
            );
        }}
    </Formik>);
};
