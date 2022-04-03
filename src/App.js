import "./styles.css";
import React from "react";
import { Menu } from "grommet-icons";
import { ResponsiveContext, Text, Box, Button } from "grommet";

import Layout from "./Layout";

export default function App(props) {
  const viewport = React.useContext(ResponsiveContext);
  const [isLeftSidebarOpen, setLeftSidebarOpen] = React.useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = React.useState(false);

  const isLeftSideResponsive = viewport !== "large";
  const isRightSideResponsive = viewport === "small";

  const toggleLeftSidebar = React.useCallback(() => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
  }, [isLeftSidebarOpen]);

  const toggleRightSidebar = React.useCallback(() => {
    setRightSidebarOpen(!isRightSidebarOpen);
  }, [isRightSidebarOpen]);

  return (
    <Layout
      title={
        <Box direction="row" gap="small" align="center">
          <Button
            icon={<Menu color="white" />}
            plain
            onClick={toggleLeftSidebar}
            margin={{ right: "small" }}
          />
          <Text>[TITLE]</Text>
          <Button
            margin={{ left: "auto" }}
            plain
            label="more"
            onClick={toggleRightSidebar}
          />
        </Box>
      }
      isLeftResponsive={isLeftSideResponsive}
      isRightResponsive={isRightSideResponsive}
      isLeftActive={isLeftSidebarOpen}
      isRightActive={isRightSidebarOpen}
      onMainBackdropClick={() => {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      }}
      left={<Box width="300px">[LEFT]</Box>}
    />
  );
}
