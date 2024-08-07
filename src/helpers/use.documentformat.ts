import { ChangeEvent, FormEvent, MouseEvent, RefObject, useEffect } from "react";
import { FormatCommand, TextState } from ".";
import AppService from "../services/app.service";

interface IUseDocumentFormat {
    id: string | null;
    updateForm:  Function;
    setTextState: Function;
    setData: Function;
    contentRef:  RefObject<HTMLDivElement>;
};

const UseDocumentFormat = (params: IUseDocumentFormat) => {


    const formatDocument = (
        event:
            | MouseEvent
            | FormEvent<HTMLInputElement>
            | ChangeEvent<HTMLSelectElement>
            | null,
        command: FormatCommand,
        value: string = ""
    ) => {
        params.updateForm(true);

        if (event != null) {
            event.preventDefault();
        }

        if (value.length > 0) {
            document.execCommand(command, false, value);
        } else {
            document.execCommand(command);
        }

        params.updateForm(false);
    };

    const addUrl = (e: MouseEvent): void => {
        e.preventDefault();
        const uri: string | null = prompt(`Insert url:`);
        if (uri != null && uri.length > 0) {
            formatDocument(null, FormatCommand.Link, uri);
        }
    };

    let active: boolean = false;

    const showCode = (e: MouseEvent): void => {
        e.preventDefault();

        const element: HTMLElement = e.target as HTMLElement;
        element.dataset.active = `${!active}`;
        active = !active;

        if (params.contentRef.current) {
            params.setTextState(active ? TextState.HTML : TextState.PlainText);

            if (active) {
                params.contentRef.current.innerText = params.contentRef.current.innerHTML;
            } else {
                params.contentRef.current.innerHTML = params.contentRef.current.innerText;
            }

            params.contentRef.current.setAttribute("contenteditable", `${!active}`);
        }
    };

    const fetchContent = (uuid: string | null) => {

        const queryData = setInterval(async () => {
            if (uuid !== null) {
                const _content: string | null = await AppService.getDocumentContent(uuid);

                if (_content !== null) {
                    params.setData(_content);
                }
            }
        }, 5000);

        return () => clearInterval(queryData);
    };

    return {addUrl, showCode, fetchContent, formatDocument};

};

export default UseDocumentFormat;