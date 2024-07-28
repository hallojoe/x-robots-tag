"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XRobotsTag = void 0;
const Enums_1 = require("./Enums");
const Text_1 = require("./Text");
class XRobotsTag {
    _value = {};
    _duplicateKeyOptions = Enums_1.DuplicateKeyOptions.First;
    _stringFormatOptions = Enums_1.StringFormatOptions.SingleLine;
    constructor(text, duplicateKeyOptions = Enums_1.DuplicateKeyOptions.First, stringFormatOptions = Enums_1.StringFormatOptions.SingleLine) {
        this._duplicateKeyOptions = duplicateKeyOptions;
        this._stringFormatOptions = stringFormatOptions;
        this._value = this.map(text);
    }
    get value() {
        return this._value;
    }
    toString() {
        const result = Object.keys(this._value).map(userAgentKey => {
            return `${userAgentKey === "" ? `` : `${userAgentKey}: `}${Object.keys(this._value[userAgentKey]).map(directiveKey => {
                return this._value[userAgentKey][directiveKey] === ""
                    ? directiveKey
                    : `${directiveKey}: ${this._value[userAgentKey][directiveKey]}`;
            }).join(", ")}`;
        });
        return result.join(this._stringFormatOptions === Enums_1.StringFormatOptions.SingleLine ? ", " : "\n");
    }
    mapValue(stringValues) {
        const result = Object.fromEntries(Object.keys(stringValues).map(key => [key, {}]));
        for (const userAgentKey in stringValues) {
            const directivesString = stringValues[userAgentKey];
            const directiveValues = directivesString.split(",").map(userAgentValue => userAgentValue.trim());
            directiveValues.forEach(directiveValue => {
                const [key, value] = (0, Text_1.getDirectiveKeyValue)(directiveValue);
                result[userAgentKey][key] = value;
            });
        }
        return result;
    }
    mapStringValues(userAgentNames, userAgentValues) {
        const stringValues = Object.fromEntries(userAgentNames.map(key => [key, ""]));
        userAgentValues.forEach(userAgentValue => {
            const separatorIndex = userAgentValue.indexOf(":");
            const directiveOrUserAgentName = userAgentValue.substring(0, separatorIndex).trim();
            const keyName = userAgentNames.some(userAgentName => userAgentName === directiveOrUserAgentName)
                ? directiveOrUserAgentName
                : "";
            userAgentValue = keyName !== ""
                ? userAgentValue.substring(separatorIndex + 1).trim()
                : userAgentValue;
            stringValues[keyName] = stringValues[keyName] !== ""
                ? `${stringValues[keyName]}, ${userAgentValue}`
                : userAgentValue;
        });
        if (this._duplicateKeyOptions !== Enums_1.DuplicateKeyOptions.None) {
            for (const key in stringValues) {
                stringValues[key] = this._duplicateKeyOptions === Enums_1.DuplicateKeyOptions.Last
                    ? Array.from(new Set(stringValues[key].split(",").map(v => v.trim()).reverse())).reverse().join(", ")
                    : Array.from(new Set(stringValues[key].split(",").map(v => v.trim()))).join(", ");
            }
        }
        return stringValues;
    }
    map(text) {
        // Format text      
        const formatedText = (0, Text_1.formatText)(text);
        // Get user agents 
        const userAgentNames = (0, Text_1.getUserAgentNames)(formatedText);
        // Get user agent values(lines)
        const userAgentValues = (0, Text_1.getUserAgentValues)(formatedText, userAgentNames);
        // Create string dictionary(useragent key, string value)  
        const stringValues = this.mapStringValues(userAgentNames, userAgentValues);
        // Create result value 
        const result = this.mapValue(stringValues);
        return result;
    }
}
exports.XRobotsTag = XRobotsTag;
