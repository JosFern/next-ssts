import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EmployerForm from "../../../pages/employer/form";

describe("EmployerForm", () => {
    it("renders employer form page elements", () => {
        render(<EmployerForm />);
        //check to see if all elements are rendered
        expect(screen.getByTestId("firstname-input")).toBeInTheDocument();
        expect(screen.getByTestId("lastname-input")).toBeInTheDocument();
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("company-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();

    })
})