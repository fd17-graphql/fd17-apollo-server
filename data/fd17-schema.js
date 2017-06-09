const typeDefinitions = `

# Insurance partner
type Partner {
  partnerNumber: Int
  firstname: String!
  lastname: String!
  birthday: String!
  sex: Sex!
  contracts: [Contract]
  myClaims: [Claims]
  claimsCausedByMe: [Claims]
}

# Insurance contract
type Contract {
  policeNumber: Int
  product: String!
  riskObjects: [RiskObject]
  insuranceSum: Int!
  claims: [Claims]
  insuree: Partner
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
  state: ContractState!
  causer: Partner
  insuredPerson: Partner
  contract: Contract
}

enum Sex {
  Male
  Female
}

enum ContractState {
  clearing
  closed
  reported
}

type Query {
  partners(limit: Int, partnerNumber: Int, firstname: String, lastname: String, birthday: String, sex: String, sortBy: String, sortDesc: Boolean): [Partner]
  partner(partnerNumber: Int!): Partner
  contracts(limit: Int, policeNumber: Int, product: String, insuranceSum: Int): [Contract]
  claims(limit: Int, claimsNumber: Int, description: String, claimsDate: String, state: String, claimsSum: Int): [Claims]
  partnerWithClaimGreaterThan(value: Int!): [Partner]
}


schema {
  query: Query
}
`;

export default [typeDefinitions];
