import styled, { keyframes } from 'styled-components';

const spinnerAnimation = keyframes`
  100% {
		transform: rotate(360deg);
	}
`;

const spinnerAnimationMoz = keyframes`
  100% {
		-moz-transform: rotate(360deg);
	}
`;

export const StyledSpinnerContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 25vh;
  flex: 1
`;

export const StyledSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgb(204, 204, 204);
  border-left-color: rgb(0, 0, 0);
  border-radius: 974px;
  -o-border-radius: 974px;
  -ms-border-radius: 974px;
  -webkit-border-radius: 974px;
  -moz-border-radius: 974px;
  margin: -24px 0 0 -24px;
  height: 49px;
  width: 49px;
  animation: ${spinnerAnimation} 1150ms linear infinite;
  -moz-animation: ${spinnerAnimationMoz} 1150ms linear infinite;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid rgb(204, 204, 204);
    border-left-color: rgb(0, 0, 0);
    border-radius: 974px;
    -o-border-radius: 974px;
    -ms-border-radius: 974px;
    -webkit-border-radius: 974px;
    -moz-border-radius: 974px;
  }

  &::before {
    content: '';
    margin: -22px 0 0 -22px;
    height: 43px;
    width: 43px;
    animation: ${spinnerAnimation} 1150ms linear infinite;
    -moz-animation: ${spinnerAnimationMoz} 1150ms linear infinite;
  }

  &::after {
    content: '';
    margin: -28px 0 0 -28px;
    height: 55px;
    width: 55px;
    animation: ${spinnerAnimation} 2300ms linear infinite;
    -moz-animation: ${spinnerAnimationMoz} 2300ms linear infinite;
  }
`;
