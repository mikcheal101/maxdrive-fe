import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface IWebSocketContext {
  sendMessage: (message: any) => void;
  undo: (id: string) => void;
  redo: (id: string) => void;
  content: string;
}

const WebSocketContext = createContext<IWebSocketContext | null>(null);

export const useWebSocketApi = () => useContext(WebSocketContext);
const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<string>("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://${process.env.WS_HOST || "localhost:8090"}`
    );

    ws.current.onopen = () => {
      console.log(`web socket connection opened`);
    };

    ws.current.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      setContent(message);
    };

    ws.current.onclose = () => {
      console.log(`web socket connection closed`);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = (message: any) => {
    if (ws.current) {
      ws.current.send(JSON.stringify(message));
    }
  };

  const undo = (_id: string) => {
    sendMessage({ id: _id, type: "undo" });
  };

  const redo = (_id: string) => {
    sendMessage({ id: _id, type: "redo" });
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, undo, redo, content }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
