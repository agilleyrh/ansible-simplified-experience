import React from 'react';
import {
  PageSection,
  Title,
  Grid,
  GridItem,
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
  Icon
} from '@patternfly/react-core';
import { InfoCircleIcon, ExternalLinkAltIcon, CodeBranchIcon, CubesIcon, CogsIcon, ServerIcon, CatalogIcon } from '@patternfly/react-icons';

const Workflow = () => {
  return (
    <PageSection>
      <Title headingLevel="h1" size="2xl" style={{ marginBottom: '20px' }}>
        Developer Workflow Optimization & Integrations
      </Title>

      <Grid hasGutter>
        <GridItem span={12}>
          <Card>
            <CardTitle>The Integrated Red Hat Developer Workflow</CardTitle>
            <CardBody>
              <Grid hasGutter md={4}>
                <GridItem>
                  <Title headingLevel="h3" size="lg" style={{ marginBottom: '10px' }}><Icon status="info"><InfoCircleIcon /></Icon> Code to Deployment</Title>
                  <p>Commit your code to <strong>GitLab</strong>. Configure a webhook to automatically trigger an <strong>ArgoCD</strong> sync, which will deploy the updated containers to <strong>OpenShift</strong>. Use <strong>Ansible Automation Platform</strong> to handle any required infrastructure setup or out-of-band notifications during the pipeline.</p>
                </GridItem>
                <GridItem>
                  <Title headingLevel="h3" size="lg" style={{ marginBottom: '10px' }}><Icon status="info"><InfoCircleIcon /></Icon> Environment Provisioning</Title>
                  <p>Need to start coding quickly? Use <strong>Red Hat DevSpaces</strong> for a containerized, browser-based development environment that accurately mirrors your OpenShift production cluster, completely pre-configured with all required dependencies.</p>
                </GridItem>
                <GridItem>
                  <Title headingLevel="h3" size="lg" style={{ marginBottom: '10px' }}><Icon status="info"><InfoCircleIcon /></Icon> Discoverability</Title>
                  <p>Register all your microservices, APIs, and software templates in <strong>Red Hat Developer Hub</strong>. This single pane of glass prevents duplicated effort and allows new developers to self-service scaffold new repositories with best practices baked in.</p>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Title headingLevel="h2" size="xl" style={{ marginTop: '20px', marginBottom: '10px' }}>Tool Setup & Integration Guides</Title>
        </GridItem>

        {/* GitLab Integrations */}
        <GridItem span={12} md={6}>
          <Card isFullHeight>
            <CardTitle><Icon style={{ marginRight: '10px' }}><CodeBranchIcon /></Icon> GitLab Configuration</CardTitle>
            <CardBody>
              Learn how to configure GitLab webhooks to notify ArgoCD of repository changes, automating the GitOps synchronization process. You can also configure CI/CD pipelines to trigger Ansible jobs.
            </CardBody>
            <CardFooter>
              <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" component="a" href="https://docs.gitlab.com/ee/user/project/integrations/webhooks.html" target="_blank" rel="noopener noreferrer">
                GitLab Webhook Docs
              </Button>
            </CardFooter>
          </Card>
        </GridItem>

        {/* ArgoCD Integrations */}
        <GridItem span={12} md={6}>
          <Card isFullHeight>
            <CardTitle><Icon style={{ marginRight: '10px' }}><CubesIcon /></Icon> ArgoCD GitOps Setup</CardTitle>
            <CardBody>
              Connect ArgoCD to your OpenShift cluster and configure it to watch your GitLab repositories. This ensures that your cluster state always matches your declarative Git configuration.
            </CardBody>
            <CardFooter>
              <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" component="a" href="https://argo-cd.readthedocs.io/en/stable/getting_started/" target="_blank" rel="noopener noreferrer">
                ArgoCD Getting Started
              </Button>
            </CardFooter>
          </Card>
        </GridItem>

        {/* AAP Integrations */}
        <GridItem span={12} md={6}>
          <Card isFullHeight>
            <CardTitle><Icon style={{ marginRight: '10px' }}><CogsIcon /></Icon> Ansible Automation Platform (AAP)</CardTitle>
            <CardBody>
              Integrate AAP with GitLab CI pipelines to automate infrastructure provisioning, patch management, and networking configurations alongside your application deployments.
            </CardBody>
            <CardFooter>
              <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" component="a" href="https://docs.ansible.com/automation-controller/latest/html/userguide/webhooks.html" target="_blank" rel="noopener noreferrer">
                AAP Webhook Integration
              </Button>
            </CardFooter>
          </Card>
        </GridItem>

        {/* DevSpaces Integrations */}
        <GridItem span={12} md={6}>
          <Card isFullHeight>
            <CardTitle><Icon style={{ marginRight: '10px' }}><ServerIcon /></Icon> Red Hat DevSpaces</CardTitle>
            <CardBody>
              Create a `devfile.yaml` in your GitLab repository to define the exact container image, tools, and commands needed. Developers can then click a single link in GitLab to open a fully configured workspace in DevSpaces.
            </CardBody>
            <CardFooter>
              <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" component="a" href="https://access.redhat.com/documentation/en-us/red_hat_openshift_dev_spaces/3.15/html/user_guide/devfile-authoring" target="_blank" rel="noopener noreferrer">
                Devfile Authoring Guide
              </Button>
            </CardFooter>
          </Card>
        </GridItem>

        {/* Developer Hub Integrations */}
        <GridItem span={12}>
          <Card>
            <CardTitle> Red Hat Developer Hub (Backstage)</CardTitle>
            <CardBody>
              Use Developer Hub to bring all these tools together. Register your GitLab repos, ArgoCD deployments, and OpenShift clusters using catalog-info.yaml files to display a unified view of a service's health, CI/CD status, and API documentation.
            </CardBody>
            <CardFooter>
              <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" component="a" href="https://access.redhat.com/documentation/en-us/red_hat_developer_hub/1.1/html/getting_started/index" target="_blank" rel="noopener noreferrer">
                RHDH Getting Started
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
    </PageSection>
  );
};

export default Workflow;
