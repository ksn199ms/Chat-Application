import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20  ">
      <div className="flex gap-5 items-center w-full justify-between ">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative">
            {
              selectedChatType === 'contact' ? <Avatar className="w-12 h-12 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt={`${selectedChatData.email}`}
                  className="object-cover w-full h-full rounded-full"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }} // Ensure the image fits properly
                />
              ) : (
                <div
                  className={`uppercase h-full w-full text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                  style={{ fontSize: "1.5rem" }}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.charAt(0)
                    : selectedChatData.email.charAt(0)}
                </div>
              )}
            </Avatar> : <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full ">#</div>
            }
            
          </div>
          {selectedChatType === "channel" && selectedChatData.name}
          {
            selectedChatType === 'contact' ? (
              <div>
                <h1 className="text-lg font-bold text-white">
                  {selectedChatData.firstName} {selectedChatData.lastName}
                </h1>
                <p className="text-sm text-neutral-500">
                  {selectedChatData.email}
                </p>
              </div>
            ) : ""
          }
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all "
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
