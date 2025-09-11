// import { gql } from 'apollo-server-express'

// const typeDefs = gql`
//   scalar Date

//   type AddressInfo{
//     address: String!
//     city: String!
//     state: String!
//     country: String!
//   }

//   type Physician{
//     id: ID!
//     email: String!
//     title: String!
//     phone: String!
//     gender: String!
//     dob: String!
//   }
//   type Patient{
//     id: ID!
//     email: String!
//     phone: String!
//     gender: String!
//     dob: String!
//     physician: Physician!
//     addressInfo: AddressInfo!
//   }
//   type Query {
//   physicians: [Physician]
//   physician(id: ID!): Physician
//   patients: [Patient]
//   patientByEmail(email: String!): Patient
// }

// type Mutation {
//   createPhysician(email: String!, title: String!, phone: String!, gender: String!, dob: String!): Physician
//   createPatient(email: String!, phone: String!, gender: String!, dob: String!, physician: ID!, addressInfo: AddressInput!): Patient
//   updatePatient(id: ID!, input: UpdatePatientInput!): Patient
//   deletePatient(id: ID!): Boolean
//   deletePhysician(id: ID!): Boolean
// }

// input UpdatePatientInput {
//   email: String
//   phone: String
//   dob: String
//   physician: ID
//   addressInfo: AddressInput
// }

// input AddressInput {
//   address: String!
//   city: String!
//   state: String!
//   country: String!
// }
// `

// export { typeDefs }