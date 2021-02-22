import React from 'react';
import { Form } from 'react-bootstrap';
import '..//App.css';
import { Col, Row } from 'react-bootstrap';

function FormFamiglia(){
  return(
    <div className="formFamiglia">
      <Form className="formSignin">
                        <Row>
                          <Col>
                            Nome
                            <Form.Control placeholder="Nome" /><br/>
                            <Form.Control as="select">
                              <option value disabled="disabled" hidden="hidden">Città</option>
                              <option>Milano</option>
                            </Form.Control>
                          </Col>
                          <Col>
                            Cognome
                            <Form.Control placeholder="Cognome"/>
                            <br/><Form.Control as="select">
                              <option value disabled="disabled" hidden="hidden">Distretto</option>
                              <option>Distretto1</option>
                              <option>Distretto2</option>
                              <option>Distretto3</option>
                            </Form.Control>
                          </Col>
                          <Col>
                            Sesso
                             <Form.Control as="select"> <br/> <option value disabled="disabled" hidden="hidden">Sesso</option><option value="m">Maschio</option><option value="f">Femmina</option> 
                             </Form.Control>
                             <br/><Form.Control placeholder="Descrizione "/>
                          </Col>
                        </Row>
      </Form>
      </div>
  );
}

export default FormFamiglia;