import { useEffect } from "react";
import ChatWidget from "../containers/ChatWidget";

function getQueryStringParams(query) {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          try {
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          } catch (e) {
            console.log(e, "error in decoding URL");
            return {};
          }
        }, {})
    : {};
}

export default function Demo() {
  const queryStringParams = getQueryStringParams(window.location.search);
  return (
    <ChatWidget
      businessId="627591b6-1fc3-4fc1-b031-ef4648b767ac"
    />
  );
}
