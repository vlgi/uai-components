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

export type TCard = {
    title: string;
    allChecklistsItems: TCardCheckList[];
    allDoneChecklistsItems: TCardCheckList[];
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

export type TCustomList = {
    title: string;
    cards: any[];
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
        permissions: any[]
    }
    lists: TList[];
}

export type TCustomBoard = {
    title: string;
    backgroundImage: string;
    lists: TCustomList[];
}