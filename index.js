import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if (username === "" || avatar === "" || username === undefined || avatar === undefined || typeof(req.body) !== 'object') {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        users.push({ username, avatar });
        res.status(201).send("CREATED");
    }
});

app.get("/tweets", (req, res) => {
    const page = req.query.page;
    const last10tweets = tweets.slice((page * 10) - 10, (page * 10));
    res.send(last10tweets);
});

app.get("/tweets/:USERNAME", (req, res) => {
    const { USERNAME } = req.params;
    const userTweetsFilter = tweets.filter(tweet => {
        if (USERNAME === tweet.username) {
            return tweet;
        }
    })
    const last10tweets = userTweetsFilter.filter((tweet, index) => {
        if (index >= tweets.length - 10) {
            return tweet;
        }
    })
    res.send(last10tweets.reverse());
});

app.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers;
    const actualUser = users.find(usuario => {
        if (usuario.username === user) {
            return usuario;
        }
    })
    if (user === "" || tweet === "" || user === undefined || tweet === undefined || typeof(req.body) !== 'object') {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        tweets.push({ username: actualUser.username, avatar: actualUser.avatar, tweet });
        res.status(201).send("CREATED");
    }
});

app.listen(5000, console.log("Server ligado na porta 5000"))