import { Show, SimpleShowLayout, TextField, EmailField } from "react-admin";

export const ShowUser = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
    </SimpleShowLayout>
  </Show>
);