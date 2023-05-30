These files set internal variables based on theme variables with default values.

In your component use just the internal theme variables.

Internal theme variables that are based on external variables, must have the prefix `theme`.

You can create especific variables for your component too, like:
```css
.my-component-class-wrapper {
  --theme-var: var(--external-var, blue);

  button {
    color: var(--theme-var);
  }
}
```
Note: Always declare all theme variables at the beginning of your css. And don't forget to document on storybook.

If you need some internal global variables (that is not a theme variable) just declare in the same context file on this folder, but above the comment `internal variables only`.

Note: Don't use SCSS variables, unless for some specific internal cases that you don't see some day they being exported to theme variables.

Note: if you use some ionic component, translate our theme variables to theirs theme variables.
