import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Modal from "./Modal.svelte";
import ModalForTest from "./ModalForTest.svelte";
import ModalForInceptionTest from "./ModalForInceptionTest.svelte";
import ModalForCustomScrollTest from "./ModalForCustomScrollTest.svelte";
import ModalWithHeaderIconsWrapper from "./ModalWithHeaderIcons.svelte";

export default {
  title: "Components/Modal",
  component: Modal,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ModalForTest,
    props,
    on: {
      closeModal: action("on:closeModal"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  opened: false,
});

const content = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil velit distinctio incidunt? Maiores ratione libero dolorum recusandae cum inventore officia ipsam, sunt cupiditate doloribus, reiciendis architecto praesentium ullam impedit necessitatibus?";
const largeContent = Array(40).fill(content).join("\n");
export const LongContent = Template({
  opened: false,
  content: largeContent,
});

export const Closed = Template({
  opened: false,
});

export const ModalInsideModal = () => ({
  Component: ModalForInceptionTest,
});

export const ModalInsideDivScroll = () => ({
  Component: ModalForCustomScrollTest,
});

export const ModalWithHeaderIcons = () => ({
  Component: ModalWithHeaderIconsWrapper,
  props: {
    opened: false,
  },
});
