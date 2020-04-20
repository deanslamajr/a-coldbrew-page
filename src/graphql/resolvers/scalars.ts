import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const scalars = {
  // @see https://www.apollographql.com/docs/graphql-tools/scalars/#using-a-package
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value: number): Date {
      return new Date(value); // value from the client
    },
    serialize(value: Date): number {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};
