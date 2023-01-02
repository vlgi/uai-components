export type TDueDates = {
    startDate: Date;
    dueDate: Date;
    dueReminder: Date;
}

export type TCardLabel = {
    title: string; // label title
    hex: string; // label hex code backgound color
    color: string // label font color

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
    title: string;
    url: string;
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


export type TColor = {
    name: string;
    hex: string;
}

export type TBoard = {
    title: string;
    backgroundImage: string;
    lists: TList[];
}

export type TCustomBoard = {
    title: string;
    backgroundImage: string;
    lists: {
        title: string;
        cards: any[];
    }[];
}