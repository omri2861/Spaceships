import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const StringField = (props) => <TextField {...props} />;
const NumberField = (props) => <TextField type="number" {...props} />;
const BoolField = (props) => (
  <FormControlLabel control={<Checkbox {...props} />} label={props.label} />
);

const defaultValues = {
  int: 0,
  string: "",
  bool: false,
};

function getInitialValues(definition) {
  // TODO: Validate form definition first
  let initialValues = {};
  for (let fieldName in definition) {
    if (definition[fieldName].default !== undefined) {
      initialValues[fieldName] = definition[fieldName].default;
    } else {
      initialValues[fieldName] = defaultValues[definition[fieldName].type];
    }
  }

  return initialValues;
}

// TODO: Settle on same / different fields for ints/ floats
const typeToComponent = {
  int: NumberField,
  string: StringField,
  bool: BoolField,
};

function AutoForm({ definition, formik }) {
  const getFormElement = (name, properties) => {
    let constructor = typeToComponent[properties.type];
    if (undefined === constructor) {
      console.error(`Undefined constructor for type '${properties.type}'`);
      return null;
    }
    return constructor({
      id: name,
      label: name,
      ...formik.getFieldProps(name),
    });
  };

  return (
    <Grid container spacing={3}>
      {Object.entries(definition).map(([name, properties]) => (
        <Grid item key={name}>
          {getFormElement(name, properties)}
        </Grid>
      ))}
    </Grid>
  );
}

export default AutoForm;
export { AutoForm, getInitialValues };
