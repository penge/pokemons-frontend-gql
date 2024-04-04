import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/api/queries/**", "src/api/mutations/**"],
  generates: {
    "src/api/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
    },
  },
};

export default config;
