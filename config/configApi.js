"use strict"
import dotenv from 'dotenv';
dotenv.config();
const { API_PREFIX  } = process.env;
export default {
    apiPrefix : API_PREFIX,
};