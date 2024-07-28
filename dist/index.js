"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XRobotsTagUserAgent = exports.XRobotsTag = void 0;
const Constants_1 = require("./Constants");
const Enums_1 = require("./Enums");
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
    map(text) {
        const formatedText = text
            .toLowerCase()
            .split("\n")
            .map(v => v.replace(new RegExp(`${Constants_1.XRobotsTagHeaderName.toLowerCase()}(?:[^:]+)?:`, "g"), "").trim())
            .map(xRobotsTagLine => xRobotsTagLine.trim())
            .filter(xRobotsTagLine => xRobotsTagLine !== "")
            .join(",");
        const userAgentNames = ["", ...Array.from(new Set(formatedText
                .split(",")
                .map(v => v.trim())
                .map(v => v.split(":").map(v => v.trim())[0])
                .filter(entity => !Object.keys(Enums_1.XRobotsTagKeys).some(key => entity.startsWith(key)))
                .filter(userAgentName => userAgentName !== "")))
        ];
        const userAgentValues = userAgentNames.length === 1
            ? [formatedText]
            : formatedText
                .split(new RegExp(`(?=${userAgentNames.filter(userAgentName => userAgentName !== "").join("|")})`, "g"))
                .map(matchValue => matchValue.split(",").filter(v => v.trim() !== "").join(", "));
        const result = Object.fromEntries(userAgentNames.map(key => [key, {}]));
        userAgentValues.forEach(userAgentValue => {
            const xRobotsTagUserAgent = new XRobotsTagUserAgent(userAgentValue);
            result[xRobotsTagUserAgent.key] = xRobotsTagUserAgent.key in result
                ? this._duplicateKeyOptions === Enums_1.DuplicateKeyOptions.First
                    ? { ...xRobotsTagUserAgent.value, ...result[xRobotsTagUserAgent.key] }
                    : { ...result[xRobotsTagUserAgent.key], ...xRobotsTagUserAgent.value }
                : { ...xRobotsTagUserAgent.value };
        });
        return result;
    }
}
exports.XRobotsTag = XRobotsTag;
class XRobotsTagUserAgent {
    _key = "";
    _value = {};
    constructor(value) {
        value = value.trim();
        const startsWithUserAgent = !Object.keys(Enums_1.XRobotsTagKeys).some(directiveKey => value.startsWith(directiveKey));
        if (startsWithUserAgent) {
            const separatorIndex = value.indexOf(":");
            this._key = value.substring(0, separatorIndex);
            value = value.substring(separatorIndex + 1);
        }
        this._value = this.map(value);
    }
    map(value) {
        var result = {};
        const directives = value.split(",").map(v => v.trim());
        for (const directive of directives) {
            const directiveSeparatorIndex = directive.indexOf(":");
            const directiveKey = directiveSeparatorIndex > -1 ? directive.substring(0, directiveSeparatorIndex) : directive;
            const directiveValue = directiveSeparatorIndex > -1 ? directive.substring(directiveSeparatorIndex + 1).trim() : "";
            result[directiveKey] = directiveValue;
        }
        return result;
    }
    get key() { return this._key; }
    get value() { return this._value; }
    toString() {
        let result = `${this._key === "" ? "" : `${this._key}: `}`;
        result += Object.keys(this._value).map(directiveKey => {
            return this._value[directiveKey] === ""
                ? directiveKey
                : `${directiveKey}: ${this._value[directiveKey]}`;
        }).join(", ");
        return result;
    }
}
exports.XRobotsTagUserAgent = XRobotsTagUserAgent;
