import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Form,
  FormGroup,
  TextInput,
  Button,
  Grid,
  GridItem,
  Card,
  CardTitle,
  CardBody,
  FileUpload,
  Radio,
  ActionGroup,
  Alert
} from '@patternfly/react-core';

const ConvertToAnsible = () => {
  const [method, setMethod] = useState('url');
  const [repoUrl, setRepoUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState('');

  const handleFileChange = (value: File | null, filename: string) => {
    setFile(value);
    setFilename(filename);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate AI Conversion process
    setTimeout(() => {
      setIsSubmitting(false);
      setResult('Conversion complete! AI has analyzed your inputs and generated an Ansible Playbook. (Mock Success)');
    }, 2000);
  };

  return (
    <PageSection>
      <Title headingLevel="h1" size="2xl" style={{ marginBottom: '20px' }}>
        Convert to Ansible (AI Assistant)
      </Title>
      
      <Grid hasGutter>
        <GridItem span={12} md={8}>
          <Card>
            <CardTitle>Migration Tool</CardTitle>
            <CardBody>
              <p style={{ marginBottom: '15px' }}>
                Upload your legacy automation scripts (Chef, Puppet, Salt, Bash) or provide a repository link, and our AI tool will convert them into Ansible Playbooks.
              </p>
              
              {result && (
                <Alert variant="success" title={result} style={{ marginBottom: '20px' }} actionClose={<Button variant="plain" onClick={() => setResult('')}>X</Button>} />
              )}

              <Form onSubmit={handleSubmit}>
                <FormGroup fieldId="method-selection" isInline>
                  <Radio
                    isChecked={method === 'url'}
                    name="method"
                    onChange={() => setMethod('url')}
                    label="Repository URL (GitHub, GitLab, Artifactory)"
                    id="radio-url"
                  />
                  <Radio
                    isChecked={method === 'upload'}
                    name="method"
                    onChange={() => setMethod('upload')}
                    label="Upload File/Folder (ZIP)"
                    id="radio-upload"
                  />
                </FormGroup>

                {method === 'url' ? (
                  <FormGroup label="Repository URL" fieldId="repo-url">
                    <TextInput
                      id="repo-url"
                      value={repoUrl}
                      onChange={(_event, val) => setRepoUrl(val)}
                      placeholder="https://github.com/my-org/legacy-scripts.git"
                      required
                    />
                  </FormGroup>
                ) : (
                  <FormGroup label="Upload Code" fieldId="file-upload">
                    <FileUpload
                      id="file-upload"
                      value={file}
                      filename={filename}
                      onChange={(_event, value, filename) => handleFileChange(value as File, filename)}
                      browseButtonText="Browse"
                      isLoading={false}
                    />
                  </FormGroup>
                )}

                <ActionGroup>
                  <Button variant="primary" type="submit" isLoading={isSubmitting} isDisabled={isSubmitting || (method==='url' ? !repoUrl : !filename)}>
                    {isSubmitting ? 'Analyzing & Converting...' : 'Convert to Ansible'}
                  </Button>
                </ActionGroup>
              </Form>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageSection>
  );
};

export default ConvertToAnsible;
