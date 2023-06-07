import type { Meta, StoryObj } from "@storybook/svelte";
import { items, bottomItems } from "./fixtures";
import collapsedLogoImg from "$assets/img/logo.png";
import expandedLogoImg from "$assets/img/logo-marca.png";
import SideMenu from "./SideMenu.svelte";
import type { TBottomMenuItem, TMenuItem } from "./types";

const meta = {
  title: "Components/SideMenu",
  component: SideMenu,
} satisfies Meta<SideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mobileMode: false,
    collapsedLogoImg,
    expandedLogoImg,
    items,
  },
};

export const MobileMode: Story = {
  args: {
    mobileMode: true,
    collapsedLogoImg,
    expandedLogoImg,
    items,
  },
};

export const Scroll: Story = {
  args: {
    mobileMode: false,
    collapsedLogoImg,
    expandedLogoImg,
    items: [...items, ...items, ...items],
  },
};

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

export const ItemActive: Story = {
  args: {
    mobileMode: false,
    collapsedLogoImg,
    expandedLogoImg,
    items: itemActiveItems,
  },
};

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

export const GroupActive: Story = {
  args: {
    mobileMode: false,
    collapsedLogoImg,
    expandedLogoImg,
    items: groupActiveItems,
  },
};

export const BottomItems: Story = {
  args: {
    mobileMode: false,
    collapsedLogoImg,
    expandedLogoImg,
    items,
    bottomItems,
  },
};

export const BottomItemsScroll: Story = {
  args: {
    mobileMode: false,
    collapsedLogoImg,
    expandedLogoImg,
    bottomItems,
    items: [...items, ...items, ...items],
  },
};

export const MultipleBottomItems: Story = {
  args: {
    mobileMode: false,
    collapsedLogoImg,
    expandedLogoImg,
    items,
    bottomItems: [...bottomItems, ...bottomItems],
  },
};

const bottomItemsActiveItems: TBottomMenuItem[] = [
  {
    ...bottomItems[0],
    isActive: true,
  },
];

export const BottomItemsActive: Story = {
  args: {
    mobileMode: false,
    collapsedLogoImg,
    expandedLogoImg,
    items,
    bottomItems: bottomItemsActiveItems,
  },
};
