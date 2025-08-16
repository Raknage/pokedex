import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  // Define test cases, input and expected output
  {
    input: "  extra   whitespace  ",
    expected: ["extra", "whitespace"],
  },
  {
    input: "Mixed CAPITALIZATION More ElEMeNtS",
    expected: ["mixed", "capitalization", "more", "elements"],
  },
  {
    input: "", // Empty
    expected: [],
  },
  {
    input: "   ", // only whitespace
    expected: [],
  },
  {
    input: "  mixed   \t  white  \n  space  ",
    expected: ["mixed", "white", "space"],
  },
  {
    input: "  Leading",
    expected: ["leading"],
  },
  {
    input: "Trailing  ",
    expected: ["trailing"],
  },
  {
    input: "#Special characters!",
    expected: ["#special", "characters!"],
  },
  {
    input: "oneword",
    expected: ["oneword"],
  },
  {
    input: "Different\twhitespace\ncharacters",
    expected: ["different", "whitespace", "characters"],
  },
  {
    input: "   \t\n  ", // various whitespace
    expected: [],
  },

  // Immediately Invoked Function Expression or self-executing anonymous function
])("cleanInput($input)", ({ input, expected }) => {
  // define the actual test to run for each test case
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    // check result to contain right amount of strings
    expect(actual).toHaveLength(expected.length);

    // Check every string
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
