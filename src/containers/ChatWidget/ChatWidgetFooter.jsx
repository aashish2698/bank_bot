import { useState } from "react";
import { Paper, Box, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function ChatWidgetFooter({ sendMessage }) {
  const [userMessage, setUserMessage] = useState("");

  const handleOnChange = (e) => setUserMessage(e.target.value);

  const handleSendMessage = () => {
    if (userMessage.trim().length === 0) {
      return;
    }
    sendMessage(userMessage);
    setUserMessage("");
  };

  return (
    <Paper sx={{ height: "100px", borderRadius: "0 5px" }}>
      <Box sx={{ height: "1px", background: "#E7E6E6" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          padding: "0 20px"
        }}
      >
        <TextField
          value={userMessage}
          onKeyDown={(e) => {
            if(e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.stopPropagation();
                handleSendMessage();
            }
          }}
          onChange={handleOnChange}
          multiline
          minRows={2}
          maxRows={4}
          variant="standard"
          InputProps={{
            disableUnderline: true
          }}
          sx={{ flex: 1 }}
          placeholder="Ask a question"
        />
        <SendIcon
          onClick={handleSendMessage}
          sx={{
            fill: "#798B92",
            cursor: userMessage.trim().length === 0 ? "" : "pointer"
          }}
        />
      </Box>
    </Paper>
  );
}
