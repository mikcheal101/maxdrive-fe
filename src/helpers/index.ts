export enum FormatCommand {
    Undo = "undo",
    Redo = "redo",
    Bold = "bold",
    Underline = "underline",
    Italic = "italic",
    Strike = "strikeThrough",
    AlignLeft = "justifyLeft",
    AlignCenter = "justifyCenter",
    AlignRight = "justifyRight",
    AlignJustify = "justifyFull",
    OlList = "insertOrderedList",
    UlList = "insertUnorderedList",
    Link = "createLink",
    UnLink = "unlink",
    Script = "",
    Cut = "cut",
    Copy = "copy",
    Paste = "paste",
    FontSize = "fontSize",
    Color = "foreColor",
    Background = "hiliteColor",
    FormatBlock = "formatBlock",
    Null = "",
};

export enum TextState {
  HTML,
  PlainText
};