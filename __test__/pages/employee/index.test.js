import React from 'react';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Employee from "../../../pages/employee";
import { Provider } from 'react-redux'
import store from '../../../store'
import { act } from 'react-dom/test-utils';

describe("EmployeeInfo", () => {

    it("renders employee page elements", async () => {
        //check to see if all elements are rendered

        await act(async () => {
            render(
                <Provider store={store}>
                    <Employee />
                </Provider>
            )

        })

        expect(screen.getByTestId("employee-basic-info")).toBeInTheDocument();
        expect(screen.getByTestId("name")).toBeInTheDocument();
        expect(screen.getByTestId("request-leave")).toBeInTheDocument();
        expect(screen.getByTestId("leaves")).toBeInTheDocument();
        expect(screen.getByTestId("absences")).toBeInTheDocument();
        expect(screen.getByTestId("overtime")).toBeInTheDocument();
        expect(screen.getByTestId("remaining-leaves")).toBeInTheDocument();
        expect(screen.getByTestId("salary-per-hour")).toBeInTheDocument();
        expect(screen.getByTestId("daily-wage")).toBeInTheDocument();
        expect(screen.getByTestId("monthly-salary")).toBeInTheDocument();
        expect(screen.getByTestId("leaves-table")).toBeInTheDocument();
        expect(screen.getByTestId("absences-table")).toBeInTheDocument();
        expect(screen.getByTestId("overtime-table")).toBeInTheDocument();


    })
})