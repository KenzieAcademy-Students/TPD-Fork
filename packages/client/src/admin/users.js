import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";

export const UserList = (props) => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="projectName" />
      <DateField source="createdAt" />
      <TextField source="ProjectDetails" />
    </Datagrid>
  </List>
);
