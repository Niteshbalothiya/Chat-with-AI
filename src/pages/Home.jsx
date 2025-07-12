import React, { useContext } from 'react';
import Chat from './Chat';
import { RiImageAiFill } from "react-icons/ri";
import { BiImageAdd } from "react-icons/bi";
import { RiChat4Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import "../App.css";
import { dataContext } from '../context/UserContext';

const Home = () => {
  const { startRes, setStartRes } = useContext(dataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStartRes(true);
  };

  return (
    <div className='home'>
      <nav>
        <div className="logo">Smart AI</div>
      </nav>

      {!startRes ? (
        <div className="hero">
          <span id='tag'>What can I help with....?</span>
          <div className="cate">
            <div className="upImg">
              <BiImageAdd />
              <span>Upload Image</span>
            </div>
            <div className="genImg">
              <RiImageAiFill />
              <span>Generate Image</span>
            </div>
            <div className="chat">
              <RiChat4Line />
              <span>Let's Chat</span>
            </div>
          </div>
        </div>
      ) : (
        <Chat />
      )}

      <form className="input-box" onSubmit={(e) => handleSubmit(e)}>
        <button id='add' type="button"><FaPlus /></button>
        <input type="text" placeholder='Ask Something...' />
        <button id='submit' type="submit"><FaArrowRight /></button>
      </form>
    </div>
  );
};

export default Home;
