import React, { Component, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Stepper from 'react-stepper-horizontal';
import * as Yup from "yup";
import FormInput from '../../../Component/Form/FormInput';
import { Button } from 'react-bootstrap';
//import { Debug } from './Debug';
import API from '../../../ServiceApi/Index'
import { isLogin } from '../../../Utils'

//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Wizard = ({ children, initialValues, onSubmit }) => {

  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = values => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = values => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {formik => (
        <Form>
          <h2>Form Pendaftaran</h2>
          <p className="text-center lead">
            Langkah {stepNumber + 1} dari {totalSteps}
          </p>
          {step}
          <div style={{ display: "flex" }}>
            {stepNumber > 0 && (

              <Button onClick={() => previous(formik.values)} color="primary" className="float-right" type="submit" style={{marginRight: '10px'}}>
              Kembali 
              </Button>
            )}
            <div>
            <Button disabled={formik.isSubmitting} color="primary" className="float-right" type="submit">
              {isLastStep ? "Simpan" : "Selanjutnya"} 
            </Button>
            </div>
          </div>
         
        </Form>
      )}
    </Formik>
  );
};


const WizardStep = ({ children }) => children;

const daftar = () => (
  <div>
    
    <Wizard
      initialValues={{
        email: "",
        firstName: "",
        lastName: ""
      }}
      onSubmit={ values =>
       console.log(values)
      }
    >
      <WizardStep
        //onSubmit={() => console.log("Step1 onSubmit")}
        validationSchema={Yup.object({
          firstName: Yup.string().required("required"),
          lastName: Yup.string().required("required")
        })}
      >
        <div>
          
          <Field
            component={FormInput}
            autoComplete="given-name"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            type="text"
            label="First Name"
          />
         
        </div>
        <div>
         
          <Field
            autoComplete="family-name"
            component={FormInput}
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            type="text"
            label="Last Name"
          />
    
        </div>
      </WizardStep>
      <WizardStep
        //onSubmit={() => console.log("Step2 onSubmit")}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("required")
        })}
      >
        <div>

          <Field
            autoComplete="email"
            component={FormInput}
            id="email"
            name="email"
            placeholder="Email"
            type="text"
            label="Email"
          />
         
        </div>
      </WizardStep>
    </Wizard>
  </div>
);

export default daftar;