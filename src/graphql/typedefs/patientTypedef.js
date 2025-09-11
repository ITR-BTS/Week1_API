import { gql } from 'apollo-server-express'

const patientTypeDef = gql`

  type AddressInfo{
    address: String!
    city: String!
    state: String!
    country: String!
  }

  type Patient{
      id: ID!
      email: String!
      phone: String!
      gender: String!
      dob: String!
      physician: Physician!
      addressInfo: AddressInfo!
  }

  type PatientList {
    data: [Patient]
    pageSize: Int
    total: Int
    page: Int
    totalPages: Int
  }

  type Query {
    patients(page: Int, limit: Int, action: PatientQueryAction): PatientList
    patientByEmail(email: String!): [Patient]
    patientDetails(id: ID!): Patient
  }

  type Mutation {
    createPatient(email: String!, phone: String!, gender: String!, dob: String!, physician: ID!, addressInfo: AddressInput!): Patient
    updatePatient(id: ID!, input: UpdatePatientInput!): Patient
    deletePatient(id: ID!): Boolean
  }

  input PatientQueryAction {
    gender: String
    sortEmail: String
    sortPhyEmail: String
  }

  input UpdatePatientInput {
    email: String
    phone: String
    dob: String
    physician: ID
    addressInfo: AddressInput
  }

  input AddressInput {
    address: String!
    city: String!
    state: String!
    country: String!
  }
`

export default patientTypeDef