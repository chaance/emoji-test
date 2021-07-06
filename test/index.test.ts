import emojiPatterns from "../src";

const testString =
	"happy go lucky AaĀā❤愛爱❤️애💜 👳🏻👳🏼👳🏽👳🏾👳🏿 hello 🇨🇦🇫🇷🇬🇧🇯🇵🇺🇸 👪⬌👨‍👩‍👦 💑⬌👩‍❤️‍👨 💏⬌👩‍❤️‍💋‍👨";

describe("emoji regex", () => {
	it(`should use the right keys`, () => {
		let keys = Object.keys(emojiPatterns);
		expect(keys.includes("all")).toBe(true);
		expect(keys.includes("component")).toBe(true);
		expect(keys.includes("keyboard")).toBe(true);
		expect(keys.includes("display")).toBe(true);
	});
	it("should select fully qualified (keyboard) emojis", () => {
		let emojiKeyboardRegex = new RegExp(
			"^" + emojiPatterns.keyboard + "$",
			"gu"
		);
		expect(emojiKeyboardRegex.test("❤️")).toBe(true);
		expect(emojiKeyboardRegex.test("🕷")).toBe(false);
	});
	it("should select non-fully qualified (display) emojis", () => {
		let emojiKeyboardRegex = new RegExp(
			"^" + emojiPatterns.display + "$",
			"gu"
		);
		expect(emojiKeyboardRegex.test("❤️")).toBe(false);
		expect(emojiKeyboardRegex.test("🚴🏻‍♂️")).toBe(false);
		expect(emojiKeyboardRegex.test("🕷")).toBe(true);
	});
	it("should select all emojis", () => {
		let emojiRegex = new RegExp(emojiPatterns.all, "gu");
		let match = testString.match(emojiRegex)!;
		expect(match.includes("happy")).toBe(false);
		expect(match.includes("go")).toBe(false);
		expect(match.includes(" ")).toBe(false);
		expect(match.includes("愛")).toBe(false);
		expect(match.includes("애")).toBe(false);
		expect(match.includes("❤️")).toBe(true);
		expect(match.includes("👳🏻")).toBe(true);
		expect(match.includes("🇨🇦")).toBe(true);
		expect(match.includes("👳🏿")).toBe(true);
		expect(testString.replace(emojiRegex, "")).toBe(
			"happy go lucky AaĀā愛爱애  hello  ⬌ ⬌ ⬌"
		);
	});
});
