const User = require("./models/User")
const Content = require("./models/Content")
const Blog = require("./models/Blog")

const mongoose = require("mongoose")
mongoose
    .connect('mongodb://localhost/panthera', { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });



const users = [
    {
        interests: [
            "art",
            "health",
            "AI",
            "design",
            "science"
        ],
        websites: [],
        profilePicture: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10157164224484550&height=200&width=200&ext=1565189772&hash=AeQ_sPmY4E3QdEjb",
        skills: [],
        _id: "5d23598c9856d448b53b0e38",
        facebookId: "10157164224484550",
        fullName: "Pierre Portal",
        firstName: "Pierre",
        created_at: "2019-07-08T14:56:12.234Z",
        updated_at: "2019-07-11T13:37:58.470Z",
        __v: 0
    },
    {
        interests: [
            "design",
            "food",
            "Ai"
        ],
        websites: [],
        profilePicture: "https://images.unsplash.com/photo-1514846326710-096e4a8035e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        skills: [],
        _id: "5d272d88dda34d984148960c",
        firstName: "Svenja",
        fullName: "Svenja",
        username: "Svenja",
        password: "$2b$10$1nOIVHieF7bAie3YKgO4yePxOD6lhJnPViu/uRE98Y2AK9gWoR3mO",
        created_at: "2019-07-11T12:37:28.247Z",
        updated_at: "2019-07-11T12:38:14.741Z",
        __v: 0
    },
    {
        interests: [
            "nature",
            "science",
            "food"
        ],
        websites: [],
        profilePicture: "https://images.unsplash.com/photo-1543246239-7ae3ded686ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        skills: [],
        _id: "5d273ab460688f99fbbf9931",
        firstName: "John Rivers",
        fullName: "John Rivers",
        username: "John Rivers",
        password: "$2b$10$UUYN7ChT/ZQWDiZ3j0bwVeavC8vb.4LtnKyEd2U4jX7pTFjMJjqvW",
        created_at: "2019-07-11T13:33:40.764Z",
        updated_at: "2019-07-11T13:58:50.807Z",
        __v: 0
    },
    {
        interests: [
            "health",
            "music",
            "AI",
            "art",
            "tech",
            "nature"
        ],
        websites: [],
        profilePicture: "https://images.unsplash.com/photo-1546672741-d327539d5f13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        skills: [],
        _id: "5d2741051d59ce9bb3b48fde",
        firstName: "Jacques",
        fullName: "Jacques",
        username: "Jacques",
        password: "$2b$10$kVh1XjUSMlGULocNBWAxce5adDCjIk7Vbzs7zG8XvXQtoKLprs8Z2",
        created_at: "2019-07-11T14:00:37.181Z",
        updated_at: "2019-07-11T14:02:38.143Z",
        __v: 0
    }
]

