import Mongoose from 'mongoose';

const mongo = Mongoose.connect('mongodb://admin:fd2017@ds157521.mlab.com:57521/fd2017mongodb');

const PartnerSchemaMongoose = Mongoose.Schema({
  firstname: String,
  lastname: String,
  partnerNumber: Number,
  sex: String,
  birthday: String
}, {collection: 'partners'});
const PartnerModelMongoose = Mongoose.model('Partner', PartnerSchemaMongoose);

const ContractSchemaMongoose = Mongoose.Schema({
  'police-number': Number,
  'product': String,
  'risk-objects': [ { identifier: String} ],
  'insurance-sum': Number,
  'fk_partnerNumber' : Number
}, {collection: 'contracts'});
const ContractModelMongoose = Mongoose.model('Contract', ContractSchemaMongoose);


export {PartnerModelMongoose, ContractModelMongoose};
