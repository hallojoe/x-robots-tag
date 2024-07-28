export enum XRobotsTagKeys {
  "none" = "none",
  "noindex" = "noindex",
  "indexifembedded" = "indexifembedded",
  "nofollow" = "nofollow",
  "noarchive" = "noarchive",
  "nositelinkssearchbox" = "nositelinkssearchbox",
  "nosnippet" = "nosnippet",
  "max-snippet" = "max-snippet",
  "max-image-preview" = "max-image-preview",
  "max-video-preview" = "max-video-preview",
  "notranslate" = "notranslate",
  "noimageindex" = "noimageindex",
  "unavailable_after" = "unavailable_after",
  "all" = "all"
}

export enum XRobotsTagKeysWithValue {
  "max-snippet" = "max-snippet",
  "max-image-preview" = "max-image-preview",
  "max-video-preview" = "max-video-preview",
  "unavailable_after" = "unavailable_after",
}

export enum StringFormatOptions { 
  None = 0, 
  SingleLine = 1,
  MultiLine = 2,
  WithHeaderName = 4, 
  SingleLineWithHeaderName = SingleLine | WithHeaderName,
  MultiLineWithHeaderNames = MultiLine | WithHeaderName,
}

export enum DuplicateKeyOptions {
  None,
  First,
  Last
}
