// This is the file where our generated types live
// (specified in our `codegen.yml` file)
import { MyContext } from "./context";
import { Resolvers } from "./__generated__/resolvers-types";
export const resolvers: Resolvers = {
  Query: {
    async numberSix(_parent, _arg, _context: MyContext) {
      return await _context.dataSources.api.getSix();
    },
  },
};
