import { render, fireEvent, screen } from "@testing-library/react";
import { UserManagementScreen } from "../index";
import User from "../user";

jest.mock('../../../../../../api/request', () => ({
    patch: jest.fn().mockResolvedValue(undefined)
}))

jest.mock('', () => ({
    USER_LIST: jest.fn().mockReturnValue({
        User: {
            email: "@aucklanduni.ac.nz"
        }
    })
}))

describe('UserManagementScreen', ()=>{
    it('Display User info', () => {

        const { container } = render(<User />);

        expect(container).toMatchSnapshot();
    })
})
