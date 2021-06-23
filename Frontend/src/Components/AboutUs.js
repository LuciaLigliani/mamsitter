import React from 'react';
import { Component } from 'react';
import '..//App.css';
import {Link} from 'react-router-dom';
import logomodi from '..//logomodi.png';
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
<div  >
        <br/>
<Link to="/"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
            <ul className="linksNav">
            <Link to="/aboutUs">
                  <li><font face='ABeeZee!important' color='black' >LA NOSTRA STORIA</font></li>
                </Link>
                <Link to="/payments">
                  <li><font face='ABeeZee!important' color='black'>ABBONAMENTI</font></li>
                </Link>
                
                <Link to="/blog">
                  <li><font face='ABeeZee!important' color='black'>BLOG</font></li>
                </Link>

              
                 
              </ul>

            <Container className="us">
            <h5>
            Sono Paola Cimaroli, Ceo & Founder di Mamsitter Italia. <br/>
            Per anni ho lavorato nel settore Human Resources, sia operando in grandi aziende strutturate che PMI.
            </h5>
            <React.Fragment>
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textPrimary">2017</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
            <br/>
<br/>
              <h9>
                Decido di trasferirmi in Abruzzo, in una città piccola e raccolta rispetto a Roma.
                Aspettavo il mio secondo genito, Lorenzo Jacopo! <br/> 
                Ma quella nuova vita era tutta da ricostruire!<br/>
                Non avevo un lavoro, nè amicizie, nè luoghi a me familiari.

</h9>
<br/>
<br/>
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textPrimary">MamSharing</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
            <br/>
<br/>
              <h9>
                MamSharing significa letteralmente condivisione di una mamma e da questa idea è nato il progetto MamSitter.
                Di seguito ho aperto la pagina Facebook e pian piano, un passetto alla volta, la community è cresciuta.
                <br/>
Ho capito che eravamo in tante, ed ho cominciato ad organizzare le presentazioni del progetto di Mamsharing in diversi quartieri della Capitale, per poi approdare a Milano.
              </h9>
              <br/>
<br/>
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textPrimary">2021</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
            <br/>

<br/>
              <h9>
              Mamsitter Italia è una realtà che opera a livello nazionale.
              <br/> Siamo partner dell’Università Ca’ Foscari per il progetto Family Share, e collaboriamo con importanti aziende che investono sul welfare aziendale.<br/>
              Siamo una realtà in forte espansione, e siamo tutte donne!
              
              Personalmente mi occupo del contatto con i clienti, e della fase finale delle selezioni delle nostre Baby Sitter e Colf, Mamsitter’s notturne, Tate o badanti Live in. Abbiamo addirittura un sos mamma: Tata Last minute, un servizio che si occupa di trovarti una tata in 3 ore per le emergenze!


              </h9>
              <br/>
<br/>
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textPrimary">Contatti</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>
            <br/>
<br/>
              <h9>
              Sono a disposizione sulla pagina Facebook <a href="https://www.facebook.com/MamsitterItalia">Mamsitter Italia.</a>
              <br/>
              E su Instagram come <a href="https://www.instagram.com/lastanzaincima/">@Lastanzaincima</a>!
              
              </h9>
             
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <h3>
                Ti aspetto!
              </h3>
      </React.Fragment>
            </Container>
        </div>
        </div>
      );
    
  }


}
export default AboutUs;

   /* <script src="https://www.paypal.com/sdk/js?client-id=AUFxBSGfdWq7IT4OEDBp3XLkRObZnTf-FuL3nwMJA4W3Ta6CZh46UbokOi6o9LrayV0Xv3wuS01SK_A_"></script>
      <div id="paypal-button-container"></div>
      <script>paypal.Buttons().render(#paypal-button-container);</script>*/