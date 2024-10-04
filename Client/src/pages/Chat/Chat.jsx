import { useAppStore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./contacts-container/contactsContainer";
import ChatContainer from "./chat-container/chatContainer";
import EmptyChatContainer from "./empty-chat-container/emptyChatContainer";

const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast.warning("Please setup your profile first");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden  ">
      {isUploading && (
        <div className="flex h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 items-center justify-center flex-col gap-5 backdrop-blur-lg ">
          <h5 className="text-5xl animate-pulse ">Uploading...</h5>
          {fileUploadProgress}%
        </div>
      )}

      {isDownloading && (
        <div className="flex h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 items-center justify-center flex-col gap-5 backdrop-blur-lg ">
          <h5 className="text-5xl animate-pulse">Downloading...</h5>
          {fileDownloadProgress}%
        </div>
      )}
      <ContactsContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
