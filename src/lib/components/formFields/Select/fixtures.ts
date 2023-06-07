export const complexDesserts = [
  {
    id: 8238,
    uid: "e3f80973-a749-452d-b28d-18ab3c292ac1",
    variety: "Brownie",
    topping: "Chocolate Sprinkles",
    flavor: "Cookies 'n Cream",
  },
  {
    id: 4642,
    uid: "163d7644-8298-439d-b973-98123ef3f76e",
    variety: "Cobbler",
    topping: "Cheesecake Bites",
    flavor: "Apple",
  },
  {
    id: 2568,
    uid: "cc8e1fc3-9836-42ac-a789-036cf08c59c7",
    variety: "Brownie",
    topping: "Frosting",
    flavor: "Butter Pecan",
  },
  {
    id: 7968,
    uid: "3190bd87-d465-455e-9b39-d6a75dda2b1a",
    variety: "Cheesecake",
    topping: "Butterscotch Syrup",
    flavor: "Caramel",
  },
  {
    id: 2068,
    uid: "f0c31efb-47e9-4783-b87a-c2748072c2c5",
    variety: "Sweet Bread",
    topping: "Cookie Dough",
    flavor: "Green Tea",
  },
  {
    id: 386,
    uid: "c845f7eb-abbc-4d59-8875-21f41c01c907",
    variety: "Cookie",
    topping: "Walnuts",
    flavor: "Cherry",
  },
  {
    id: 3302,
    uid: "5a76f8a1-3035-46d0-8f0f-83e1f2708419",
    variety: "Ice Cream Cake",
    topping: "Peanut Butter",
    flavor: "Pumpkin",
  },
  {
    id: 7,
    uid: "699ca1b7-796f-42bc-bbaa-02e20b0320c9",
    variety: "Upside Down Pineapple Cake",
    topping: "Granola",
    flavor: "Green Tea",
  },
  {
    id: 546,
    uid: "824e205b-90d8-4f11-ab6a-58d83ce58d02",
    variety: "Sweet Bread",
    topping: "Peanuts",
    flavor: "Caramel",
  },
  {
    id: 2190,
    uid: "2974dc00-265e-4a3f-856d-3343dc99b678",
    variety: "Cake",
    topping: "Peanut Butter",
    flavor: "Blondie",
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
