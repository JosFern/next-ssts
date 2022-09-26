import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Employer from "../../../pages/employer";

describe("Employer", () => {
    it("renders employer page elements", () => {
        render(<Employer />);
        //check to see if all elements are rendered
        expect(screen.getByTestId("basic-profile-info")).toBeInTheDocument();
        expect(screen.getByTestId("name")).toBeInTheDocument();
        expect(screen.getByTestId("add-employer")).toBeInTheDocument();
        expect(screen.getByTestId("leaves")).toBeInTheDocument();
        expect(screen.getByTestId("overtime-limit")).toBeInTheDocument();
        expect(screen.getByTestId("absent-limit")).toBeInTheDocument();
        expect(screen.getByTestId("employee-table")).toBeInTheDocument();
    })
})