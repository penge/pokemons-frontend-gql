# Coding Exercise Frontend

The goal was to implement **GraphQL Pokemon Client** ([frontend](./frontend/)) as defined in [EXERCISE](./EXERCISE.md).

> I have to say, I've enjoyed this exercise immensely! 😊 Please, see Notes below on how I decided to solve it.

## Notes

After getting a good understanding of the needed tools and approach, I have:

- Initialized a new [Next.js](https://nextjs.org/) project with the following settings:
  - [TypeScript](https://www.typescriptlang.org/)
  - [ESLint](https://eslint.org/)
  - [`src`](https://nextjs.org/docs/app/building-your-application/configuring/src-directory) directory
  - [App Router](https://nextjs.org/docs/app)
  - default import alias (`@/*`)
- Installed [Carbon](https://carbondesignsystem.com/),
- Installed [Apollo Client](https://www.apollographql.com/docs/react/),
- And set up the development environment with [EditorConfig](https://editorconfig.org/), [ESLint](https://eslint.org/) (included in Next.js) and [Stylelint](https://stylelint.io/), and updated the scripts accordingly.

The next major step ahead of me was to prepare [_Queries_](./frontend/src/api/queries/) and [_Mutations_](./frontend/src/api/mutations/). I have prepared and tested them in [Insomnia](https://insomnia.rest/).
I then used [codegen](https://www.graphql-cli.com/codegen/) to generate all necessary Types, Operations, and Hooks.
Because the GraphQL server supports GraphQL Introspection, it was used to generate the schema, and so it didn't have to be copy-pasted into the project.
The result of the generation can be found under the directory [generated](./frontend/src/api/generated/).

> The main benefit in using _codegen_, besides faster developer experience, is to ensure type safety in _Queries_ (and _Mutations_) where we prevent accidentally accessing field that wasn't queried (or was queried but under a different name), or trying to call some operation on a wrong type.

Once this was all ready, I have implemented **Index** page, and **Detail** page.

At the end, I have added example tests. I have used [Vitest](https://vitest.dev/) for unit tests, and [Playwright](https://playwright.dev/) for end-to-end tests. As this is something that could be improved for quite some time, I have picked what I found most important to test.

### Technical challenges

Updating the Apollo Cache for **Favorites**, particularly when combined with infinite scrolling, was challenging.
I tackled this using `cache.modify`, `storeFieldName`, and the `merge` function.

There is [no useNotification hook](https://github.com/carbon-design-system/carbon/issues/8405) (in Carbon), so
I decided to manage notifications using [Reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables), as we use Apollo Client already.

<br>

I hope you like the solution. Let me know! 👋