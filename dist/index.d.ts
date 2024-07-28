import { DuplicateKeyOptions, StringFormatOptions } from "./Enums";
import { XRobotsTagValue } from "./Types";
export declare class XRobotsTag {
    private _value;
    private _duplicateKeyOptions;
    private _stringFormatOptions;
    constructor(text: string, duplicateKeyOptions?: DuplicateKeyOptions, stringFormatOptions?: StringFormatOptions);
    get value(): XRobotsTagValue;
    toString(): string;
    private mapValue;
    private mapStringValues;
    private map;
}
