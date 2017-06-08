import { PartnerModelMongoose } from './fd17-mongoConnector';
import { ContractModelMongoose } from './fd17-mongoConnector';
import { ClaimsModelRest } from './fd17-restConnector';
import 'isomorphic-fetch';

const toJSON = res => res.json()

const endpoint = 'https://api.mlab.com/api/1/databases/fd2017mongodb/collections/'
const apiKey = 'apiKey=8CQLKPe7aPqcyHS8d0kgn3IMTz2saWSW'

const resolvers = {
  Query: {
    partners(_, args) {
      return PartnerModelMongoose.find().exec().then((partner) => {
        return (partner)
      });
    },
    contracts(_, args) {
      return ContractModelMongoose.find().exec().then((contract) => {
        return contract.map(contract => ({
          "policeNumber": contract['police-number'],
          "product": contract.product,
          "riskObjects": contract['risk-objects'],
          "insuranceSum": contract['insurance-sum'],
          "fk_partnerNumber": contract.fk_partnerNumber
        }))
      });
    },
    claims(_, args) {
      return ClaimsModelRest.findAll().then((claims) => {
        console.log(claims);
        return claims.map(claim => ({
          claimsNumber: claim.claimsNumber,
          description: "blubli",
          claimsSum: 44556,
          claimsDate: 'now',
          state: 'closed'
        }))
      });
    }
  },

  Partner: {
    contracts(partner) {
      return ContractModelMongoose.find({'fk_partnerNumber': partner.partnerNumber}).exec().then((contract) => {
        return contract.map(contract => ({
          "policeNumber": contract['police-number'],
          "product": contract.product,
          "riskObjects": contract['risk-objects'],
          "insuranceSum": contract['insurance-sum']
        }))
      });
    }
  },

  Contract: {
    riskObjects(contract) {
      return contract.riskObjects;
    }
  }


};

export default resolvers;
