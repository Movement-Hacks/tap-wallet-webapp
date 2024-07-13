import { gql } from "@apollo/client"
import { GameEntity } from "../entities.backend"
import { buildPayloadString } from "./builder.graphql"
import { client } from "./client.graphql"
import { GraphQLParams } from "./constants.graphql"
import { DeepPartial } from "@apollo/client/utilities"

export interface LoadInput {
  address: string;
}
export type LoadParams = GraphQLParams<LoadInput, GameEntity>;

export const load = async ({
    input,
    schema,
}: LoadParams): Promise<DeepPartial<GameEntity>> => {
    const payload = buildPayloadString(schema)
    const { data } = await client.query({
        query: gql`
            query Load($input: LoadInput!) {
  load(input: $input) {
  game {
        ${payload}
        }
    }
  }
          `,
        variables: {
            input,
        },
    })

    return data.load.game
}
