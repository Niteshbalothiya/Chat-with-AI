import React, { useContext } from 'react';
import Chat from './Chat';
import { RiImageAiFill, RiChat4Line } from "react-icons/ri";
import { BiImageAdd } from "react-icons/bi";
import { FaPlus, FaArrowRight } from "react-icons/fa6";
import "../App.css";
import { dataContext, prevuser, user } from '../context/UserContext';
import { generateResponse } from '../gemini';
import { query } from '../huggingFace';

const Home = () => {
  const {
    startRes, setStartRes,
    popup, setPopUp,
    input, setInput,
    feature, setFeature,
    showResult, setShowResult,
    preFeature, setpreFeature
  } = useContext(dataContext);

  

  const handleSubmit = async () => {
    setStartRes(true);
    setpreFeature(feature)
    setShowResult("")

    // Save current user input as previous input
    prevuser.data = user.data;
    prevuser.mime_type = user.mime_type;
    prevuser.imgUrl = user.imgUrl;
    prevuser.prompt = input;
    setInput("");

    const result = await generateResponse();
    setShowResult(result);
    setFeature("chat")


    // Clear image data after generating response
    user.data = null;
    user.mime_type = null;
    user.imgUrl = null;
  };

  const handleImage = (e) => {
    setFeature("upimg");
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64 = event.target.result.split(",")[1];
      user.data = base64;
      user.mime_type = file.type;
      user.imgUrl = `data:${file.type};base64,${base64}`;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  async function handleGenerateImg() {
    setStartRes(true);
    setpreFeature(feature)
    prevuser.prompt=input
    let result = await query(input)
      console.log(result.imageData);
      setInput("")
      setFeature("c")
  }

  return (
    <div className='home'>
      <nav>
        <div className="logo" onClick={() => {
          setStartRes(false);
          setFeature("chat")

        }}>Smart AI</div>
      </nav>

      <input
        type="file"
        accept="image/*"
        hidden
        id="inputImg"
        onChange={handleImage}
      />

      {!startRes ? (
        <div className="hero">
          <span id="tag">What can I help with....?</span>
          <div className="cate">
            <div className="upImg" onClick={() => document.getElementById("inputImg").click()}>
              <BiImageAdd />
              <span>Upload Image</span>
            </div>
            <div className="genImg" onClick={() => setFeature("genImg")}>
              <RiImageAiFill />
              <span>Generate Image</span>
            </div>
            <div className="chat" onClick={() => setFeature("chat")}>
              <RiChat4Line />
              <span>Let's Chat</span>
            </div>
          </div>
        </div>
      ) : (
        <Chat />
      )}

      <form
        className="input-box"
        onSubmit={(e) => {
          e.preventDefault();
          if (input) {
            if (feature == "genImg") {
              handleGenerateImg()
            } else {
              handleSubmit();
            }
          }
        }}
      >
        {popup && (
          <div className="popup">
            <div className="select-up" onClick={() => {
              setPopUp(false)
              setFeature("chat")
              document.getElementById("inputImg").click()
            }}>
              <BiImageAdd />
              <span>Upload Image</span>
            </div>
            <div className="select-gen" onClick={() => {
              setPopUp(false)
              setFeature("genImg")
            }}>
              <RiImageAiFill />
              <span>Generate Image</span>
            </div>
          </div>
        )}

        <div id="add" type="button" onClick={() => setPopUp(prev => !prev)}>
          {feature === "genImg" ? <RiImageAiFill id="genImg" /> : <FaPlus />}
        </div>

        <input
          type="text"
          placeholder="Ask Something..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        {input && (
          <button id="submit" type="submit">
            <FaArrowRight />
          </button>
        )}
      </form>
    </div>
  );
};

export default Home;
