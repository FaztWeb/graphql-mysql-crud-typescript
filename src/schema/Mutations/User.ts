import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  graphqlSync,
} from "graphql";
import { Users } from "../../Entities/Users";
import { hashPassword } from "../../libs/bcrypt";
import { UserType } from "../TypeDefs/User";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, password } = args;

    const encryptPassword = await hashPassword(password);

    console.log(encryptPassword);

    const result = await Users.insert({
      name,
      username,
      password: encryptPassword,
    });

    return { ...args, id: result.identifiers[0].id, password: encryptPassword };
  },
};

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(_: any, { id }: any) {
    const result = await Users.delete(id);
    if (result.affected! > 0) return true;
    return false;
  },
};

export const UPDATE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLString },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: () => ({
          name: { type: GraphQLString },
          username: { type: GraphQLString },
          password: { type: GraphQLString },
        }),
      }),
    },
  },
  async resolve(_: any, { id, input }: any) {
    const newPassword = await hashPassword(input.password);
    const response = await Users.update(
      { id },
      { ...input, password: newPassword }
    );

    if (response.affected === 0) return;

    const user = await Users.findOne(id);

    return user;
  },
};
