"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateKeyOptions = exports.StringFormatOptions = exports.XRobotsTagKeysWithValue = exports.XRobotsTagKeys = void 0;
var XRobotsTagKeys;
(function (XRobotsTagKeys) {
    XRobotsTagKeys["none"] = "none";
    XRobotsTagKeys["noindex"] = "noindex";
    XRobotsTagKeys["indexifembedded"] = "indexifembedded";
    XRobotsTagKeys["nofollow"] = "nofollow";
    XRobotsTagKeys["noarchive"] = "noarchive";
    XRobotsTagKeys["nositelinkssearchbox"] = "nositelinkssearchbox";
    XRobotsTagKeys["nosnippet"] = "nosnippet";
    XRobotsTagKeys["max-snippet"] = "max-snippet";
    XRobotsTagKeys["max-image-preview"] = "max-image-preview";
    XRobotsTagKeys["max-video-preview"] = "max-video-preview";
    XRobotsTagKeys["notranslate"] = "notranslate";
    XRobotsTagKeys["noimageindex"] = "noimageindex";
    XRobotsTagKeys["unavailable_after"] = "unavailable_after";
    XRobotsTagKeys["all"] = "all";
})(XRobotsTagKeys || (exports.XRobotsTagKeys = XRobotsTagKeys = {}));
var XRobotsTagKeysWithValue;
(function (XRobotsTagKeysWithValue) {
    XRobotsTagKeysWithValue["max-snippet"] = "max-snippet";
    XRobotsTagKeysWithValue["max-image-preview"] = "max-image-preview";
    XRobotsTagKeysWithValue["max-video-preview"] = "max-video-preview";
    XRobotsTagKeysWithValue["unavailable_after"] = "unavailable_after";
})(XRobotsTagKeysWithValue || (exports.XRobotsTagKeysWithValue = XRobotsTagKeysWithValue = {}));
var StringFormatOptions;
(function (StringFormatOptions) {
    StringFormatOptions[StringFormatOptions["None"] = 0] = "None";
    StringFormatOptions[StringFormatOptions["SingleLine"] = 1] = "SingleLine";
    StringFormatOptions[StringFormatOptions["MultiLine"] = 2] = "MultiLine";
    StringFormatOptions[StringFormatOptions["WithHeaderName"] = 4] = "WithHeaderName";
    StringFormatOptions[StringFormatOptions["SingleLineWithHeaderName"] = 5] = "SingleLineWithHeaderName";
    StringFormatOptions[StringFormatOptions["MultiLineWithHeaderNames"] = 6] = "MultiLineWithHeaderNames";
})(StringFormatOptions || (exports.StringFormatOptions = StringFormatOptions = {}));
var DuplicateKeyOptions;
(function (DuplicateKeyOptions) {
    DuplicateKeyOptions[DuplicateKeyOptions["None"] = 0] = "None";
    DuplicateKeyOptions[DuplicateKeyOptions["First"] = 1] = "First";
    DuplicateKeyOptions[DuplicateKeyOptions["Last"] = 2] = "Last";
})(DuplicateKeyOptions || (exports.DuplicateKeyOptions = DuplicateKeyOptions = {}));