const content = [
    {
        likedBy: [
            "5d23598c9856d448b53b0e38"
        ],
        likingUserPic: [
            "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10157164224484550&height=200&width=200&ext=1565189772&hash=AeQ_sPmY4E3QdEjb"
        ],
        _id: "5d27391b09320499d914c6e0",
        article: {
            source: {
                id: "engadget",
                name: "Engadget"
            },
            author: "Georgina Torbet",
            title: "Google Lens can tell you about the people behind local artworks",
            description: "If you're sitting in a coffee shop and you spot a neat mural on the wall, you could soon use your smartphone to identify the local artist who was behind it. A new feature of Google Lens currently being tested in San Francisco will recognize the artworks you s…",
            url: "https://www.engadget.com/2019/07/09/google-lens-art-discovery/",
            urlToImage: "https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fresize%3D2000%252C2000%252Cshrink%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2019-07%252Fd16d9690-a234-11e9-bfdc-2e655385c435%26client%3Da1acac3e1b3290917d92%26signature%3De4dae0d6eca78be29ca566f46649302bfd7bfd20&client=amp-blogside-v2&signature=e8c078a5c209c494e0441dd8216cbac607a1782e",
            publishedAt: "2019-07-09T13:33:00Z",
            content: "To use the feature, go to the Google app on your smartphone and open up Lens. Then point the camera at the artwork you're interested in and tap the blue dot. This brings up a slider with information about the work, which you can tap to see a biography of the … [+861 chars]"
        },
        created_at: "2019-07-11T13:26:51.090Z",
        updated_at: "2019-07-11T13:26:51.090Z",
        __v: 0
    },
    {
        likedBy: [
            "5d272d88dda34d984148960c"
        ],
        likingUserPic: [
            "https://images.unsplash.com/photo-1514846326710-096e4a8035e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        ],
        _id: "5d273a6a60688f99fbbf992f",
        article: {
            source: {
                id: null,
                name: "Gizmodo.com"
            },
            author: "Andrew Liszewski",
            title: "This Website's Deliberately Frustrating Interface Will Make You Appreciate Good Web Design",
            description: "You don’t know what you have until it’s gone is a well-worn cliche, but also an apt description of a web game called User Inyerface, created by design firm Bagaar. It takes all the normal conventions of a website’s user interface and throws them out the windo…",
            url: "https://gizmodo.com/this-websites-deliberately-frustrating-interface-will-m-1836131103",
            urlToImage: "https://i.kinja-img.com/gawker-media/image/upload/s--1OE2P7bB--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/fu7hm7wmpduiypqfb7zr.jpg",
            publishedAt: "2019-07-05T18:00:00Z",
            content: "You dont know what you have until its gone is a well-worn cliche, but also an apt description of a web game called User Inyerface, created by design firm Bagaar. It takes all the normal conventions of a websites user interface and throws them out the window, … [+2050 chars]"
        },
        created_at: "2019-07-11T13:32:26.873Z",
        updated_at: "2019-07-11T13:32:26.873Z",
        __v: 0
    },
    {
        likedBy: [
            "5d272d88dda34d984148960c"
        ],
        likingUserPic: [
            "https://images.unsplash.com/photo-1514846326710-096e4a8035e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        ],
        _id: "5d273a6f60688f99fbbf9930",
        article: {
            source: {
                id: "engadget",
                name: "Engadget"
            },
            author: "Jon Fingas",
            title: "AI can simulate quantum systems without massive computing power",
            description: "It's difficult to simulate quantum physics, as the computing demand grows exponentially the more complex the quantum system gets -- even a supercomputer might not be enough. AI might come to the rescue, though. Researchers have developed a computational metho…",
            url: "https://www.engadget.com/2019/07/05/ai-simulates-quantum-systems/",
            urlToImage: "https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D1538%252C898%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C934%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2019-07%252Fc780db50-9f33-11e9-a7d3-c49656f96019%26client%3Da1acac3e1b3290917d92%26signature%3De9bac63790a384fc111c3ccd02471aea84326517&client=amp-blogside-v2&signature=ab514baaecd5c7b1f1baaf64824bc07891b516ec",
            publishedAt: "2019-07-05T23:23:00Z",
            content: "It's difficult to simulate quantum physics, as the computing demand grows exponentially the more complex the quantum system gets -- even a supercomputer might not be enough. AI might come to the rescue, though. Researchers have developed a computational metho… [+314 chars]"
        },
        created_at: "2019-07-11T13:32:31.984Z",
        updated_at: "2019-07-11T13:32:31.984Z",
        __v: 0
    },
    {
        likedBy: [
            "5d273ab460688f99fbbf9931"
        ],
        likingUserPic: [
            "https://images.unsplash.com/photo-1543246239-7ae3ded686ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        ],
        _id: "5d273b4860688f99fbbf9932",
        article: {
            source: {
                id: "cnn",
                name: "CNN"
            },
            author: null,
            title: "Construction workers discover triceratops fossils",
            description: "Paleontologists from the Denver Museum of Nature & Science are excavating an adult triceratops buried in bedrock near Denver, Colorado.",
            url: "https://www.cnn.com/videos/us/2019/06/22/triceratops-bones-discovered-in-colorado.cnn",
            urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/190621172953-03-highland-ranch-fossils-dinosaur-super-tease.jpg",
            publishedAt: "2019-06-22T22:05:42Z",
            content: "Chat with us in Facebook Messenger. Find out what's happening in the world as it unfolds."
        },
        created_at: "2019-07-11T13:36:08.233Z",
        updated_at: "2019-07-11T13:36:08.233Z",
        __v: 0
    },
    {
        likedBy: [
            "5d273ab460688f99fbbf9931"
        ],
        likingUserPic: [
            "https://images.unsplash.com/photo-1543246239-7ae3ded686ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        ],
        _id: "5d273b4c60688f99fbbf9933",
        article: {
            source: {
                id: "reuters",
                name: "Reuters"
            },
            author: "Reuters Editorial",
            title: "Iranian oil tanker crew being interviewed as witnesses in Gibraltar",
            description: "The crew on a giant Iranian oil tanker detained in Gibraltar are being interviewed as witnesses, not criminal suspects, in an effort to establish the nature of the cargo and its ultimate destination, a spokesman for the British territory said.",
            url: "https://www.reuters.com/article/us-mideast-iran-tanker-idUSKCN1U00S5",
            urlToImage: "https://s3.reutersmedia.net/resources/r/?m=02&d=20190705&t=2&i=1404738153&w=1200&r=LYNXNPEF640LP",
            publishedAt: "2019-07-05T09:10:18Z",
            content: "LONDON (Reuters) - The crew on a giant Iranian oil tanker detained in Gibraltar are being interviewed as witnesses, not criminal suspects, in an effort to establish the nature of the cargo and its ultimate destination, a spokesman for the British territory sa… [+1998 chars]"
        },
        created_at: "2019-07-11T13:36:12.322Z",
        updated_at: "2019-07-11T13:36:12.322Z",
        __v: 0
    },
    {
        likedBy: [
            "5d273ab460688f99fbbf9931"
        ],
        likingUserPic: [
            "https://images.unsplash.com/photo-1543246239-7ae3ded686ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        ],
        _id: "5d273b5d60688f99fbbf9934",
        article: {
            source: {
                id: "wired",
                name: "Wired"
            },
            author: "Laura Mallonee",
            title: "The Life and Viral Fame of Virginia's Two-Headed Snake",
            description: "What happens to a freak of nature after it gets internet famous?",
            url: "https://www.wired.com/story/two-headed-snake/",
            urlToImage: "https://media.wired.com/photos/5d0165c55b82e3f931051147/191:100/pass/photovetical_TrevorFrost_snake.jpg",
            publishedAt: "2019-06-13T21:53:03Z",
            content: "Late last summer in Woodbridge, Virginia, a woman wandered into her yard and found an eastern copperhead slithering through her flower bed. That's not so unusual where she lives, as the region is home to a plethora of ophidians, from harmless corn snakes to v… [+4439 chars]"
        },
        created_at: "2019-07-11T13:36:29.277Z",
        updated_at: "2019-07-11T13:36:29.277Z",
        __v: 0
    },
    {
        likedBy: [
            "5d273ab460688f99fbbf9931"
        ],
        likingUserPic: [
            "https://images.unsplash.com/photo-1543246239-7ae3ded686ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        ],
        _id: "5d273b7b60688f99fbbf9935",
        article: {
            source: {
                id: "the-new-york-times",
                name: "The New York Times"
            },
            author: "Clyde Haberman",
            title: "How NASA Sold the Science and Glamour of Space Travel",
            description: "At the time of the Apollo 11 lunar landing mission in the 1960s, some Americans had reservations about the wisdom of reaching for the stars when troubles swelled on Earth.",
            url: "https://www.nytimes.com/2019/06/23/us/marketing-moon.html",
            urlToImage: "https://static01.nyt.com/images/2019/06/21/autossell/RRMoon360/RRMoon360-facebookJumbo-v2.jpg",
            publishedAt: "2019-06-24T09:31:00Z",
            content: "For all its glory, the moon walk struck some people as an empty luxury. Popular interest in the space program faded fast; the astounding had become ho-hum. Three scheduled lunar flights were canceled. The last time a human walked on the moon was 1972, when Th… [+1931 chars]"
        },
        created_at: "2019-07-11T13:36:59.551Z",
        updated_at: "2019-07-11T13:36:59.551Z",
        __v: 0
    },
    {
        likedBy: [
            "5d23598c9856d448b53b0e38"
        ],
        likingUserPic: [
            "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10157164224484550&height=200&width=200&ext=1565189772&hash=AeQ_sPmY4E3QdEjb"
        ],
        _id: "5d273dfd3185799b21959f97",
        article: {
            source: {
                id: "techcrunch",
                name: "TechCrunch"
            },
            author: "Devin Coldewey",
            title: "NASA picks a dozen science and tech projects to bring to the surface of the Moon",
            description: "With the Artemis mission scheduled to put boots on lunar regolith as soon as 2024, NASA has a lot of launching to do — and you can be sure none of those launches will go to waste. The agency just announced 12 new science and technology projects to send to the…",
            url: "http://techcrunch.com/2019/07/02/nasa-picks-a-dozen-science-and-tech-projects-to-bring-to-the-surface-of-the-moon/",
            urlToImage: "https://techcrunch.com/wp-content/uploads/2019/07/astrobotic-peregrine.jpg?w=746",
            publishedAt: "2019-07-02T19:01:54Z",
            content: "With the Artemis mission scheduled to put boots on lunar regolith as soon as 2024, NASA has a lot of launching to do and you can be sure none of those launches will go to waste. The agency just announced 12 new science and technology projects to send to the M… [+4811 chars]"
        },
        created_at: "2019-07-11T13:47:41.748Z",
        updated_at: "2019-07-11T13:47:41.748Z",
        __v: 0
    }
]

const blogPosts = [



    {
        likedBy: [],
        _id: "5d27025c07ec5d91f633f620",
        title: "3 Crucial Factors Which Influence Employee Productivity",
        author: "Panthera Team",
        authorPic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
        urlToImage: "https://images.unsplash.com/photo-1543269665-bd1bc9e6f296?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
        description: "Productivity is a crucial element in every organization. Learn which are the 3 crucial factors that influence it, and how to use them to improve it.",
        created_at: "2019-07-11T09:33:16.682Z",
        updated_at: "2019-07-11T09:33:16.682Z",
        __v: 0
    },
    {
        likedBy: [],
        _id: "5d27067baa3b4e919154e56b",
        title: "Taming the Training Budget Beast: My Strategy, Open Sourced",
        author: "Panthera Team",
        authorPic: "https://images.unsplash.com/photo-1551069613-1904dbdcda11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=712&q=80",
        urlToImage: "https://images.unsplash.com/photo-1516635707594-6949bdca3538?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
        description: "Training budgets, and learning “perks” are cropping up more and more frequently as a sweet, sweet perk and an exciting contribution to an organisation’s remuneration package. This specific perk is part of the reason I was so interested in the role managing the People function here at Wonderbly(previously Lost My Name)…",
        created_at: "2019-07-11T09:33:16.682Z",
        updated_at: "2019-07-11T09:33:16.682Z",
        __v: 0
    },
    {
        likedBy: [],
        _id: "5d2706a9aa3b4e919154e56c",
        title: "The Learning Content Pyramid",
        author: "Panthera Team",
        authorPic: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        urlToImage: "https://images.unsplash.com/photo-1544815521-80841127c00f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80",
        description: "Learning and Development, like every other industry, has developed and evolved through the years. In the last decade it has increased its degree of importance, to the point where, according to a study by PWC it’s now become the number 1 aspect job seekers consider before joining an organisation or changing their workplace.",
        created_at: "2019-07-11T09:33:16.682Z",
        updated_at: "2019-07-11T09:33:16.682Z",
        __v: 0
    }
]


users.forEach(x => {
    User.create(x).then(() => console.log("User populate"))
})
content.forEach(x => {
    Content.create(x).then(() => console.log("Content populate"))
})
blogPosts.forEach(x => {
    Blog.create(x).then(() => console.log("Blog populate"))
})

