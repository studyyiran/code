import React from "react";
export function hocFormCompare(formRef: any, key: string, tips: string) {
  return function(rule: any, value: any, callback: any) {
    if (formRef && formRef.current) {
      const { form } = formRef.current.props;
      if (value && value === form.getFieldValue(key)) {
        callback();
      }
    }
    callback(tips);
  };
}
