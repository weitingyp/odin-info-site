import Router from "express";

const authorRouter = Router();

authorRouter.get("/", (req, res) => {
	res.send("all authors");
});

authorRouter.get("/:authorID", (req, res) => {
	const { authorID } = req.params;
	res.send(`Author ID is ${authorID}`);
});

export default authorRouter;
