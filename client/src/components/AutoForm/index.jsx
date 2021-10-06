import { Grid, TextField, MenuItem, FormControl } from "@material-ui/core";
import { useFormik } from "formik";

const typeToComponent = {};

export default function AutoForm(props) {
  const formDef = { gallons: { type: "int" } };
  let initialValues = {};
  for (let fieldName in formDef) {
    initialValues[fieldName] = 0;
  }

  const formik = useFormik({ initialValues });

  return (
    <Grid container spacing={3}>
      {Object.keys(formDef).map((name) => (
        <TextField id={name} label={name} {...formik.getFieldProps(name)} />
      ))}
    </Grid>
  );
}
