import { render, fireEvent, screen } from "@testing-library/react";
import { TeamManagementScreen } from "../index";
import Team from "../team";

jest.mock('../../../../../../api/request', () => ({
    patch: jest.fn().mockResolvedValue(undefined)
}))

jest.mock('', () => ({
    TEAM_LIST: jest.fn().mockReturnValue({
        Team: {
            name: "Team A"
        }
    })
}))

describe('TeamManagementScreen', ()=>{
    it('Display Team info', () => {

        const { container } = render(<Team />);

        expect(container).toMatchSnapshot();
    })
})

/*
describe("TeamManagementScreen", () => {
  it("should render correctly", () => {
    render(<TeamManagementScreen />);
    // Assert that the component is rendered
    expect(screen.getByText("Create Team")).toBeInTheDocument();
  });

  it("should open new team dialog on button click", () => {
    render(<TeamManagementScreen />);
    const createTeamButton = screen.getByText("Create Team");

    // Click the create team button
    fireEvent.click(createTeamButton);

    // Assert that the new team dialog is displayed
    expect(screen.getByText("Create New Team")).toBeInTheDocument();
  });

  it("should add a new team on save", () => {
    render(<TeamManagementScreen />);
    const createTeamButton = screen.getByText("Create Team");

    // Click the create team button
    fireEvent.click(createTeamButton);

    const newTeamInput = screen.getByLabelText("Team Name");
    const saveButton = screen.getByText("Save");

    // Fill in the new team input
    fireEvent.change(newTeamInput, { target: { value: "New Team" } });

    // Click the save button
    fireEvent.click(saveButton);

    // Assert that the new team is added to the list
    expect(screen.getByText("New Team")).toBeInTheDocument();
  });
});*/
