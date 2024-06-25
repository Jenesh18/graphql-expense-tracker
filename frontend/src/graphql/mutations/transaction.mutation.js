import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    _id
    location
    userId
    paymentType
    description
    date
    category
    amount
  }
}
`

export const UPDATE_TRANSACTION = gql`
mutation UpadteTransaction($input: UpdateTransactionInput!) {
  updateTransaction(input: $input) {
    _id
    amount
    category
    date
    description
    location
    paymentType
    userId
  }
}
`

export const DELETE_TRANSACTION = gql`
mutation DeleteTransaction($transactionId: ID!) {
  deleteTransaction(transactionId: $transactionId) {
    _id
    amount
    category
    date
    description
    location
    paymentType
    userId
  }
}
`