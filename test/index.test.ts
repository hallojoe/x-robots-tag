import { XRobotsTag, XRobotsTagUserAgent } from "../src"

type XRobotsTagExpectation = { userAgent: string, directives: { [key:string]: string | boolean | undefined } }

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

].map(test => { return { name: test.name, input: test.input, expectations: test.expectations.map(expectation => expectation as XRobotsTagExpectation) }})

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

describe.each([
  {
    name: "XRobotsTagUserAgent without user agent",
    input: "noindex,    nofollow",
    expectation: { userAgent: "", directives: { "noindex": true, "nofollow": true } }    
  },
  {
    name: "XRobotsTagUserAgent with user agent",
    input: "googlebot: noindex, unavailable_after: 25 jun 2010 15:00:00 pst",
    expectation: { userAgent: "googlebot", directives: { "noindex": true, "unavailable_after": "25 jun 2010 15:00:00 pst" } },
  }    
].map(test => { return { name: test.name, input: test.input, expectation: test.expectation as XRobotsTagExpectation }})

)("test: $name", ({ input, expectation }) => {

  let xRobotsTagUserAgent = new XRobotsTagUserAgent(input)

  it("test expected user agent and directives are present", () => {

    const { userAgent, directives } = expectation

    expect(userAgent === xRobotsTagUserAgent.key).toBe(true)

    for(const directiveKey in directives) {

      expect(directiveKey in xRobotsTagUserAgent.value).toBe(true)

    }

  })

})