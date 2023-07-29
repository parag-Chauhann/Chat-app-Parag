import React, { useContext } from "react";
import { ChatContext } from "../ContextAPI/ChatContext";
import Input from "./SubComponents/Input";
import Messages from "./SubComponents/Messages";
import "./Chat.css";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        <img src="https://cdn0.iconfinder.com/data/icons/user-interface-2063/24/UI_Essential_icon_expanded-66-256.png" alt="camera"/>
        <img src="https://cdn3.iconfinder.com/data/icons/social-media-2125/70/follow-256.png" alt="AddFriend"/>
        <img src="https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Dot-More-Vertical-Menu-256.png" alt="more_menu"/>

        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
