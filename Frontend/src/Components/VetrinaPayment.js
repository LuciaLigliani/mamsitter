import axios from 'axios';
import React from 'react';
import util from '..//util/util'
// import scriptLoader from "react-async-script-loader";

class VetrinaPayment extends React.Component {
  componentDidMount() {
    console.log(window.paypal);
    window.paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
        return axios.get('/api/v1/users/myProfile').then((data => {
          console.log(data.data.data.role);
          return actions.subscription.create({
            'plan_id': 'P-0BA48243K7280713TMBF6VSY'
          });
        })).catch(err => {
          alert('error');
          console.log(err);
        });
      },
      onApprove: function(data, actions) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
        return axios.post('/api/v1/payments/highlight', ).then((data => {
          console.log(data.data.data);
          console.log(data);
        })).catch(err => {
          alert('qualcosa è andato storto')
          console.log(err);
        });
      },
      onCancel: function (data) {
        // Show a cancel page, or return to cart
        alert('hai annullato');
        // setTimeout(()=> {
        //   window.location.assign('/vetrina');
        // }, 10); 
      }
  }).render('#paypal-button-container');

    // window.paypal.Buttons({
    //   createSubscription: function(data, actions) {
    //     axios.get('http://localhost:3001/api/v1/users/myProfile').then((data => console.log(data))).catch((err)=> alert(err));
    //     console.log(actions);
    //     return actions.subscription.create({
    //       'plan_id': 'P-87674821SB904544FMBCBNUY'
    //     });
    //   },    
    //   onApprove: function(data, actions) {
    //     alert('You have successfully created subscription ' + data.subscriptionID);
    //   },
    //   onCancel: function (data) {
    //     console.log(data)
    //   }
    
    // }).render('#paypal-button-container');
    // console.log(window.paypal.Buttons.canRenderTo);
    // window.paypal.Buttons.canRenderTo({
    //   env: 'sandbox', // Or 'production'
    //   // Set up the payment:
    //   // 1. Add a payment callback
    //   payment: function(data, actions) {
    //     // 2. Make a request to your server
    //     return actions.request.post('/my-api/create-payment/')
    //       .then(function(res) {
    //         // 3. Return res.id from the response
    //         return res.id;
    //       });
    //   },
    //   // Execute the payment:
    //   // 1. Add an onAuthorize callback
    //   onAuthorize: function(data, actions) {
    //     // 2. Make a request to your server
    //     return actions.request.post('/my-api/execute-payment/', {
    //       paymentID: data.paymentID,
    //       payerID:   data.payerID
    //     })
    //       .then(function(res) {
    //         // 3. Show the buyer a confirmation message.
    //       });
    //   }
    // }, '#paypal-button');
  }

  render() {
    return ( 
      <div>
        <h1>Vetrina</h1>
        {/* <script src="https://www.paypalobjects.com/api/checkout.js"></script> */}
        <div id="paypal-button-container"></div>
      </div>
    );
  }
}
// export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(VetrinaPayment);

export default VetrinaPayment;