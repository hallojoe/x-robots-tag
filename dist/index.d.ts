import { DuplicateKeyOptions, StringFormatOptions } from "./Enums";
import { XRobotsTagUserAgentValue, XRobotsTagValue } from "./Types";
export declare class XRobotsTag {
    private _value;
    private _duplicateKeyOptions;
    private _stringFormatOptions;
    constructor(text: string, duplicateKeyOptions?: DuplicateKeyOptions, stringFormatOptions?: StringFormatOptions);
    get value(): XRobotsTagValue;
    toString(): string;
    private map;
}
export declare class XRobotsTagUserAgent {
    private _key;
    private _value;
    constructor(value: string | XRobotsTagUserAgentValue);
    private map;
    get key(): string;
    get value(): XRobotsTagUserAgentValue;
    toString(): string;
}
