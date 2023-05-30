export type TLinkCommons = {
  text: string,
  path: string,
  isActive?: boolean,
}

export type TMenuCommons = {
  type: "item" | "group",
  icon: string,
  text: string,
  isActive?: boolean,
}

export type TMenuLink = TMenuCommons & TLinkCommons & {
  type: "item"
}

export type TMenuSubLink = TLinkCommons

export type TMenuGroup = TMenuCommons & {
  type: "group",
  items: TMenuSubLink[],
}

export type TMenuItem = TMenuGroup|TMenuLink

export type TBottomMenuItem = TLinkCommons & {
  icon: string,
}
