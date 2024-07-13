import {
    ApolloClient,
    DefaultOptions,
    InMemoryCache,
    createHttpLink,
    from,
} from "@apollo/client"
import { GRAPHQL_URL } from "./constants.graphql"

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
}

const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
})

export const client = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
    defaultOptions,
})
