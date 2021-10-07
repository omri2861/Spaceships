import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useFormik } from "formik";

const StringField = (props) => <TextField {...props} />;
const NumberField = (props) => <TextField type="number" {...props} />;
const BoolField = (props) => (
  <FormControlLabel control={<Checkbox {...props} />} label={props.label} />
);

// TODO: Settle on same / different fields for ints/ floats
const typeToComponent = {
  int: NumberField,
  string: StringField,
  bool: BoolField,
};

const defaultValues = {
  int: 0,
  string: "",
  bool: false,
};

export default function AutoForm(props) {
  const formDef = {
    gallons: { type: "int" },
    newName: { type: "string", default: "Levy" },
    useDalkan: { type: "bool" },
  };
  
  // TODO: Validate form definition first
  let initialValues = {};
  for (let fieldName in formDef) {
    if (formDef[fieldName].default !== undefined) {
      initialValues[fieldName] = formDef[fieldName].default;
    } else {
      initialValues[fieldName] = defaultValues[formDef[fieldName].type];
    }
  }

  const formik = useFormik({ initialValues });
  const onSubmit = () => {
    console.log(formik.values);
  };

  const getFormElement = (name, properties) => {
    let constructor = typeToComponent[properties.type];
    return constructor({
      id: name,
      label: name,
      ...formik.getFieldProps(name),
    });
  };

  return (
    <Grid container spacing={3}>
      {Object.entries(formDef).map(([name, properties]) => (
        <Grid item>{getFormElement(name, properties)}</Grid>
      ))}
      <Grid item>
        <Button onClick={onSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
}
