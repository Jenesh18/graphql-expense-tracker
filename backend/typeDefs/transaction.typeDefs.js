const transactionTypedef =`#graphql
   type Transaction{
    _id:ID!
    userId:ID!
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String
    date:String!
   }
   
   type Query {
     transaction: Transaction
     transaction(transactionId: ID!): Transaction
     // TODO => ADD catagoryStatics

   }

   type Mutation{
      createTransaction(input: CreateTransactionInput!):Transaction!
      updateTransaction(input: UpdateTransactionInput!):Transaction!
      deleteTransaction(transactionId: ID!):Transaction!

      
      // Todo => add transaction/user relationship 
   }

   input CreateTransactionInput {
     description:String!
     paymentType:String!
     category:String!
     amount:Float!
     location:String
     date:String!
   }

   input UpdateTransactionInput{
     transactionId: ID!
     description:String
     paymentType:String
     category:String
     amount:Float
     location:String
     date:String
   } 

`
export default transactionTypedef ;