import { type SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productTypes } from "./productType";
import { productListType } from "./productListType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productTypes, productListType],
};
