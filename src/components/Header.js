import React from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';

const HeaderComponent = ({ channelName }) => (
  <HeaderWrapper>
    <Header textAlign="center">#{channelName}</Header>
  </HeaderWrapper>
);

export default HeaderComponent;

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

