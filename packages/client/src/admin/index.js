import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { UserList } from "../admin/users";

const apiUrl = "http://localhost:3001/api/v1";

const AdminPanel = () => (
  <Admin dataProvider={"http://localhost:3001/api/v1"}>
    <Resource name="project" list={ListGuesser} />
    {/* <Resource name="comments" list={ListGuesser} /> */}
  </Admin>
);

export default AdminPanel;
