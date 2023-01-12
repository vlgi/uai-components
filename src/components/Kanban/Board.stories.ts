import type { ArgType } from "@storybook/addons";

// fake board data
import { data as cData } from "./data/board-data-custom-card";
import { data as dData } from "./data/board-data";
import { boardDefault, boardCustom } from "./data/empty-data";
import { users } from "./data/users-data";
import { labels } from "./data/labels-data";

// components
import Board from "./Board.svelte"
import BoardWrapperExample from "./examples/BoardWrapperExample.svelte";
import CustomCardForTest from "./examples/CustomCardForTest.svelte";

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

function customFunction(): void {
  alert("result clicked")
}

export const CustomCard = Template({
  language: "en",
  searchableCardKeys: ["title", "description", "text"],
  data: cData,
  customCard: CustomCardForTest,
  canMoveCard: true,
  canCreateCard: true,
  canDeleteCard: true,
  canMoveList: true,
  canCreateList: true,
  canDeleteList: true,
  style:
    "--szot-kanban-board-background-color: #F2D2BD;"
    + "\n" + "--szot-kanban-board-title-color: #000;"
    + "\n" + "--szot-kanban-board-title-font-size: 1.5rem;"
    + "\n" + "--szot-kanban-list-background-color: #F0F1F2;"
    + "\n" + "--szot-kanban-list-font-color: #2F3675;"
    + "\n" + "--szot-kanban-list-title-font-size: 18px;"
    + "\n" + "--szot-kanban-list-width: 220px;"
    + "\n" + "--szot-kanban-radius-pattern: 0;"
});

export const CustomEmptyBoard = Template({
  language: "en",
  searchableCardKeys: ["title", "description", "text"],
  data: boardCustom,
  customCard: CustomCardForTest,
  canMoveCard: true,
  canCreateCard: true,
  canDeleteCard: true,
  canMoveList: true,
  canCreateList: true,
  canDeleteList: true,
  style:
    "--szot-kanban-board-background-color: #F2D2BD;"
    + "\n" + "--szot-kanban-board-title-color: #000;"
    + "\n" + "--szot-kanban-board-title-font-size: 1.5rem;"
    + "\n" + "--szot-kanban-list-background-color: #F0F1F2;"
    + "\n" + "--szot-kanban-list-font-color: #2F3675;"
    + "\n" + "--szot-kanban-list-title-font-size: 18px;"
    + "\n" + "--szot-kanban-list-width: 220px;"
    + "\n" + "--szot-kanban-radius-pattern: 0;"
});

export const DefaultCard = Template({
  language: "br",
  searchableCardKeys: [
    "title",
    "desc",
    "checklists.title",
    "checklists.items.title",
  ],
  data: dData,
  users,
  labels,
  canMoveCard: true,
  canCreateCard: true,
  canDeleteCard: true,
  canMoveList: true,
  canCreateList: true,
  canDeleteList: true,
  style:
    "--szot-kanban-board-background-color: #000;"
    + "\n" + "--szot-kanban-board-title-color: white;"
    + "\n" + "--szot-kanban-board-title-font-size: 1.8rem;"
    + "\n" + "--szot-kanban-card-background-color: #f9f9f9;"
    + "\n" + "--szot-kanban-list-background-color: #f5f5f5;"
    + "\n" + "--szot-kanban-list-font-color: #172b4d;"
    + "\n" + "--szot-kanban-list-title-font-size: 1.2rem;"
    + "\n" + "--szot-kanban-list-width: 300px;"
    + "\n" + "--szot-kanban-radius-pattern: 15px;"
});

const hData = JSON.parse(JSON.stringify(dData));
hData.lists = [hData.lists[0]]
hData.lists[0].cards = [hData.lists[0].cards[0]];
export const DefaultOneListOneCard = Template({
  language: "br",
  searchableCardKeys: [
    "title",
    "desc",
    "checklists.title",
    "checklists.items.title",
  ],
  data: hData,
  users,
  labels,
  canMoveCard: true,
  canCreateCard: true,
  canDeleteCard: true,
  canMoveList: true,
  canCreateList: true,
  canDeleteList: true,
  style:
    "--szot-kanban-board-background-color: #000;"
    + "\n" + "--szot-kanban-board-title-color: white;"
    + "\n" + "--szot-kanban-board-title-font-size: 1.8rem;"
    + "\n" + "--szot-kanban-card-background-color: #f9f9f9;"
    + "\n" + "--szot-kanban-list-background-color: #f5f5f5;"
    + "\n" + "--szot-kanban-list-font-color: #172b4d;"
    + "\n" + "--szot-kanban-list-title-font-size: 1.2rem;"
    + "\n" + "--szot-kanban-list-width: 300px;"
    + "\n" + "--szot-kanban-radius-pattern: 15px;"
});

export const DefaultEmptyBoard = Template({
  language: "br",
  searchableCardKeys: [
    "title",
    "desc",
    "checklists.title",
    "checklists.items.title",
  ],
  data: boardDefault,
  users,
  labels: [],
  canMoveCard: true,
  canCreateCard: true,
  canDeleteCard: true,
  canMoveList: true,
  canCreateList: true,
  canDeleteList: true,
  style:
    "--szot-kanban-board-background-color: #000;"
    + "\n" + "--szot-kanban-board-title-color: #444;"
    + "\n" + "--szot-kanban-board-title-font-size: 1.8rem;"
    + "\n" + "--szot-kanban-card-background-color: #f9f9f9;"
    + "\n" + "--szot-kanban-list-background-color: #f5f5f5;"
    + "\n" + "--szot-kanban-list-font-color: #172b4d;"
    + "\n" + "--szot-kanban-list-title-font-size: 1.2rem;"
    + "\n" + "--szot-kanban-list-width: 300px;"
    + "\n" + "--szot-kanban-radius-pattern: 15px;"
});
