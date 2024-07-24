import "./App.css";
import {
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { TextState } from "./helpers";
import Toolbar from "./components/toolbar";
import UseDocumentApi from "./helpers/use.documentapi";
import UseDocumentFormat from "./helpers/use.documentformat";

const App = () => {
  const [textState, setTextState] = useState<TextState>(TextState.HTML);
  const [id, setId] = useState<string | null>(null);

  const contentRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // Use ws:// for local development
  const [socketUrl] = useState<string>(
    `ws://${process.env.WS_HOST || "localhost:8090"}`
  );

  const [textContent, setTextContent] = useState<string | null>("");

  const updateTextContent = () => {
    if (contentRef.current) {
      switch (textState) {
        case TextState.HTML:
          setTextContent(contentRef.current.innerHTML);
          break;
        case TextState.PlainText:
        default:
          setTextContent(contentRef.current.innerText);
          break;
      }
    }
  };

  const { updateForm, saveContent, _socket_api, commitContent } = UseDocumentApi({
    id,
    setId,
    textContent,
    updateTextContent,
    socketUrl
  });

  const { addUrl, showCode, fetchContent, formatDocument } = UseDocumentFormat({
    id,
    contentRef,
    setTextContent,
    setTextState,
    updateForm,
  });

  useEffect(() => {
    commitContent();
  }, []);

  useEffect(() => {
    if (id !== null) {
      fetchContent(id);
    }
  }, [id]);

  useEffect(() => {
    updateTextContent();
  }, [textState]);

  useEffect(() => {
    if (id != null && id.trim().length > 0) {
      const currentUri: string = window.location.origin;
      window.history.replaceState(
        null,
        `Note - ${id}`,
        `${currentUri}/?id=${id}`
      );
    }
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Toolbar
              addUrl={addUrl}
              formatDocument={formatDocument}
              showCode={showCode}
            />

            <div className="content p-2">
              <div className="row">
                <div className="col p-2">
                  <div
                    ref={contentRef}
                    id="content"
                    className="text-start px-2"
                    contentEditable={true}
                    spellCheck={false}
                    onMouseEnter={(e: MouseEvent) => saveContent(e)}
                    onKeyUp={(e: KeyboardEvent) => saveContent(e)}
                    onMouseLeave={(e) => saveContent(e)}
                    onMouseOut={(e: MouseEvent) => saveContent(e)}
                  >
                    {" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
