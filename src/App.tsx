import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Page,
  PageSidebar,
  PageSidebarBody,
  PageSection,
  PageSectionVariants,
  Nav,
  NavList,
  NavItem,
  Brand,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent
} from '@patternfly/react-core';

// We'll create these components next
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ConvertToAnsible from './pages/ConvertToAnsible';
import Workflow from './pages/Workflow';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const location = useLocation();

  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand onClick={onNavToggle} style={{ cursor: 'pointer' }}>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>Red Hat Ansible Developer/Administrator Portal</span>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <span style={{ color: 'white', marginLeft: 'auto' }}>Welcome, Developer</span>
      </MastheadContent>
    </Masthead>
  );

  const Navigation = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        <NavItem itemId={0} isActive={location.pathname === '/'}>
          <Link to="/">Dashboard</Link>
        </NavItem>
        <NavItem itemId={1} isActive={location.pathname === '/settings'}>
          <Link to="/settings">Settings & Integrations</Link>
        </NavItem>
        <NavItem itemId={2} isActive={location.pathname === '/workflow'}>
          <Link to="/workflow">Developer Workflow</Link>
        </NavItem>
        <NavItem itemId={3} isActive={location.pathname === '/convert'}>
          <Link to="/convert">Convert to Ansible</Link>
        </NavItem>
      </NavList>
    </Nav>
  );

  const sidebar = (
    <PageSidebar isSidebarOpen={isNavOpen} theme="dark">
      <PageSidebarBody>
        {Navigation}
      </PageSidebarBody>
    </PageSidebar>
  );

  return (
    <Page masthead={masthead} sidebar={sidebar}>
      {children}
    </Page>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/convert" element={<ConvertToAnsible />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
