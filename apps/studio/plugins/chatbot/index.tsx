import * as React from "react";
import { definePlugin } from "sanity";

import "./styles.css";

import Dashboard from "./dashboard";
import { HiOutlineCpuChip } from "react-icons/hi2";

export const ChatbotTool = definePlugin(() => {
  const title = "ChatGPT";
  const name = "chatgpt";
  const icon = HiOutlineCpuChip;

  return {
    title: title,
    name: name,
    tools: (prev: any) => {
      return [
        ...prev,
        {
          title,
          name,
          icon,
          component: () => <Dashboard serverSideApiKeyIsSet={true} />,
        },
      ];
    },
  };
});
