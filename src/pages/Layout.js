import React from 'react'
import {
  BrowserRouter as Router,
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
  minHeight: 'calc(100vh - 124px)'
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
                <h1>About</h1>
              </Route>
              <Route path="/dashboard">
              <h1>Dashboard</h1>
              </Route>
          </Switch>
        </LayerContainer>

    </Router>
  )
}
