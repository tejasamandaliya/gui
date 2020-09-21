import {
  Heading,
  Page,
  EmptyState,
  Layout,
  Button,
  Card,
  Stack,
  ButtonGroup,
  RadioButton,
  Thumbnail,
  Caption,
  DropZone,
  Link,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import React, { useState, useCallback, useEffect } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import dynamic from "next/dynamic";

import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const Index = () => {
  let Editor = undefined;
  useEffect(() => {
    Editor = dynamic(() =>
      import("react-draft-wysiwyg").then((mod) => mod.Editor)
    );
  }, []);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState("userDefined");

  const [file, setFile] = useState();

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFile((file) => acceptedFiles[0]),
    []
  );
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <Stack>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.indexOf(file.type) > 0
            ? window.URL.createObjectURL(file)
            : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
        }
      />
      <div>
        {file.name} <Caption>{file.size} bytes</Caption>
      </div>
    </Stack>
  );

  const [pageShow, setPageShow] = useState(false);

  const handleChange = useCallback(
    (_checked, newValue) => setValue(newValue),
    []
  );

  const selectedProduct = (resources) => {
    const idFromResources = resources.selection.map((product) => product.id);
    console.log(idFromResources);
  };

  return (
    <Page
      fullWidth
      title="Create User Guide"
      primaryAction={{
        loading: false,
        content: "Create User Guide",
        onAction: () => {
          setPageShow(true);
        },
      }}
      separator
    >
      <React.Fragment>
        <Card title="Status">
          <Card.Section>
            <Stack spacing="loose" vertical>
              <Stack distribution="trailing">
                <Link url="/new">Add new Pets</Link>
                <ButtonGroup>
                  <Button primary>Enable</Button>
                  <Button plain>Disable</Button>
                </ButtonGroup>
              </Stack>
            </Stack>
          </Card.Section>
        </Card>
        <Card title="Select Products for Guide">
          <Card.Section>
            <Stack spacing="loose" vertical>
              <Button primary onClick={() => setOpen(true)}>
                {" "}
                Select Products{" "}
              </Button>
            </Stack>
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <Stack vertical>
              <RadioButton
                label="Create Guide"
                helpText="Merchant can create new guide."
                checked={value === "userDefined"}
                id="userDefined"
                name="accounts"
                onChange={handleChange}
              />
              <RadioButton
                label="Upload PDF"
                helpText="Merchant can upload PDF if they have PDF Ready."
                id="uploadPDF"
                name="accounts"
                checked={value === "uploadPDF"}
                onChange={handleChange}
              />
            </Stack>
          </Card.Section>
        </Card>
        {value === "userDefined" ? (
          <Card title="Create User Guide">
            <Card.Section>
              <Stack spacing="loose" vertical>
                <Stack distribution="trailing">
                  <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button primary>Save User Guide</Button>
                  </ButtonGroup>
                </Stack>
              </Stack>
            </Card.Section>
          </Card>
        ) : null}
        {value === "uploadPDF" ? (
          <Card title="Upload User Guide PDF">
            <Card.Section>
              <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
                {uploadedFile}
                {fileUpload}
              </DropZone>
            </Card.Section>
          </Card>
        ) : null}
      </React.Fragment>
      <ResourcePicker
        resourceType="Product"
        open={open}
        showVariants={false}
        showHidden={false}
        onCancel={() => setOpen(false)}
        onSelection={(resources) => {
          selectedProduct(resources);
        }}
      />
    </Page>
  );
};

export default Index;
