import { XRobotsTagHeaderName } from "./Constants"
import { DuplicateKeyOptions, StringFormatOptions, XRobotsTagKeys } from "./Enums"
import { formatText, getUserAgentNames, splitAt } from "./Text"
import { XRobotsTagUserAgentValue, XRobotsTagValue } from "./Types"

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
    
  private map(text: string): XRobotsTagValue {

    const formatedText = text
      .split("\n")
      .map(v => v.replace(new RegExp(`${XRobotsTagHeaderName}(?:[^:]+)?:`, "g"), "").trim())
      .map(xRobotsTagLine => xRobotsTagLine.trim().toLowerCase())
      .filter(xRobotsTagLine => xRobotsTagLine !== "")
      .join(",")
   
    const userAgentNames = ["", ...Array.from(new Set(formatedText
      .split(",")
      .map(v => v.trim())
      .map(v => v.split(":").map(v => v.trim())[0])
      .filter(entity => !Object.keys(XRobotsTagKeys).some(key => entity.startsWith(key)))      
      .filter(userAgentName => userAgentName !== "")))
    ]

    const userAgentValues = userAgentNames.length === 1 ? [formatedText] : splitAt(formatedText, userAgentNames)
    
    const result: XRobotsTagValue = Object.fromEntries(userAgentNames.map(key => [key, { }]))
      
    userAgentValues.forEach(userAgentValue => {

      const xRobotsTagUserAgent = new XRobotsTagUserAgent(userAgentValue)
      
      result[xRobotsTagUserAgent.key] = xRobotsTagUserAgent.key in result 
        ? this._duplicateKeyOptions === DuplicateKeyOptions.First 
          ? { ...xRobotsTagUserAgent.value, ...result[xRobotsTagUserAgent.key] }
          : { ...result[xRobotsTagUserAgent.key], ...xRobotsTagUserAgent.value }
        : { ...xRobotsTagUserAgent.value }

    })

    return result      

  }
  
}

export class XRobotsTagUserAgent {

  private _key: string = ""
  private _value: XRobotsTagUserAgentValue = { }

  constructor(value: string) {

    value = value.trim()

    const startsWithUserAgent = !Object.keys(XRobotsTagKeys).some(directiveKey => value.startsWith(directiveKey))

    if(startsWithUserAgent) {

      const separatorIndex = value.indexOf(":")

      this._key = value.substring(0, separatorIndex)

      value = value.substring(separatorIndex + 1)
      
    }

    this._value = this.map(value)

  }

  private map(value:string):XRobotsTagUserAgentValue {

    var result:XRobotsTagUserAgentValue = { }

    const directives = value.split(",").map(v => v.trim())
    for(const directive of directives) {

      const directiveSeparatorIndex = directive.indexOf(":")
      const directiveKey = directiveSeparatorIndex > -1 ? directive.substring(0, directiveSeparatorIndex) : directive
      const directiveValue = directiveSeparatorIndex > -1 ? directive.substring(directiveSeparatorIndex + 1).trim() : ""

      result[directiveKey] = directiveValue
      
    }

    return result

  }

  public get key():string { return this._key }

  public get value():XRobotsTagUserAgentValue { return this._value }

  public toString() {

    let result = `${this._key === "" ? "" : `${this._key}: ` }`            

    result += Object.keys(this._value).map(directiveKey => {
      return this._value[directiveKey] === "" 
        ? directiveKey 
        : `${directiveKey}: ${this._value[directiveKey]}`        
    }).join(", ")

    return result
  }
  
}


