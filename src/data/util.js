import axios from "axios";
import {authModule} from "@/pinia/modules/authModule";

export function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export function CustomError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}