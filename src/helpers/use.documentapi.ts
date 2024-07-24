import AppService from "../services/app.service";
import {
    KeyboardEvent,
    MouseEvent,
    useState,
} from "react";
import { useWebSocketApi } from "./websocker.provider";

interface IParam {
    id: string | null;
    textContent: string | null;
    socketUrl: string | null;

    setId: Function;
    updateTextContent: Function
};

const UseDocumentApi = (params: IParam) => {

    const [updatingForm, updateForm] = useState<boolean>(false);
    const [_, saveForm] = useState<boolean>(false);
    const _socket_api = useWebSocketApi();

    const captureContent = (e: MouseEvent): void => {
        const _content: HTMLElement = e.target as HTMLElement;

        updateForm(true);
        const hyperlinks: NodeListOf<HTMLAnchorElement> =
            _content.querySelectorAll("a");
        hyperlinks.forEach((hyperlink: HTMLAnchorElement) => {
            hyperlink.addEventListener("mouseenter", () => {
                _content.setAttribute("contenteditable", "false");
                hyperlink.target = "_blank";
            });

            hyperlink.addEventListener("mouseleave", () => {
                _content.setAttribute("contenteditable", "true");
            });
        });

        updateForm(false);
    };

    const saveContent = async (
        event: KeyboardEvent | MouseEvent | Event
    ): Promise<void> => {
        event.preventDefault();

        captureContent(event as MouseEvent);

        commitContent();
    };

    const commitContent = async () => {
        if (!updatingForm) {
            saveForm(true);
            params.updateTextContent();

            if (params.textContent != null && params.textContent.length > 0) {
                if (params.id == null) {
                    const newId: string | null = await AppService.createNewDocument();

                    if (newId != null) {
                        params.setId(newId);
                    }
                } else {
                    // Send content across WebSocket
                    const data: { id: string; message: string } = {
                        id: params.id,
                        message: params.textContent,
                    };

                    const data_s: string = JSON.stringify(data);

                    if (_socket_api) {
                        _socket_api.sendMessage(data_s);
                    }
                }
            }

            saveForm(false);
        }

    };

    return { saveContent, updateForm, commitContent, _socket_api };
};

export default UseDocumentApi;