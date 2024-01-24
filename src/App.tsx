import { createSignal } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CreateStoryGenerator, StoryType } from "./prompt-core-logic/main";

function App() {
  const [count, setCount] = createSignal(0);

  const handleClick = () => {
    const { createPrompt, generateStory } = CreateStoryGenerator();

    const prompt = createPrompt(StoryType.DarkAndFunny);
    generateStory(prompt);
  };

  return (
    <>
      <div>
        <h2>Select story type</h2>
        <select>
          <option value="funny">funny</option>
          <option value="dark_and_funny">dark_and_funny</option>
        </select>
      </div>

      <div>
        <h2>Output</h2>
        <p>Story: </p>
      </div>

      <div class="generate-button">
        <button onClick={() => handleClick()}>Generate</button>
      </div>
    </>
  );
}

export default App;
