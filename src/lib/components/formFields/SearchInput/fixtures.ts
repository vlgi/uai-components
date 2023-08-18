export const complexDesserts = [
  {
    variety: "Brownie",
    topping: "Chocolate Sprinkles",
    flavor: "Cookies 'n Cream",
    rank: {
      votes: 8238,
      status: "loved",
    },
  },
  {
    variety: "Cobbler",
    topping: "Cheesecake Bites",
    flavor: "Apple",
    rank: {
      votes: 4642,
      status: "liked",
    },
  },
  {
    variety: "Brownie",
    topping: "Frosting",
    flavor: "Butter Pecan",
    rank: {
      votes: 2568,
      status: "liked",
    },
  },
  {
    variety: "Cheesecake",
    topping: "Butterscotch Syrup",
    flavor: "Caramel",
    rank: {
      votes: 7968,
      status: "loved",
    },
  },
  {
    variety: "Sweet Bread",
    topping: "Cookie Dough",
    flavor: "Green Tea",
    rank: {
      votes: 2068,
      status: "liked",
    },
  },
  {
    variety: "Cookie",
    topping: "Walnuts",
    flavor: "Cherry",
    rank: {
      votes: 386,
      status: "loved",
    },
  },
  {
    variety: "Ice Cream Cake",
    topping: "Peanut Butter",
    flavor: "Pumpkin",
    rank: {
      votes: 3302,
      status: "liked",
    },
  },
  {
    variety: "Upside Down Pineapple Cake",
    topping: "Granola",
    flavor: "Green Tea",
    rank: {
      votes: 7,
      status: "loved",
    },
  },
  {
    variety: "Sweet Bread",
    topping: "Peanuts",
    flavor: "Caramel",
    rank: {
      votes: 546,
      status: "liked",
    },
  },
  {
    variety: "Cake",
    topping: "Peanut Butter",
    flavor: "Blondie",
    rank: {
      votes: 2190,
      status: "loved",
    },
  },
];

export const simpleDesserts = [
  { text: "Torta alemã" },
  { text: "Pavê" },
  { text: "Bolo" },
  { text: "Brigadeiro" },
  { text: "Pudim" },
  { text: "Rabanada" },
  { text: "Beijinho" },
];

export const longDesserts = Array.from({ length: 20 }, (_, i) =>
  simpleDesserts.map((e) => ({ text: `${e.text} ${i}` }))
).flat();
