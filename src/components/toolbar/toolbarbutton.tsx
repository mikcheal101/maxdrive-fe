import { MouseEvent } from "react";
import IToolbar from "../../helpers/itoolbar";
import { FormatCommand } from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface IToolbarButton extends IToolbar {
  command: FormatCommand;
  icon: IconDefinition;
}

const ToolbarButton: React.FC<IToolbarButton> = (params: IToolbarButton) => {
  return (
    <>
      <button
        onClick={(e: MouseEvent) => {
          switch (params.command) {
            case FormatCommand.Script:
              params.showCode(e);
              break;
            default:
              params.formatDocument(e, params.command);
              break;
          }
        }}
      >
        <FontAwesomeIcon icon={params.icon} />
      </button>
    </>
  );
};

export default ToolbarButton;
