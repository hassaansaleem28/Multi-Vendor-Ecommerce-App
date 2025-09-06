import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import styles from "../../styles/styles";
import { io } from "socket.io-client";
import Loader from "../UserComps/Loader";

const ENDPOINT = "http://localhost:5001/";
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
  const [issLoading, setIssLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

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
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage]);
    },
    [arrivalMessage, currentChat]
  );

  useEffect(
    function () {
      async function getConversations() {
        try {
          setIssLoading(true);
          const { data } = await axios.get(
            `${API_BASE_URL}/api/v2/conversation/get-all-seller-conversations/${seller._id}`,
            { withCredentials: true }
          );
          setConversations(data.conversations);
          setIssLoading(false);
        } catch (error) {
          setIssLoading(false);
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
          setIssLoading(true);
          const res = await axios.get(
            `${API_BASE_URL}/api/v2/messages/get-all-messages/${currentChat?._id}`
          );
          setMessages(res?.data?.messages);
          setIssLoading(false);
        } catch (error) {
          console.error(error);
          setIssLoading(false);
        }
      }
      getMessage();
    },
    [currentChat?._id]
  );
  // create new messages
  async function updateLastMessage() {
    try {
      setIssLoading(true);
      socket.emit("updateLastMessage", {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      });
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v2/conversation/update-last-message/${currentChat._id}`,
        { lastMessage: newMessage, lastMessageId: seller._id }
      );
      setIssLoading(false);
      if (data) setNewMessage("");
    } catch (error) {
      console.error(error);
      setIssLoading(false);
    }
  }
  async function sendMessageHandler(e) {
    e.preventDefault();
    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat?.members?.find(
      member => member.id !== seller._id
    );
    socket.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        setIssLoading(true);
        await axios
          .post(`${API_BASE_URL}/api/v2/messages/create-new-message`, message)
          .then(res => {
            if (messages) setMessages([...messages, res?.data?.message]);
            updateLastMessage();
          })
          .catch(error => console.error(error));
      }
      setIssLoading(false);
    } catch (error) {
      setIssLoading(false);
      console.error(error);
    }
  }
  if (isLoading) return <Loader />;

  return (
    <div className="w-[90%] mt-[-2px] bg-white m-5 overflow-y-scroll h-[90vh] rounded-2xl">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-[Poppins]">
            All Messages
          </h1>
          {issLoading
            ? ""
            : conversations &&
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
      {issLoading
        ? "Loading..."
        : open && (
            <SellerInbox
              setOpen={setOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              userData={userData}
              sellerId={seller._id}
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
              src={`${API_BASE_URL}/${user?.avatar?.url}`}
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
                : user?.fullName.split(" ")[0] + ": "}
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
}) {
  return (
    <div className="w-full min-h-[87vh] flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-[#00000010]">
        <div className="flex">
          <img
            src={`${API_BASE_URL}/${userData?.avatar?.url}`}
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
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex w-full my-2 ${
                msg.sender === sellerId ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender !== sellerId && (
                <img
                  src={`${API_BASE_URL}/${userData?.avatar?.url}`}
                  alt="pfp"
                  className="w-[40px] h-[40px] mr-3 rounded-full"
                />
              )}
              <div>
                <div
                  className={`w-max p-2 rounded ${
                    msg.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                  } text-[#fff] h-min`}
                >
                  {" "}
                  <p>{msg?.text}</p>
                </div>
                <p className="text-[12px] text-[#000000d3] pt-1">
                  {format(msg.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>
      {/* send message inputs */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input type="file" name="" id="image" className="hidden" />
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
