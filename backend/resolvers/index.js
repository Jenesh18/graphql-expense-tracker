import { mergeResolvers } from "@graphql-tools/merge";

// resolvers
import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";

const mergedResolvers = mergeResolvers([userResolver,transactionResolver]);

export default mergedResolvers;