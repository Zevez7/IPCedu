import { useState } from "react";

export const useAccountSelector = (initialValues) => {
  const [selectValues, setSelect] = useState(initialValues);

  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  return [selectValues, handleChange];
};
