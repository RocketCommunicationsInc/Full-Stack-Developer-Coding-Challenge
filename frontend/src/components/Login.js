import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


class Login extends Component {




    render() {
        return(
            <div className="Login-container">
                <Container>
                    <Form className="Login-item">
                        <Form.Label> Login</Form.Label>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" placeholder="Enter username" onChange={(e) => this.props.handleLoginChange(e)}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => this.props.handleLoginChange(e)}/>
                        </Form.Group>
                        <div className="buttons">
                            <Button variant="primary" type="button" className="signin" onClick={(e) => this.props.handleLoginSubmit(e)}>
                            Sign in</Button>
                            <Button variant="success" type="button" className="signup" onClick={(e) => this.props.toggleLogin(e)}>
                            Sign up</Button>
                        </div>
                    </Form>
                    </Container>
                
            </div>
        )
    }
}

export default Login