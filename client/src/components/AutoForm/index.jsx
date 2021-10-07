import { Grid, TextField, Button } from "@material-ui/core";
import { FormikContext, useFormik } from "formik";

const typeToComponent = {};

export default function AutoForm(props) {
  const formDef = { gallons: { type: "int" }, engines: { type: "int" } };
  let initialValues = {};
  for (let fieldName in formDef) {
    initialValues[fieldName] = "";
  }

  const formik = useFormik({ initialValues});
  const onSubmit = () => {
      console.log(formik.values);
  }

  return (
    <Grid container spacing={3}>
      {Object.keys(formDef).map((name) => (
        <Grid item>
          <TextField id={name} label={name} {...formik.getFieldProps(name)} />
        </Grid>
      ))}
      <Grid item>
        <Button onClick={onSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
}
