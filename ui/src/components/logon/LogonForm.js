import React from 'react';
import { useFormik } from 'formik';
import { 
  Button,
  Card,
  CardGroup,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Row
} from 'reactstrap';
import LaddaButton, { CONTRACT } from 'react-ladda';
import * as Yup from 'yup';
import nasaLogo from '../../resources/NASA_logo.svg';
import 'ladda/dist/ladda-themeless.min.css';
import './LogonForm.css';


const LogonForm = (props) => {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Username must be a minimum of 5 characters')
        .required('Username is required'),
      password: Yup.string()
        .required('Password is Required')
    }),
    onSubmit: values => {
      // TODO: stuff into the auth stuff
      props.authenticate(values, props.redirectPath);
    }
  });

  return (
    <div className="logon-form d-flex flex-row justify-content-center align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup className="mb-0">
              <Card className="p-4 mb-0 rounded" style={{ backgroundColor:"#001724" }}>
                <CardBody className="text-center d-flex justify-content-center">
                  <img src={nasaLogo} alt="nasa logo" />
                </CardBody>
              </Card>
              <Card className="p-4 rounded">
                <CardBody>
                  {/* Do some sort of error handling */}
                  {Logon(formik, props.loading)}
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
};

const Logon = (formik, loading) => {
  return (
    <div>
      <h4 className="card-title text-center">Awesome GRM Logon</h4>
      <Form onSubmit={formik.handleSubmit} noValidate name='logon'>
        <FormGroup>
          <Input className="rounded" 
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            autoComplete="given-name"
            valid={!formik.errors.username}
            invalid={formik.touched.username && !!formik.errors.username}
            autoFocus={true}
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          <FormFeedback>{formik.errors.username}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input 
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="new-password"
            valid={!formik.errors.password}
            invalid={formik.touched.password && !!formik.errors.password}
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </FormGroup>
        <FormGroup className="d-flex flex-row justify-content-between">
          <LaddaButton 
            className="btn-ladda btn btn-primary rounded"
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            loading={loading}
            data-color="blue"
            data-style={CONTRACT}
            // style={{}}
          >Submit</LaddaButton>
          <Button className="">
            Register
          </Button>
        </FormGroup>
      </Form>
    </div>
  )
}

export default LogonForm;