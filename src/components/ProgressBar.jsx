import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { PropTypes } from 'prop-types'
import useWindowSize from 'react-use/lib/useWindowSize'

export default function StepProgressBar({ progress }) {
  StepProgressBar.propTypes = {
    progress: PropTypes.number.isRequired
  };
  const { width } = useWindowSize();
  return (
    <ProgressBar
      id='progress-bar'
      width={width >= 865 ? '380px' :'203px'}
      height={width >= 865 ? '8px' :'5'}
      percent={progress}
      unfilledBackground="#8da656"
      filledBackground="linear-gradient(to right, #9FE870, #65CF21)"
    >
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            width={width >= 865 ? '70' :'50'}
            src="step.svg"
          />
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 100}%)` }}
            width={width >= 865 ? '60' :'40'}
            src="step.svg"
          />
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 100}%)` }}
            width={width >= 865 ? '60' :'40'}
            src="step.svg"
          />
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 100}%)` }}
            width={width >= 865 ? '60' :'40'}
            src="step.svg"
          />
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ marginTop: '5px', filter: `grayscale(${accomplished ? 0 : 100}%)` }}
            width={width >= 865 ? '70' :'50'}
            src="step.svg"
          />
        )}
      </Step>
    </ProgressBar>
  );
}
