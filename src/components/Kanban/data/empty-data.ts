import type {
  TLoggedUser,
  TBoard,
  TDefautCard,
  TCardLabel,
  TCardChecklistItem,
  TCardCheckList,
  TDueDates,
  TList,
} from "./types";

export const logged: TLoggedUser = {
  user: {
    name: "",
    photo: "",
    email: "",
  },
  permissions: [],
};

export const card: TDefautCard = {
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
};

export const checklist: TCardCheckList = {
  title: "",
  items: [],
};

const date: TDueDates = {
  startDate: null,
  dueDate: null,
  dueReminder: null,
};

export const item: TCardChecklistItem = {
  title: "",
  members: [],
  done: false,
  dates: { ...date },
};

export const list: TList = {
  title: "",
  cards: [],
};

export const customCard = {
  title: "",
  desc: "",
};

export const boardDefault: TBoard = {
  title: "EMPTY BOARD DEFAULT CARD EXAMPLE",
  backgroundImage: "https://cdn.lifehack.org/wp-content/uploads/2017/05/feeling-empty.jpeg",
  logged: {
    user: {
      name: "Christ Ryan",
      photo: "https://images.pexels.com/photos/2020992/pexels-photo-2020992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      email: "christ.ryan@szot.com",
    },
    permissions: [],
  },
  lists: [],
};

export const boardCustom: TBoard = {
  title: "EMPTY BOARD CUSTOM CARD EXAMPLE",
  backgroundImage: "https://wallpaper.dog/large/20361086.jpg",
  logged: {
    user: {
      name: "Christ Ryan",
      photo: "https://images.pexels.com/photos/2020992/pexels-photo-2020992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      email: "christ.ryan@szot.com",
    },
    permissions: [],
  },
  lists: [],
};
