import waldo from "../images/waldo_beach.jpg";


const arrCategories = [
    {
        id: 0,
        name: "Gaming",
        members: 5,
        posts: [
            {
                category: "Gaming",
                poster: "Rimuru",
                date: "2020-03-31",
                title: "Is it good?",
                text: "I want to know if this is a good alternative",
                image: waldo,
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