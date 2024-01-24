/*
 * This file will handle the logic of creating a storing using OPENAI prompter
 * The main function will be CreateStoryGenerator, the rest will be helper functions
 *
 */

import OpenAI from "openai";

function CreateOpenAI() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
}

const openai = CreateOpenAI();

enum StoryType {
  Funny = "funny",
  Dark = "dark",
  DarkAndFunny = "darkly humorous",
}

function CreateStoryGenerator() {
  return {
    createPrompt: _createPrompt,
    generateStory: _generateStory,
  };
}

function _generateStory(prompt: string) {
  const chatCompletion = openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  chatCompletion.then((response) => {
    console.log(response);
  });
}

function _createPrompt(storyType: StoryType): string {
  return _promptCreator({
    tone: storyType.toString(),
    maxOutputLength: 100,
  });
}

interface PromptRequirements {
  tone: string;
  maxOutputLength: number;
}

function _promptCreator({ tone, maxOutputLength }: PromptRequirements) {
  const prompt = `
 Positive Prompt:
 "Craft a concise and ${tone} mystery story, perfect for a quick gaming experience. The tale should be limited to ${maxOutputLength} words, commencing with intrigue, delving into a mysterious middle, and concluding with an unexpected twist. Prioritize brevity and entertainment value."
 
 Negative Prompt:
 "Refrain from including names and utilizing complicated words in the story. Keep the narrative simple, ensuring it aligns with the desired light and humorous tone for an enjoyable gaming experience. Emphasize brevity in the storytelling."`;

  return prompt;
}

export { CreateStoryGenerator, StoryType };
