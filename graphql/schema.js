const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Post {
        _id: ID!
        title: String!
        estate: String!
        purpose: String
        market: String
        heating: String
        price: Int!
        area: Int!
        year: Int!
        availability: String!
        place: String!
        rooms: Int
        level: Int
        garage: Boolean
        balcony: Boolean
        lift: Boolean
        ac: Boolean
        basement: Boolean
        storage: Boolean
        description: String!
        imagePath: String!
        number: String!
        pricePerSquareMeter: Int!
        createdAt: String!
        updatedAt: String!
        creator: String!
    }

    type PlotPost {
        _id: ID!
        title: String!
        estate: String!
        price: Int!
        area: Int!
        place: String!
        description: String!
        imagePath: String!
        number: String!
        pricePerSquareMeter: Int!
        createdAt: String!
        updatedAt: String!
        creator: String!
    }

    type SearchPost {
        _id: ID!
        title: String!
        price: Int!
        area: Int!
        estate: String!
        purpose: String!
        market: String!
        place: String!
        imagePath: String!
        level: Int
        rooms: Int
        year: Int!
        pricePerSquareMeter: Int
        garage: Boolean
        balcony: Boolean
        lift: Boolean
        ac: Boolean
        basement: Boolean
        storage: Boolean
        heating: String
    }

    input SearchInput {
        estate: String!
        purpose: String!
        market: String!
        place: String!
        minPrice: Int
        maxPrice: Int
        minArea: Int
        maxArea: Int
        level: Int
        rooms: Int
        minYearBuilt: Int
        maxYearBuilt: Int
        minPricePerSquareMeter: Int
        maxPricePerSquareMeter: Int
        garage: Boolean
        balcony: Boolean
        lift: Boolean
        ac: Boolean
        basement: Boolean
        storage: Boolean
        heating: String
    }

    input PostInput {
        title: String!
        estate: String!
        purpose: String
        market: String
        heating: String
        price: Int!
        area: Int!
        year: Int!
        availability: String!
        place: String!
        rooms: Int
        level: Int
        garage: Boolean
        balcony: Boolean
        lift: Boolean
        ac: Boolean
        basement: Boolean
        storage: Boolean
        description: String!
        imagePath: String!
        number: String!
        pricePerSquareMeter: Float
    }

    input PlotPostInput {
        title: String!
        estate: String!
        price: Int!
        area: Int!
        place: String!
        description: String!
        imagePath: String!
        number: String!
        pricePerSquareMeter: Int
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
        plotPosts: [PlotPost!]!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type RootQuery {
        getApartmentPosts: [Post!]!
        getHousePosts: [Post!]!
        getPlotPosts: [PlotPost!]!
        singlePost(id: ID!): Post!
        singlePlotPost(id: ID!): PlotPost!
        getMatchingPosts(searchInput: SearchInput): [SearchPost!]!
        getUserPosts(userId: ID!): [Post!]!
        getUserName(userId: ID!) : String!
    }

    type RootMutation {
        createPost(postInput: PostInput): Post
        createPlotPost(plotPostInput: PlotPostInput): PlotPost
        createUser(userInput: UserInputData): User
        login(email: String!, password: String!): AuthData!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
