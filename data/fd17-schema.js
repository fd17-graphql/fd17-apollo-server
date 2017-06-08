const typeDefinitions = `

# Insurance partner
type Partner {
  partnerNumber: Int
  firstname: String!
  lastname: String!
  birthday: String!
  sex: String!
  contracts: [Contract]
  myClaims: [Claims]
  claimsbyMe: [Claims]
}

# Insurance contract
type Contract {
  policeNumber: Int
  product: String!
  riskObjects: [RiskObject]
  insuranceSum: Int!
  fk_partnerNumber: Int
  claims: [Claims]
  partner: Partner
}
# RiskObjects
type RiskObject {
    identifier: String!
}


# Insurance claims
type Claims {
  claimsNumber: Int
  description: String
  claimsSum: Int!
  claimsDate: String!
  state: String!
  fk_partnerNumberInsuree: Int
  fk_partnerNumberCauser: Int
  fk_contractNumber: Int
}


type Query {
  partners(limit: Int, partnerNumber: Int, firstname: String, lastname: String, birthday: String, sex: String): [Partner]
  contracts(limit: Int, policeNumber: Int, product: String, insuranceSum: Int): [Contract]
  claims(limit: Int,, claimsNumber: Int): [Claims]
}


schema {
  query: Query
}
`;

export default [typeDefinitions];
