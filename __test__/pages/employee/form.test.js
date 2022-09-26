import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EmployeeForm from "../../../pages/employee/form";

describe("EmployeeForm", () => {
    it("renders employee form page elements", () => {
        render(<EmployeeForm />);
        //check to see if all elements are rendered
        expect(screen.getByTestId("firstname-input")).toBeInTheDocument();
        expect(screen.getByTestId("lastname-input")).toBeInTheDocument();
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("company-input")).toBeInTheDocument();
        expect(screen.getByTestId("employeeID-input")).toBeInTheDocument();
        expect(screen.getByTestId("position-input")).toBeInTheDocument();
        expect(screen.getByTestId("salaryPerHour-input")).toBeInTheDocument();
        expect(screen.getByTestId("employeeType-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("confirmPassword-input")).toBeInTheDocument();


    })
})