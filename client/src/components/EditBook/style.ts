import styled from 'styled-components';
import { Typography } from 'antd';
import { animated } from 'react-spring/renderprops';

// antd import
import Button from 'antd/lib/button';

export const StyledButton = styled(Button)`
  margin-left: 6px;
`;

export const StyledEditBookWrapper = styled(animated.div)`
  height: 100vh;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledEditBookContainer = styled.div`
  min-width: 36vw;
  max-width: 36vw;

  @media (max-width: 960px) {
    min-width: 60vw;
    max-width: 90vw;
  }
`;

export const StyledSpinnerWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EditingTitle = styled(Typography.Title)`
  word-break: break-all;
`;
