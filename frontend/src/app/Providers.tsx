"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/api/client";

const Providers = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default Providers;
