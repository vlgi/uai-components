import type { StoryObj as StoryObjBase, Meta } from "@storybook/svelte";
import type { ComponentEvents, SvelteComponent, ComponentProps } from "svelte";
import type { SetOptional } from "type-fest";

// TODO: find a way to remove the generic event definition given by ComponentEvents so only real
// events are given by the type
export type PlayFunctionParameter<Component extends SvelteComponent> =
  // eslint-disable-next-line @typescript-eslint/ban-types
  Parameters<Extract<StoryObjBase<Component>["play"], Function>>[0] & {
    args: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [P in keyof ComponentEvents<Component> as `event_${Extract<P, string>}`]: jest.Mock<
        (event: ComponentEvents<Component>[P]) => any | Promise<any>
      >;
    };
  };

/**
 * Use this to type when creating a template object
 * to reuse common stuff for your stories.
 *
 * The template params:
 * - TMeta: must be "typeof meta" of your stories.
 * - RenderComponent: must be you svelte component that will be rendered.
 */
export type TemplateObj<TMeta extends Meta<any>, RenderComponent extends SvelteComponent> = Partial<
  Omit<StoryObjBase<RenderComponent>, "args">
> & {
  args?: StoryObjBase<RenderComponent>["args"];
} & {
  // Save the TMeta and RenderComponent type to be used at the StoryTemplate
  renderComponent?: RenderComponent;
  meta?: TMeta;
};

/**
 * Use this to type when creating a story object.
 * This is a little different from storybook because can handle
 * with other component rendered.
 *
 * The template params:
 * - TMeta: must be "typeof meta" of your stories.
 * - RenderComponent: must be you svelte component that will be rendered.
 */
export type StoryObj<TMeta extends Meta<any>, RenderComponent extends SvelteComponent> = Omit<
  StoryObjBase<RenderComponent>,
  "args"
> & {
  args?: SetOptional<
    ComponentProps<RenderComponent>,
    Extract<keyof ComponentProps<RenderComponent>, keyof TMeta["args"]>
  >;
};
