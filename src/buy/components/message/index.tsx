import React from "react";
import { message } from "antd";
export const Message = {
  success: (info: string) => {
    message.success(info);
  },
  warn: (content: string) => {
    message.warn(content, 5);
  },
  error: (info: any) => {
    let errorMessage = "";
    if (typeof info === "string") {
      errorMessage = info;
    } else if (info && info.resultMessage) {
      errorMessage = info.resultMessage;
    }
    message.error(errorMessage);
  }
};
