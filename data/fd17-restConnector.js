import rp from 'request-promise';

const endpoint = 'https://api.mlab.com/api/1/databases/fd2017mongodb/collections/'
const apiKey = 'apiKey=8CQLKPe7aPqcyHS8d0kgn3IMTz2saWSW'

const ClaimsModelRest = {

  findAll: function() {
    return rp(endpoint + '/claims?' + apiKey)
      .then((res) => JSON.parse(res))
      .then((res) => {
        return res;
      });
  }
};

export {ClaimsModelRest};
