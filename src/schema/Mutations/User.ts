import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  graphqlSync,
} from "graphql";
import { Users } from "../../Entities/Users";
import { hashPassword, comparePassword } from "../../libs/bcrypt";
import { MessageType } from "../TypeDefs/Message";
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
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: any) {
    const result = await Users.delete(id);
    if (result.affected! > 0) return true;
    return false;
  },
};

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: () => ({
          name: { type: GraphQLString },
          username: { type: GraphQLString },
          oldPassword: { type: GraphQLString },
          newPassword: { type: GraphQLString },
        }),
      }),
    },
  },
  async resolve(_: any, { id, input }: any) {
    const userFound = await Users.findOne(id);

    const isMatch = await comparePassword(
      userFound?.password as string,
      input.oldPassword
    );

    if (!isMatch) throw new Error("Passwords does not match");

    const newPassword = await hashPassword(input.newPassword);

    const response = await Users.update(
      { id },
      { username: input.username, name: input.username, password: newPassword }
    );

    if (response.affected === 0) return;

    return {
      success: true,
      message: "Update User successfully",
    };
  },
};
