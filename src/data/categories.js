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
                category: "Gaming",
                poster: "Rimuru",
                date: "2020-03-31",
                title: "Is this game any good?",
                text: "I have played only MH 3, is this any good?",
                image: mhrise,
                votes: 5,
                comments: 0,

            },
            {
                category: "Gaming",
                poster: "Beako",
                date: "2020-05-15",
                title: "Worst game of all time",
                text: "I want to know if this is a good alternative",
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
    
];

export default arrCategories;