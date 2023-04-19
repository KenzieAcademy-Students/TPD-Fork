import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import {
  HomePage,
  Dashboard,
  StaffPage,
  RegistrationPage,
  TemplatesPage,
  LoginPage,
  Projects,
} from "./pages";

import AdminPanel from "./admin";

import { PostList } from "./posts";

import {
  NavBarComp,
  UserProjects,
  EditDetails,
  EditProject,
  ViewProject,
  PrivateRoute,
  ErrorBoundary,
} from "./components";
import Banking from "./components/DesignTemplates/HomePages/Banking";
import Restaurant from "./components/DesignTemplates/HomePages/Restaurant";

function App() {
  return (
    <ErrorBoundary>
      {/* <AdminPanel /> */}

      <Router>
        <NavBarComp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/ideas" element={<TemplatesPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bankhome" element={<Banking />} />
          <Route path="/restaurant" element={<Restaurant />} />

          <Route path="/edit-details" element={<PrivateRoute />}>
            <Route path="/edit-details" element={<EditDetails />} />
          </Route>

          <Route
            path="/projects/:projectId"
            element={<PrivateRoute />}
          />
          <Route
            path="/projects/:projectId"
            element={<ViewProject />}
          />

          <Route path="/projects" element={<PrivateRoute />}>
            <Route path="/projects" element={<Projects />} />
          </Route>
          <Route path=":id" element={<PrivateRoute />}>
            <Route path=":id" element={<UserProjects />} />
          </Route>
          <Route
            path="/projects/edit/:projectId"
            element={<PrivateRoute />}
          >
            <Route
              path="/projects/edit/:projectId"
              element={<EditProject />}
            />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
