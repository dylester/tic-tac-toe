import express from "express";

const app = express();

let port = 80;
app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

let isNextPlayerX = true;
let squares = Array(9).fill(null);

app.use(express.static('public'));
app.use(express.json());

app.get("/squares", (request, response) => {
    response.json({
        squares,
        isNextPlayerX,
    });
})

app.put("/squares/:squareNumber", (request, response) => {
    let nextPlayer = isNextPlayerX ? 'X' : 'O';
    const squareNumber = request.params.squareNumber;
    squares[squareNumber] = nextPlayer;
    console.log(squares);
    isNextPlayerX = !isNextPlayerX;
    response.json(squares);
});

app.delete("/squares", (request, response) => {
    squares = Array(9).fill(null);
    response.status(204).end();
    // change server side next player and button clicked (so to a reset state)
});
