import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import styles from "../../styles/styles";
import { io } from "socket.io-client";
import Loader from "../UserComps/Loader";

const ENDPOINT = "https://socket-server-89h0.onrender.com/";
const socket = io(ENDPOINT, { transports: ["websocket"] });
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function DashboardMessages() {
  const { seller, isLoading } = useSelector(state => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef(null);

  useEffect(function () {
    socket.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(
    function () {
      arrivalMessage &&
        currentChat?.memebers?.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage]);
    },
    [arrivalMessage, currentChat]
  );

  useEffect(
    function () {
      async function getConversations() {
        try {
          const { data } = await axios.get(
            `${API_BASE_URL}/api/v2/conversation/get-all-seller-conversations/${seller?._id}`,
            { withCredentials: true }
          );
          setConversations(data.conversations);
        } catch (error) {
          console.error(error);
          toast.error(error?.response?.data?.message);
        }
      }
      getConversations();
    },
    [seller]
  );
  useEffect(
    function () {
      if (seller) {
        const sellerId = seller?._id;
        socket.emit("addUser", sellerId);
        socket.on("getUsers", data => {
          setOnlineUsers(data);
        });
      }
    },
    [seller]
  );
  const onlineCheck = chat => {
    const chatMembers = chat.memebers.find(member => member !== seller?._id);
    const online = onlineUsers.find(user => user.userId === chatMembers);

    return online ? true : false;
  };
  // get messages
  useEffect(
    function () {
      async function getMessage() {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/v2/messages/get-all-messages/${currentChat?._id}`
          );
          setMessages(res?.data?.messages);
        } catch (error) {
          console.error(error);
        }
      }
      getMessage();
    },
    [currentChat?._id]
  );
  // create new messages
  async function updateLastMessage() {
    try {
      socket.emit("updateLastMessage", {
        lastMessage: newMessage,
        lastMessageId: seller?._id,
      });
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v2/conversation/update-last-message/${currentChat?._id}`,
        { lastMessage: newMessage, lastMessageId: seller?._id }
      );
      if (data) setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  }
  async function updateLastMessageForImage() {
    try {
      await axios.put(
        `${API_BASE_URL}/api/v2/conversation/update-last-message/${currentChat?._id}`,
        {
          lastMessage: "PHOTO",
          lastMessageId: seller._id,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  async function sendMessageHandler(e) {
    e.preventDefault();
    const message = {
      sender: seller?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat?.members?.find(
      member => member.id !== seller?._id
    );
    socket.emit("sendMessage", {
      senderId: seller?._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(`${API_BASE_URL}/api/v2/messages/create-new-message`, message)
          .then(res => {
            if (messages) setMessages([...messages, res?.data?.message]);
            updateLastMessage();
          })
          .catch(error => console.error(error));
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    setImages(file);
    imageSendingHandler(file);
  }
  async function imageSendingHandler(e) {
    const formData = new FormData();
    formData.append("images", e);
    formData.append("sender", seller?._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);
    const receiverId = currentChat.memebers?.find(
      member => member !== seller._id
    );
    socket.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });
    try {
      await axios
        .post(`${API_BASE_URL}/api/v2/messages/create-new-message`, formData)
        .then(res => {
          setImages();
          setMessages([...messages, res.data?.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(
    function () {
      scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    },
    [messages]
  );

  if (isLoading) return <Loader />;

  return (
    <div className="w-[90%] mt-[-2px] bg-white m-5 overflow-y-scroll h-[90vh] rounded-2xl">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-[Poppins]">
            All Messages
          </h1>
          {conversations &&
            conversations.map((conversation, i) => (
              <MessageList
                key={i}
                conversation={conversation}
                i={i}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                setActiveStatus={setActiveStatus}
                sellerInfo={seller._id}
                userData={userData}
                setUserData={setUserData}
                online={onlineCheck(conversation)}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          handleImageUpload={handleImageUpload}
          userData={userData}
          sellerId={seller._id}
          scrollRef={scrollRef}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
}

function MessageList({
  conversation,
  i,
  setOpen,
  setCurrentChat,
  sellerInfo,
  online,
  setUserData,
  setActiveStatus,
}) {
  const [user, setUser] = useState([]);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  useEffect(
    function () {
      const userId = conversation?.memebers?.find(user => user !== sellerInfo);

      async function getUser() {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/v2/user/get-user-4id/${userId}`
          );
          setUser(res?.data?.user);
        } catch (error) {
          console.error(error);
        }
      }
      getUser();
    },
    [sellerInfo, conversation]
  );

  function handleClick(id) {
    navigate(`?${id}`);
    setOpen(true);
  }
  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === i ? "bg-[#00000010]" : "bg-transparent"
      } cursor-pointer`}
      onClick={() =>
        setActive(i) ||
        handleClick(conversation._id) ||
        setCurrentChat(conversation) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      {user ? (
        <>
          <div className="relative">
            <img
              src={`${user?.avatar?.url}`}
              alt="pfp"
              className="w-[50px] h-[50px] rounded-full"
            />
            {/* online */}
            {online ? (
              <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
            ) : (
              <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
            )}
          </div>
          <div className="pl-3">
            <h1 className="text-[18px]">{user?.fullName}</h1>
            <p className="text-[16px] text-[#000c]">
              {conversation?.lastMessageId !== user?._id
                ? "You: "
                : user?.fullName?.split(" ")[0] + ": "}
              {conversation?.lastMessage}
            </p>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

function SellerInbox({
  userData,
  setOpen,
  newMessage,
  messages,
  setNewMessage,
  sendMessageHandler,
  sellerId,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) {
  console.log(messages);
  return (
    <div className="w-full min-h-[87vh] flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-[#00000010]">
        <div className="flex">
          <img
            src={`${userData?.avatar?.url}`}
            alt="pfp"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.fullName}</h1>
            <h1>{activeStatus ? "Active Now" : "  "}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          className="cursor-pointer"
          size={20}
          onClick={() => setOpen(false)}
        />
      </div>
      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((msg, i) => {
            return (
              <div
                key={i}
                className={`flex w-full my-2 ${
                  msg.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {msg.sender !== sellerId && (
                  <img
                    src={`${userData?.avatar?.url}`}
                    alt="pfp"
                    className="w-[40px] h-[40px] mr-3 rounded-full"
                  />
                )}
                {msg?.images[0]?.url && (
                  <img
                    src={`${msg?.images[0]?.url}`}
                    className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                  />
                )}
                {msg.text !== "" && (
                  <div>
                    <div
                      className={`w-max p-2 rounded ${
                        msg.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                      } text-[#fff] h-min`}
                    >
                      <p>{msg?.text}</p>
                    </div>
                    <p className="text-[12px] text-[#000000d3] pt-1">
                      {format(msg.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {/* send message inputs */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
}
export default DashboardMessages;
