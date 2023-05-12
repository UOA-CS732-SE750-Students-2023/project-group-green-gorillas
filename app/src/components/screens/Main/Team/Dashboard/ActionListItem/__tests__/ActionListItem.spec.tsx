import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ActionListItem } from "../ActionListItem";
import {
  ActionItem,
  ActionItemStatus,
  RetroStage,
} from "../../../../../../../types/actionItems";
import { Role, TeamRole } from "../../../../../../../types/teamRole";

jest.mock('../../../../../../../api/request', () => ({
  patch: jest.fn().mockResolvedValue(undefined)
}))


jest.mock('../../../../Retro/Stage', () => ({
  RetroStage: {
    FINALIZE: 'FINALIZED'
  }
}))


jest.mock('../../../../index', () => ({
  MainScreenPath: {
    Retro: 'retro',
    TEAM: 'team'
  }
}))


describe("ActionListItem", () => {
  test("renders action item with delete and update buttons", () => {
    const actionItem: ActionItem = {
      id: "1",
      note: "Test Action Item",
      status: ActionItemStatus.IN_PROGRESS,
      retro: {
        id: "1",
        teamId: "1",
        name: "Retro 1",
        stage: RetroStage.FINALIZE,
      },
      createdAt: "2023-05-10T10:00:00Z",
      assignees: [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
        },
      ],
    };

    const teamRole: TeamRole = {
      role: Role.LEADER,
      userId: "1",
      teamId: "1",
      organisationId: "1",
      createdAt: "1",
      updateAt: "1",
    };
    const updateActionItems = jest.fn();
    const deleteActionItems = jest.fn();

    const { getByText } = render(
      <BrowserRouter>
        <ActionListItem
          actionItem={actionItem}
          teamId="1"
          teamRole={teamRole}
          updateActionItems={updateActionItems}
          deleteActionItems={deleteActionItems}
        />
      </BrowserRouter>
    );

    // Assert Action Item text is rendered
    expect(() => getByText("Test Action Item")).not.toThrow()

    // Assert Delete button is rendered for admin
    expect(() => getByText("DELETE")).not.toThrow();

    // Simulate Delete button click
    fireEvent.click(getByText("DELETE"));
    expect(deleteActionItems).toHaveBeenCalledTimes(1);

    // Assert Update button is rendered for admin
    expect(() => getByText("Complete")).not.toThrow();

    // Simulate Update button click
    fireEvent.click(getByText("Complete"));
    expect(updateActionItems).toHaveBeenCalledTimes(1);
  });

  test("does not render delete and update buttons for member role", () => {
    const actionItem: ActionItem = {
      id: "1",
      note: "Test Action Item",
      status: ActionItemStatus.IN_PROGRESS,
      retro: {
        id: "1",
        teamId: "1",
        name: "Retro 1",
        stage: RetroStage.FINALIZE,
      },
      createdAt: "2023-05-10T10:00:00Z",
      assignees: [{ id: "1", firstName: "John", lastName: "Doe" }],
    };

    const teamRole: TeamRole = {
      role: Role.MEMBER,
      userId: "1",
      teamId: "1",
      organisationId: "1",
      createdAt: "1",
      updateAt: "1",
    };
    const updateActionItems = jest.fn();
    const deleteActionItems = jest.fn();

    const { queryByText } = render(
      <BrowserRouter>
        <ActionListItem
          actionItem={actionItem}
          teamId="1"
          teamRole={teamRole}
          updateActionItems={updateActionItems}
          deleteActionItems={deleteActionItems}
        />
      </BrowserRouter>
    );

    // Assert Delete button is not rendered for member
    expect(queryByText("DELETE")).toBeNull();

    // Assert Update button is not rendered for member
    expect(queryByText("Un-complete")).toBeNull();
  });
});
