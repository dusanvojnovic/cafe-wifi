import Input from '../Forms/Input';
import Select from '../Forms/Select';

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'select':
      return <Select {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
