import mhrise from "../images/mhrise.jpg";
import gaminglogo from "../images/gaminglogo.png";
import artlogo from "../images/artlogo.png";


const arrCategories = [
    {
        id: 0,
        name: "Gaming",
        members: 5,
        image: gaminglogo,
        posts: [
            {
                id: "Gaming0",
                category: "Gaming",
                poster: "GuestUser",
                date: "2020-03-31",
                title: "Is this game any good?",
                text: "I have played only MH 3, is this any good?",
                image: mhrise,
                votes: 5,
                comments: 0,

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
                comments: 0,

            },
        ]
    },
    {
        id: 1,
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
                comments: 0,
            },
        ]
    },
    {
        id: 2,
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
                comments: 0,
            },
        ]
    },
    
];

export default arrCategories;