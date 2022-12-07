
type TDueDates = {
    startDate: Date;
    dueDate: Date;
    dueReminder: Date;
}

type TCardLabel = {
    title: string;
    backgroundColor: string;
    color: string
}

type TCardChecklistItem = {
    title: string;
    members: string[];
    progress: number;
    dates: TDueDates;
}

type TCardCheckList = {
    title: string;
    items: TCardChecklistItem[]
}

export type TCard = {
    title: string;
    backgroundColor: string,
    checklists: TCardCheckList[];
    members: [],
    attachments: [],
    dates: TDueDates;
    labels: TCardLabel[]
    desc: string
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

export const data: TBoard = {
    id: "bbad84e4-4dff-11ed-bdc3-0242ac120002",
    title: "PLANEJADOR PESSOAL",
    backgroundImage: "https://i0.wp.com/montanafreepress.org/wp-content/uploads/2022/04/AdobeStock_256618260-scaled.jpeg",
    backgroundColor: "#fff",
    lists: [
        {
            title: "BACKLOG",
            cards: [
                {
                    title: "BORER INC",
                    backgroundColor: "#800000",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Kia Explorer",
                                    members: [],
                                    progress: 0,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Mercedes Benz Model T",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Land Cruiser",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Mini Model S",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Mini Beetle",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "KUNDE, MAYER AND O'CONNELL",
                    backgroundColor: "#00ced1",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Lamborghini Sentra",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Cadillac Model S",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Jaguar Corvette",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Mazda Model S",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "ULLRICH, HILLL AND KUNDE",
                    backgroundColor: "#76ff7a",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: .8,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Dodge Altima",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Land Rover Silverado",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Mercedes Benz Civic",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Hyundai Golf",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "SHANAHAN - GORCZANY",
                    backgroundColor: "#9370db",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Bentley Sentra",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Chevrolet Charger",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Volvo CX-9",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Aston Martin Explorer",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "REINGER GROUP",
                    backgroundColor: "#9370db",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Maserati Camaro",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Porsche Corvette",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Cadillac XTS",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Volkswagen Ranchero",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "SCHROEDER, WILLIAMSON AND MCCULLOUGH",
                    backgroundColor: "#9370db",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Volkswagen Charger",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Lamborghini Expedition",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Mini A8",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Fiat Golf",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                }
            ],
        },
        {
            title: "DOING",
            cards: [
                {
                    title: "WITTING - RITCHIE",
                    backgroundColor: "#800000",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Hyundai XC90",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Aston Martin Fiesta",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Cadillac V90",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Porsche Fiesta",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "BEATTY, HILLL AND DECKOW",
                    backgroundColor: "#00ced1",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Volkswagen Model T",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Dodge Camaro",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Bentley Grand Cherokee",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Tesla Durango",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "KESSLER, MCKENZIE AND WILL",
                    backgroundColor: "#76ff7a",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Aston Martin Colorado",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Jeep Challenger",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Hyundai Impala",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Fiat Alpine",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "SAWAYN, REICHERT AND LEGROS",
                    backgroundColor: "#9370db",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Aston Martin Escalade",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Rolls Royce Land Cruiser",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Cadillac Jetta",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Chevrolet Impala",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                }
            ],
        },
        {
            title: "DONE",
            cards: [
                {
                    title: "KING - PFANNERSTILL",
                    backgroundColor: "#800000",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Volvo Spyder",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Mazda Land Cruiser",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Smart 911",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Volvo Element",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "DAVIS, KUHLMAN AND WILLIAMSON",
                    backgroundColor: "#00ced1",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "BMW CTS",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "BMW Wrangler",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Mercedes Benz Camaro",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Aston Martin Ranchero",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "VEUM INC",
                    backgroundColor: "#76ff7a",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Rolls Royce Grand Cherokee",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Ferrari Fortwo",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Mercedes Benz Sentra",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Mini Beetle",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "MUELLER LLC",
                    backgroundColor: "#9370db",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    progress: 1,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    progress: .2,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "BMW Camaro",
                            backgroundColor: "#800080",
                            color: "#fff",
                        },
                        {
                            title: "Tesla Civic",
                            backgroundColor: "#ff4500",
                            color: "#fff",
                        },
                        {
                            title: "Bentley Land Cruiser",
                            backgroundColor: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Volkswagen Model T",
                            backgroundColor: "#008080",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                }
            ],
        },
    ]
};