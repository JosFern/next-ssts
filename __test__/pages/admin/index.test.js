import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Admin from "../../../pages/admin";

describe("Admin", () => {
    it("renders admin page elements", () => {
        render(<Admin />);
        //check to see if all elements are rendered

        expect(screen.getByTestId("admin-basic-info")).toBeInTheDocument();
        expect(screen.getByTestId("employer-table")).toBeInTheDocument();

    })
})