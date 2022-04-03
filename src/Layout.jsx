import "./styles.css";
import React from "react";
import { Box, Text } from "grommet";
import styled from "styled-components";

const useResponsiveSidebarProps = (direction = "left", active = true) => {
  if (direction !== "left" && direction !== "right")
    throw new Error("useResponsiveSidebarProps: Invalid direction");
  const style = {
    position: "absolute",
    height: "100%",
    top: 0,
    [direction]: active ? 0 : "-100%",
    transition: "all 0.3s linear",
    zIndex: 2
  };
  return { style };
};

const Card = styled(Text).attrs({
  as: Box,
  round: "xsmall",
  elevation: "small"
})``;

export default function TriCardLayout(props) {
  const leftSidebarProps = useResponsiveSidebarProps(
    "left",
    props.isLeftActive
  );
  const rightSidebarProps = useResponsiveSidebarProps(
    "right",
    props.isRightActive
  );

  const hideMain =
    (props.isLeftResponsive && props.isLeftActive) ||
    (props.isRightResponsive && props.isRightActive);

  const renderOrFnCall = React.useCallback(
    (nodeOrFn) => (typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn),

    []
  );

  return (
    <Box
      background={props.background}
      height="100vh"
      width="100%"
      style={{ overflow: "hidden" }}
    >
      <Box
        as={Text}
        color={props.color}
        fill="horizontal"
        pad={{ horizontal: "medium", vertical: "small" }}
      >
        {renderOrFnCall(props.title)}
      </Box>
      <Box
        flex
        margin={{ bottom: "small" }}
        direction="row"
        style={{ position: "relative" }}
      >
        <Card
          margin={{ left: "small" }}
          pad={{ horizontal: "small", vertical: "medium" }}
          background={props.backgroundCards}
          color={props.colorCards}
          {...(props.isLeftResponsive ? leftSidebarProps : {})}
        >
          {renderOrFnCall(props.left)}
        </Card>
        <Box
          style={{ position: "relative" }}
          flex
          margin={{ horizontal: "small" }}
        >
          {hideMain && (
            <Box
              onClick={props.onMainBackdropClick}
              fade
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                opacity: 0.4,
                zIndex: 1
              }}
            />
          )}
          <Card
            pad={{ horizontal: "small", vertical: "medium" }}
            background={props.backgroundCards}
            color={props.colorCards}
            fill="vertical"
          >
            {renderOrFnCall(props.main)}
          </Card>
        </Box>
        <Card
          margin={{ right: "small" }}
          pad={{ horizontal: "small", vertical: "medium" }}
          background={props.backgroundCards}
          color={props.colorCards}
          {...(props.isRightResponsive ? rightSidebarProps : {})}
        >
          {renderOrFnCall(props.right)}
        </Card>
      </Box>
    </Box>
  );
}

TriCardLayout.defaultProps = {
  title: "[TITLE]",
  left: "[LEFT SIDE]",
  right: "[RIGHT SIDE]",
  main: "[MAIN]",
  isLeftResponsive: false,
  isRightResponsive: false,
  isLeftActive: false,
  isRightActive: false,
  background: "grey",
  backgroundCards: "white",
  color: "white",
  colorCards: "grey",
  backgroundMainBackdrop: "black",
  onMainBackdropClick: (f) => f
};
