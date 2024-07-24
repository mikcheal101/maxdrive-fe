import React from "react";
import { FormatCommand } from "../../helpers";
import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faBold,
  faCode,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faRedo,
  faStrikethrough,
  faUnderline,
  faUndo,
  faUnlink,
} from "@fortawesome/free-solid-svg-icons";
import IToolbar from "../../helpers/itoolbar";
import NavBar from "../navbar";
import ToolbarButton from "./toolbarbutton";

const Toolbar: React.FC<IToolbar> = (params: IToolbar) => {
  return (
    <>
      <div className="toolbar p-2">
        <NavBar {...params} />

        <div className="btn-toolbar">
          <ToolbarButton {...params} command={FormatCommand.Undo} icon={faUndo} />
          <ToolbarButton {...params} command={FormatCommand.Redo} icon={faRedo} />
          <ToolbarButton {...params} command={FormatCommand.Bold} icon={faBold} />
          <ToolbarButton {...params} command={FormatCommand.Underline} icon={faUnderline} />
          <ToolbarButton {...params} command={FormatCommand.Italic} icon={faItalic} />
          <ToolbarButton {...params} command={FormatCommand.Strike} icon={faStrikethrough} />
          <ToolbarButton {...params} command={FormatCommand.AlignLeft} icon={faAlignLeft} />
          <ToolbarButton {...params} command={FormatCommand.AlignCenter} icon={faAlignCenter} />
          <ToolbarButton {...params} command={FormatCommand.AlignRight} icon={faAlignRight} />
          <ToolbarButton {...params} command={FormatCommand.AlignJustify} icon={faAlignJustify} />
          <ToolbarButton {...params} command={FormatCommand.OlList} icon={faListOl} />
          <ToolbarButton {...params} command={FormatCommand.UlList} icon={faListUl} />
          <ToolbarButton {...params} command={FormatCommand.AlignJustify} icon={faAlignJustify} />
          <ToolbarButton {...params} command={FormatCommand.UnLink} icon={faUnlink} />
          <ToolbarButton {...params} command={FormatCommand.Link} icon={faLink} />
          <ToolbarButton {...params} command={FormatCommand.Script} icon={faCode} />
        </div>
      </div>
    </>
  );
};

export default Toolbar;
