//dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

//initialize express
const app = express();
const PORT = process.env.PORT || 3001;

const allNotes = require('./db/db.json');