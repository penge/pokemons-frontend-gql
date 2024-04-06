"use client";

import { ReactNode, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { Loading } from "@carbon/react";
import client from "@/api/client";

export const Providers = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={client}>
    <Suspense fallback={<Loading withOverlay={false} />}>
      {children}
    </Suspense>
  </ApolloProvider>
);
