import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { PropTypes } from 'prop-types'

export default class StepProgressBar extends React.Component {
  render() {
    const { progress } = this.props;
    StepProgressBar.propTypes = {
      progress: PropTypes.number.isRequired
    };
    return (
      <ProgressBar
        width='203px'
        height='5px'
        percent={progress}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="50"
              src="step.svg"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="40"
              src="step.svg"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="40"
              src="step.svg"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="40"
              src="step.svg"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 100}%)` }}
              width="50"
              src="step.svg"
            />
          )}
        </Step>
      </ProgressBar>
    );
  }
}