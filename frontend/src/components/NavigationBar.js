import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import {Nav} from 'react-bootstrap'


const NavigationBar = (props) => {

  const logout = () => {
    localStorage.clear("token","user")
    window.location.href = "/"
  }

    
    return (
    <div >
            <Navbar bg="transparent" variant="dark" >
                <Nav className="mr-auto">
                  <Nav.Link href="#" onSelect={logout}> Logout</Nav.Link>
                </Nav>
            </Navbar>
    </div>
    )
}

export default NavigationBar;