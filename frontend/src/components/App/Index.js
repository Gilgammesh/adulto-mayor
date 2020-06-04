import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { CssBaseline } from "@material-ui/core";
import "typeface-roboto";
import Routes from "../../routes/Index";

// Token de autorización
const token = process.env.REACT_APP_TOKEN_ADULTOMAYOR;

// Link del Servidor
const httpLink = {
  uri: process.env.REACT_APP_API_ADULTOMAYOR,
  headers: {
    authorization: `Bearer ${token}`,
  },
};

// Cliente de Apollo
const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache(),
});

const Index = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Routes />
    </ApolloProvider>
  );
};

export default Index;
