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
import 'ladda/dist/ladda-themeless.min.css';
import './RegisterForm.css';

const RegisterForm = (props) => {

  const formik = useFormik({
    initialValues: {
      newUsername: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: Yup.object({
      newUsername: Yup.string()
        .min(5, 'Username must be a minimum of 5 characters')
        .required('Username is required'),
      newPassword: Yup.string()
        .required('Password is Required'),
      confirmNewPassword: Yup.string()
        .required('Password is Required')
    }),
    onSubmit: values => {
      // if (props.location.state) {
      //   props.authenticate(values, props.location.state.from.pathname);
      // } else {
      //   props.authenticate(values);
      // }
    }
  });

  return (
    <div className="register-form d-flex flex-row justify-content-center align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup className="mb-0">
              <Card className="p-4 mb-0 rounded">
                <CardBody>
                  <h4 className="card-title text-center">Create an Account</h4>
                  <Form
                    onSubmit={formik.handleSubmit}
                    noValidate
                    name="register"
                  >
                    <FormGroup>
                      <Input
                        className="rounded"
                        type="text"
                        name="newUsername"
                        id="newUsername"
                        placeholder="Enter an Awesome Username!"
                        autoComplete="given-name"
                        valid={!formik.errors.newUsername}
                        invalid={
                          formik.touched.newUsername &&
                          !!formik.errors.newUsername
                        }
                        autoFocus={true}
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newUsername}
                      />
                      <FormFeedback>{formik.errors.newUsername}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter Your Super Secure Password"
                        autoComplete="new-password"
                        valid={!formik.errors.newPassword}
                        invalid={
                          formik.touched.newPassword &&
                          !!formik.errors.newPassword
                        }
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newPassword}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="password"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        valid={!formik.errors.confirmNewPassword}
                        invalid={
                          formik.touched.confirmNewPassword &&
                          !!formik.errors.confirmNewPassword
                        }
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmNewPassword}
                      />
                    </FormGroup>
                    <FormGroup className="d-flex flex-row justify-content-center">
                      <LaddaButton
                        className="btn-ladda btn btn-primary rounded"
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                        loading={props.loading}
                        data-color="blue"
                        data-style={CONTRACT}
                        // style={{}}
                      >
                        Register
                      </LaddaButton>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterForm;