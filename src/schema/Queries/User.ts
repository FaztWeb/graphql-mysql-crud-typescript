import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../TypeDefs/User";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return Users.find();
  },
};

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    const result = await Users.findOne(args.id);
    return result;
  },
};
