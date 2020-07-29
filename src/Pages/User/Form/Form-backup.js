import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stepper from 'react-stepper-horizontal';
import { Card } from 'react-bootstrap';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

class Form extends Component {

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 0,
      steps: [
        {title: 'Data Diri'},
        {title: 'Data Alamat'},
        {title: 'Data Alamat Orang Tua'},
        {title: 'Data Sekolah Asal'},
        {title: 'Data Program Studi'},
      ]
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page, steps } = this.state;

    return (
      <>
        <Stepper steps={ steps } activeStep={ page } />
       <div className="mt-3">
        {page === 0 && <Step1 onSubmit={this.nextPage} />}
        {page === 1 && (
          <Step2
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 2 && (
          <Step3
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <Step4
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 4 && (
          <Step5
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </div>
      </>
    );
  }

}

Form.propTypes = {
  onSubmit: PropTypes.func
};

export default Form;
