const axios = require('axios');

function addInAPI(url, data) {
    const config = {
        method: 'post',
        url,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
      
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
    });
}

const url = 'https://fir-kate-default-rtdb.firebaseio.com/Products/Trucks.json';

const data = JSON.stringify({
    "description": "The best truck in uberlandia",
    "images": [
      "html google"
    ],
    "name": "Test 2 Power",
    "points": 3,
    "price": 300,
    "specification": {
      "color": "blue"
    },
    "tags": {
      "type": "street"
    }
  });
  module.exports = addInAPI;