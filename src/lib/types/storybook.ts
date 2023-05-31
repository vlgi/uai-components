import type { StoryObj, Meta } from "@storybook/svelte";
import type { ComponentEvents, SvelteComponent, ComponentProps } from "svelte";
import type { SetOptional } from "type-fest";

// TODO: find a way to remove the generic event definition given by ComponentEvents so only real
// events are given by the type
export type PlayFunctionParameter<Component extends SvelteComponent> =
  // eslint-disable-next-line @typescript-eslint/ban-types
  Parameters<Extract<StoryObj<Component>["play"], Function>>[0] & {
    args: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [P in keyof ComponentEvents<Component> as `event_${Extract<P, string>}`]: jest.Mock<
        (event: ComponentEvents<Component>[P]) => any | Promise<any>
      >;
    };
  };

export type TemplateObj<TMeta extends Meta<any>, RenderComponent extends SvelteComponent> = Partial<
  Omit<StoryObj<RenderComponent>, "args">
> & {
  args?: StoryObj<RenderComponent>["args"];
} & {
  // Save the TMeta and RenderComponent type to be used at the StoryTemplate
  renderComponent?: RenderComponent;
  meta?: TMeta;
};

export type TemplatedStoryObj<
  TMeta extends Meta<any>,
  RenderComponent extends SvelteComponent
> = Omit<StoryObj<RenderComponent>, "args"> & {
  args?: SetOptional<
    ComponentProps<RenderComponent>,
    Extract<keyof ComponentProps<RenderComponent>, keyof TMeta["args"]>
  >;
};
