


jest.mock('../../../../../api/request', () => ({
    patch: jest.fn().mockResolvedValue(undefined)
}))




jest.mock("../../../../../hooks/useCurrentUser", () => ({
    useCurrentUser: jest.fn().mockReturnValue({
        user: {
            firstName: "Ethan",
            lastName: "Wang",
            phone: "119",
            address: "22 Symond St",
            gender: true
        },
    })})
);

import {render, screen} from '@testing-library/react'
import React from "react";
import { ProfileScreen } from "../index";


describe('Personal Profile', ()=>{
    it('Display personal info', () => {

        const { container } = render(<ProfileScreen />);

        expect(container).toMatchSnapshot();
    })
})