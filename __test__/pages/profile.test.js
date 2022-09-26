import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Profile from "../../pages/profile";

describe("Profile", () => {
    it("renders profile page elements", () => {
        render(<Profile />);
        //check to see if all elements are rendered
        expect(screen.getByTestId("update-profile-btn")).toBeInTheDocument();
        expect(screen.getByTestId("update-password-btn")).toBeInTheDocument();
        expect(screen.getByTestId("logout-btn")).toBeInTheDocument();

        const openUpdateModal = screen.getByTestId("update-profile-btn");
        fireEvent.click(openUpdateModal)

        expect(screen.getByTestId("update-firstname-input")).toBeInTheDocument();
        expect(screen.getByTestId("update-lastname-input")).toBeInTheDocument();
        expect(screen.getByTestId("update-email-input")).toBeInTheDocument();

        const openPasswordModal = screen.getByTestId("update-password-btn");
        fireEvent.click(openPasswordModal)

        expect(screen.getByTestId("current-password-input")).toBeInTheDocument();
        expect(screen.getByTestId("new-password-input")).toBeInTheDocument();
        expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();

    })
})