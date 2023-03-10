import { useRef, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";

export default function ChatWidgetBody({
  chatWindowMessages,
  isLoading
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatWindowMessages]);

  return (
    <Box
      sx={{
        height: "550px",
        maxHeight: "550px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "5px",
          scrollbarWidth: "thin",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#c5c5aa",
          borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
          background: "white",
        },
      }}
    >
      <Box className="messages-container">
        {chatWindowMessages?.map((chatWindowMessage, index) => (
          <p
            key={`message-from-${chatWindowMessage.sender}-${index}`}
            className={
              chatWindowMessage.sender === "BOT" ? "from-bot" : "from-user"
            }
          >
            {chatWindowMessage.message}
          </p>
        ))}
        {isLoading && (
          <Skeleton
            variant="rounded"
            sx={{ padding: "20px", margin: "1em 0" }}
            width={200}
            height={40}
          />
        )}
      </Box>
      <div ref={bottomRef} />
    </Box>
  );
}
