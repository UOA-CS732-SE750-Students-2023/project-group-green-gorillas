import { Redirect, Route, Switch } from "react-router-dom";
import { UserManagementScreen } from "./UserManagement";
import { TeamManagementScreen } from "./TeamManagement";
import { OrgManagementScreen } from "./OrgManagement";
import { AdminLayout } from "./AdminLayout";
import { AdminScreenPath } from "./AdminScreenPath";

export const AdminScreen = () => {
  return (
    <AdminLayout>
      <Switch>
        <Route
          path={AdminScreenPath.USER_MANAGEMENT}
          component={UserManagementScreen}
        />
        <Route
          path={AdminScreenPath.TEAM_MANAGEMENT}
          component={TeamManagementScreen}
        />
        <Route
          path={AdminScreenPath.ORG_MANAGEMENT}
          component={OrgManagementScreen}
        />
        <Redirect from={"*"} to={AdminScreenPath.ORG_MANAGEMENT} />
      </Switch>
    </AdminLayout>
  );
};
