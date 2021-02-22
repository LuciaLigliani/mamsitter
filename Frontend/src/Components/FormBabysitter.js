import React from 'react';
import '..//App.css';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Form from 'react-bootstrap/Form'
import TextField from '@material-ui/core/TextField';
import { Col, Row } from 'react-bootstrap';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


const stylesBirthday = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop:'-10px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
}));


function FormBabysitter() {
  const classes = useStyles();
  const classe= stylesBirthday();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Babysitter</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Form  className="dialog">
      <Row>
        <Col>
          <Form.Control placeholder="Nome" /><br/>
          <Form.Control as="select">
            <option value disabled="disabled" hidden="hidden">Città</option>
            <option>Milano</option>
          </Form.Control>
          
          <br/>
          <Form.Label>Giorni disponibili</Form.Label>
          <Form.Control as="select">
            <option>Lunedì</option>
            <option>Martedì</option>
            <option>Mercoledì</option>
            <option>Giovedì</option>
            <option>Venerdì</option>
            <option>Sabato</option>
            <option>Domenica</option>

          </Form.Control>
          
        </Col>
        <Col>
        <Form.Control placeholder="Cognome" /><br/>
        
        <Form.Control as="select">
            <option value disabled="disabled" hidden="hidden">Distretto</option>
            <option>Distretto1</option>
            <option>Distretto2</option>
            <option>Distretto3</option>
          </Form.Control>
         <br/> <Form.Label>Parti del giorno</Form.Label>
          <Form.Control as="select">
            <option>Mattino</option>
            <option>Pomeriggio</option>
            <option>Sera</option>
            <option>Notte</option>

          </Form.Control>
          
        </Col>
        <Col>
    <Form.Control as="select"> <br/>
        <option value disabled="disabled" hidden="hidden">Sesso</option>
        <option value="m">Maschio</option>
        <option value="f">Femmina</option>
      </Form.Control>
      <br/><Form.Control placeholder="Cellulare" /><br/>
        </Col>
        <Col>
        
        <form className={classe.container} noValidate>
      <TextField
        id="date"
        label="Data di nascita"
        type="date"
        defaultValue="today"
        className={classe.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
        </Col>
      
      </Row>
        
  </Form>  
          
        </AccordionDetails>
      </Accordion>
      </div>
  );
  
}

export default FormBabysitter;