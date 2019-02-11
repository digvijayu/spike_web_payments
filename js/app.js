function pay() {
  var payButton = document.getElementById('du-test-pay-button'),
    message = document.getElementById('du-message');

  if (!window.PaymentRequest) {
    // disable the button and show the message
    payButton.disabled = true;
    message.innerHTML = 'Your browser does not support the Web Payment API';
    return;
  }

  // Supported payment methods
  const paymentMethods = [{
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: [
        'visa', 'mastercard', 'amex', 'discover',
        'diners', 'jcb', 'unionpay'
      ]
    }
  }, {
    supportedMethods: 'https://bobpay.xyz/pay',
  }];

  const paymentDetails = {
    displayItems: [{
      label: 'The Great Gatsby by F. Scott Fitzgerald',
      amount: {
        currency: 'USD',
        value: '22.15'
      }
    }, {
      label: 'War and Peace by Leo Tolstoy',
      amount: {
        currency: 'USD',
        value: '22.15'
      }
    }],
    total: {
      label: 'Total due',
      amount: {
        currency: 'USD',
        value: '44.30'
      }
    }
  };

  var paymentOptions = {};

  var request = new PaymentRequest(paymentMethods, paymentDetails, paymentOptions);

  request.show()
    .then(function(uiResult) {
      new Promise(function(resolve) {
          // We will trigger backend request to process the payment
          // here, we are just using set timeout to immitate the async action
          setTimeout(function() {
            resolve(uiResult);
          }, 2000);
        })
        .then(function(uiResult) {
          // payment is now complete
          uiResult.complete('success');
          message.innerHTML = 'Payment was successful.';
        })
        .catch(function(error) {
          // This is not a server side error
          message.innerHTML = 'Could not process the payment for some reason.';
        });
    })
    .catch(function(error) {
      // This is not a server side error
      // or when user cancels the payment
      message.innerHTML = 'Oops, Something went wrong with the purchase.';
    });
}
