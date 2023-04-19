import React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";

export const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
      <EditButton basePath="/posts" />
    </Datagrid>
  </List>
);
