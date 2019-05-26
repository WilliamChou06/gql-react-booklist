import styled from 'styled-components';
import { Button } from 'antd';
import { animated } from 'react-spring/renderprops';

export const StyledButton = styled(Button)`
  margin-left: 6px;
`

export const StyledEditBookWrapper = styled(animated.div)`
  height: 100vh;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledSpinnerWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`