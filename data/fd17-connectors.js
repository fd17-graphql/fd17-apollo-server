import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';


// ** Sequelize with Casual **
const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const PartnerModel = db.define('partner', {
  partnerNumber: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  firstname: { type: Sequelize.STRING, allowNull: false },
  lastname: { type: Sequelize.STRING, allowNull: false},
  birthday: { type: Sequelize.DATE, allowNull: false },
  sex: { type: Sequelize.STRING, allowNull: false },
});

const ContractModel = db.define('contract', {
  policeNumber: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  product: { type: Sequelize.STRING, allowNull: false },
  riskObjects: { type: Sequelize.STRING, allowNull: false }, 
  insuranceSum: { type: Sequelize.INTEGER, allowNull: false }, 
});

const ClaimsModel = db.define('claims', {
  claimsNumber: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  description: { type: Sequelize.STRING },
  claimsSum: { type: Sequelize.INTEGER, allowNull: false },
  claimsDate: { type: Sequelize.DATE, allowNull: false },
  state: { type: Sequelize.STRING },
});


PartnerModel.hasMany(ContractModel);
PartnerModel.hasMany(ClaimsModel);

ContractModel.belongsTo(PartnerModel);
ContractModel.hasMany(ClaimsModel);

PartnerModel.hasOne(ClaimsModel, {as: 'causedByMe'});


// create mock data with a seed, so we always get the same
casual.seed(123);
var dateFormat = 'YYYY-MM-DD';
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return PartnerModel.create({
      partnerNumber: casual.uuid,
      firstname: casual.first_name,
      lastname: casual.last_name,
      birthday: casual.date(dateFormat),
      sex: casual.random_element(['male', 'female']),
    }).then((partner) => {
      _.times(Math.floor((Math.random() * 5) + 1), () => {
          return partner.createContract({
          policeNumber: casual.uuid,
          product: `${partner.firstname}'s contract. ` + casual.sentences(3),
          riskObjects: casual.random_element(['car', 'bike', 'little red pony', '']) + "," + casual.random_element(['house', 'jewelry', 'art', '']),
          insuranceSum: casual.random_value({ a: 1000000, b: 250000, c: 500000, d: 100000, e: 200000, f: 350000, g: 2000000, h: 50000, i: 25000, j: 750000  }),
          
        })
      })
    }).then((contract) => {
       _.times(Math.floor((Math.random() * 2)), () => {
         return ClaimsModel.create({
         //return contract.createClaims({
          claimsNumber: casual.uuid,
          description: casual.sentences(3),
          claimsSum: casual.random_value({a: 10000000, b: 250000, c: 1000, d: 100000, e: 10000, f: 50000, g: 25000, h: 300000}),
          claimsDate: casual.date(dateFormat),
          state: casual.random_element(['reported', 'clearing', 'closed']),
        })
       })
    })

  });
});

const Partner = db.models.partner;
const Contract = db.models.contract;
const Claims = db.models.claims;
// ** END Sequelize with Casual **

export { Partner, Contract, Claims };