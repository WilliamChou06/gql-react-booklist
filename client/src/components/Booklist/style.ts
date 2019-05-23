import styled from 'styled-components';

export const StyledBooklistContainer = styled.div`
  flex: 2;
  padding: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  padding: 18px;
  margin: 12px 6px 12px 12px;

  @media (max-width: 960px) {
    padding: 0;
    box-shadow: none;
    margin: 0
  }
`