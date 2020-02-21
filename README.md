# `emoji-test`

Patterns to contruct reliable regular expressions to match emojis in a string. 👋💸💻

Most solutions try to be clever by using character ranges to guess what _should_ be an emoji, but these ranges are often incomplete and are hard to keep up-to-date as the Unicode emoji list changes over time. This package generates regex patterns using an object map of all real emojis, generated using the information extracted from the [Emoji source data](https://unicode.org/Public/emoji/13.0/emoji-test.txt).

When new updates are released by Unicode, this library can easily generate a new map object and cut new releases quickly and efficiently.

This package is a fork of [tonton-pixel/emoji-test-patterns](https://github.com/tonton-pixel/emoji-test-patterns), which was designed for use in Node. `emoji-test` can be used in Node or the browser.

## Notes

- Providing patterns as strings instead of regular expressions does require the extra step of using `new RegExp ()` to actually make use of them, but it has two main advantages:
  - Flags can be set differently depending on how the patterns are used. In any case, the regular expressions _must_ include the 'u' flag, since the patterns make use of the new type of Unicode escape sequences: `\u{1F4A9}`.
  - The patterns can be further modified before being turned into regular expressions; for instance, the pattern can be embedded in a larger one (see examples below).

## Installation

Navigate to your _project_ directory and run

```sh
npm install emoji-test
# or
yarn add emoji-test
```

## Testing

A basic test can be performed by running the following command from the _package_ directory:

```sh
yarn test
```

## Examples

### Testing whether an emoji is fully-qualified (keyboard) or non-fully-qualified (display)

```js
import emojiPatterns from 'emoji-test-patterns';
let emojiKeyboardRegex = new RegExp('^' + emojiPatterns.keyboard + '$', 'gu');
console.log(emojiKeyboardRegex.test('❤️')); // true!
console.log(emojiKeyboardRegex.test('🕷')); // false!
```

### Extracting all emojis from a string

```javascript
import emojiPatterns from 'emoji-test-patterns';
let emojiAllRegex = new RegExp(emojiPatterns.all, 'gu');
console.log(
  'AaĀā#*0❤🇦愛爱❤️애💜 🇨🇦🇫🇷🇬🇧🇯🇵🇺🇸 👪⬌👨‍👩‍👦 💑⬌👩‍❤️‍👨 💏⬌👩‍❤️‍💋‍👨'.match(emojiPatterns)
);
// ["❤","❤️","💜","🇨🇦","🇫🇷","🇬🇧","🇯🇵","🇺🇸","👪","👨‍👩‍👦","💑","👩‍❤️‍👨","💏","👩‍❤️‍💋‍👨"]
```

### Extracting all fully-qualified (keyboard) emoji from a string

```js
import emojiPatterns from 'emoji-test-patterns';
let emojiAllRegex = new RegExp(emojiPatterns.all, 'gu');
let emojiKeyboardRegex = new RegExp('^' + emojiPatterns.keyboard + '$', 'u');
let emojiList = 'AaĀā#*0❤🇦愛爱❤️애💜 🇨🇦🇫🇷🇬🇧🇯🇵🇺🇸 👪⬌👨‍👩‍👦 💑⬌👩‍❤️‍👨 💏⬌👩‍❤️‍💋‍👨'.match(
  emojiAllRegex
);
if (emojiList) {
  emojiList = emojiList.filter(emoji => emojiKeyboardRegex.test(emoji));
}
console.log(emojiList);
// ["❤️","💜","🇨🇦","🇫🇷","🇬🇧","🇯🇵","🇺🇸","👪","👨‍👩‍👦","💑","👩‍❤️‍👨","💏","👩‍❤️‍💋‍👨"]
```

### Removing all emoji from a string

```js
import emojiPatterns from 'emoji-test-patterns';
let emojiAllRegex = new RegExp(emojiPatterns.all, 'gu');
console.log(
  'AaĀā#*0❤🇦愛爱❤️애💜 🇨🇦🇫🇷🇬🇧🇯🇵🇺🇸 👪⬌👨‍👩‍👦 💑⬌👩‍❤️‍👨 💏⬌👩‍❤️‍💋‍👨'.replace(emojiAllRegex, '')
);
// "AaĀā#*0🇦愛爱애  ⬌ ⬌ ⬌"
```

## License

The MIT License (MIT)
