import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    enum Gender {
        Male
        Female
    }

    type Physician {
        id: ID!
        email: String
        title: String
        phone: String
        gender: Gender
        dob: String
    }

    type AddressInfo {
        address: String
        city: String
        state: String
        country: String
    }

    type Patient {
        id: ID!
        email: String
        phone: String
        gender: Gender
        dob: String
        physician: Physician
        addressInfo: AddressInfo
    }

    type Query {
        patients(page: Int, limit: Int): [Patient]
        patient(id: ID!): Patient
        physicians: [Physician] 
    }

    type Mutation {
        createPhysician(email: String!, title: String!, phone: String!, gender: Gender!, dob: String!): Physician
        createPatient(email: String!, phone: String!, gender: Gender!, dob: String!, physician: ID!, addressInfo: AddressInput): Patient
        updatePatient(id: ID!, email: String, phone: String, gender: Gender, dob: String, physician: ID, addressInfo: AddressInput): Patient
        deletePatient(id: ID!): Boolean
    }

    input AddressInput {
        address: String
        city: String
        state: String
        country: String
    }
`