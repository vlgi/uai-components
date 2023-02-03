export type TDueDates = {
    startDate: Date;
    dueDate: Date;
    dueReminder: Date;
}

export type TCardLabel = {
    title: string;
    hex: string;
    color: string
}

export type TCardUser = {
    name: string;
    photo: string;
    email: string;
}

export type TLoggedUser = {
  user: TCardUser;
  permissions: unknown[];
}

export type TCardChecklistItem = {
    title: string;
    members: TCardUser[];
    done: boolean;
    dates: TDueDates;
}

export type TCardCheckList = {
    title: string;
    items: TCardChecklistItem[]
}

export type TCardAttachment = {
    url: string;
    user: TCardUser;
    date: Date;
    isCover: boolean;
}

export type TCardComment = {
    text: string;
    user: TCardUser;
    date: Date;
}

export type TDefautCard = {
    title: string;
    allChecklistsItems: TCardChecklistItem[];
    allDoneChecklistsItems: TCardChecklistItem[];
    checklists: TCardCheckList[];
    members: TCardUser[];
    comments: TCardComment[];
    attachments: TCardAttachment[];
    dates: TDueDates;
    labels: TCardLabel[];
    desc: string;
}

export type TList = {
    title: string;
    cards: TDefautCard[];
}

export type TCustomCard = {
  title: string;
  [key: string]: unknown;
}

export type TCustomList = {
    title: string;
    cards: TCustomCard[];
}

export type TColor = {
    name: string;
    hex: string;
}

export type TBoard = {
    title: string;
    backgroundImage: string;
    logged: {
        user: TCardUser,
        permissions: unknown[]
    },
    lists: TList[];
}

export type TCustomBoard = {
    title: string;
    backgroundImage: string;
    lists: TCustomList[];
}

export type TPosition = {
  x: number;
  y: number;
}

export type TMouseDirection = {
  x: "left" | "right";
  y: "up" | "down";
}
