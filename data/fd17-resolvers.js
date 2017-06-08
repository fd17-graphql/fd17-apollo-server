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
          state: claims.state,
          "fk_contractNumber": claims['fk_contractNumber'],
          "fk_partnerNumberInsuree": claims['fk_partnerNumberInsuree'],
          "fk_partnerNumberCauser": claims['fk_partnerNumberCauser']
        }))
      });
    }
  },

  Partner: {
    contracts(partner) {
      return ContractModelMongoose.find({ 'fk_partnerNumber': partner.partnerNumber }).exec().then((contract) => {
        return contract.map(contract => ({
          "policeNumber": contract['police-number'],
          "product": contract.product,
          "riskObjects": contract['risk-objects'],
          "insuranceSum": contract['insurance-sum'],
          "fk_partnerNumber": contract.fk_partnerNumber
        }))
      });
    },
    myClaims(partner) {
      var param = '"fk_partnerNumberInsuree":'+ partner.partnerNumber;
      console.log(param)
      return ClaimsModelRest.findByParam(param).map(claims => ({
          "claimsNumber": claims.claimsNumber,
          "description": claims.description,
          "claimsSum": claims.claimsSum,
          "claimsDate": claims.claimsDate,
          "state": claims.state,
          "fk_contractNumber": claims['fk_contractNumber'],
          "fk_partnerNumberInsuree": claims['fk_partnerNumberInsuree'],
          "fk_partnerNumberCauser": claims['fk_partnerNumberCauser']
      }))
    },
    claimsCausedByMe(partner) {
      var param = '"fk_partnerNumberCauser":'+ partner.partnerNumber;
      console.log(param)
      return ClaimsModelRest.findByParam(param).map(claims => ({
          "claimsNumber": claims.claimsNumber,
          "description": claims.description,
          "claimsSum": claims.claimsSum,
          "claimsDate": claims.claimsDate,
          "state": claims.state,
          "fk_contractNumber": claims['fk_contractNumber'],
          "fk_partnerNumberInsuree": claims['fk_partnerNumberInsuree'],
          "fk_partnerNumberCauser": claims['fk_partnerNumberCauser']
      }))
    }
  },

  Contract: {
    riskObjects(contract) {
      return contract.riskObjects;
    },
    claims(contract) {
      var param = '"fk_contractNumber":'+ contract.policeNumber;
      console.log(param)
      return ClaimsModelRest.findByParam(param).map(claims => ({
          "claimsNumber": claims.claimsNumber,
          "description": claims.description,
          "claimsSum": claims.claimsSum,
          "claimsDate": claims.claimsDate,
          "state": claims.state,
          "fk_contractNumber": claims['fk_contractNumber'],
          "fk_partnerNumberInsuree": claims['fk_partnerNumberInsuree'],
          "fk_partnerNumberCauser": claims['fk_partnerNumberCauser']
      }))
    },
    insuree(contract) {
      return PartnerModelMongoose.findOne({ 'partnerNumber': contract.fk_partnerNumber }).exec().then((insuree) => {
        return insuree
      });
    },
  },
  
  Claims: {
    causer(claims) {
      return PartnerModelMongoose.findOne({ 'partnerNumber': claims.fk_partnerNumberCauser }).exec().then((causer) => {
        return causer
      });
    },
    insuredPerson(claims) {
      return PartnerModelMongoose.findOne({ 'partnerNumber': claims.fk_partnerNumberInsuree }).exec().then((insuredPerson) => {
        return insuredPerson
      });
    },
  }
};


export default resolvers;
