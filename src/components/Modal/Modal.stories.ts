import type { ArgType } from "@storybook/addons";
import Modal from "./Modal.svelte";
import ModalForTest from "./ModalForTest.svelte";
import ModalForInceptionTest from "./ModalForInceptionTest.svelte";
import ModalForCustomScrollTest from "./ModalForCustomScrollTest.svelte";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ModalForTest,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  opened: true,
});

const content = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil velit distinctio incidunt? Maiores ratione libero dolorum recusandae cum inventore officia ipsam, sunt cupiditate doloribus, reiciendis architecto praesentium ullam impedit necessitatibus?";
const largeContent = Array(40).fill(content).join("\n");
export const LongContent = Template({
  opened: true,
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
