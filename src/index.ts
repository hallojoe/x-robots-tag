import { DuplicateKeyOptions, StringFormatOptions } from "./Enums"
import { formatText, getDirectiveKeyValue, getUserAgentNames, getUserAgentValues } from "./Text"
import { XRobotsTagStringValue, XRobotsTagValue } from "./Types"

export class XRobotsTag {

    private _value: XRobotsTagValue = { }
    private _duplicateKeyOptions:DuplicateKeyOptions = DuplicateKeyOptions.First
    private _stringFormatOptions:StringFormatOptions = StringFormatOptions.SingleLine
  
    constructor(
      text: string, 
      duplicateKeyOptions:DuplicateKeyOptions = DuplicateKeyOptions.First, 
      stringFormatOptions:StringFormatOptions = StringFormatOptions.SingleLine) {
  
      this._duplicateKeyOptions = duplicateKeyOptions
      this._stringFormatOptions = stringFormatOptions
      this._value = this.map(text)
    }
  
    public get value():XRobotsTagValue {
  
      return this._value
  
    }
  
    public toString() {
  
      const result = Object.keys(this._value).map(userAgentKey => {
  
        return `${userAgentKey === "" ? `` : `${userAgentKey}: ` }${
  
        Object.keys(this._value[userAgentKey]).map(directiveKey => {
  
          return this._value[userAgentKey][directiveKey] === "" 
            ? directiveKey 
            : `${directiveKey}: ${this._value[userAgentKey][directiveKey]}`        
  
        }).join(", ")}`    
  
      }) 
  
      return result.join(this._stringFormatOptions === StringFormatOptions.SingleLine ? ", " : "\n")
  
    }
    
    private mapValue(stringValues: XRobotsTagStringValue):XRobotsTagValue {

      const result: { [key:string]: { [key:string] : string } } =
        Object.fromEntries(Object.keys(stringValues).map(key => [key, { }]))
  
      for(const userAgentKey in stringValues) {
  
        const directivesString = stringValues[userAgentKey]
  
        const directiveValues = directivesString.split(",").map(userAgentValue => userAgentValue.trim())
  
        directiveValues.forEach(directiveValue => {

          const [key, value] = getDirectiveKeyValue(directiveValue)

          result[userAgentKey][key] = value
    
        })
  
      }

      return result
    }

    private mapStringValues(userAgentNames: string[], userAgentValues: string[]):XRobotsTagStringValue {

      const stringValues: XRobotsTagStringValue = 
        Object.fromEntries(userAgentNames.map(key => [key, ""]))

      userAgentValues.forEach(userAgentValue => {
  
        const separatorIndex = userAgentValue.indexOf(":")
  
        const directiveOrUserAgentName = userAgentValue.substring(0, separatorIndex).trim()
  
        const keyName = userAgentNames.some(userAgentName => userAgentName === directiveOrUserAgentName)
          ? directiveOrUserAgentName
          : ""
  
        userAgentValue = keyName !== "" 
          ? userAgentValue.substring(separatorIndex + 1).trim()
          : userAgentValue
  
        stringValues[keyName] = stringValues[keyName] !== ""
          ? `${stringValues[keyName]}, ${userAgentValue}`
          : userAgentValue
        
      })

      if(this._duplicateKeyOptions !== DuplicateKeyOptions.None) {

        for(const key in stringValues) {
          stringValues[key] = this._duplicateKeyOptions === DuplicateKeyOptions.Last
            ? Array.from(new Set(stringValues[key].split(",").map(v => v.trim()).reverse())).reverse().join(", ")
            : Array.from(new Set(stringValues[key].split(",").map(v => v.trim()))).join(", ")
        }
  
      }
      
      return stringValues      
    }

    private map(text: string): { [key:string]: { [key:string]: string }  } {
  
      // Format text      
      const formatedText = formatText(text)     

      // Get user agents 
      const userAgentNames = getUserAgentNames(formatedText)

      // Get user agent values(lines)
      const userAgentValues = getUserAgentValues(formatedText, userAgentNames) 
  
      // Create string dictionary(useragent key, string value)  
      const stringValues = this.mapStringValues(userAgentNames, userAgentValues)

      // Create result value 
      const result = this.mapValue(stringValues)
 
      return result      
    }
  
  }