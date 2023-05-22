import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import {describe, it} from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import PageNotFound from "../../pages/pageNotFound";


const mockNavigate = jest.fn();

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
  })

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
        const element = screen.getByText("← Go back");
        expect(container).toContainElement(element);
    });

    it("should call navigate function when go back text is clicked", () => {
        render(
        <BrowserRouter>
            <PageNotFound />
        </BrowserRouter>
        );
        const goBack = screen.getByText(/Go back/i);
        fireEvent.click(goBack);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
