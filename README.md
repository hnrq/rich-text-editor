## Rich-Text-Editor
This project is not actually a RTE, but a bunch of RTE Frameworks tests, like Draft.js and SlateJS.

### THIS IS NOT A COMPONENT TO USE ON ANOTHER PROJECT, (NOT YET)

## Demo
A live demo is available [here](https://alberoneramos.github.io/rich-text-editor)

## Motivation
Even though there are a lot of React WYSIWYG editors, most of those just didn't fit the requirements. So I decided to create two editors from scratch: **SlateEditor** (using SlateJS) and **TextEditor** (using DraftJS)

## Status
 - 21/10/2019 - For now, I'm focusing on the **SlateEditor**, but why? Well, Slate has a native support for plugins, and it's much more simple to use than DraftJS, in my opinion. For now, I'll continue on its development.
 - 21/12/2019 - Since **SlateJS** had some breaking changes on `0.50`, I turned my focus to **Draft.js**, using `draft-js-plugins-editor`.
 - 22/04/2020 - I came back to **SlateJS**, even though it doesn't have a support for mobile, because this framework is much lighter and easier than **Draft.js**. Currently, it has the following functions: Emojis, hashtag, link and code highlighting (decorations), anchor text, medium-like tooltip for markups and block styles.
