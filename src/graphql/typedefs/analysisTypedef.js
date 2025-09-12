import {gql} from "apollo-server-express";

const type = `
    type PercentGenderType {
        male: Int!
        female: Int!
        other: Int
    }

    type DistributeAgeType {
        ageType: String!
        value: Int!
    }
`;

const analysisTypeDef = gql`
    ${type}

    type Query {
        percentGender: PercentGenderType!
        distributeAge: [DistributeAgeType]!
    }
`;

export default analysisTypeDef;