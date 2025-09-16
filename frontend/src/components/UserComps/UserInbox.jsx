import { useSelector } from "react-redux";
import Header from "../Layouts/Header";
import { format } from "timeago.js";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import Loader from "../UserComps/Loader";

const ENDPOINT = "https://socket-server-89h0.onrender.com/";
const socket = io(ENDPOINT, { transports: ["websocket"] });

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserInbox() {
  const { user, loading } = useSelector(state => state.user);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [images, setImages] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false);
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
            `${API_BASE_URL}/api/v2/conversation/get-all-user-conversations/${user?._id}`,
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
    [user, messages]
  );
  useEffect(
    function () {
      if (user) {
        const userId = user?._id;
        socket.emit("addUser", userId);
        socket.on("getUsers", data => {
          setOnlineUsers(data);
        });
      }
    },
    [user]
  );
  const onlineCheck = chat => {
    const chatMembers = chat?.memebers.find(member => member !== user._id);
    const online = onlineUsers?.find(user => user.userId === chatMembers);

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
        lastMessageId: user._id,
      });
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v2/conversation/update-last-message/${currentChat._id}`,
        { lastMessage: newMessage, lastMessageId: user._id }
      );
      if (data) setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  }
  async function sendMessageHandler(e) {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat?.memebers?.find(
      member => member !== user?._id
    );
    socket.emit("sendMessage", {
      senderId: user?._id,
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
    formData.append("sender", user?._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat?._id);
    const receiverId = currentChat.memebers?.find(
      member => member !== user?._id
    );
    socket.emit("sendMessage", {
      senderId: user?._id,
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
  async function updateLastMessageForImage() {
    try {
      await axios.put(
        `${API_BASE_URL}/api/v2/conversation/update-last-message/${currentChat?._id}`,
        {
          lastMessage: "PHOTO",
          lastMessageId: user?._id,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(
    function () {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [messages]
  );

  if (loading) return <Loader />;

  return (
    <div className="w-full">
      {!open && (
        <>
          <Header />
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
                userInfo={user._id}
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
          sellerId={user._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
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
  setActiveStatus,
  userInfo,
  userData,
  setUserData,
  online,
}) {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(
    function () {
      setActiveStatus(online);
      const userId = conversation?.memebers?.find(use => use !== userInfo);
      async function getSeller() {
        try {
          if (!userId) return;
          const res = await axios.get(
            `${API_BASE_URL}/api/v2/seller/get-shop-info/${userId && userId}`
          );
          setUser(res?.data?.shop);
        } catch (error) {
          console.error(error);
        }
      }
      getSeller();
    },
    [userInfo, conversation]
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
          {conversation?.lastMessageId !== userData?._id
            ? "You: "
            : user && user?.name?.split(" ")[0] + ": "}
          {conversation?.lastMessage}
        </p>
      </div>
    </div>
  );
}

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    <div className="w-[full] min-h-full flex flex-col justify-between p-5">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src={`${userData?.avatar?.url}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
      {/* messages */}
      <div className="px-3 h-[75vh] py-3 overflow-y-scroll">
        {messages &&
          messages?.map((item, index) => {
            return (
              <div
                className={`flex w-full my-2 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
                key={index}
              >
                {item.sender !== sellerId && (
                  <img
                    src={`${userData?.avatar?.url}`}
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                {item?.images[0]?.url && (
                  <img
                    src={`${item?.images[0]?.url}`}
                    className="w-[300px] h-[300px] object-cover rounded-[10px] ml-2 mb-2"
                  />
                )}
                {item.text !== "" && (
                  <>
                    {item?.images[0]?.url && (
                      <img
                        src={`${item.images[0].url}`}
                        className="w-[300px] h-[300px] object-cover rounded-[10px] ml-2 mb-2"
                      />
                    )}
                    {item.text !== "" && (
                      <div>
                        <div
                          className={`w-max p-2 rounded ${
                            item.sender === sellerId
                              ? "bg-[#000]"
                              : "bg-[#38c776]"
                          } text-[#fff] h-min`}
                        >
                          <p>{item?.text}</p>
                        </div>
                        <p className="text-[12px] text-[#000000d3] pt-1">
                          {format(item.createdAt)}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
      </div>

      {/* send message input */}
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
            placeholder="Enter your message..."
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
};

export default UserInbox;
