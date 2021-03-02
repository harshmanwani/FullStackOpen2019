import React from 'react';
import { Field, FieldProps, ErrorMessage, FormikProps } from "formik";
import { Form, Dropdown, DropdownProps } from 'semantic-ui-react';
import { EntryType, HealthCheckRating, Diagnosis } from '../types';

export type EntryTypeOption = {
    value: EntryType;
    label: string;
};

export type HealthCheckRatingOption = {
    value: HealthCheckRating;
    label: string;
};

type SelectFieldProps = {
    name: string;
    label: string;
    options: Array<EntryTypeOption | HealthCheckRatingOption>;
};

export const SelectField: React.FC<SelectFieldProps> = ({
    name,
    label,
    options
  }: SelectFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );

  interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
  }
  
  export const TextField: React.FC<TextProps> = ({
    field,
    label,
    placeholder
  }) => (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );

  interface CheckBoxProps extends FieldProps {
    label: string;
  }

  export const CheckBoxField: React.FC<CheckBoxProps> = ({
    field,
    label
  }) => {
    console.log(field);
    return (
    <Form.Field>
      <label>{label}</label>
      <Field  {...field} type="checkbox"/>
      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>);
  };


  export const DiagnosisSelection = ({
    diagnoses,
    setFieldValue,
    setFieldTouched
  }: {
    diagnoses: Diagnosis[];
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
    setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
  }) => {
    const field = "diagnosisCodes";
    const onChange = (
      _event: React.SyntheticEvent<HTMLElement, Event>,
      data: DropdownProps
    ) => {
      setFieldTouched(field, true);
      setFieldValue(field, data.value);
    };
  
    const stateOptions = diagnoses.map(diagnosis => ({
      key: diagnosis.code,
      text: `${diagnosis.name} (${diagnosis.code})`,
      value: diagnosis.code
    }));
  
    return (
      <Form.Field>
        <label>Diagnoses</label>
        <Dropdown
          fluid
          multiple
          search
          selection
          options={stateOptions}
          onChange={onChange}
        />
        <ErrorMessage name={field} />
      </Form.Field>
    );
  };

  interface NumberProps extends FieldProps {
    label: string;
    errorMessage?: string;
    min: number;
    max: number;
  }
  
  export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
    <Form.Field>
      <label>{label}</label>
      <Field {...field} type='number' min={min} max={max} />
  
      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );
  