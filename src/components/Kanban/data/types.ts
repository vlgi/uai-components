export type TDueDates = {
    startDate: Date;
    dueDate: Date;
    dueReminder: Date;
}

export type TCardLabel = {
    title: string; // label title
    id: string; // label id
    hex: string; // label hex code backgound color
    color: string // label font color
}

export type TCardChecklistItem = {
    title: string;
    members: string[];
    done: boolean;
    dates: TDueDates;
}

export type TCardCheckList = {
    title: string;
    items: TCardChecklistItem[]
}

export type TCardAttachment = {
    title: string;
    url: string;
}

export type TCardUser = {
    name: string;
    id: string;
    photo: string;
    email: string;
}

export type TCardComment = {
    text: string;
    user: TCardUser;
    date: Date;
}

export type TCard = {
    title: string;
    backgroundColor: string;
    allChecklistsItems: TCardCheckList[];
    allDoneChecklistsItems: TCardCheckList[];
    cover: string;
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
    cards: TCard[];
}

export type TBoard = {
    id: string;
    title: string;
    backgroundImage: string;
    backgroundColor: string;
    lists: TList[];
}

export type TColor = {
    name: string;
    hex: string;
}