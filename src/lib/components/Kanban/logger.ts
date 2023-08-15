import { isEqual } from "lodash";

type TListData = { id: number; [key: string]: any };

export type TDiffDatas = {
  item: TListData;
  action: "added" | "removed" | "updated" | "moved" | "none";
  index: number;
};

export function diffDatas(newList: TListData[], oldList: TListData[], itemId: number): TDiffDatas {
  const oldItem = oldList.find((item) => item.id === itemId);
  const newItem = newList.find((item) => item.id === itemId);

  const oldIndex = oldList?.findIndex((item) => item === oldItem);
  const newIndex = newList?.findIndex((item) => item === newItem);

  if (oldItem && !newItem) {
    return { item: oldItem, action: "removed", index: oldIndex };
  }

  if (!oldItem && newItem) {
    return { item: newItem, action: "added", index: newIndex };
  }

  if (oldItem && newItem) {
    if (oldIndex !== newIndex && isEqual(oldItem, newItem)) {
      return { item: newItem, action: "moved", index: newIndex };
    }

    if (!isEqual(oldItem, newItem)) {
      return { item: newItem, action: "updated", index: newIndex };
    }
  }

  return { item: newItem, action: "none", index: newIndex };
}
