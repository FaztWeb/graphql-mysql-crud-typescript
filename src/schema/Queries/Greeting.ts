import { GraphQLNonNull, GraphQLString } from "graphql";

export const GREETING = {
  type: GraphQLString,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(_: any, args: any) {
    return `Hello ${args.name}`;
  },
};
