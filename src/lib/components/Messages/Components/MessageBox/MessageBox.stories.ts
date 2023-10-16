import type { Meta, StoryObj } from "@storybook/svelte";
import MessageBox from "./MessageBox.svelte";
import type { TMessage } from "./types";

const meta = {
  title: "Components/MessageBox",
  component: MessageBox,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<MessageBox<TMessage>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    messages: [
      {
        id: 1,
        userId: 1,
        userName: "João",
        text: "texto do João sobre algo",
      },
      {
        id: 2,
        userId: 2,
        userName: "Claudio",
        text: "texto do Claudio sobre outra coisa",
      },
    ],
  },
};

export const withImage: Story = {
  args: {
    messages: [
      {
        id: 1,
        userId: 1,
        userName: "João",
        userImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm11Quu24mHpvW7fKnJOH4dS5v7-9wUfkHySSf4hI&s",
        text: "texto do João sobre algo",
      },
      {
        id: 2,
        userId: 2,
        userName: "Claudio",
        userImage: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        text: "texto do Claudio sobre outra coisa",
      },
    ],
  },
};

export const myTextOnRight: Story = {
  args: {
    messages: [
      {
        id: 1,
        userId: 1,
        userName: "João",
        userImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm11Quu24mHpvW7fKnJOH4dS5v7-9wUfkHySSf4hI&s",
        text: "texto do João sobre algo",
      },
      {
        id: 2,
        userId: 2,
        userName: "Claudio",
        userImage: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        text: "texto do Claudio sobre outra coisa",
      },
    ],

    myUserId: 2,
  },
};

export const hideButtons: Story = {
  args: {
    messages: [
      {
        id: 1,
        userId: 1,
        userName: "João",
        userImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm11Quu24mHpvW7fKnJOH4dS5v7-9wUfkHySSf4hI&s",
        text: "texto do João sobre algo",
        updateAt: "Hoje",
      },
      {
        id: 2,
        userId: 2,
        userName: "Claudio",
        userImage: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        text: "texto do Claudio sobre outra coisa",
        updateAt: "12/01/2023",
      },
    ],
    myUserId: 2,
    showButtons: false,
  },
};

export const EditingInBox: Story = {
  args: {
    messages: [
      {
        id: 1,
        userId: 1,
        userName: "João",
        userImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm11Quu24mHpvW7fKnJOH4dS5v7-9wUfkHySSf4hI&s",
        text: "texto do João sobre algo",
      },
      {
        id: 2,
        userId: 2,
        userName: "Claudio",
        userImage: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        text: "texto do Claudio sobre outra coisa",
      },
    ],
    editInBox: true,
  },
};
