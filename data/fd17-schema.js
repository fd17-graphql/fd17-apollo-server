const typeDefinitions = `
# Insurance partner
type Partner {
  partnerNumber: Int
  firstname: String!
  lastname: String!
  birthday: String!
  sex: String!
}

# Insurance contract
type Contract {
  policeNumber: String!
  product: String!
  riskObjects: [RiskObject]
  insuranceSum: Int!
}
# RiskObjects
type RiskObject {
    identifier: String!
}


# Insurance claims
type Claims {
  claimsNumber: String!
  description: String
  claimsSum: Int!
  claimsDate: String!
  state: String!
}


type Query {
  partners(limit: Int,, partnerNumber: Int, firstname: String, lastname: String, birthday: String, sex: String): [Partner]
  contracts(limit: Int, policeNumber: String, product: String, insuranceSum: Int): [Contract]
}


schema {
  query: Query
}
`;

export default [typeDefinitions];
