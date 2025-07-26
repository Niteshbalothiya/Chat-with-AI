// components/Chat.js
import React, { useContext } from 'react';
import { dataContext, prevuser } from '../context/UserContext';

const Chat = () => {
  const { showResult, feature ,preFeature, setpreFeature} = useContext(dataContext);

  return (
    <div className="chat-page">
      <div className="user">
        {preFeature== 'upimg' ?
          <>
            <img src={prevuser.imgUrl} alt="" />
            <span>{prevuser.prompt}</span>
          </>
        :
          <span>{prevuser.prompt}</span>
        }
      </div>

      <div className="ai">
        {preFeature == 'genimg'
         ?
          <>
         {!showResult? <span>Generateing Image....</span>:<img src= {prevuser.imgUrl} alt="" />}
         </>
         :
          !showResult
          ?
          <span></span>
          :
          <span> {showResult}</span>}
          
      </div>
    </div>
  );
};

export default Chat;
