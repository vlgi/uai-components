import type { TMenuItem, TBottomMenuItem } from "./types";

export const items: TMenuItem[] = [
  {
    type: "item",
    icon: "icon-proposal",
    text: "Home",
    path: "./",
  },
  {
    type: "group",
    icon: "icon-proposal",
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
    icon: "icon-proposal",
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
    icon: "icon-proposal",
    text: "Expansão",
    path: "./",
  },
  {
    type: "item",
    icon: "icon-proposal",
    text: "Financeiro",
    path: "./",
  },
  {
    type: "item",
    icon: "icon-proposal",
    text: "Nome que cabe aqui de boa",
    path: "./",
  },
];

export const bottomItems: TBottomMenuItem[] = [
  {
    icon: "icon-search",
    text: "Configurações",
    path: "./",
  },
];
