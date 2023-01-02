import type { TCard, TCardLabel, TCardChecklistItem, TCardCheckList, TDueDates, TList } from "./types"

export const card: TCard = {
  title: "",
  backgroundColor: "#ccc",
  allChecklistsItems: [],
  allDoneChecklistsItems: [],
  cover: "",
  checklists: [],
  members: [],
  comments: [],
  attachments: [],
  dates: {
    startDate: new Date(),
    dueDate: new Date(),
    dueReminder: new Date(),
  },
  labels: [],
  desc: "",
};


export const label: TCardLabel = {
  hex: "",
  color: "",
  title: "",
}

export const checklist: TCardCheckList = {
  title: "",
  items: []
}

const date: TDueDates = {
  startDate: null,
  dueDate: null,
  dueReminder: null
}

export const item: TCardChecklistItem = {
  title: "",
  members: [],
  done: false,
  dates: { ...date }
}

export const list: TList = {
  title: "",
  cards: [],
}

export const customCard = {
  title: "",
  desc: "",
}
