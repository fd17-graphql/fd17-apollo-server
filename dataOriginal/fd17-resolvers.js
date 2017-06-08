import { PartnerConnector } from './fd17-connectors';
import { Contract } from './fd17-connectors';
import { Claims } from './fd17-connectors';

import Sequelize from 'sequelize';
import 'isomorphic-fetch';

const toJSON= res => res.json()

const endpoint='https://api.mlab.com/api/1/databases/fd2017mongodb/collections/'
const apiKey='apiKey=8CQLKPe7aPqcyHS8d0kgn3IMTz2saWSW'

const clemens = () => fetch(`${endpoint}/claims?${apiKey}`).then(toJSON)

const resolvers = {
  Query: {
    partners(_, args) {
      return PartnerConnector.findAll({ where: args });
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
    clemens(_, args) {
      return clemens;
    }
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