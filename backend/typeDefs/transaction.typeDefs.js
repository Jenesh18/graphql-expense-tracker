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
    user: User!

   }


   type CategoryStatistics {
    category: String!
    totalAmount: Float!
  }
   
   type Query {
    transactions: [Transaction!]
    transaction(transactionId:ID!): Transaction
    categoryStatistics: [CategoryStatistics!]
   }

   type Mutation{
      createTransaction(input: CreateTransactionInput!):Transaction!
      updateTransaction(input: UpdateTransactionInput!):Transaction!
      deleteTransaction(transactionId: ID!):Transaction!
 
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