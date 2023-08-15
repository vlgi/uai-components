import type { StoryObj, TemplateObj } from "$types/storybook";
import type { Meta } from "@storybook/svelte";
import type { TCardsList } from "./ListExample.svelte";
import List from "./List.svelte";
import ListExample from "./ListExample.svelte";

const meta = {
  title: "Components/Kanban/List",
  component: List,
} satisfies Meta<List<TCardsList>>;

export default meta;

type Template = TemplateObj<typeof meta, ListExample>;
type Story = StoryObj<typeof meta, ListExample>;

const template = {
  render: (args) => ({
    Component: ListExample,
    props: args,
  }),
} satisfies Template;

const labels = [
  { text: "label 1", backgroundColor: "#ffa500" },
  { text: "label 2", backgroundColor: "#3be020" },
];

export const Default: Story = {
  ...template,
  args: {
    id: 1,
    title: "My List",
    animationDurationMs: 50,
    cardsList: [
      {
        id: 1,
        title: "Card 1",
        labels: [...labels],
      },
      {
        id: 2,
        title: "Card 2",
        labels: [labels[1]],
      },
      {
        id: 3,
        title: "Card 3",
        labels: [...labels],
      },
      {
        id: 4,
        title: "Card 4",
        labels: [labels[0]],
      },
      {
        id: 5,
        title: "Card 5",
        labels: [...labels],
      },
      {
        id: 6,
        title: "Card 6",
        labels: [...labels],
      },
    ],
  },
};
