// import React from "react";
import { useState, useEffect } from "react";
import { initState, State, prompt, CLICommand } from "../core/state.js";
import { cleanInput } from "../core/repl.js";
import { Text, Box, useFocus } from "ink";
import TextInput from "ink-text-input";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";
import { TitledBox } from "@mishieck/ink-titled-box";

type Message = {
  role: "user" | "cmd" | "error";
  text: string;
};

const ROLE_COLORS = {
  user: "blue",
  cmd: "yellow",
  error: "red",
};

// const completer: Completer = (line: string) => {
//   const completions = Object.keys(commands);
//   const hits = completions.filter((c) => c.startsWith(line));
//   return [hits.length ? hits : completions, line];
// };

export default function App() {
  const [state, setState] = useState<State | null>(null);
  const [output, setOutput] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [completions, setCompletions] = useState<[string, CLICommand][]>([]);
  useFocus();

  useEffect(() => {
    const init = async () => {
      setState(await initState(1000 * 60 * 60));
      setOutput([]);
    };

    init();
  }, []);

  async function handleCommand(input: string) {
    if (input === "") {
      return;
    }

    // add user input to output array
    setOutput((prevOutput) => [
      ...prevOutput,
      { role: "user", text: `${prompt}${input}` },
    ]);

    const args = cleanInput(input);
    const [commandName, ...commandArgs] = args;

    // Ensure that state can't be null here to satisfy TS
    if (!state) {
      setOutput((prevOutput) => [
        ...prevOutput,
        { role: "error", text: "State not initialized" },
      ]);
      return;
    }
    const command = state.commands[commandName];

    // error if command is not valid
    if (command === undefined) {
      setOutput((prevOutput) => [
        ...prevOutput,
        { role: "error", text: "Unknown command" },
      ]);
      setInput("");
      return;
    }

    let cmdOutput = "";

    // execute command
    try {
      cmdOutput = await command.callback(state, ...commandArgs);
    } catch (e) {
      setOutput((prevOutput) => [
        ...prevOutput,
        { role: "error", text: `${(e as Error).message}` },
      ]);
      return;
    }

    setOutput((prevOutput) => [
      ...prevOutput,
      { role: "cmd", text: cmdOutput },
    ]);

    setInput("");
  }

  function handleInput(input: string) {
    setInput(input);
    if (!state) {
      setCompletions([]);
      return;
    }
    const filteredCompletions = Object.entries(state.commands).filter(
      ([cmd, _obj]) => cmd.startsWith(input),
    );
    setCompletions(filteredCompletions);
  }

  return (
    <>
      <Gradient name="summer">
        <BigText text="Pokedex" />
      </Gradient>
      <TitledBox
        borderStyle="round"
        borderColor="yellow"
        titles={["Pokedex"]}
        flexDirection="column"
      >
        {output.map((msg, index) => (
          <Text color={ROLE_COLORS[msg.role]} key={index}>
            {msg.text}
          </Text>
        ))}

        <Box borderStyle="single" borderColor="blue">
          <Text color="blue">{prompt}</Text>
          <TextInput
            value={input}
            onChange={handleInput}
            onSubmit={handleCommand}
          />
        </Box>

        <Box flexDirection="column">
          {completions.length > 0 &&
            input.length > 0 &&
            completions.map(([key, cmd]) => (
              <Box key={key} flexDirection="row">
                <Box width={15}>
                  <Text dimColor color="white">
                    {key}
                  </Text>
                </Box>
                <Text>{cmd.description}</Text>
              </Box>
            ))}
        </Box>
      </TitledBox>
    </>
  );
}
