import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import Modal from "./Modal.svelte";
import ModalExample from "./examples/ModalForExample.svelte";
import ModalForInceptionExample from "./examples/ModalForInceptionExample.svelte";
import ModalForCustomScrollExample from "./examples/ModalForCustomScrollExample.svelte";
import ModalWithHeaderIconsWrapper from "./examples/ModalWithHeaderIcons.svelte";
import ModalForOpenOtherInsideWapper from "./examples/ModalForOpenOtherInside.svelte";

const meta = {
  title: "Components/Modal",
  component: Modal,
} satisfies Meta<Modal>;

export default meta;

type Template = TemplateObj<typeof meta, ModalExample>;
type Story = StoryObj<typeof meta, ModalExample>;

const content =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil velit distinctio incidunt? Maiores ratione libero dolorum recusandae cum inventore officia ipsam, sunt cupiditate doloribus, reiciendis architecto praesentium ullam impedit necessitatibus?";
const largeContent = Array(40).fill(content).join("\n");

const template = {
  render: (props) => ({
    Component: ModalExample,
    props,
  }),
  args: {
    disableHeader: false,
    opened: false,
    content,
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    opened: false,
    ...template.args,
  },
};

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

export const ModalInsideModal: Story = {
  render: (props) => ({
    Component: ModalForInceptionExample,
    props,
  }),
};

export const ModalInsideDivScroll: Story = {
  render: (props) => ({
    Component: ModalForCustomScrollExample,
    props,
  }),
};

export const ModalWithHeaderIcons: Story = {
  render: (props) => ({
    Component: ModalWithHeaderIconsWrapper,
    props,
  }),
  args: {
    opened: false,
  },
};

export const ModalForOpenOtherInside: Story = {
  render: (props) => ({
    Component: ModalForOpenOtherInsideWapper,
    props,
  }),
};
