import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App, { Container } from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider, Loading } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";
import "@shopify/polaris/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import React from "react";

const client = new ApolloClient({
  fetchOptions: {
    credentials: "include",
  },
});
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const shopOrigin = Cookies.get("shopOrigin");
    const config = {
      apiKey: API_KEY,
      shopOrigin: shopOrigin,
      forceRedirect: true,
    };
    const isTheAppLoading = () => {
      return false;
    };
    const loading = isTheAppLoading();

    return (
      <Container>
        <AppProvider i18n={translations}>
          <Provider config={config}>
            <ApolloProvider client={client}>
              {!loading ? <Component {...pageProps} /> : <Loading />}
            </ApolloProvider>
          </Provider>
        </AppProvider>
      </Container>
    );
  }
}

export default MyApp;
