import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { TfiGallery } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import Loader from "../UserComps/Loader";
import { easeOutSoft } from "../../lib/motion";

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
    const receiverId = currentChat?.memebers?.find(
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

  if (isLoading) return <Loader label="Loading messages" />;

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
      {!open && (
        <>
          <header className="shrink-0 border-b border-ink-100 px-6 py-5">
            <h1 className="font-display text-[20px] font-bold text-ink-900">
              Shop inbox
            </h1>
            <p className="mt-0.5 text-[13px] text-ink-500">
              {conversations?.length || 0} conversation
              {conversations?.length === 1 ? "" : "s"} with your customers
            </p>
          </header>

          <div className="flex-1 overflow-y-auto">
            {conversations && conversations.length > 0 ? (
              conversations.map((conversation, i) => (
                <MessageList
                  key={conversation?._id || i}
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
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-ink-50 text-ink-300">
                  <HiOutlineChatAlt2 size={30} />
                </span>
                <h3 className="mt-5 font-display text-[19px] font-bold text-ink-900">
                  No conversations yet
                </h3>
                <p className="mt-1.5 max-w-sm text-[14px] text-ink-500">
                  When a shopper messages you about a product, the thread lands
                  here.
                </p>
              </div>
            )}
          </div>
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
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easeOutSoft, delay: i * 0.05 }}
      onClick={() =>
        setActive(i) ||
        handleClick(conversation._id) ||
        setCurrentChat(conversation) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
      className={`flex w-full cursor-pointer items-center gap-4 border-b border-ink-100 px-5 py-4 text-left transition-colors duration-200 last:border-0 hover:bg-ink-50 ${
        active === i ? "bg-brand-50/50" : ""
      }`}
    >
      {user ? (
        <>
          <div className="relative shrink-0">
            <img
              src={`${user?.avatar?.url}`}
              alt={user?.fullName}
              className="h-[52px] w-[52px] rounded-full object-cover ring-2 ring-ink-100"
            />
            <span
              className={`absolute bottom-0.5 right-0.5 h-[13px] w-[13px] rounded-full ring-2 ring-white ${
                online ? "bg-success-500" : "bg-ink-300"
              }`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-display text-[15px] font-bold text-ink-900">
                {user?.fullName}
              </h3>
              {online && (
                <span className="shrink-0 rounded-full bg-success-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-success-700">
                  Online
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-[13px] text-ink-500">
              <span className="font-medium text-ink-600">
                {conversation?.lastMessageId !== user?._id
                  ? "You: "
                  : user?.fullName?.split(" ")[0] + ": "}
              </span>
              {conversation?.lastMessage}
            </p>
          </div>
        </>
      ) : (
        <span className="text-[14px] text-ink-400">Loading…</span>
      )}
    </motion.button>
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
  return (
    <div className="flex h-full flex-col">
      {/* ---- Chat header ---------------------------------------- */}
      <header className="flex shrink-0 items-center gap-4 border-b border-ink-100 bg-white px-5 py-4">
        <button
          onClick={() => setOpen(false)}
          aria-label="Back to conversations"
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
        >
          <AiOutlineArrowLeft size={20} />
        </button>

        <div className="relative shrink-0">
          <img
            src={`${userData?.avatar?.url}`}
            alt={userData?.fullName}
            className="h-[48px] w-[48px] rounded-full object-cover ring-2 ring-ink-100"
          />
          {activeStatus && (
            <span className="absolute bottom-0 right-0 h-[13px] w-[13px] rounded-full bg-success-500 ring-2 ring-white" />
          )}
        </div>

        <div className="min-w-0">
          <h1 className="truncate font-display text-[17px] font-bold text-ink-900">
            {userData?.fullName}
          </h1>
          <p
            className={`text-[13px] ${
              activeStatus ? "text-success-600" : "text-ink-400"
            }`}
          >
            {activeStatus ? "Active now" : "Offline"}
          </p>
        </div>
      </header>

      {/* ---- Messages -------------------------------------------- */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-ink-50 px-4 py-6 sm:px-6">
        {messages &&
          messages?.map((msg, i) => {
            const isMine = msg.sender === sellerId;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: easeOutSoft }}
                className={`flex w-full items-end gap-2.5 ${
                  isMine ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {!isMine && (
                  <img
                    src={`${userData?.avatar?.url}`}
                    alt={userData?.fullName}
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                )}

                <div
                  className={`flex max-w-[75%] flex-col ${
                    isMine ? "items-end" : "items-start"
                  }`}
                >
                  {msg?.images && (
                    <img
                      src={`${msg?.images?.url}`}
                      alt="Attachment"
                      className="mb-1.5 max-h-[300px] w-full max-w-[280px] rounded-2xl object-cover shadow-card"
                    />
                  )}

                  {msg.text !== "" && (
                    <div
                      className={`w-fit px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                        isMine
                          ? "rounded-2xl rounded-br-md bg-brand-600 text-white"
                          : "rounded-2xl rounded-bl-md border border-ink-100 bg-white text-ink-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">
                        {msg?.text}
                      </p>
                    </div>
                  )}

                  <span className="mt-1 px-1 text-[11px] text-ink-400">
                    {format(msg.createdAt)}
                  </span>
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* ---- Composer -------------------------------------------- */}
      <form
        aria-required={true}
        className="flex shrink-0 items-center gap-3 border-t border-ink-100 bg-white px-4 py-4 sm:px-6"
        onSubmit={sendMessageHandler}
      >
        <input
          type="file"
          id="image"
          className="hidden"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="image"
          title="Attach an image"
          className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-brand-600"
        >
          <TfiGallery size={19} />
        </label>

        <div className="relative flex-1">
          <input
            type="text"
            required
            placeholder="Write a message…"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            className="h-[48px] w-full rounded-full border border-ink-200 bg-ink-50 pl-5 pr-14 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <motion.label
            htmlFor="send"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            title="Send"
            className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
          >
            <AiOutlineSend size={17} />
          </motion.label>
        </div>
      </form>
    </div>
  );
}
export default DashboardMessages;
