import { gql } from 'apollo-server-express'

const physicianTypeDef = gql`

  type Physician{
    id: ID!
    email: String!
    title: String!
    phone: String!
    gender: String!
    dob: String!
  }
  
  type Query {
  physicians: [Physician]
  physician(id: ID!): Physician
}

type Mutation {
  createPhysician(email: String!, title: String!, phone: String!, gender: String!, dob: String!): Physician
}

`

export default physicianTypeDef