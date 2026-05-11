import { Create, SimpleForm, TextInput } from "react-admin";

export const CreateUser = () => (
  <Create>
    <SimpleForm>
     


      <TextInput source="firstName"
      
      sx={{
        maxWidth: '16em',
        '&.MuiTableCell-body': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
    }}
      />

      <TextInput source="lastName"
      
      
      sx={{
        maxWidth: '16em',
        '&.MuiTableCell-body': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
    }}
      />
 
      
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);