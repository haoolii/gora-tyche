import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";
import { useStyletron, styled } from 'baseui';
import { Gora } from '../components'
import { MonoDisplayXSmall } from 'baseui/typography';

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
})

export const Layout = () => {
  const [css, theme] = useStyletron();
  return (
    <Router>
        <HeaderNavigation>
          <div className={css({
            maxWidth: '1480px',
            display: 'flex',
            width: '100%',
            margin: '0 auto'
          })}>
            <StyledNavigationList $align={ALIGN.left}>
              <StyledNavigationItem>
                <StyledLink $as={Link} to="/">Gora</StyledLink>  
              </StyledNavigationItem>
            </StyledNavigationList>
            <StyledNavigationList $align={ALIGN.center} />
            <StyledNavigationList $align={ALIGN.right}>
              <StyledNavigationItem>
              <StyledLink $as={Link} to="/about">About</StyledLink>
              </StyledNavigationItem>
            </StyledNavigationList>
            <StyledNavigationList $align={ALIGN.right}>
              <StyledNavigationItem>
                <Button>Contact Us</Button>
              </StyledNavigationItem>
            </StyledNavigationList>
          </div>
      </HeaderNavigation>

      <LayerContainer>
        <Switch>
            <Route exact path="/">
              <Gora />
            </Route>
            <Route path="/about">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <MonoDisplayXSmall marginBottom="scale800">
                  Gora is a Gantt chart for business.
                </MonoDisplayXSmall>
                <MonoDisplayXSmall marginBottom="scale800">
                  Easy and fast to generate the Gantt chart!!
                </MonoDisplayXSmall>
                <MonoDisplayXSmall marginBottom="scale800">
                  Easy attract customers attention!!
                </MonoDisplayXSmall>
              </div>
            </Route>
            <Route path="/dashboard">
            <h1>Dashboard</h1>
            </Route>
        </Switch>
      </LayerContainer>

    </Router>
  )
}
