"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitAt = exports.getUserAgentNames = exports.formatText = void 0;
const Constants_1 = require("./Constants");
const Enums_1 = require("./Enums");
function formatText(text) {
    return text
        .split("\n")
        .map(v => v.replace(new RegExp(`${Constants_1.XRobotsTagHeaderName}(?:[^:]+)?:`, "g"), "").trim())
        .map(xRobotsTagLine => xRobotsTagLine.trim().toLowerCase())
        .filter(xRobotsTagLine => xRobotsTagLine !== "").join(",");
}
exports.formatText = formatText;
function getUserAgentNames(formatedText) {
    const userAgentNames = Array.from(new Set(formatedText
        .split(",")
        .map(v => v.trim())
        .map(v => v.split(":").map(v => v.trim())[0])
        .filter(entity => !Object.keys(Enums_1.XRobotsTagKeys).some(key => entity.startsWith(key)))
        .filter(userAgentName => userAgentName !== "")));
    return ["", ...userAgentNames];
}
exports.getUserAgentNames = getUserAgentNames;
function splitAt(value, separators) {
    const splitExpression = new RegExp(`(?=${separators.filter(separator => separator !== "").join("|")})`, "g");
    const result = value
        .split(splitExpression)
        .map(matchValue => matchValue.split(",").filter(v => v.trim() !== "").join(", "));
    return result;
}
exports.splitAt = splitAt;
