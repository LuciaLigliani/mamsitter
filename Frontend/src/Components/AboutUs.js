import React from 'react';
import '..//App.css';
//import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel';

import babysitter from '..//babysitter.jpg';
import bimbo from '..//bimbo.jpg';
import tata from '..//tata.jpg';

function AboutUs() {
  return (
    <div className="home" >
      <Carousel className="Carousel">
      <Carousel.Item>
        <img
          className="d-block mx-auto" 
          src={babysitter}
          alt="First slide"
        />
        <Carousel.Caption>
         <font face='Georgia' color='white'><h1><b><u> Cerca la tua babysitter</u></b></h1></font>
          <h3>
          Nonni lontani, inserimento al nido, sport: ma troverò una baby sitter valida?
          Inserimenti al nido, baby sitter che ci lasciano, colf che rientrano 
          improvvisamente nel loro paese d’origine, nonni che abitano lontano, e come se non bastasse, lo #SmartWorking dovuto al Covid-19.
          </h3>
        </Carousel.Caption>
        </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto" 
          src={bimbo}
          alt="second slide"
        />

        <Carousel.Caption>
        <font face='Georgia' color='white'><h1><b><u>Nuovo servizio di Mamsitter notturne</u></b></h1></font>
          <h3>Non riesci a dormire perché hai un bimbo piccolo?
          Come ti capisco! Avrei dato qualsiasi cosa per poter riposare per qualche ora in maniera consecutiva.
          Per un anno il mio Lorenzo Jacopo non dormiva, si svegliava anche ogni ora, di tutte le notti, di ogni settimana.
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto" 
          src={tata}
          alt="Third slide"
        />

        <Carousel.Caption>
        <font face='Georgia' color='white'><h1><b><u>Tata last minute</u></b></h1></font>
          <h3>Hai i bambini malati, sono le 20.30 e domani non puoi proprio mancare al lavoro
          Quante volte ci siamo trovate in questa situazione sperando di trovare una baby sitter dell’ultimo minuto, ma quella ragazza che ci aiuta ogni tanto domani ha un esame all’università?


            
          </h3>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
    </div>
  );
}
export default AboutUs;
