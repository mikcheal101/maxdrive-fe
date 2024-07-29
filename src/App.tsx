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
import UseSearchParams, { __APP_URI } from "./helpers/use.searchparams";
import UseMouse from "./helpers/use.mouse";
// import { useSearchParams } from "react-router-dom";

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
      let text: string | null = textContent;
      switch (textState) {
        case TextState.HTML:
          text = contentRef.current.innerHTML;
          break;
        case TextState.PlainText:
        default:
          text = contentRef.current.innerText;
          break;
      }
      setTextContent(text.trim());
    }
  };

  const { updateForm, saveContent, commitContent } = UseDocumentApi({
    id,
    setId,
    textContent,
    updateTextContent,
    socketUrl,
  });

  const [expected_data, setData] = useState<string | null>(null);
  // const [searchParams, setSearchParams] = UseSearchParams<ISearchParams>();
  const { setCursorToEnd } = UseMouse();

  const { addUrl, showCode, fetchContent, formatDocument } = UseDocumentFormat({
    id,
    contentRef,
    setTextState,
    updateForm,
    setData,
  });

  const updateIdAndParams = () => {
    if (__APP_URI.searchParams && __APP_URI.searchParams.has("id")) {
      setId(__APP_URI.searchParams.get("id"));
    }
  };

  useEffect(() => {
    updateIdAndParams();
  }, []);

  useEffect(() => {
    if (id !== null) {
      fetchContent(id);

      // update the url if there is no id in the url
      if (!__APP_URI.searchParams.has("id")) {
        __APP_URI.searchParams.append("id", id);
        history.pushState({}, "", __APP_URI.href);
      }
    }
  }, [id]);

  useEffect(() => {
    updateTextContent();
  }, [textState]);

  useEffect(() => {
    if (contentRef && contentRef.current && expected_data) {
      contentRef.current.innerHTML =
        contentRef.current.innerText = `${expected_data}`;
      setCursorToEnd(contentRef.current);
    }
  }, [expected_data]);

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
