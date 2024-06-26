import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
    Query:{
      transactions: async (_,__,context) =>{
        try {
            if (!context.getUser()) throw new Error("Unauthorized");

            const userId = context.getUser()._id;
            const transactions = await Transaction.find({userId:userId});
            return transactions;


        } catch (error) {
            console.error("Error getting trasnactions:",error);
            throw new Error("Error getting trasnactions:");  
        }
      },

      transaction: async (_,{transactionId}) =>{
        try {
            const transaction = await Transaction.findById(transactionId);
            return transaction;
        } catch (error) {
            console.error("Error getting trasnaction:",error);
            throw new Error("Error getting trasnaction:");  
        }
      },

      categoryStatistics: async (_, __, context) => {
			if (!context.getUser()) throw new Error("Unauthorized");

			const userId = context.getUser()._id;
			const transactions = await Transaction.find({ userId });
			const categoryMap = {};

			transactions.forEach((transaction) => {
				if (!categoryMap[transaction.category]) {
					categoryMap[transaction.category] = 0;
				}
				categoryMap[transaction.category] += transaction.amount;
			});

			return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
			
		},


    },
    Mutation:{
        createTransaction: async (_,{input},context) =>{
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const {description, paymentType, category, amount,date,location} = input;
                if(!description || !paymentType  || !category || !amount || !date ){
                    throw new Error("All fields are required");
                }
                
                const newTransaction = new Transaction({
                   ...input,userId:context.getUser()._id
                  })
            
                  await newTransaction.save();
                  return newTransaction;

            } catch (error) {
                console.error("Error creating trasnactions:",error);
                throw new Error("Error creating trasnactions:");  
            }
        },

        updateTransaction: async (_,{input},context) =>{
            try {

                if (!context.getUser()) throw new Error("Unauthorized");
                const {transactionId ,description, paymentType, category, amount, date, location} = input;

                if(!transactionId){
                    throw new Error("transactionId is required");
                }
                
               const updateTransaction = await Transaction.findByIdAndUpdate(transactionId,input,{new:true});

               return updateTransaction;

            } catch (error) {
                console.error("Error upadting trasnactions:",error);
                throw new Error("Error upadting trasnactions:");  
            }
        },

        deleteTransaction: async (_,{transactionId},context) =>{
            try {

                if (!context.getUser()) throw new Error("Unauthorized");
                
                if(!transactionId){
                    throw new Error("transactionId is required");
                }
                
               const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);

               return deleteTransaction;

            } catch (error) {
                console.error("Error deleting trasnactions:",error);
                throw new Error("Error deleting trasnactions:");  
            }
        },
       
    },
    Transaction: {
		user: async (parent) => {
			const userId = parent.userId;
			try {
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.error("Error getting user:", err);
				throw new Error("Error getting user");
			}
		},
	},
    

};

export default transactionResolver;
