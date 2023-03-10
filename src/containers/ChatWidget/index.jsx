import { useState } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Header from "./ChatWidgetHeader";
import Body from "./ChatWidgetBody";
import Footer from "./ChatWidgetFooter";

//React Query Hook import
import { useSendUserMessage } from "../../hooks/mutations";

const initialChatWindowState = [
  {
    sender: "BOT",
    message: "What brings you here today?",
    messageId: uuidv4(),
  },
];

export default function ChatWidget({ businessId }) {
  const [chatWindowMessages, setChatWindowMessages] = useState(
    initialChatWindowState
  );

  const { mutateAsync: sendUserMessageToBot, isLoading } = useSendUserMessage();

  const onSendUserMessage = async (message) => {
    const newUserMessage = {
      sender: "USER",
      message,
      messageId: uuidv4(),
    };
    setChatWindowMessages((previousMessages) => [
      ...previousMessages,
      newUserMessage,
    ]);

    try {
      const userMessagePayload = {
        question: message,
        keywords: [],
        businessId,
      };
      await sendUserMessageToBot(userMessagePayload, {
        onSuccess: (data) => {
          if (data?.status && data.status === 200) {
            const newBotMessage = {
              sender: "BOT",
              message: data.answer,
              messageId: uuidv4(),
            };
            setChatWindowMessages((previousMessages) => [
              ...previousMessages,
              newBotMessage,
            ]);
          } else {
            const newBotMessage = {
              sender: "BOT",
              message: "Bot is not responding. Please try again",
              messageId: uuidv4(),
            };
            setChatWindowMessages((previousMessages) => [
              ...previousMessages,
              newBotMessage,
            ]);
          }
        },
        onError: () => {
          const newBotMessage = {
            sender: "BOT",
            message: "Bot is not responding. Please try again",
            messageId: uuidv4(),
          };
          setChatWindowMessages((previousMessages) => [
            ...previousMessages,
            newBotMessage,
          ]);
        },
      });
    } catch (error) {
      console.log("error in sending message to bot", error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      {/* <iframe
        style={{ height: "99vh", width: "100vw", border: "unset" }}
        id="userWebsite-iFrame"
      /> */}
      <Typography variant="h6" style={{ margin: "30px" }}>
        Automated Assistant for Bank FAQ
      </Typography>
      <Paper
        sx={{
          height: "750px",
          width: "475px",
          position: "fixed",
          right: "1rem",
          top: "11rem",
          boxShadow: "0 4px 20px 0 hsl(0deg 0% 7% / 20%)",
        }}
      >
        <Header />
        <Body chatWindowMessages={chatWindowMessages} isLoading={isLoading} />
        <Footer sendMessage={onSendUserMessage} />
      </Paper>
    </Box>
  );
}
