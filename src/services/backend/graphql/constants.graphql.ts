import { DeepPartial } from "@apollo/client/utilities"
import { Schema } from "./builder.graphql"

export const GRAPHQL_URL = process.env.REACT_APP_BACKEND_GRAPHQL_URL

export interface GraphQLParams<Input, SchemaType> {
  input: Input;
  schema: Schema<DeepPartial<SchemaType>>;
}
