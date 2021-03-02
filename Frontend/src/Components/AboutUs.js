import React from 'react';
import { Component } from 'react';
import PaypalButtons from '..//Components/PaypalButtons'
import '..//App.css';


class AboutUs extends Component {
  state = {
    showPaypal: false
  };

  showPaypalButtons = () => {
    this.setState({ showPaypal: true });
  };

  render() {
    const { showPaypal } = this.state;
    if (showPaypal) {
      return <PaypalButtons />;
    } else {
      return (
        <div className="main">
          <h2> Buy this Mercedes at a giveaway price (Super Cheap) </h2>
          <img alt="Mercedes G-Wagon" />
          <h3>
            <b>$200</b>
          </h3>
          <button onClick={this.showPaypalButtons}> Pay </button>
        </div>
      );
    }
  }


}
export default AboutUs;

   /* <script src="https://www.paypal.com/sdk/js?client-id=AUFxBSGfdWq7IT4OEDBp3XLkRObZnTf-FuL3nwMJA4W3Ta6CZh46UbokOi6o9LrayV0Xv3wuS01SK_A_"></script>
      <div id="paypal-button-container"></div>
      <script>paypal.Buttons().render(#paypal-button-container);</script>*/