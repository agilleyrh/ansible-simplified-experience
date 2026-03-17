import React, { useEffect, useState, useCallback } from 'react';
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
  Flex,
  FlexItem,
  Label,
  Select,
  SelectList,
  SelectOption,
  MenuToggle,
  Divider,
  Icon
} from '@patternfly/react-core';
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartThemeColor,
  ChartDonut,
  ChartVoronoiContainer,
  ChartBar
} from '@patternfly/react-charts/victory';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { ExternalLinkAltIcon, CheckCircleIcon, ExclamationCircleIcon, SyncAltIcon, InfoCircleIcon } from '@patternfly/react-icons';
import { defaultConfig } from './Settings';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'successful': return <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />;
    case 'failed': return <ExclamationCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--danger--default)' }} />;
    default: return <InfoCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--info--default)' }} />;
  }
};

const QuickLinkCard = ({ title, url, description }: { title: string, url: string, description: string }) => (
  <Card isClickable isSelectable>
    <CardTitle>{title}</CardTitle>
    <CardBody>{description}</CardBody>
    <CardFooter>
      <Button 
        variant="link" 
        icon={<ExternalLinkAltIcon />} 
        iconPosition="right"
        component="a" 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Open {title}
      </Button>
    </CardFooter>
  </Card>
);

// Expanded Mock data for AAP Metrics
const aapJobStatusData = [
  { x: 'Successful', y: 420 },
  { x: 'Failed', y: 35 },
  { x: 'Canceled', y: 15 },
  { x: 'Running', y: 10 }
];

const aapHostData = [
  { name: 'Hosts', x: 'Total Managed', y: 1250 },
  { name: 'Hosts', x: 'Unreachable', y: 12 },
  { name: 'Hosts', x: 'Failed', y: 45 }
];

const recentJobs = [
  { id: '10042', name: 'Deploy Web Servers', status: 'successful', time: '2 mins ago' },
  { id: '10041', name: 'Patch Database Cluster', status: 'successful', time: '15 mins ago' },
  { id: '10040', name: 'Restart Node-01', status: 'failed', time: '1 hour ago' },
  { id: '10039', name: 'Sync AD Users', status: 'successful', time: '3 hours ago' },
];

// Expanded Mock data for OpenShift Metrics
const osCpuData = [
  { name: 'CPU Usage', x: '10:00', y: 45 },
  { name: 'CPU Usage', x: '10:05', y: 50 },
  { name: 'CPU Usage', x: '10:10', y: 55 },
  { name: 'CPU Usage', x: '10:15', y: 40 },
  { name: 'CPU Usage', x: '10:20', y: 60 },
  { name: 'CPU Usage', x: '10:25', y: 65 }
];

const osMemData = [
  { name: 'Memory Usage', x: '10:00', y: 60 },
  { name: 'Memory Usage', x: '10:05', y: 62 },
  { name: 'Memory Usage', x: '10:10', y: 65 },
  { name: 'Memory Usage', x: '10:15', y: 64 },
  { name: 'Memory Usage', x: '10:20', y: 70 },
  { name: 'Memory Usage', x: '10:25', y: 72 }
];

const osNetworkData = [
  { name: 'Network In', x: '10:00', y: 10 },
  { name: 'Network In', x: '10:05', y: 15 },
  { name: 'Network In', x: '10:10', y: 25 },
  { name: 'Network In', x: '10:15', y: 20 },
  { name: 'Network In', x: '10:20', y: 35 },
  { name: 'Network In', x: '10:25', y: 30 }
];

const osPodStatus = [
  { x: 'Running', y: 1450 },
  { x: 'Pending', y: 20 },
  { x: 'Failed', y: 5 },
  { x: 'Succeeded', y: 120 }
];

