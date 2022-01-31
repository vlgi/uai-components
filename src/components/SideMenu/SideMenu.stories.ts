import type { ArgType } from "@storybook/addons";
import SideMenu from "./SideMenu.svelte";
import { items, bottomItems } from "./fixtures";
import collapsedLogoImg from "../../assets/img/logo.png";
import expandedLogoImg from "../../assets/img/logo-marca.png";

export default {
  title: "Components/SideMenu",
  component: SideMenu,
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

export const ItemActive = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  items: [
    {
      type: "item",
      icon: "icon-proposal",
      text: "My active item",
      isActive: true,
    },
    ...items.slice(1, items.length),
  ],
});

export const GroupActive = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  items: [
    {
      type: "group",
      icon: "icon-proposal",
      text: "My Group Active",
      items: [
        {
          type: "item",
          text: "Item 3",
        },
        {
          type: "item",
          text: "My Sub Item Active",
          isActive: true,
        },
        {
          type: "item",
          text: "Item 3",
        },
      ],
    },
    ...items.slice(1, items.length),
  ],
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

export const BottomItemsActive = Template({
  mobileMode: false,
  collapsedLogoImg,
  expandedLogoImg,
  items,
  bottomItems: [
    {
      ...bottomItems[0],
      isActive: true,
    },
  ],
});
