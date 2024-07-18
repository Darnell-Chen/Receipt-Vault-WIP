const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const route = express.Router();
route.use(express.json());
