import { PartnerModelMongoose } from './fd17-mongoConnector';
import { ContractModelMongoose } from './fd17-mongoConnector';
import { ClaimsModelRest } from './fd17-restConnector';

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
        return claims.map(claims => ({
          claimsNumber: claims.claimsNumber,
          description: claims.description,
          claimsSum: claims.claimsSum,
          claimsDate: claims.claimsDate,
          state: claims.state
        }))
      });
    }
  },
//test
  Partner: {
    contracts(partner) {
      return ContractModelMongoose.find({ 'fk_partnerNumber': partner.partnerNumber }).exec().then((contract) => {
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
