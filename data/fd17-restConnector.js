import rp from 'request-promise';

const endpoint = 'https://api.mlab.com/api/1/databases/fd2017mongodb/collections/'
const apiKey = 'apiKey=8CQLKPe7aPqcyHS8d0kgn3IMTz2saWSW'

const ClaimsModelRest = {

  findAll: function(args) {
    var guments= '';
    var limit= '';
    if (args) {
      var hasOwn= false
      for (var key in args) {
        if (key === 'limit') {
          limit= args[key];
        } else if (args.hasOwnProperty(key)) {
          hasOwn= true
          if (guments.length > 0) {
            guments += ', '
          }
          if (typeof args[key] === "number") {
            guments += key + ':' + args[key] 
          } else if (args[key].includes('*')){
            guments += key + ": { $regex: '"+args[key].split('*').join('')+"', $options: 'i'}"
          } else {
            guments += key + ': "' + args[key] + '"'
          }
        }
      }
      if (hasOwn) {
        guments= '&q={' + guments + '}';
      }
    }
    
    var query= guments;
    if (limit > 0) {
      query += '&l=' + limit;
    }
    console.log(query)
    return rp(endpoint + '/claims?' + apiKey + query)
      .then((res) => JSON.parse(res))
      .then((res) => {
        return res;
      });
  },

  findByParam: function(arg) {
    var uri = endpoint + '/claims?' + apiKey + '&q={' + arg + '}';
    return rp(uri)
      .then((res) => JSON.parse(res))
      .then((res) => {
        return res;
      });
  }
};

export {ClaimsModelRest};
