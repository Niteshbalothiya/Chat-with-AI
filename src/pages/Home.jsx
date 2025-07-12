import React, { useContext } from 'react'
import { RiImageAiFill } from "react-icons/ri";
import { BiImageAdd } from "react-icons/bi";
import { RiChat4Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import "../App.css"
import { dataContext } from '../context/UserContext';
const Home = () => {
let {startRes, setStartRes} = useContext (dataContext)

 async function handleSubmit (e) {
  e.preventDefault()
  setStartRes(true)
 }
  return (
    <div className='home'>
      <nav>
        <div className="logo">
          Smart AI
        </div>
      </nav>

      <div className="hero">
        <span id='tag'>What can I help with....?</span>

        <form action="" className="input-box" onSubmit={(e) =>handleSubmit()}>
        <button id='add'><FaPlus /></button>
        <input type="text" placeholder='As Something.....' />
        <button id='submit'><FaArrowRight /></button>

      </form>

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
            <span>Let`s Chat</span>
          </div>
        </div>
      </div>


      
    </div>
  )
}

export default Home
