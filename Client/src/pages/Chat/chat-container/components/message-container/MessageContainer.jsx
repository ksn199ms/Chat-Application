import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_MESSAGES, HOST } from "@/utils/constants";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {MdFolderZip} from "react-icons/md"
import {IoMdArrowDown, IoMdArrowRoundDown } from "react-icons/io"
import { IoCloseSharp } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/lib/utils";

const MessageContainer = () => {
  const scrollRef = useRef();

  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages, setSelectedChatMessages , setIsDownloading , setFileDownloadProgress } =
    useAppStore();

    const [showImage,setShowImage] = useState(false);
    const [imageURL,setImageURL] = useState(null);

    useEffect(() => {

      const getMessages = async () =>{
        try {
          const response = await apiClient.post(GET_MESSAGES,{id:selectedChatData._id},{withCredentials: true});
          if(response.data.messages){
            setSelectedChatMessages(response.data.messages)
          }
        } catch (error) {
          console.log({error});
        }
      }

      if(selectedChatData._id){
        if(selectedChatType === "contact"){
          getMessages()
        }
      }
    }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|svg|webp)$/;
    return imageRegex.test(filePath);
  }

  const downloadFile = async (url) =>{
    setIsDownloading(true)
    setFileDownloadProgress(0)
    const response = await apiClient.get(`${HOST}/${url}`,{responseType:"blob", onDownloadProgress : (progressEvent) => {
      const {loaded, total} = progressEvent;
      const percentage = Math.floor((loaded * 100) / total);
      setFileDownloadProgress(percentage);
    }});
    const urlBlob = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false)
    setFileDownloadProgress(0)
  }

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderMessageContent(message)}
          {selectedChatType === "channel" && renderChannelMessageContent(message)}
        </div>
      );
    });
  };

  const renderMessageContent = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      {
        message.messageType === "file" && (
          <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words cursor-pointer`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div>
              <img
              src={`${HOST}/${message.fileUrl}`}
              alt="file"
              className="w-full h-auto object-contain"
              onClick={()=>{setShowImage(true);setImageURL(message.fileUrl)}}
            />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
              <MdFolderZip/>
              </span>
              <span>{message.fileUrl.split("/").pop()}</span>
              <span className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={()=>{downloadFile(message.fileUrl)}}><IoMdArrowRoundDown/></span>
            </div>
          ) }
        </div>
        )
      }
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  const renderChannelMessageContent = (message) => {
    return (
      <div className={`mt-5 ${message.sender._id !== userInfo.id ? "text-left" : "text-right"}`}>
        {message.messageType === "text" && (
        <div
          className={`${
            message.sender._id === userInfo.id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words ml-9`}
        >
          {message.content}
        </div>
      )}
      {
        message.messageType === "file" && (
          <div
          className={`${
            message.sender._id === userInfo.id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words cursor-pointer`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div>
              <img
              src={`${HOST}/${message.fileUrl}`}
              alt="file"
              className="w-full h-auto object-contain"
              onClick={()=>{setShowImage(true);setImageURL(message.fileUrl)}}
            />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
              <MdFolderZip/>
              </span>
              <span>{message.fileUrl.split("/").pop()}</span>
              <span className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={()=>{downloadFile(message.fileUrl)}}><IoMdArrowRoundDown/></span>
            </div>
          ) }
        </div>
        )
      }
      {
        message.sender._id !== userInfo.id ? (<div className="flex items-center justify-start gap-3">
          <Avatar className="w-8 h-8 rounded-full overflow-hidden">
              {message.sender.image && (
                <AvatarImage
                  src={`${HOST}/${message.sender.image}`}
                  alt={`${message.sender.email}`}
                  className="object-cover w-full h-full rounded-full"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }} // Ensure the image fits properly
                />
              )}
                <AvatarFallback
                  className={`uppercase h-8 w-8 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    message.sender.color
                  )}`}
                  style={{ fontSize: "1.5rem" }}
                >

                   {message.sender.firstName ? message.sender.firstName.charAt(0) : message.sender.email.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <span className="text-sm text-white/60">{`${message.sender.firstName} ${message.sender.lastName}`}</span>
            <span className="text-xs text-white/60">{moment(message.timestamp).format("LT")}</span>
        </div>) : (
          <div className="text-xs text-white/60 mt-1">{moment(message.timestamp).format("LT")}</div>
        )
      }
      </div>
    ) 
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
      {
        showImage && (
          <div className="fixed z-[1000] top-0 left-0 w-[100vw] h-[100vh] bg-black/70 flex items-center justify-center ">
            <div className="w-[90vw] h-[90vh] flex items-center justify-center">
              <img src={`${HOST}/${imageURL}`} alt="image" className="w-full h-auto object-contain"/>
            </div>
            <div className="flex gap-5 fixed top-0 mt-5">
              <button className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={() => {downloadFile(imageURL)}}>
              <IoMdArrowRoundDown color="white"/>
              </button>

              <button className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={() => {setShowImage(false); setImageURL(null)}}>
              <IoCloseSharp color="red"/>
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default MessageContainer;
