import type { TBoard } from "./types"

export const data: TBoard = {
    title: "DEFAULT CARD EXAMPLE",
    backgroundImage: "https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1055680/retina_1708x683_Redesign-EssentialCleanHtmlCss-Luke_Newsletter-623eeeb89c50ec545990667e9cbebb41.png",
    lists: [
        {
            title: "BACKLOG",
            cards: [
                {
                    title: "BORER INC",
                    backgroundColor: "#800000",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "https://viagemeturismo.abril.com.br/wp-content/uploads/2016/12/thinkstockphotos-464833177.jpeg",
                    checklists: [
                        {
                            title: "Prototype",
                            items: [
                                {
                                    title: "Requirements/data meeting",
                                    members: [
                                        {
                                            name: "Rosina Rolfson Rice",
                                            photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg",
                                            email: "rosina.rice@szot.com"
                                        }, {
                                            name: "Alberto Simonis Gerhold",
                                            photo: "",
                                            email: "alberto.gerhold@szot.com"
                                        }
                                    ],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Documentation",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Wireframes",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        },
                        {
                            title: "Validate prototype",
                            items: [
                                {
                                    title: "Send validation email",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Max West validation",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Estevan Lesch validation",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Alberto Mertz validation",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [{
                        name: "Rosina Rolfson Rice",
                        photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg",
                        email: "rosina.rice@szot.com"
                    }, {
                        name: "Alberto Simonis Gerhold",
                        photo: "",
                        email: "alberto.gerhold@szot.com"
                    }],
                    comments: [
                        {
                            text: "My new comment",
                            user: {
                                name: "Rosina Rolfson Rice",
                                photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg",
                                email: "rosina.rice@szot.com"
                            },
                            date: new Date(),
                        }, {
                            text: "Alberto did a comment",
                            user: {
                                name: "Alberto Simonis Gerhold",
                                photo: "",
                                email: "alberto.gerhold@szot.com"
                            },
                            date: new Date(),
                        }],
                    attachments: [{ title: "Redbone Coonhound", url: "https://i.pinimg.com/originals/fa/cd/67/facd67dcb113958be0e867e6fd089714.jpg" }],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                        {
                            title: "Alert",
                            hex: "#EF7564",
                            color: "#fff",
                        },
                        {
                            title: "Coding",
                            hex: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
                            color: "#fff",
                        },
                    ],
                    desc: '# Placeat qui nisi corrupti ad et ut eum. \n\n1. Item A \n1. Item B \n\n## Another title \n\n- Bullet 1 \n- Bullet 2 \n\n## Code section \n\n```Typescript\nlet num: number; \nnum = 2;\n\nfunction double(x): number {\n    return x * 2;\n};\n\ndouble(num);\n```'
                },
                {
                    title: "KUNDE, MAYER AND O'CONNELL",
                    backgroundColor: "#00ced1",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Alert",
                            hex: "#EF7564",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "ULLRICH, HILLL AND KUNDE",
                    backgroundColor: "#76ff7a",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "SHANAHAN - GORCZANY",
                    backgroundColor: "#9370db",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: true,
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
                    comments: [],
                    attachments: [
                        {
                            title: "Lancashire Heeler",
                            url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg"
                        },
                        {
                            title: "Tim Tones",
                            url: "https://versatille.com/wp-content/uploads/cute-dog-paradigma-da-pulga.jpg"
                        },
                    ],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                        {
                            title: "Alert",
                            hex: "#EF7564",
                            color: "#fff",
                        },
                        {
                            title: "Coding",
                            hex: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "REINGER GROUP",
                    backgroundColor: "#9370db",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "SCHROEDER, WILLIAMSON AND MCCULLOUGH",
                    backgroundColor: "#9370db",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Deploy",
                            hex: "#E568AF",
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                        {
                            title: "Alert",
                            hex: "#EF7564",
                            color: "#fff",
                        },

                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "BEATTY, HILLL AND DECKOW",
                    backgroundColor: "#00ced1",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "https://mapanamao.com.br/wp-content/uploads/2016/03/o-que-fazer-em-nice-fran%C3%A7a-1.jpg",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [
                        {
                            text: "This is a comment",
                            user: {
                                name: "Rosina Rolfson Rice",
                                photo: "https://pbs.twimg.com/profile_images/879533823763066883/_WjQz3Tm_400x400.jpg",
                                email: "rosina.rice@szot.com"
                            },
                            date: new Date(),
                        }],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "KESSLER, MCKENZIE AND WILL",
                    backgroundColor: "#76ff7a",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                        {
                            title: "Alert",
                            hex: "#EF7564",
                            color: "#fff",
                        },
                        {
                            title: "Coding",
                            hex: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "SAWAYN, REICHERT AND LEGROS",
                    backgroundColor: "#9370db",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Coding",
                            hex: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
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
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                        {
                            title: "Alert",
                            hex: "#EF7564",
                            color: "#fff",
                        },
                        {
                            title: "Coding",
                            hex: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
                            color: "#fff",
                        },
                    ],
                    desc: ""
                },
                {
                    title: "DAVIS, KUHLMAN AND WILLIAMSON",
                    backgroundColor: "#00ced1",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                        {
                            title: "Alert",
                            hex: "#EF7564",
                            color: "#fff",
                        },
                        {
                            title: "Coding",
                            hex: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "VEUM INC",
                    backgroundColor: "#76ff7a",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                        {
                            title: "Alert",
                            hex: "#EF7564",
                            color: "#fff",
                        },
                        {
                            title: "Coding",
                            hex: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "MUELLER LLC",
                    backgroundColor: "#9370db",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    cover: "",
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date(),
                                        dueDate: new Date(),
                                        dueReminder: new Date(),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
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
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date(),
                        dueDate: new Date(),
                        dueReminder: new Date(),
                    },
                    labels: [
                        {
                            title: "Design",
                            hex: "#CD8DE5",
                            color: "#fff",
                        },
                        {
                            title: "Alert",
                            hex: "#EF7564",
                            color: "#fff",
                        },
                        {
                            title: "Coding",
                            hex: "#2a52be",
                            color: "#fff",
                        },
                        {
                            title: "Deploy",
                            hex: "#E568AF",
                            color: "#fff",
                        },
                    ],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                }
            ],
        },
    ]
};