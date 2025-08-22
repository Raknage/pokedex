// import React from "react";
import { useState, useEffect } from "react";
import { initState, State, prompt } from "../core/state.js";
import { cleanInput } from "../core/repl.js";
import { Text, Box, useFocus } from "ink";
import TextInput from "ink-text-input";

export default function App() {
  const [state, setState] = useState<State | null>(null);
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
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
      // console.log(output);
      setOutput((prevOutput) => [...prevOutput, prompt]);
      return;
    }

    const args = cleanInput(input);
    const [commandName, ...commandArgs] = args;

    // Ensure that state can't be null here to satisfy TS
    if (!state) {
      setOutput((prevOutput) => [...prevOutput, "State not initialized"]);
      return;
    }
    const command = state.commands[commandName];

    if (command === undefined) {
      setOutput((prevOutput) => [...prevOutput, "Unknown command"]);
      setInput("");
      return;
    }

    let cmdOutput = "";

    try {
      cmdOutput = await command.callback(state, ...commandArgs);
    } catch (e) {
      setOutput((prevOutput) => [...prevOutput, `${(e as Error).message}`]);
      return;
    }

    setInput("");
    setOutput((prevOutput) => [...prevOutput, cmdOutput]);
  }

  return (
    <>
      {output.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
      <Box borderStyle="single" borderColor="blue">
        <Text color="blue">{prompt}</Text>
        <TextInput value={input} onChange={setInput} onSubmit={handleCommand} />
      </Box>
    </>
  );
}
