import express from "express";
import path from "path";

const app = express();

/* 
VIEWS - templatized HTML
- see later lines for rendered templates, arguments passed into the res.locals object when rendering
- you can write JS logic within <% array.forEach( element => { console.log(element) })
- you can add template arguments with <%= variablename %> and pass these arguments via the res.locals object
- you can nest HTML templates in HTML templates using <%- include 'ejsfilenamewithoutextension' %>
- res.locals object is also the second argument to res.render e.g. res.render('ejsfilename', { arg: arg_val})
*/
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

/* 
VIEWS - serving static assets with EJS
- express.static() is a middleware function that enables static assets
*/
app.use(express.static(path.join("import.meta.dirname", "static")));

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

// import author router, declare it before all other base routes
import authorRouter from "./routes/authorRouter.js";
app.use("/authors", authorRouter);

// app.js

const links = [
	{ href: "/", text: "Home" },
	{ href: "about", text: "About" },
];

const users = ["Rose", "Cake", "Biff"];

app.get("/", (req, res) => {
	res.render("index", { links: links, users: users });
});

app.get("/about", (req, res) => {
	res.render("about", { links });
});

const PORT = process.env.PORT | 8000;
app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
