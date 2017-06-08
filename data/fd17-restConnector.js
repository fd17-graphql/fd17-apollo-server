import 'isomorphic-fetch';

const endpoint='https://api.mlab.com/api/1/databases/fd2017mongodb/collections/'
const apiKey='apiKey=8CQLKPe7aPqcyHS8d0kgn3IMTz2saWSW'

const toJSON= res => res.json()
const ClaimsModelRest= {
  findAll: function() {
    var a= fetch(`${endpoint}/claims?${apiKey}`)
    return a;
  }
};

export {ClaimsModelRest };
