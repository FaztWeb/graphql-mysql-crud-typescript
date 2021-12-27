import { GraphQLString } from "graphql";

export const GREETING = {
  type: GraphQLString,
  args: {
    name: { type: GraphQLString },
  },
  resolve(_: any, args: any) {
    return `Hello ${args.name}`;
  },
};
