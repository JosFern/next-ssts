import React from 'react';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux'
import store from '../../../store'
import { act } from 'react-dom/test-utils';
import EmployeeInfo from '../../../pages/employee/[id]';

describe("Employee", () => {

    it("renders employee page elements", async () => {
        //check to see if all elements are rendered

        await act(async () => {
            render(
                <Provider store={store}>
                    <EmployeeInfo />
                </Provider>
            )

        })

        expect(screen.getByTestId("employee-info")).toBeInTheDocument();
        expect(screen.getByTestId("leaves-table")).toBeInTheDocument();
    })
})