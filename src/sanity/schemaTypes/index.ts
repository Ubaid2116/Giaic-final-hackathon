import { type SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./blockContentType";
import { productTypes } from "./productType";
import { productListType } from "./productListType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productTypes, productListType],
};
