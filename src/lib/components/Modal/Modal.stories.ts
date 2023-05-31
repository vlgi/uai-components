import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import Modal from "./Modal.svelte";
import ModalForTest from "./ModalForTest.svelte";
import ModalForInceptionTest from "./ModalForInceptionTest.svelte";
import ModalForCustomScrollTest from "./ModalForCustomScrollTest.svelte";
import ModalWithHeaderIconsWrapper from "./ModalWithHeaderIcons.svelte";
import ModalForOpenOtherInsideWapper from "./ModalForOpenOtherInside.svelte";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"], // enable auto docs
} satisfies Meta<Modal>;

export default meta;

type Template = TemplateObj<typeof meta, ModalForTest>;
type Story = StoryObj<typeof meta, ModalForTest>;

const template = {
  render: (props) => ({
    Component: ModalForTest,
    props,
  }),
  args: {
    // common stuff for template stories here
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    opened: false,
    ...template.args,
  },
};

const content =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil velit distinctio incidunt? Maiores ratione libero dolorum recusandae cum inventore officia ipsam, sunt cupiditate doloribus, reiciendis architecto praesentium ullam impedit necessitatibus?";
const largeContent = Array(40).fill(content).join("\n");

export const LongContent: Story = {
  ...template,
  args: {
    opened: false,
    content: largeContent,
    ...template.args,
  },
};

export const Closed: Story = {
  ...template,
  args: {
    opened: false,
    ...template.args,
  },
};

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

export const ModalForOpenOtherInside = () => ({
  Component: ModalForOpenOtherInsideWapper,
});
