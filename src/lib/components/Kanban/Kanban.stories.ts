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

let uniqueCardId = 1;
const getCardId = () => uniqueCardId++;
const genCardsList = (itemsNumber: number) => {
  const getRandSliceLabelsNumber = () => Math.floor(Math.random() * (labels.length + 1));
  const genCard = (idx: number) => ({
    id: getCardId(),
    title: `Card ${idx}`,
    labels: labels.slice(0, getRandSliceLabelsNumber()),
  });

  return Array.from({ length: itemsNumber }, (_, idx) => genCard(idx + 1));
};

export const Default: Story = {
  ...template,
  args: {
    animationDurationMs: 150,
    columnItems: [
      {
        id: 1,
        title: "List 1",
        cardsList: genCardsList(10),
      },
      {
        id: 2,
        title: "List 2",
        cardsList: genCardsList(10),
      },
      {
        id: 3,
        title: "List 3",
        cardsList: genCardsList(10),
      },
      {
        id: 4,
        title: "List 4",
        cardsList: genCardsList(10),
      },
    ],
  },
};
