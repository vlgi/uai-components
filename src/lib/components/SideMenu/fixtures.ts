import type { TMenuItem, TBottomMenuItem } from "./types";

export const items: TMenuItem[] = [
  {
    type: "item",
    icon: "material-symbols:person",
    text: "Home",
    path: "./",
  },
  {
    type: "group",
    icon: "material-symbols:person",
    text: "Dashboard",
    items: [
      {
        text: "Big numbers",
        path: "./",
      },
      {
        text: "NPS",
        path: "./",
      },
      {
        text: "incentivo",
        path: "./",
      },
    ],
  },
  {
    type: "group",
    icon: "material-symbols:person",
    text: "Assessores",
    items: [
      {
        text: "Meus clientes",
        path: "./",
      },
    ],
  },
  {
    type: "item",
    icon: "material-symbols:person",
    text: "Expansão",
    path: "./",
  },
  {
    type: "item",
    icon: "material-symbols:person",
    text: "Financeiro",
    path: "./",
  },
  {
    type: "item",
    icon: "material-symbols:person",
    text: "Nome que cabe aqui de boa",
    path: "./",
  },
];

export const bottomItems: TBottomMenuItem[] = [
  {
    icon: "mdi:gear",
    text: "Configurações",
    path: "./",
  },
];
