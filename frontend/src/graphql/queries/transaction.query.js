import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
query GetTransactions {
  transactions {
    _id
    amount
    category
    date
    description
    location
    paymentType
  }
}
`;

export const GET_TRANSACTION = gql`
query Query($id: ID!) {
  transaction(transactionId: $id) {
    _id
    amount
    category
    date
    description
    location
    paymentType
  }
}
`;
export const GET_TRANSACTION_STATISTICS = gql`
	query GetTransactionStatistics {
		categoryStatistics {
			category
			totalAmount
		}
	}
`;