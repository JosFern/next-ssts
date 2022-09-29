import Login from '../../pages/login';
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux'
import store from '../../store'

describe("Login", () => {
    it("renders login page elements", async () => {
        //check to see if all elements are rendered

        await act(async () => {
            render(
                <Provider store={store}>
                    <Login />
                </Provider>
            )

        })
        expect(screen.getByTestId("email")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    })
})