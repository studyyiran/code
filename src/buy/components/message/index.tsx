import React from "react";
import { message } from "antd";
export const Message = {
  success: (info: string) => {
    message.success(info);
  },
  error: (info: string) => {
    message.error(info);
  }
};
