// dependencies 
const express = require ("express");
const path = require ("path");
const fs = require("fs");

// set up express app

const app = express(); 
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


