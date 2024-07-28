import { XRobotsTagHeaderName } from "./Constants";
import { XRobotsTagKeys } from "./Enums";

export function formatText(text: string): string {
  return text
    .split("\n")
    .map(v => v.replace(new RegExp(`${XRobotsTagHeaderName}(?:[^:]+)?:`, "g"), "").trim())
    .map(xRobotsTagLine => xRobotsTagLine.trim().toLowerCase())
    .filter(xRobotsTagLine => xRobotsTagLine !== "").join(",")
}

export function getUserAgentNames(formatedText:string):string[] {              
  const userAgentNames = Array.from(new Set(formatedText
    .split(",")
    .map(v => v.trim())
    .map(v => v.split(":").map(v => v.trim())[0])
    .filter(entity => !Object.keys(XRobotsTagKeys).some(key => entity.startsWith(key)))      
    .filter(userAgentName => userAgentName !== "")))

  return ["", ...userAgentNames]
}


export function splitAt(value: string, separators: string[]): string[] {
  const splitExpression = new RegExp(`(?=${separators.filter(separator => separator !== "").join("|")})`, "g")
  const result = value
    .split(splitExpression)
    .map(matchValue => matchValue.split(",").filter(v => v.trim() !== "").join(", "))
  return result
}
