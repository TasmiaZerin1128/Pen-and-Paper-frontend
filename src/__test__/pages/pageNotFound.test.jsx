import { render, screen } from "@testing-library/react";
import React from "react";
import {describe, it} from 'vitest';
import { useNavigate, useLocation, Router, BrowserRouter } from 'react-router-dom';
import PageNotFound from "../../pages/pageNotFound";

const mockNavigate = jest.fn();

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Custom text matcher function
const matchGoBackText = (content, element) => {
    const normalizedText = (element.textContent || '').trim().replace(/\s+/g, ' ');
    return normalizedText === content;
};

describe("PageNotFound", () => {
    it("should render the page not found image", () => {
        render(
        <BrowserRouter>
            <PageNotFound />
        </BrowserRouter>
        );
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
    });

    it("should render the page not found text", () => {
        render(
        <BrowserRouter>
            <PageNotFound />
        </BrowserRouter>
        );
        const text = screen.getByText("We can’t seem to find the page you’re looking");
        expect(text).toBeInTheDocument();
    });

    it("should render the go back text", () => {
        const { container } = render(
        <BrowserRouter>
            <PageNotFound />
        </BrowserRouter>
        );
        // const text = screen.getByText("←  Go back");
        expect(container).toContain("Go back");
    });

    // it("should call navigate function when go back text is clicked", () => {
    //     render(
    //     <BrowserRouter>
    //         <PageNotFound />
    //     </BrowserRouter>
    //     );
    //     const text = screen.getByText("← Go back");
    //     text.click();
    //     expect(mockNavigate).toHaveBeenCalledWith('/');
    // });
});
