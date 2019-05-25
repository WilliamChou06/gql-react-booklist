import styled from 'styled-components';
import { animated } from 'react-spring/renderprops';

export const UserInputWrapper = styled(animated.div)`
  flex: 1;
  padding: 12px;

  @media (max-width: 960px) {
    div {
      box-shadow: none;
    }
  }
`