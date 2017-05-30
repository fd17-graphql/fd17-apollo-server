import { Partner } from './fd17-connectors';
import { Contract } from './fd17-connectors';
import { Claims } from './fd17-connectors';

import Sequelize from 'sequelize';

const resolvers = {
  Query: {
    partners(_, args) {
      return Partner.findAll({ where: args });
    },
    contracts(_, args) {
      return Contract.findAll({ where: args, order: [  ['riskObjects', 'DESC'] ] });
    },
    claims(_, args) {
      return Claims.findAll({ where: args });
    },
    claim(_, args) {
      return Claims.find({ where: args });
    },
  },
  
  Partner: {
    myContracts(partner) {
      return partner.getContracts();
    },
    myClaims(partner) {
      return partner.getClaims();
    },
    causedByMe(partner) {
      return partner.getClaim();
    }
  },
  
  Contract: {
    insuree(contract) {
      return contract.getPartner();
    },
    contractClaims(contract) {
      return contract.getClaims();
    },
  },
};

export default resolvers;