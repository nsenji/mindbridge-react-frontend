import { useState, useEffect } from "react";
import { MeetingConfig } from "./api";
export default function useSendMail(callID, userEmail) {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    if (callID !== null) {
      MeetingConfig.sendMail(callID, userEmail)
        .then((res) => setResponse(res))
        .catch((error) => console.error(error));
    }
  }, [callID, userEmail]);

  return [response];
}
