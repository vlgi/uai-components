import type { TCard, } from "./types"

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

export const list = {}

export const label = {
  hex: "",
  color: "",
  id: "",
  title: "",
}
