import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EmployeeForm from "../../../pages/employee/form";
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux'
import store from '../../store'

describe("EmployeeForm", () => {
    it("renders employee form page elements", async () => {
        //check to see if all elements are rendered

        await act(async () => {
            render(
                <Provider store={store}>
                    <EmployeeForm />
                </Provider>
            )

        })

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