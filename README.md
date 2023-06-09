# GQL-Apollo-Server-Typescript-Boilerplate
This project is a boilerplate for a GraphQL, Apollo Server, and Typescript backend. 

To start the project:
npm run start

To run the baseline test:
npm test

To compile the project:
npm run compile

The project is set to compile automatically on start. This is to make sure the latest is always being used.
Code gen is used and the configuration can be found in 'codegen.yml'. 
You may learn more about it at: https://github.com/dotansimha/graphql-code-generator

The default testing setup is using Jest. 
The default schema is very limited and exist just to make sure the baseline works. 
Be sure to replace the base schema, resolvers, and data sources with your own implementations.

No database connectors are included with the project.
