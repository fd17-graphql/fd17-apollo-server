import Mongoose from 'mongoose';

const mongo = Mongoose.connect('mongodb://admin:fd2017@ds157521.mlab.com:57521/fd2017mongodb');

const PartnerSchemaMongoose = Mongoose.Schema({
  firstname: String,
  lastname: String,
  partnerNumber: Number,
  sex: String,
  birthday: String
}, {collection: 'partners'});
const PartnerModelMongoose = Mongoose.model('partner', PartnerSchemaMongoose);

const ContractSchemaMongoose = Mongoose.Schema({
  'police-number': Number,
  'product': String,
  'risk-objects': [ { identifier: String} ],
  'insurance-sum': Number
}, {collection: 'contract'});
const ContractModelMongoose = Mongoose.model('contract', ContractSchemaMongoose);

export {PartnerModelMongoose, ContractModelMongoose};
