import { Create, SimpleForm, TextInput } from "react-admin";

export const CreateWeekDay = () => (
  <Create>
    <SimpleForm>
     


      <TextInput source="nameDay"
      
      sx={{
        maxWidth: '16em',
        '&.MuiTableCell-body': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
    }}
      />

    </SimpleForm>
  </Create>
);