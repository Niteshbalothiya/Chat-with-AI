import React, { createContext, useState } from 'react';

// Create the data context
export const dataContext = createContext();

// Temporary global objects (not in state)
export const user = {
  data: null,
  mime_type: null,
  imgUrl: null,
};

export const prevuser = {
  data: null,
  mime_type: null,
  prompt: null,
  imgUrl: null,
};

const UserContext = ({ children }) => {
  const [startRes, setStartRes] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [input, setInput] = useState("");
  const [feature, setFeature] = useState("chat");
  const [showResult, setShowResult] = useState("");
  const [prevInput, setPrevInput] = useState(""); 
  const [preFeature, setpreFeature] = useState("chat");

  const value = {
    startRes, setStartRes,
    popup, setPopUp,
    input, setInput,
    feature, setFeature,
    showResult, setShowResult,
    prevInput, setPrevInput,
    preFeature, setpreFeature
  };

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
};

export default UserContext;
