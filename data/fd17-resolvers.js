import { PartnerModelMongoose } from './fd17-mongoConnector';
import { ContractModelMongoose } from './fd17-mongoConnector';
import { ClaimsModelRest } from './fd17-restConnector';

const resolvers = {
  Query: {
    partners(_, args) {
      var limit = 0;
      if (args.limit) {
        limit = args.limit;
        delete args["limit"];
      }
      return PartnerModelMongoose.find(args).limit(limit).exec().then((partner) => {
        return (partner)
      });
    },
    partner(_, args) {
      return PartnerModelMongoose.findOne(args).exec().then((partner) => {
        return (partner)
      });
    },
    contracts(_, args) {
      var argsNew = mapContractsArgs(args);
      var limit = 0;
      if (argsNew.limit) {
        limit = argsNew.limit;
        delete argsNew["limit"];
      }
      return ContractModelMongoose.find(argsNew).limit(limit).exec().then((contract) => {
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
      return ClaimsModelRest.findAll(args).then((claims) => {
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
    },
    partnerWithClaimGreaterThan(_, args) {
      return ClaimsModelRest.findByClaimsSumGreater(args['value']).then((claims) => {
        var pn= claims.map(claim => claim.fk_partnerNumberInsuree);
        var guments= {partnerNumber : { $in: pn}}
        return PartnerModelMongoose.find(guments);
      })
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
    contract(claims) {
      return ContractModelMongoose.findOne({ 'police-number': claims.fk_contractNumber }).exec().then((contract) => {
        var result = {};
        result.policeNumber = contract['police-number'];
        result.product = contract.product,
        result.riskObjects = contract['risk-objects'],
        result.insuranceSum = contract['insurance-sum'],
        result.fk_partnerNumber = contract.fk_partnerNumber
        return result
      });
    }
  }
};


export default resolvers;

function mapContractsArgs(args) {
  var argsNew = args;
  for (var key in args) {
    if (key === 'policeNumber') {
      argsNew['police-number'] = args[key];
      delete argsNew[key];
    }
    if (key === 'insuranceSum') {
      argsNew['insurance-sum'] = args[key];
      delete argsNew[key];
    }
  }
  return argsNew;
}
