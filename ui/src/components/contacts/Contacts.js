import React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Table
} from 'reactstrap';

const Contacts = (props) => {
  console.log(props.contacts);
  return (
    <Container>
        <Card>
          <CardTitle>Current Contacts</CardTitle>
          <CardBody>
            <Container>
              <Row>
                <Col>
                
                </Col>
                <Col>
                
                </Col>
                <Col>
                
                </Col>
                <Col>
                
                </Col>
              </Row>
            </Container>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>AOS - LOS</th>
                </tr>
              </thead>
            </Table>
          </CardBody>
        </Card>
      </Container>
  );
}

export default Contacts;