const { buildSchema } = require("graphql");
module.exports = buildSchema(`
type User{
    _id: ID!
    username: String!
    password: String!
}

type Item{
    _id:ID!
    value: String!
    done:Boolean!
}

input UserInput{
    username:String!
    password:String!
}

input ItemInput{
    _id:ID
    value:String!
    done:Boolean!
}

type RootQuery{
    user:User!
    items:[Item]
}

type RootMutation{
    createUser(userInput: UserInput):User
    createItem(itemInput: ItemInput):Item
    updateItem(itemInput: ItemInput):Boolean
    clearItems(delete: Boolean):Boolean
    deleteItem(_id:ID!):Boolean
}

schema{
    query:RootQuery
    mutation: RootMutation
}
`);