const Dashboard = () => {
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('rh-devx-config');
    return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
  });
  const [isIntervalSelectOpen, setIsIntervalSelectOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30s default
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(() => {
    setIsRefreshing(true);
    // Simulate API calls
    setTimeout(() => {
      setLastRefreshed(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 800);
  }, []);

  // Set up auto-refresh
  useEffect(() => {
    if (refreshInterval > 0) {
      const intervalId = setInterval(fetchData, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [refreshInterval, fetchData]);



  return (
    <PageSection>
      <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: '20px' }}>
        <FlexItem>
          <Title headingLevel="h1" size="2xl">
            Developer Experience Dashboard
          </Title>
        </FlexItem>
        <FlexItem>
          <Flex alignItems={{ default: 'alignItemsCenter' }}>
            <FlexItem>
              <Label color={isRefreshing ? "blue" : "grey"} icon={<SyncAltIcon className={isRefreshing ? "fa-spin" : ""} />}>
                Last Refreshed: {lastRefreshed}
              </Label>
            </FlexItem>
            <FlexItem>
              <Select
                id="refresh-interval-select"
                isOpen={isIntervalSelectOpen}
                selected={refreshInterval}
                onSelect={(_e, value) => {
                  setRefreshInterval(Number(value));
                  setIsIntervalSelectOpen(false);
                }}
                onOpenChange={(isOpen) => setIsIntervalSelectOpen(isOpen)}
                toggle={(toggleRef) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => setIsIntervalSelectOpen(!isIntervalSelectOpen)}
                    isExpanded={isIntervalSelectOpen}
                  >
                    Refresh: {refreshInterval === 0 ? 'Off' : `${refreshInterval / 1000}s`}
                  </MenuToggle>
                )}
              >
                <SelectList>
                  <SelectOption value={0}>Off</SelectOption>
                  <SelectOption value={15000}>15 Seconds</SelectOption>
                  <SelectOption value={30000}>30 Seconds</SelectOption>
                  <SelectOption value={60000}>1 Minute</SelectOption>
                  <SelectOption value={300000}>5 Minutes</SelectOption>
                </SelectList>
              </Select>
            </FlexItem>
            <FlexItem>
              <Button variant="secondary" icon={<SyncAltIcon />} onClick={fetchData} isLoading={isRefreshing}>Refresh Now</Button>
            </FlexItem>
            <FlexItem>
              {!config.aap.token && !config.openshift.token ? (
                <Label color="orange" icon={<ExclamationCircleIcon />}>Showing Mock Data (Configure APIs in Settings)</Label>
              ) : (
                <Label color="green" icon={<CheckCircleIcon />}>Live Data Connected</Label>
              )}
            </FlexItem>
          </Flex>
        </FlexItem>
      </Flex>

      <Grid hasGutter>
        {/* Quick Links Section */}
        <GridItem span={12}>
          <Title headingLevel="h2" size="xl" style={{ marginBottom: '10px' }}>Quick Access Tools</Title>
          <Grid hasGutter>
            <GridItem span={12} sm={6} md={3}>
              <QuickLinkCard title="Red Hat Developer Hub" url={config.links.devhub} description="Internal Developer Portal and Software Catalog" />
            </GridItem>
            <GridItem span={12} sm={6} md={3}>
              <QuickLinkCard title="Red Hat DevSpaces" url={config.links.devspaces} description="Cloud-native development environments" />
            </GridItem>
            <GridItem span={12} sm={6} md={3}>
              <QuickLinkCard title="GitLab" url={config.links.gitlab} description="Source code management and CI/CD pipelines" />
            </GridItem>
            <GridItem span={12} sm={6} md={3}>
              <QuickLinkCard title="ArgoCD" url={config.links.argocd} description="Declarative GitOps continuous delivery tool" />
            </GridItem>
          </Grid>
        </GridItem>

        {/* AAP Metrics Section */}
        <GridItem span={12}>
          <Title headingLevel="h2" size="xl" style={{ margin: '20px 0 10px 0' }}>Ansible Automation Platform</Title>
          <Grid hasGutter>
            <GridItem span={12} md={4}>
              <Card style={{ height: '100%' }}>
                <CardTitle>Job Run Status (24h)</CardTitle>
                <CardBody>
                  <div style={{ height: '250px', width: '100%' }}>
                    <ChartDonut themeColor={ChartThemeColor.multiOrdered} themeVariant="dark" ariaDesc="AAP Job Status" ariaTitle="AAP Jobs" constrainToVisibleArea data={aapJobStatusData} labels={({ datum }) => `${datum.x}: ${datum.y}`} padding={{ bottom: 20, left: 20, right: 20, top: 20 }} subTitle="Total Jobs" title="480" width={400} />
                  </div>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem span={12} md={4}>
              <Card style={{ height: '100%' }}>
                <CardTitle>Host Inventory Health</CardTitle>
                <CardBody>
                  <div style={{ height: '250px', width: '100%' }}>
                    <Chart themeColor={ChartThemeColor.blue} themeVariant="dark" ariaDesc="Host status" ariaTitle="Hosts" domainPadding={{ x: [30, 25] }} height={250} padding={{ bottom: 50, left: 50, right: 20, top: 20 }} width={400}>
                      <ChartAxis />
                      <ChartAxis dependentAxis showGrid />
                      <ChartBar data={aapHostData} labels={({ datum }) => datum.y} />
                    </Chart>
                  </div>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem span={12} md={4}>
              <Card style={{ height: '100%' }}>
                <CardTitle>Recent Job Runs</CardTitle>
                <CardBody style={{ padding: 0 }}>
                  <Table aria-label="Recent AAP Jobs">
                    <Thead>
                      <Tr>
                        <Th>Status</Th>
                        <Th>Job Name</Th>
                        <Th>Time</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {recentJobs.map(job => (
                        <Tr key={job.id}>
                          <Td>{getStatusIcon(job.status)}</Td>
                          <Td><a href={`#job-${job.id}`}>{job.name}</a></Td>
                          <Td>{job.time}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <Button variant="link" isInline>View All Jobs</Button>
                </CardFooter>
              </Card>
            </GridItem>
          </Grid>
        </GridItem>

        {/* OpenShift Metrics Section */}
        <GridItem span={12}>
          <Title headingLevel="h2" size="xl" style={{ margin: '20px 0 10px 0' }}>OpenShift Cluster Performance</Title>
          <Grid hasGutter>
            <GridItem span={12} md={8}>
              <Card style={{ height: '100%' }}>
                <CardTitle>Cluster Resource Usage</CardTitle>
                <CardBody>
                  <div style={{ height: '300px', width: '100%' }}>
                    <Chart
                      themeColor={ChartThemeColor.blue}
                      themeVariant="dark"
                      ariaDesc="OpenShift Cluster CPU, Memory, and Network Usage"
                      ariaTitle="OpenShift Performance"
                      containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}%`} constrainToVisibleArea />}
                      legendData={[{ name: 'CPU Usage' }, { name: 'Memory Usage' }, { name: 'Network Activity' }]}
                      legendOrientation="horizontal"
                      legendPosition="bottom"
                      height={275}
                      width={800}
                      padding={{ bottom: 50, left: 50, right: 20, top: 20 }}
                      maxDomain={{y: 100}}
                      minDomain={{y: 0}}
                    >
                      <ChartAxis />
                      <ChartAxis dependentAxis showGrid tickValues={[0, 25, 50, 75, 100]} tickFormat={(x) => `${x}%`} />
                      <ChartGroup>
                        <ChartLine data={osCpuData} name="CPU Usage" />
                        <ChartLine data={osMemData} name="Memory Usage" />
                        <ChartLine data={osNetworkData} name="Network Activity" style={{ data: { strokeDasharray: '5,5' } }} />
                      </ChartGroup>
                    </Chart>
                  </div>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem span={12} md={4}>
              <Card style={{ height: '100%' }}>
                <CardTitle>Pod Status Distribution</CardTitle>
                <CardBody>
                  <div style={{ height: '300px', width: '100%' }}>
                    <ChartDonut themeColor={ChartThemeColor.green} themeVariant="dark" ariaDesc="Pod Status" ariaTitle="Pods" constrainToVisibleArea data={osPodStatus} labels={({ datum }) => `${datum.x}: ${datum.y}`} padding={{ bottom: 20, left: 20, right: 20, top: 20 }} subTitle="Total Pods" title="1595" width={400} />
                  </div>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </GridItem>

      </Grid>
    </PageSection>
  );
};

export default Dashboard;
