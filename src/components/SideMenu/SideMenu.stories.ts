import type { ArgType } from "@storybook/addons";
import SideMenu from "./SideMenu.svelte";
import { items } from "./fixtures";
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
