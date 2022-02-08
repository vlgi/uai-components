import type { TMenuItem, TBottomMenuItem } from "./types";

export const items: TMenuItem[] = [
  {
    type: "item",
    icon: "icon-account",
    text: "Home",
    path: "./",
  },
  {
    type: "group",
    icon: "icon-account",
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
    icon: "icon-account",
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
    icon: "icon-account",
    text: "Expansão",
    path: "./",
  },
  {
    type: "item",
    icon: "icon-account",
    text: "Financeiro",
    path: "./",
  },
  {
    type: "item",
    icon: "icon-account",
    text: "Nome que cabe aqui de boa",
    path: "./",
  },
];

export const bottomItems: TBottomMenuItem[] = [
  {
    icon: "icon-cog",
    text: "Configurações",
    path: "./",
  },
];
