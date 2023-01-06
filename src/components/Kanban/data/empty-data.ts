import type { TCard, TCardLabel, TCardChecklistItem, TCardCheckList, TDueDates, TList } from "./types"

export const logged = {
  user: {
    name: "",
    photo: "",
    email: "",
  },
  permissions: []
}

export const card: TCard = {
  title: "",
  allChecklistsItems: [],
  allDoneChecklistsItems: [],
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
