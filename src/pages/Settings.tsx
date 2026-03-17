import React, { useState, useEffect } from 'react';
import {
  PageSection,
  Title,
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
  Grid,
  GridItem,
  Card,
  CardTitle,
  CardBody,
  Alert,
  Popover,
  HelperText,
  HelperTextItem
} from '@patternfly/react-core';
import { HelpIcon, CheckCircleIcon, ExclamationCircleIcon, SpinnerIcon } from '@patternfly/react-icons';

export const defaultConfig = {
  aap: { url: '', token: '' },
  openshift: { url: '', token: '' },
  links: {
    argocd: 'https://argocd.example.com',
    gitlab: 'https://gitlab.example.com',
    devspaces: 'https://devspaces.example.com',
    devhub: 'https://developer-hub.example.com'
  }
};

const Settings = () => {
  const [config, setConfig] = useState(defaultConfig);
  const [isSaved, setIsSaved] = useState(false);
  const [testingStatus, setTestingStatus] = useState({ aap: 'idle', openshift: 'idle' });

  const testConnection = (platform) => {
    setTestingStatus(prev => ({ ...prev, [platform]: 'testing' }));
    
    // Simulate an API connection test delay
    setTimeout(() => {
      // Basic mock test logic (fails if empty)
      const token = platform === 'aap' ? config.aap.token : config.openshift.token;
      if (token.length > 5) {
        setTestingStatus(prev => ({ ...prev, [platform]: 'success' }));
      } else {
        setTestingStatus(prev => ({ ...prev, [platform]: 'error' }));
      }
    }, 1500);
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem('rh-devx-config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleChange = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setIsSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('rh-devx-config', JSON.stringify(config));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <PageSection>
      <Title headingLevel="h1" size="2xl" style={{ marginBottom: '20px' }}>
        Configuration & Integrations
      </Title>

      {isSaved && (
        <Alert variant="success" title="Settings saved successfully!" style={{ marginBottom: '20px' }} />
      )}

      <Form onSubmit={handleSave}>
        <Grid hasGutter>
          <GridItem span={12} md={6}>
            <Card>
              <CardTitle>
                Ansible Automation Platform (AAP)
                <Popover
                  headerContent={<div>AAP API Authentication</div>}
                  bodyContent={<div>To generate an OAuth2 token for AAP, go to your User Profile in the AAP Dashboard, click on "Tokens" and create a new Personal Access Token. <a href="https://docs.ansible.com/automation-controller/latest/html/userguide/users.html#users-tokens" target="_blank" rel="noreferrer">View Documentation</a></div>}
                >
                  <Button variant="plain" aria-label="AAP Help"><HelpIcon /></Button>
                </Popover>
              </CardTitle>
              <CardBody>
                <FormGroup label="AAP API URL" fieldId="aap-url">
                  <TextInput
                    id="aap-url"
                    value={config.aap.url}
                    onChange={(_event, val) => handleChange('aap', 'url', val)}
                    placeholder="https://aap.example.com/api/v2"
                  />
                </FormGroup>
                <br />
                <FormGroup label="AAP Token" fieldId="aap-token">
                  <TextInput
                    id="aap-token"
                    type="password"
                    value={config.aap.token}
                    onChange={(_event, val) => handleChange('aap', 'token', val)}
                  />
                </FormGroup>
                
                <div style={{ marginTop: '15px' }}>
                  <Button variant="secondary" onClick={() => testConnection('aap')} isDisabled={testingStatus.aap === 'testing'}>
                    {testingStatus.aap === 'testing' ? <><SpinnerIcon className="pf-u-mr-sm" /> Testing...</> : 'Test Connection'}
                  </Button>
                  
                  {testingStatus.aap === 'success' && (
                    <HelperText style={{ display: 'inline-block', marginLeft: '10px' }}>
                      <HelperTextItem icon={<CheckCircleIcon />} variant="success">Connection Successful</HelperTextItem>
                    </HelperText>
                  )}
                  {testingStatus.aap === 'error' && (
                    <HelperText style={{ display: 'inline-block', marginLeft: '10px' }}>
                      <HelperTextItem icon={<ExclamationCircleIcon />} variant="error">Connection Failed (Invalid Token)</HelperTextItem>
                    </HelperText>
                  )}
                </div>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={12} md={6}>
            <Card>
              <CardTitle>
                Red Hat OpenShift
                <Popover
                  headerContent={<div>OpenShift API Authentication</div>}
                  bodyContent={<div>To get a bearer token for OpenShift, log into the OpenShift Web Console, click on your username in the top right, and select "Copy login command". Use the token displayed in the `oc login` command output. <a href="https://docs.openshift.com/container-platform/latest/cli_reference/openshift_cli/getting-started-cli.html#cli-getting-started" target="_blank" rel="noreferrer">View Documentation</a></div>}
                >
                  <Button variant="plain" aria-label="OpenShift Help"><HelpIcon /></Button>
                </Popover>
              </CardTitle>
              <CardBody>
                <FormGroup label="OpenShift API URL" fieldId="os-url">
                  <TextInput
                    id="os-url"
                    value={config.openshift.url}
                    onChange={(_event, val) => handleChange('openshift', 'url', val)}
                    placeholder="https://api.cluster.example.com:6443"
                  />
                </FormGroup>
                <br />
                <FormGroup label="OpenShift Token" fieldId="os-token">
                  <TextInput
                    id="os-token"
                    type="password"
                    value={config.openshift.token}
                    onChange={(_event, val) => handleChange('openshift', 'token', val)}
                  />
                </FormGroup>
                
                <div style={{ marginTop: '15px' }}>
                  <Button variant="secondary" onClick={() => testConnection('openshift')} isDisabled={testingStatus.openshift === 'testing'}>
                    {testingStatus.openshift === 'testing' ? <><SpinnerIcon className="pf-u-mr-sm" /> Testing...</> : 'Test Connection'}
                  </Button>
                  
                  {testingStatus.openshift === 'success' && (
                    <HelperText style={{ display: 'inline-block', marginLeft: '10px' }}>
                      <HelperTextItem icon={<CheckCircleIcon />} variant="success">Connection Successful</HelperTextItem>
                    </HelperText>
                  )}
                  {testingStatus.openshift === 'error' && (
                    <HelperText style={{ display: 'inline-block', marginLeft: '10px' }}>
                      <HelperTextItem icon={<ExclamationCircleIcon />} variant="error">Connection Failed (Invalid Token)</HelperTextItem>
                    </HelperText>
                  )}
                </div>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={12}>
            <Card>
              <CardTitle>Quick Links (External Tools)</CardTitle>
              <CardBody>
                <Grid hasGutter>
                  <GridItem span={12} md={6}>
                    <FormGroup label="ArgoCD URL" fieldId="link-argocd">
                      <TextInput
                        id="link-argocd"
                        value={config.links.argocd}
                        onChange={(_event, val) => handleChange('links', 'argocd', val)}
                      />
                    </FormGroup>
                  </GridItem>
                  <GridItem span={12} md={6}>
                    <FormGroup label="GitLab URL" fieldId="link-gitlab">
                      <TextInput
                        id="link-gitlab"
                        value={config.links.gitlab}
                        onChange={(_event, val) => handleChange('links', 'gitlab', val)}
                      />
                    </FormGroup>
                  </GridItem>
                  <GridItem span={12} md={6}>
                    <FormGroup label="Red Hat DevSpaces URL" fieldId="link-devspaces">
                      <TextInput
                        id="link-devspaces"
                        value={config.links.devspaces}
                        onChange={(_event, val) => handleChange('links', 'devspaces', val)}
                      />
                    </FormGroup>
                  </GridItem>
                  <GridItem span={12} md={6}>
                    <FormGroup label="Red Hat Developer Hub URL" fieldId="link-devhub">
                      <TextInput
                        id="link-devhub"
                        value={config.links.devhub}
                        onChange={(_event, val) => handleChange('links', 'devhub', val)}
                      />
                    </FormGroup>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <ActionGroup style={{ marginTop: '20px' }}>
          <Button variant="primary" type="submit">Save Configurations</Button>
        </ActionGroup>
      </Form>
    </PageSection>
  );
};

export default Settings;
