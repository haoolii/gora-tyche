import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from 'baseui/header-navigation';
import { StyledLink } from 'baseui/link';
import { Button } from 'baseui/button';
import { useStyletron, styled } from 'baseui';
import { Gora } from '../components';
import { MonoDisplayXSmall } from 'baseui/typography';
import { SnackbarProvider, useSnackbar, DURATION } from 'baseui/snackbar';
import logo from './logo.svg';
import { CommingSoon } from './CommingSoon';
const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  paddingBottom: '32px',
  paddingTop: '32px'
});

const LayerContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
  width: '100%',
  maxWidth: '1480px',
  width: '100%',
  margin: '0 auto',
  overflow: 'hidden'
});

const StyledNavigationListWrapper = styled('div', {
  maxWidth: '1480px',
  display: 'flex',
  width: '100%',
  margin: '0 auto',
  padding: '0 8px'
});

export const Layout = () => {
  const [css, theme] = useStyletron();
  return (
    <Router>
      <HeaderNavigation>
        <StyledNavigationListWrapper>
          <StyledNavigationList $align={ALIGN.left}>
            <StyledNavigationItem>
              <StyledLink $as={Link} to="/">
                <img src={logo} alt="logo" height="40" />
              </StyledLink>
            </StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.center} />
          <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
              <Button $as={Link} to="/comming-soon">
                Coming Soon
              </Button>
            </StyledNavigationItem>
          </StyledNavigationList>
        </StyledNavigationListWrapper>
      </HeaderNavigation>

      <LayerContainer>
        <Switch>
          <Route exact path="/">
            <SnackbarProvider>
              <Gora />
            </SnackbarProvider>
          </Route>
          <Route path="/comming-soon">
            <CommingSoon />
          </Route>
        </Switch>
      </LayerContainer>
    </Router>
  );
};
