import type { ArgType } from "@storybook/addons";
import SideMenu from "./SideMenu.svelte";
import { items, bottomItems } from "./fixtures";
import collapsedLogoImg from "../../assets/img/logo.png";
import expandedLogoImg from "../../assets/img/logo-marca.png";
import type { TBottomMenuItem, TMenuItem } from "./types";

export default {
  title: "Components/SideMenu",
  component: SideMenu,
  parameters: {
    // skip all screen test for button stories
    creevey: {
      skip: true,
    },
    storyshots: false,
    docs: {
      page: null,
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: SideMenu,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  items,
});

export const mobileMode = Template({
  mobileMode: true,
  collapsedLogoImg,
  expandedLogoImg,
  items,
});

export const Scroll = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  items: [
    ...items,
    ...items,
    ...items,
  ],
});

const itemActiveItems: TMenuItem[] = [
  {
    type: "item",
    icon: "material-symbols:person",
    text: "My active item",
    isActive: true,
    path: "./",
  },
  ...items.slice(1, items.length),
];
export const ItemActive = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  items: itemActiveItems,
});

const groupActiveItems: TMenuItem[] = [
  {
    type: "group",
    icon: "material-symbols:person",
    text: "My Group Active",
    items: [
      {
        text: "Item 3",
        path: "./",
      },
      {
        text: "My Sub Item Active",
        path: "./",
        isActive: true,
      },
      {
        text: "Item 3",
        path: "./",
      },
    ],
  },
  ...items.slice(1, items.length),
];
export const GroupActive = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  items: groupActiveItems,
});

export const BottomItems = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  items,
  bottomItems,
});

export const BottomItemsScroll = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  bottomItems,
  items: [
    ...items,
    ...items,
    ...items,
  ],
});

export const MultipleBottomItems = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  bottomItems: [
    ...bottomItems,
    ...bottomItems,
  ],
  items,
});

const bottomItemsActiveItems: TBottomMenuItem[] = [
  {
    ...bottomItems[0],
    isActive: true,
  },
];
export const BottomItemsActive = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  items,
  bottomItems: bottomItemsActiveItems,
});
