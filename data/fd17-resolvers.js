import { PartnerModelMongoose } from './fd17-mongoConnector';
import { ContractConnector } from './fd17-mongoConnector';

import 'isomorphic-fetch';

const toJSON = res => res.json()

const endpoint='https://api.mlab.com/api/1/databases/fd2017mongodb/collections/'
const apiKey='apiKey=8CQLKPe7aPqcyHS8d0kgn3IMTz2saWSW'

const resolvers = {
  Query: {
    partners(_, args) {
      /*var res = PartnerModelMongoose.find(function(err, res){
        console.log(res)
        return res;
      });*/
      PartnerModelMongoose.find().exec().then(function(res) {
        console.log(res[0])
        return res;
      })
    },
    contracts(_, args) {
      return ContractConnector.findAll({ where: args, order: [  ['riskObjects', 'DESC'] ] });
    }
  },

  Partner: {

  },

  Contract: {

  },
};

export default resolvers;
