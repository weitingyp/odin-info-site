import express from "express";

const app = express();

// import author router, declare it before all other base routes
import authorRouter from "./routes/authorRouter.js";
app.use("/authors", authorRouter);

app.get("/", (req, res) => res.send("hello world!"));

/* 
ROUTES
- routes can use verbs GET, POST, PUT, DELETE or even all (app.all)

- path matching can be exact or use RegEx; useful:
--- /messages? matches to /message or /messages 
--- /(messages)? matches to / or /messages
--- /m*s matches to /ms, /messages, /moos, etc. 

- route parameters can be denoted with ':' ahead of variable name
--- app.get('/:username/messages'), (req, res) => {console.log(req.params.username)})

- query parameters
--- for /user1/messages?message_id=543&action=read
--- app.get('/:username/messages', (req, res) => console.log(req.query.message_id)) // prints 543 
*/

const PORT = process.env.PORT | 8000;
app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
