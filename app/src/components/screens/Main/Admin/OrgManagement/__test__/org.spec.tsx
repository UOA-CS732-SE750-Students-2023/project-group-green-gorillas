


jest.mock('../../../../../../api/request', () => ({
    patch: jest.fn().mockResolvedValue(undefined)
}))

jest.mock("../../../../../../hooks/useCurrentUser", () => ({
    useCurrentUser: jest.fn().mockReturnValue({
        user: {
            firstName: "",
            lastName: "",
            organisation: {
                name: "Company Name Test",
                id: "001",
                createAt: "2023-05-09T22:02:13.881+00:00",
                updatedAt: "2023-05-11T12:09:10.020+00:00"
            },
        },
    })})
);

import {render, screen} from '@testing-library/react'
import React from "react";
import Org from "../org";


describe('OrgManagement Profile', ()=>{
    it('Display company info', () => {

        const { container } = render(<Org />);

        expect(container).toMatchSnapshot();
    })
})