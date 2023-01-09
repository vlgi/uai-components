import type { TBoard } from "./types"

export const data: TBoard = {
    title: "DEFAULT CARD EXAMPLE",
    backgroundImage: "https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1055680/retina_1708x683_Redesign-EssentialCleanHtmlCss-Luke_Newsletter-623eeeb89c50ec545990667e9cbebb41.png",
    logged: {
        user: {
            name: "Christ Ryan",
            photo: "https://images.pexels.com/photos/2020992/pexels-photo-2020992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            email: "christ.ryan@szot.com"
        },
        permissions: []
    },
    lists: [
        {
            title: "BACKLOG",
            cards: [
                {
                    title: "BORER INC",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Prototype",
                            items: [
                                {
                                    title: "Requirements/data meeting",
                                    members: [
                                        {
                                            name: "Rosina Rolfson Rice",
                                            photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                                            email: "rosina.rice@szot.com"
                                        }, {
                                            name: "Alberto Simonis Gerhold",
                                            photo: "",
                                            email: "alberto.gerhold@szot.com"
                                        }
                                    ],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 12:43:20 GMT-0300"),
                                        dueDate: new Date("Tue Jan 10 2023 17:00:00 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 12:00:56 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Documentation",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 00:54:08 GMT-0300"),
                                        dueDate: new Date("Thu Nov 16 2023 08:06:46 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 23:12:55 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Wireframes",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 09:00:00 GMT-0300"),
                                        dueDate: new Date("Tue Jan 10 2023 12:00:00 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 18:00:56 GMT-0300"),
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
                                        startDate: new Date("Sun Jan 08 2023 19:24:49 GMT-0300"),
                                        dueDate: new Date("Fri Feb 24 2023 19:01:59 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 02:40:52 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Max West validation",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 02:25:15 GMT-0300"),
                                        dueDate: new Date("Fri Dec 29 2023 09:52:57 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 07:28:49 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Estevan Lesch validation",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 07:47:20 GMT-0300"),
                                        dueDate: new Date("Thu Jan 19 2023 11:25:17 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 00:36:19 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Alberto Mertz validation",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 13:08:15 GMT-0300"),
                                        dueDate: new Date("Tue Aug 08 2023 09:48:19 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 22:17:18 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [
                        {
                            name: "Rosina Rolfson Rice",
                            photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            email: "rosina.rice@szot.com"
                        },
                        {
                            name: "Alberto Simonis Gerhold",
                            photo: "",
                            email: "alberto.gerhold@szot.com"
                        }
                    ],
                    comments: [
                        {
                            text: "My new comment",
                            user: {
                                name: "Rosina Rolfson Rice",
                                photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                                email: "rosina.rice@szot.com"
                            },
                            date: new Date(),
                        },
                        {
                            text: "Alberto did a comment",
                            user: {
                                name: "Alberto Simonis Gerhold",
                                photo: "",
                                email: "alberto.gerhold@szot.com"
                            },
                            date: new Date(),
                        },
                        {
                            text: "Christ made a comment and is the logged user. Optio tenetur quaerat deserunt. Ut et eos in iste autem voluptatem. Cupiditate exercitationem harum aut ipsum est consectetur fugiat. Aut quod blanditiis. Id ea ducimus quia soluta. Vel fugit optio rerum accusantium.",
                            user: {
                                name: "Christ Ryan",
                                photo: "https://images.pexels.com/photos/2020992/pexels-photo-2020992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                                email: "christ.ryan@szot.com"
                            },
                            date: new Date(),
                        }
                    ],
                    attachments: [
                        {
                            url: "https://viagemeturismo.abril.com.br/wp-content/uploads/2016/12/thinkstockphotos-464833177.jpeg",
                            user: {
                                name: "Christ Ryan",
                                photo: "https://images.pexels.com/photos/2020992/pexels-photo-2020992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                                email: "christ.ryan@szot.com"
                            },
                            date: new Date(),
                            isCover: true,
                        },
                        {
                            url: "https://i.pinimg.com/originals/fa/cd/67/facd67dcb113958be0e867e6fd089714.jpg",
                            user: {
                                name: "Rosina Rolfson Rice",
                                photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                                email: "rosina.rice@szot.com"
                            },
                            date: new Date(),
                            isCover: false,
                        },
                        {
                            url: "https://garagem360.com.br/wp-content/uploads/2022/08/637680956964083931RJ.jpg",
                            user: {
                                name: "Alberto Simonis Gerhold",
                                photo: "",
                                email: "alberto.gerhold@szot.com"
                            },
                            date: new Date(),
                            isCover: false,
                        },
                        {
                            url: "https://mojo.org.br/wp-content/uploads/2021/02/0006_IDT_BILINGUE.pdf",
                            user: {
                                name: "Alberto Simonis Gerhold",
                                photo: "",
                                email: "alberto.gerhold@szot.com"
                            },
                            date: new Date(),
                            isCover: false,

                        }
                    ],
                    dates: {
                        startDate: new Date("Mon Jan 02 2023 09:00:00 GMT-0300"),
                        dueDate: new Date("Tue Jan 10 2023 18:00:00 GMT-0300"),
                        dueReminder: new Date("Tue Jan 10 2023 08:00:00 GMT-0300"),
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
                    desc: '# Et dicta reiciendis aperiam architecto est reiciendis. \n\n1. Item A \n1. Item B \n\n## Another title \n\n- Bullet 1 \n- Bullet 2 \n\n## Code section \n\n```Typescript\nlet num: number; \nnum = 2;\n\nfunction double(x): number {\n    return x * 2;\n};\n\ndouble(num);\n```',
                },
                {
                    title: "KUNDE, MAYER AND O'CONNELL",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 19:36:37 GMT-0300"),
                                        dueDate: new Date("Fri Mar 17 2023 11:30:43 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 08:29:55 GMT-0300"),
                                    }
                                }
                            ],
                        },
                        {
                            title: "Greyhound",
                            items: [
                                {
                                    title: "Fiat V90",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 20:16:50 GMT-0300"),
                                        dueDate: new Date("Mon Jul 24 2023 17:40:41 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 16:17:25 GMT-0300"),
                                    }
                                }
                            ],
                        },
                        {
                            title: "Small Münsterländer",
                            items: [
                                {
                                    title: "Porsche Expedition",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 07:53:13 GMT-0300"),
                                        dueDate: new Date("Tue Apr 25 2023 22:26:55 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 09:44:29 GMT-0300"),
                                    }
                                }
                            ],
                        },
                        {
                            title: "Austrian Black and Tan Hound",
                            items: [
                                {
                                    title: "Mercedes Benz V90",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 03:28:23 GMT-0300"),
                                        dueDate: new Date("Sun Oct 08 2023 09:59:46 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 03:54:15 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Sun Jan 08 2023 14:32:31 GMT-0300"),
                        dueDate: new Date("Fri Apr 21 2023 03:15:27 GMT-0300"),
                        dueReminder: new Date("Mon Jan 09 2023 16:37:21 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 19:55:11 GMT-0300"),
                                        dueDate: new Date("Fri Dec 08 2023 10:50:18 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 01:50:20 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 10:36:40 GMT-0300"),
                                        dueDate: new Date("Fri Oct 06 2023 13:18:53 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 04:37:26 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Mon Jan 09 2023 06:40:16 GMT-0300"),
                        dueDate: new Date("Thu May 25 2023 10:40:38 GMT-0300"),
                        dueReminder: new Date("Tue Jan 10 2023 08:19:57 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 04:23:42 GMT-0300"),
                                        dueDate: new Date("Sat Oct 28 2023 21:50:32 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 05:07:06 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 22:04:05 GMT-0300"),
                                        dueDate: new Date("Thu Jan 19 2023 23:44:19 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 08:19:26 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [
                        {
                            name: "Alberto Simonis Gerhold",
                            photo: "",
                            email: "alberto.gerhold@szot.com"
                        }
                    ],
                    comments: [],
                    attachments: [
                        {
                            url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
                            user: {
                                name: "Alberto Simonis Gerhold",
                                photo: "",
                                email: "alberto.gerhold@szot.com"
                            },
                            date: new Date(),
                            isCover: false,
                        },
                        {
                            url: "https://w0.peakpx.com/wallpaper/635/836/HD-wallpaper-seaside-sunset-look-nice.jpg",
                            user: {
                                name: "Alberto Simonis Gerhold",
                                photo: "",
                                email: "alberto.gerhold@szot.com"
                            },
                            date: new Date(),
                            isCover: false,
                        },
                    ],
                    dates: {
                        startDate: new Date("Sun Jan 08 2023 22:32:26 GMT-0300"),
                        dueDate: new Date("Sun Apr 16 2023 05:50:45 GMT-0300"),
                        dueReminder: new Date("Mon Jan 09 2023 21:10:15 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 01:50:04 GMT-0300"),
                                        dueDate: new Date("Tue Feb 14 2023 00:18:41 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 03:27:42 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 14:03:43 GMT-0300"),
                                        dueDate: new Date("Sun Feb 26 2023 05:17:53 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 21:06:49 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Sun Jan 08 2023 13:09:39 GMT-0300"),
                        dueDate: new Date("Mon Jan 16 2023 19:43:14 GMT-0300"),
                        dueReminder: new Date("Mon Jan 09 2023 21:21:34 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 00:58:19 GMT-0300"),
                                        dueDate: new Date("Thu Feb 02 2023 23:48:31 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 09:18:50 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 17:24:51 GMT-0300"),
                                        dueDate: new Date("Mon Aug 21 2023 02:12:42 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 22:05:01 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Sun Jan 08 2023 21:42:48 GMT-0300"),
                        dueDate: new Date("Thu May 25 2023 09:53:50 GMT-0300"),
                        dueReminder: new Date("Tue Jan 10 2023 03:59:33 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 11:54:10 GMT-0300"),
                                        dueDate: new Date("Thu Jun 22 2023 01:07:22 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 15:27:40 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 01:23:25 GMT-0300"),
                                        dueDate: new Date("Wed Nov 15 2023 03:21:31 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 03:46:56 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Sun Jan 08 2023 23:31:37 GMT-0300"),
                        dueDate: new Date("Mon Oct 02 2023 22:45:27 GMT-0300"),
                        dueReminder: new Date("Tue Jan 10 2023 09:31:49 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 01:48:59 GMT-0300"),
                                        dueDate: new Date("Tue Aug 01 2023 03:35:50 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 07:33:03 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 18:18:21 GMT-0300"),
                                        dueDate: new Date("Sat Aug 05 2023 22:59:29 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 21:37:44 GMT-0300"),
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
                        }
                    ],
                    attachments: [
                        {
                            url: "https://mapanamao.com.br/wp-content/uploads/2016/03/o-que-fazer-em-nice-fran%C3%A7a-1.jpg",
                            user: {
                                name: "Rosina Rolfson Rice",
                                photo: "https://pbs.twimg.com/profile_images/879533823763066883/_WjQz3Tm_400x400.jpg",
                                email: "rosina.rice@szot.com"
                            },
                            date: new Date,
                            isCover: true
                        },

                    ],
                    dates: {
                        startDate: new Date("Mon Jan 09 2023 06:20:43 GMT-0300"),
                        dueDate: new Date("Sun Dec 17 2023 21:41:02 GMT-0300"),
                        dueReminder: new Date("Tue Jan 10 2023 00:18:59 GMT-0300"),
                    },
                    labels: [],
                    desc: "Placeat qui nisi corrupti ad et ut eum."
                },
                {
                    title: "KESSLER, MCKENZIE AND WILL",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 03:38:13 GMT-0300"),
                                        dueDate: new Date("Fri Feb 17 2023 20:42:41 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 00:07:58 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 09:50:38 GMT-0300"),
                                        dueDate: new Date("Fri Jun 16 2023 23:13:44 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 06:04:48 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Mon Jan 09 2023 04:22:43 GMT-0300"),
                        dueDate: new Date("Wed Aug 30 2023 06:20:34 GMT-0300"),
                        dueReminder: new Date("Mon Jan 09 2023 18:19:44 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 17:54:31 GMT-0300"),
                                        dueDate: new Date("Thu Mar 16 2023 02:01:01 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 09:50:20 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 14:47:23 GMT-0300"),
                                        dueDate: new Date("Mon Jul 24 2023 00:42:20 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 03:48:21 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Sun Jan 08 2023 20:12:23 GMT-0300"),
                        dueDate: new Date("Tue Oct 10 2023 16:49:52 GMT-0300"),
                        dueReminder: new Date("Tue Jan 10 2023 08:53:50 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Mon Jan 09 2023 06:51:13 GMT-0300"),
                        dueDate: new Date("Fri Nov 24 2023 19:04:12 GMT-0300"),
                        dueReminder: new Date("Tue Jan 10 2023 01:45:49 GMT-0300"),
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
                    desc: '## Rust Struct Example\n\n ```Rust\n struct User {\n    active: bool,\n    username: String,\n    email: String,\n    sign_in_count: u64,\n}\n```'
                },
                {
                    title: "DAVIS, KUHLMAN AND WILLIAMSON",
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 02:56:06 GMT-0300"),
                                        dueDate: new Date("Sat Mar 25 2023 12:34:08 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 10:31:27 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 00:13:56 GMT-0300"),
                                        dueDate: new Date("Fri Dec 22 2023 15:33:46 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 04:33:34 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Mon Jan 09 2023 09:01:06 GMT-0300"),
                        dueDate: new Date("Sat Apr 15 2023 05:41:50 GMT-0300"),
                        dueReminder: new Date("Tue Jan 10 2023 02:54:26 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Mon Jan 09 2023 01:16:11 GMT-0300"),
                                        dueDate: new Date("Fri Jan 20 2023 09:53:48 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 04:46:15 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 15:49:33 GMT-0300"),
                                        dueDate: new Date("Mon Jul 17 2023 19:46:59 GMT-0300"),
                                        dueReminder: new Date("Mon Jan 09 2023 19:21:41 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Mon Jan 09 2023 11:27:18 GMT-0300"),
                        dueDate: new Date("Fri Jan 13 2023 20:07:39 GMT-0300"),
                        dueReminder: new Date("Mon Jan 09 2023 19:43:10 GMT-0300"),
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
                    allChecklistsItems: [],
                    allDoneChecklistsItems: [],
                    checklists: [
                        {
                            title: "Australian Cattle Dog",
                            items: [
                                {
                                    title: "Fiat Aventador",
                                    members: [],
                                    done: true,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 17:05:51 GMT-0300"),
                                        dueDate: new Date("Tue Jul 25 2023 20:52:57 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 02:16:04 GMT-0300"),
                                    }
                                },
                                {
                                    title: "Ford Roadster",
                                    members: [],
                                    done: false,
                                    dates: {
                                        startDate: new Date("Sun Jan 08 2023 14:17:47 GMT-0300"),
                                        dueDate: new Date("Fri Jun 30 2023 19:07:43 GMT-0300"),
                                        dueReminder: new Date("Tue Jan 10 2023 06:30:06 GMT-0300"),
                                    }
                                }
                            ],
                        }
                    ],
                    members: [],
                    comments: [],
                    attachments: [],
                    dates: {
                        startDate: new Date("Sun Jan 08 2023 12:59:23 GMT-0300"),
                        dueDate: new Date("Sun May 28 2023 13:34:23 GMT-0300"),
                        dueReminder: new Date("Tue Jan 10 2023 06:15:23 GMT-0300"),
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