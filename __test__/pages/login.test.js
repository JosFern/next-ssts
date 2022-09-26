import Login from '../../pages/login';
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Login", () => {
    it("renders login page elements", () => {
        render(<Login />);
        //check to see if all elements are rendered
        expect(screen.getByTestId("email")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    })
})