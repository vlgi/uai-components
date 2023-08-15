import type { StoryObj, TemplateObj } from "$types/storybook";
import Kanban from "./Kanban.svelte";
import KanbanExample from "./KanbanExample.svelte";

const meta = {
  title: "Components/Kanban",
  component: Kanban,
};

export default meta;

type Template = TemplateObj<typeof meta, KanbanExample>;
type Story = StoryObj<typeof meta, KanbanExample>;

const template = {
  render: (props) => ({
    Component: KanbanExample,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    props,
  }),
} satisfies Template;

const labels = [
  { text: "label 1", backgroundColor: "#ffa500" },
  { text: "label 2", backgroundColor: "#3be020" },
];

const cardsList = [
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
];

const cardsList2 = [
  {
    id: 10,
    title: "Card 1",
    labels: [...labels],
  },
  {
    id: 11,
    title: "Card 2",
    labels: [labels[1]],
  },
  {
    id: 12,
    title: "Card 3",
    labels: [...labels],
  },
  {
    id: 13,
    title: "Card 4",
    labels: [labels[0]],
  },
  {
    id: 14,
    title: "Card 5",
    labels: [...labels],
  },
  {
    id: 15,
    title: "Card 6",
    labels: [...labels],
  },
];

const cardsList3 = [
  {
    id: 20,
    title: "Card 1",
    labels: [...labels],
  },
  {
    id: 21,
    title: "Card 2",
    labels: [labels[1]],
  },
  {
    id: 22,
    title: "Card 3",
    labels: [...labels],
  },
  {
    id: 23,
    title: "Card 4",
    labels: [labels[0]],
  },
  {
    id: 24,
    title: "Card 5",
    labels: [...labels],
  },
  {
    id: 25,
    title: "Card 6",
    labels: [...labels],
  },
];

export const Default: Story = {
  ...template,
  args: {
    animationDurationMs: 150,
    columnItems: [
      {
        id: 1,
        title: "List 1",
        cardsList: [...cardsList],
      },
      {
        id: 2,
        title: "List 2",
        cardsList: [...cardsList2],
      },
      {
        id: 3,
        title: "List 3",
        cardsList: [...cardsList3],
      },
    ],
  },
};
