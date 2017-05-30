const typeDefinitions = `
# Insurance partner
type Partner {
  partnerNumber: String!
  firstname: String!
  lastname: String!
  birthday: String!
  sex: String!
  myContracts: [Contract]
  myClaims: [Claims]
  causedByMe: Claims
}

# Insurance contract
type Contract {
  policeNumber: String!
  product: String!
  riskObjects: String!
  insuranceSum: Int!
  insuree: Partner!
  contractClaims: [Claims]
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
  partners(limit: Int,, partnerNumber: String, firstname: String, lastname: String, birthday: String, sex: String): [Partner]
  contracts(limit: Int, policeNumber: String, product: String, riskObjects: String, insuranceSum: Int): [Contract]
  claims(limit: Int, claimsNumber: String, description: String, claimsSum: Int, claimsDate: String, state: String): [Claims]
  claim(partnerNumber: String): Claims
}


schema {
  query: Query
}
`;

export default [typeDefinitions];