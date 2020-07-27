import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../Component/Form/Validation';
import FormInput from '../../../Component/Form/FormInput';
import {
  mobile,
  captialize,
  age
} from '../../../Component/Form/Normalize';
import {
  Button,
  Form,
  Card,
  Col,
  FormGroup
} from 'react-bootstrap';
import { ChevronRight} from 'react-bootstrap-icons';


const GeneralForm = (props) => {
  const { handleSubmit } = props;
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Col sm="12">
        <Card className="card-border">
          <Card.Body>
          <Field
              name="name"
              type="text"
              component={FormInput}
              label="Name *"
              inputPlaceHolder="Enter Name"
              normalize={captialize}
            />
          </Card.Body>
          <div style={{ paddingBottom: 30 }}>
            <Button color="primary" className="float-right" type="submit" style={{marginRight: '20px'}}>
               Next <ChevronRight />
            </Button>
          </div>
        </Card>
      </Col>
    </Form>
  );
};

GeneralForm.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'wizardForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(GeneralForm);
