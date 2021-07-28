import express from "express";

const app = express();

let port = 3000;
app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

app.use(express.static('public'));
