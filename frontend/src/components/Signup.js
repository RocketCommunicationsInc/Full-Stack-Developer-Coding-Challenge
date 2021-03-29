import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class Signup extends Component {

    render() {
        return(
            <div>
                <Container>
                <Form>
                    <Form.Label> Signup</Form.Label>
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
                    <Button variant="primary" type="button" onClick={(e) => this.props.handleSignupSubmit(e)}>
                        Create account
                    </Button>
                    <Button variant="success" type="button" onClick={(e) => this.props.toggleLogin(e)}>
                        I already have an account
                    </Button>
                </Form>
                </Container>
                
            </div>
        )
    }
}

export default Signup