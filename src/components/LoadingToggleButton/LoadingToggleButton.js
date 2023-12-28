import React from 'react';
import styled from 'styled-components';
import ToggleButtonWrapper from '../ToggleButtonWrapper';

function LoadingToggleButton({ ...delegated }) {
  return <Wrapper {...delegated} />;
}

const Wrapper = styled(ToggleButtonWrapper)`
  min-width: 75px;
  min-height: 31px;
  border-color: transparent;
  background-color: var(--colour-button-loading);
  cursor: auto;
`

export default LoadingToggleButton;
