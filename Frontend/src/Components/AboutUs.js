import React from 'react';
import { Component } from 'react';
import PaypalButtons from '..//Components/PaypalButtons'
import '..//App.css';
import  Navbar from '..//Components/Navbar';
import Container from 'react-bootstrap/Container'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
class AboutUs extends Component {
constructor(props){
  super(props)
  this.state = {

  }
}

  render() {
      return (
        <div className="aboutus">
          <Navbar/>

            <Container className="us">
            <h5>
            Sono Paola Cimaroli, Ceo & Founder di Mamsitter Italia. <br/>
            Per anni ho lavorato nel settore Human Resources, sia operando in grandi aziende strutturate che PMI.
            </h5>
            <React.Fragment>
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textSecondary">2017</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
              <h9>
                Decido di trasferirmi in Abruzzo, in una città piccola e raccolta rispetto a Roma.
                Aspettavo il mio secondo genito, Lorenzo Jacopo!  
                Ma quella nuova vita era tutta da ricostruire!
                Non avevo un lavoro, nè amicizie, nè luoghi a me familiari.

</h9>
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textSecondary">MamSharing</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
              <h9>
                Da questa idea è nato il progetto MamSitter.
                Di seguito ho aperto la pagina Facebook. E pian piano, un passetto alla volta, la community è cresciuta.
Ho capito che eravamo in tante, ed ho cominciato ad organizzare le presentazioni del progetto di Mamsharing in diversi quartieri della Capitale, per poi approdare a Milano.
              </h9>
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textSecondary">2021</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
              <h9>
              Mamsitter Italia è una realtà che opera a livello nazionale. Siamo partner dell’Università Ca’ Foscari per il progetto Family Share, e collaboriamo con importanti aziende che investono sul welfare aziendale.

Siamo una realtà in forte espansione, e siamo tutte donne!

Personalmente mi occupo del contatto con i clienti, e della fase finale delle selezioni delle nostre Baby Sitter e Colf, Mamsitter’s notturne, Tate o badanti Live in. Abbiamo addirittura un sos mamma: Tata Last minute, un servizio che si occupa di trovarti una tata in 3 ore per le emergenze!


              </h9>
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textSecondary">Contatti</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
              <h9>
              Sono a disposizione sulla pagina Facebook Mamsitter Italia.
              E su Instagram come @Lastanzaincima!
              
              </h9>
              <h5>
                Ti aspetto!
              </h5>
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      </React.Fragment>
            </Container>
        </div>
       
      );
    
  }


}
export default AboutUs;

   /* <script src="https://www.paypal.com/sdk/js?client-id=AUFxBSGfdWq7IT4OEDBp3XLkRObZnTf-FuL3nwMJA4W3Ta6CZh46UbokOi6o9LrayV0Xv3wuS01SK_A_"></script>
      <div id="paypal-button-container"></div>
      <script>paypal.Buttons().render(#paypal-button-container);</script>*/