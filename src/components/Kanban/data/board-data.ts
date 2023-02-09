import type { TBoard } from "./types";

export const data: TBoard = {
  title: "DEFAULT CARD EXAMPLE",
  backgroundImage: "https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1055680/retina_1708x683_Redesign-EssentialCleanHtmlCss-Luke_Newsletter-623eeeb89c50ec545990667e9cbebb41.png",
  logged: {
    user: {
      name: "Christ Ryan",
      photo: "https://images.pexels.com/photos/2020992/pexels-photo-2020992.jpeg",
      email: "christ.ryan@szot.com",
    },
    permissions: [],
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
                      photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg",
                      email: "rosina.rice@szot.com",
                    },
                    {
                      name: "Alberto Simonis Gerhold",
                      photo: "",
                      email: "alberto.gerhold@szot.com",
                    },
                  ],
                  done: true,
                  dates: {
                    startDate: new Date("Sun Jan 08 2023 12:43:20 GMT-0300"),
                    dueDate: new Date("Tue Jan 10 2023 17:00:00 GMT-0300"),
                    dueReminder: new Date("Tue Jan 10 2023 12:00:56 GMT-0300"),
                  },
                },
                {
                  title: "Documentation",
                  members: [],
                  done: true,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Wireframes",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Max West validation",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Estevan Lesch validation",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Alberto Mertz validation",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [
            {
              name: "Rosina Rolfson Rice",
              photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg",
              email: "rosina.rice@szot.com",
            },
            {
              name: "Alberto Simonis Gerhold",
              photo: "",
              email: "alberto.gerhold@szot.com",
            },
          ],
          comments: [
            {
              text: "My new comment",
              user: {
                name: "Rosina Rolfson Rice",
                photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg",
                email: "rosina.rice@szot.com",
              },
              date: new Date("Sun Jan 08 2023 12:43:20 GMT-0300"),
            },
            {
              text: "Alberto did a comment",
              user: {
                name: "Alberto Simonis Gerhold",
                photo: "",
                email: "alberto.gerhold@szot.com",
              },
              date: new Date("Tue Jan 10 2023 17:00:00 GMT-0300"),
            },
            {
              text: "Christ made a comment and is the logged user. Optio tenetur quaerat deserunt. Ut et eos in iste autem voluptatem. Cupiditate exercitationem harum aut ipsum est consectetur fugiat. Aut quod blanditiis. Id ea ducimus quia soluta. Vel fugit optio rerum accusantium.",
              user: {
                name: "Christ Ryan",
                photo: "https://images.pexels.com/photos/2020992/pexels-photo-2020992.jpeg",
                email: "christ.ryan@szot.com",
              },
              date: new Date("Tue Jan 10 2023 17:00:00 GMT-0300"),
            },
            {
              text: "Christ made a comment today! 😀",
              user: {
                name: "Christ Ryan",
                photo: "https://images.pexels.com/photos/2020992/pexels-photo-2020992.jpeg",
                email: "christ.ryan@szot.com",
              },
              date: new Date(),
            },
          ],
          attachments: [
            {
              url: "https://viagemeturismo.abril.com.br/wp-content/uploads/2016/12/thinkstockphotos-464833177.jpeg",
              user: {
                name: "Christ Ryan",
                photo: "https://images.pexels.com/photos/2020992/pexels-photo-2020992.jpeg",
                email: "christ.ryan@szot.com",
              },
              date: new Date(),
              isCover: true,
            },
            {
              url: "https://i.pinimg.com/originals/fa/cd/67/facd67dcb113958be0e867e6fd089714.jpg",
              user: {
                name: "Rosina Rolfson Rice",
                photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg",
                email: "rosina.rice@szot.com",
              },
              date: new Date(),
              isCover: false,
            },
            {
              url: "https://garagem360.com.br/wp-content/uploads/2022/08/637680956964083931RJ.jpg",
              user: {
                name: "Alberto Simonis Gerhold",
                photo: "",
                email: "alberto.gerhold@szot.com",
              },
              date: new Date(),
              isCover: false,
            },
            {
              url: "https://mojo.org.br/wp-content/uploads/2021/02/0006_IDT_BILINGUE.pdf",
              user: {
                name: "Alberto Simonis Gerhold",
                photo: "",
                email: "alberto.gerhold@szot.com",
              },
              date: new Date(),
              isCover: false,

            },
          ],
          dates: {
            startDate: new Date("Sun Jan 08 2023 12:43:20 GMT-0300"),
            dueDate: new Date("Tue Jan 10 2023 17:00:00 GMT-0300"),
            dueReminder: new Date("Tue Jan 10 2023 12:00:56 GMT-0300"),
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
          desc: "# Et dicta reiciendis aperiam architecto est reiciendis. \n\n1. Item A \n1. Item B \n\n## Another title \n\n- Bullet 1 \n- Bullet 2 \n\n## Code section \n\n```Typescript\nlet num: number; \nnum = 2;\n\nfunction double(x): number {\n    return x * 2;\n};\n\ndouble(num);\n```",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [
            {
              name: "Rosina Rolfson Rice",
              photo: "https://images.pexels.com/photos/2066039/pexels-photo-2066039.jpeg",
              email: "rosina.rice@szot.com",
            },
          ],
          comments: [],
          attachments: [],
          dates: {
            startDate: new Date("Sun Jan 08 2023 12:43:20 GMT-0300"),
            dueDate: new Date("Tue Jan 10 2023 17:00:00 GMT-0300"),
            dueReminder: new Date("Tue Jan 10 2023 12:00:56 GMT-0300"),
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
          desc: "Placeat qui nisi corrupti ad et ut eum.",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [],
          attachments: [],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
          },
          labels: [
            {
              title: "Design",
              hex: "#CD8DE5",
              color: "#fff",
            },
          ],
          desc: "Placeat qui nisi corrupti ad et ut eum.",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: true,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [
            {
              name: "Alberto Simonis Gerhold",
              photo: "",
              email: "alberto.gerhold@szot.com",
            },
          ],
          comments: [],
          attachments: [
            {
              url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
              user: {
                name: "Alberto Simonis Gerhold",
                photo: "",
                email: "alberto.gerhold@szot.com",
              },
              date: new Date(),
              isCover: false,
            },
            {
              url: "https://w0.peakpx.com/wallpaper/635/836/HD-wallpaper-seaside-sunset-look-nice.jpg",
              user: {
                name: "Alberto Simonis Gerhold",
                photo: "",
                email: "alberto.gerhold@szot.com",
              },
              date: new Date(),
              isCover: false,
            },
          ],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
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
          desc: "Placeat qui nisi corrupti ad et ut eum.",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [],
          attachments: [],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
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
          desc: "Placeat qui nisi corrupti ad et ut eum.",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [],
          attachments: [],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
          },
          labels: [
            {
              title: "Deploy",
              hex: "#E568AF",
              color: "#fff",
            },
          ],
          desc: "Placeat qui nisi corrupti ad et ut eum.",
        },
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [],
          attachments: [],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
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
          desc: "Placeat qui nisi corrupti ad et ut eum.",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [
            {
              text: "This is a comment",
              user: {
                name: "Rosina Rolfson Rice",
                photo: "https://pbs.twimg.com/profile_images/879533823763066883/_WjQz3Tm_400x400.jpg",
                email: "rosina.rice@szot.com",
              },
              date: new Date(),
            },
          ],
          attachments: [
            {
              url: "https://mapanamao.com.br/wp-content/uploads/2016/03/o-que-fazer-em-nice-fran%C3%A7a-1.jpg",
              user: {
                name: "Rosina Rolfson Rice",
                photo: "https://pbs.twimg.com/profile_images/879533823763066883/_WjQz3Tm_400x400.jpg",
                email: "rosina.rice@szot.com",
              },
              date: new Date(),
              isCover: true,
            },

          ],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
          },
          labels: [],
          desc: "Placeat qui nisi corrupti ad et ut eum.",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [],
          attachments: [],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
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
          desc: "Placeat qui nisi corrupti ad et ut eum.",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [],
          attachments: [],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
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
          desc: "Placeat qui nisi corrupti ad et ut eum.",
        },
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
            startDate: null,
            dueDate: null,
            dueReminder: null,
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
          desc: "## Rust Struct Example\n\n ```Rust\n struct User {\n    active: bool,\n    username: String,\n    email: String,\n    sign_in_count: u64,\n}\n```",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [],
          attachments: [],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
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
          desc: "Placeat qui nisi corrupti ad et ut eum.",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [],
          attachments: [],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
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
          desc: "Placeat qui nisi corrupti ad et ut eum.",
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
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
                {
                  title: "Ford Roadster",
                  members: [],
                  done: false,
                  dates: {
                    startDate: null,
                    dueDate: null,
                    dueReminder: null,
                  },
                },
              ],
            },
          ],
          members: [],
          comments: [],
          attachments: [],
          dates: {
            startDate: null,
            dueDate: null,
            dueReminder: null,
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
          desc: "Placeat qui nisi corrupti ad et ut eum.",
        },
      ],
    },
    {
      title: "TESTING",
      cards: [],
    },
  ],
};
