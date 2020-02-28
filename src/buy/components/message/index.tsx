import React from "react";
import { message } from "antd";
export const Message = {
  success: (info: string) => {
    message.success(info);
  },
  warn: (content: string) => {
    message.warn({
      duration: 5,
      content
    });
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
