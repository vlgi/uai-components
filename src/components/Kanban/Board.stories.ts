import type { ArgType } from "@storybook/addons";
import Board from "./Board.svelte"
import BoardWrapperDefaultCard from "./BoardWrapperDefaultCard.svelte";
import BoardWrapperCustomCard from "./BoardWrapperCustomCard.svelte";

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

const Default = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: BoardWrapperDefaultCard,
    props,
  });
  ret.args = _args;
  ret.storyName = "";
  return ret;
};

export const DefaultCard = Default({
  language: "br",
});
DefaultCard.storyName = "Default Card";

const Custom = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: BoardWrapperCustomCard,
    props,
  });
  ret.args = _args;
  ret.storyName = "";
  return ret;
};

export const CustomCard = Custom({
  language: "en",
});
CustomCard.storyName = "Custom Card";

