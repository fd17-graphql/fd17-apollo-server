import Mongoose from 'mongoose';

const mongo = Mongoose.connect('mongodb://admin:fd2017@ds157521.mlab.com:57521/fd2017mongodb');


const PartnerSchemaMongoose = Mongoose.Schema({
  firstname: String,
  lastname: String
}, {collection: 'partner'});

const PartnerModelMongoose = Mongoose.model('partner', PartnerSchemaMongoose);

export {PartnerModelMongoose};
