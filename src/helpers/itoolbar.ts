import { ChangeEvent, FormEvent, MouseEvent } from "react";
import { FormatCommand } from ".";

interface IToolbar {
    addUrl(e: MouseEvent): void;
    showCode(e: MouseEvent): void;
    formatDocument(
        event:
            | MouseEvent
            | FormEvent<HTMLInputElement>
            | ChangeEvent<HTMLSelectElement>
            | null,
        command: FormatCommand,
        value?: string
    ): void;
};

export default IToolbar;