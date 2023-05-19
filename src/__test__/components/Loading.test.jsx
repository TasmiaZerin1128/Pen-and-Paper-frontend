import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import {describe, it} from 'vitest';
import { Loading, LoadingWithBackdrop } from "../../components/Loading/Loading";

describe("Loading", () => {
  it("should render a CircularProgress component", () => {
    const { getByRole } = render(<Loading />);
    const circularProgress = getByRole("progressbar");
    expect(circularProgress).toBeInTheDocument();
  });

  it("should apply the correct styles", () => {
    const { container } = render(<Loading />);
    const box = container.firstChild;
    expect(box).toHaveStyle("z-index: 9999");
    expect(box).toHaveStyle("display: flex");
    expect(box).toHaveStyle("justify-content: center");
    expect(box).toHaveStyle("align-items: center");
  });
});

describe("LoadingWithBackdrop", () => {
  it("should render a CircularProgress component", () => {
    const theme = createTheme();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <LoadingWithBackdrop />
      </ThemeProvider>
    );
    const circularProgress = getByTestId("circular-progress");
    expect(circularProgress).toBeInTheDocument();
  });

  it("should render a Backdrop component", () => {
    const { getByTestId } = render(<LoadingWithBackdrop />);
    const backdrop = getByTestId('backdrop');
    expect(backdrop).toBeInTheDocument();
  });

  it("should apply the correct styles", () => {
    const { container } = render(<LoadingWithBackdrop />);
    const box = container.firstChild;
    const backdrop = box.firstChild;
    expect(box).toHaveStyle("width: 100%");
    expect(box).toHaveStyle("background-color: #00000056");
    expect(backdrop).toHaveStyle("color: #fff");
  });
});
