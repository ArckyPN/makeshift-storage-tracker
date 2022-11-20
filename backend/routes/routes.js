const fs = require("fs");
const express = require('express');
const router = express.Router();

router.post('/init', (req, res) => {
    fs.writeFile("data.json", "[]", { flag: "wx" }, (err, file) => {
        if (err)
            res.status(500).json("Error");
        else
            res.status(200).json("Success");
    });
});

router.get('/get-items', (req, res) => {
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    res.status(200).json(data);
});

router.post('/add-item', (req, res) => {
    const item = req.body;
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    data.push(item)
    fs.writeFile("data.json", JSON.stringify(data), err => {
        if (err) console.log(err);
    });
    res.status(200).json("Success");
});

router.delete('/delete/:index', (req, res) => {
    const index = req.params.index;
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    data.splice(index, 1);
    fs.writeFile("data.json", JSON.stringify(data), err => {
        if (err) console.log(err);
    });
    res.status(200).json("Success");
});

module.exports = router;