import type { ArgType } from "@storybook/addons";

// fake board data
import { data as cData } from "./data/board-data-custom-card";
import { data as dData } from "./data/board-data";
import { users } from "./data/users-data";
import { labels } from "./data/labels-data";

// components
import Board from "./Board.svelte"
import BoardWrapperExample from "./BoardWrapperExample.svelte";
import CustomCardForTest from "./CustomCardForTest.svelte";

export default {
  title: "Components/Kanban",
  component: Board,
  argTypes: {
    language: {
      control: {
        type: "select",
        options: ["br", "en"],
      },
    }
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: BoardWrapperExample,
    props,
  });
  ret.args = _args;
  ret.storyName = "";
  return ret;
};

export const CustomCard = Template({
  language: "en",
  data: cData,
  customCard: CustomCardForTest,
  canMoveList: false,
  canMoveCard: false,
  style:
    "--szot-kanban-board-background-color: pink;"
    + "\n" + "--szot-kanban-board-title-color: black;"
    + "\n" + "--szot-kanban-list-background-color: #F0F1F2;"
    + "\n" + "--szot-kanban-list-font-color: #2F3675;"
    + "\n" + "--szot-kanban-radius-pattern: 0;"
    + "\n" + "--szot-kanban-list-width: 220px;"
    + "\n" + "--szot-kanban-list-title-font-size: 18px;"
    + "\n" + "--szot-kanban-board-title-font-size: 1.5rem;"
});


export const DefaultCard = Template({
  language: "br",
  data: dData,
  users,
  labels,
  canMoveList: true,
  canMoveCard: true,
  style:
    "--szot-kanban-board-background-color: darkblue;"
    + "\n" + "--szot-kanban-board-title-color: white;"
    + "\n" + "--szot-kanban-card-background-color: #f9f9f9;"
    + "\n" + "--szot-kanban-list-background-color: #f5f5f5;"
    + "\n" + "--szot-kanban-list-font-color: #172b4d;"
    + "\n" + "--szot-kanban-radius-pattern: 15px;"
    + "\n" + "--szot-kanban-list-width: 300px;"
    + "\n" + "--szot-kanban-list-title-font-size: 1.2rem;"
    + "\n" + "--szot-kanban-board-title-font-size: 2rem;"
});

