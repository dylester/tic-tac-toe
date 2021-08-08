import express from "express";

const app = express();

let port = 3000;
app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

let squares = Array(9).fill(null);

app.use(express.static('public'));
app.use(express.json());

app.get("/squares", (request, response) => {
    response.json(squares);
})

app.put("/squares/:squareNumber", (request, response) => {
    const player = request.body.player;
    const squareNumber = request.params.squareNumber;
    squares[squareNumber] = player;
    console.log(squares);
    response.json(squares);
});

app.delete("/squares", (request, response) => {
    squares = Array(9).fill(null);
    response.status(204).end();
});
