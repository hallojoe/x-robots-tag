import { XRobotsTag } from "../src"

type Expectation = { userAgent: string, directives: { [key:string]: string | boolean | undefined } }

describe.each([
  {
    name: "simple",
    input: "noindex,    nofollow",
    expectations: [
      { userAgent: "", directives: { "noindex": true, "nofollow": true } },
    ]
  },
  {
    name: "multiBotManyLines",
    input: `
X-Robots-Tag   : noindex, nofollow, max-snippet: 255, googlebot: notranslate 

X-Robots-Tag  : googlebot: noindex, unavailable_after: 25 jun 2010 15:00:00 pst
X-Robots-Tag : facebot: noindex, nofollow, max-image-preview: standard, bingbot: max-snippet: 100
X-Robots-Tag: googlebot: noindex

`,
    expectations: [
      { userAgent: "", directives: { "noindex": true, "nofollow": true, "max-snippet": "255" } },
      { userAgent: "googlebot", directives: { "notranslate": true, "noindex": true, "unavailable_after": "25 jun 2010 15:00:00 pst" } },
      { userAgent: "bingbot", directives: { "max-snippet": "100" } },
      { userAgent: "facebot", directives: { "nofollow": true, "noindex": true, "max-image-preview": "standard" } }
    ]
  },  
  {
    name: "multiBotSingleLine",
    input: "X-Robots-Tag:noindex,  nofollow, max-snippet: 255, googlebot: notranslate, googlebot: noindex, unavailable_after: 25 jun 2010 15:00:00 pst,facebot: noindex, nofollow, max-image-preview:standard, bingbot: max-snippet: 100,googlebot: noindex",
    expectations: [
      { userAgent: "", directives: { "noindex": true, "nofollow": true, "max-snippet": "255" } },
      { userAgent: "googlebot", directives: { "notranslate": true, "noindex": true, "unavailable_after": "25 jun 2010 15:00:00 pst" } },
      { userAgent: "bingbot", directives: { "max-snippet": "100" } },
      { userAgent: "facebot", directives: { "nofollow": true, "noindex": true, "max-image-preview": "standard" } }
    ]
  }

].map(test => { return { name: test.name, input: test.input, expectations: test.expectations.map(expectation => expectation as Expectation) }})

)("test x-robots-tag-header from $name", ({ input, expectations }) => {

  let xRobotsTag = new XRobotsTag(input)

  it.each(expectations)(    
    "should have expected directives for $userAgent",
    ({ userAgent, directives}) => {
 
      for (const [directive, expectedValue] of Object.entries(directives)) {

        if (expectedValue === true) {

          expect(directive in xRobotsTag.value[userAgent]).toBe(true)

        } else {

          expect(directive in xRobotsTag.value[userAgent] && xRobotsTag.value[userAgent][directive]).toBe(expectedValue)

        }
 
      }
 
    }
 
  )

})