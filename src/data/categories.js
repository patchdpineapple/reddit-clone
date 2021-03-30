import mhrise from "../images/mhrise.jpg";
import gaminglogo from "../images/gaminglogo.png";
import artlogo from "../images/artlogo.png";

const arrCategories = [
  {
    id: "Gaming",
    name: "Gaming",
    members: 5,
    image: gaminglogo,
    posts: [
      {
        id: "Gaming0",
        category: "Gaming",
        poster: "GuestUser",
        date: "2020-03-31",
        title: "Monster Hunter Rise",
        text: "I have played only MH 3, should I play this?",
        image: mhrise,
        votes: 5,
        comments: [
          {
            id: "Gaming0Comment0",
            user: "GuestUser",
            text: "Or should I play Monster Hunter World instead?",
          },
          {
            id: "Gaming0Comment1",
            user: "Megumi",
            text: "Yes play it. It is good.",
          },
          {
            id: "Gaming0Comment2",
            user: "Beako",
            text: "I recommend you play World first.",
          },
        ],
      },
      {
        id: "Gaming1",
        category: "Gaming",
        poster: "Beako",
        date: "2020-05-15",
        title: "Worst game of all time",
        text: "What is your worst game of all time",
        image: "",
        votes: 2,
        comments: [],
      },
    ],
  },
  {
    id: "Art",
    name: "Art",
    members: 2,
    image: artlogo,
    posts: [
      {
        id: "Art0",
        category: "Art",
        poster: "Megumi",
        date: "2020-05-05",
        title: "Favorite art?",
        text: "What is your favorite artwork?",
        image: "",
        votes: 3,
        comments: [],
      },
    ],
  },
  {
    id: "Poetry",
    name: "Poetry",
    members: 1,
    image: "",
    posts: [
      {
        id: "Poetry0",
        category: "Poetry",
        poster: "GuestUser",
        date: "2020-01-07",
        title: "Your favorite poet?",
        text: "Who is your favorite poet?",
        image: "",
        votes: 1,
        comments: [],
      },
    ],
  },
];

export default arrCategories;
