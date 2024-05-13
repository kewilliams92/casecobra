export const PRODUCTS_PRICES = {
  material: {
    silicone: 0,
    polycarbonate: 5_00, //easier to read and understand
  },
  finish: {
    smooth: 0,
    textured: 3_00,
  },
} as const;

//this is the base price of the product
export const BASE_PRICE = 14_00;
