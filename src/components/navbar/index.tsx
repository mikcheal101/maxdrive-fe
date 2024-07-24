import React, { ChangeEvent, FormEvent } from "react";
import IToolbar from "../../helpers/itoolbar";
import { FormatCommand } from "../../helpers";

const NavBar: React.FC<IToolbar> = (params: IToolbar) => {
  return (
    <>
      <nav className="navbar">
        <div className="col">
          <button className="btn w-100 btn-xs btn-outline-secondary">
            Open File
          </button>
        </div>
        
        <div className="col p-2">
          <select
            name=""
            id=""
            className={"form-select"}
            onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
              const _target: HTMLSelectElement = e.target as HTMLSelectElement;
              params.formatDocument(
                e,
                FormatCommand.FormatBlock,
                _target.value
              );
            }}
          >
            <option selected={true} hidden={false} disabled={false} value={""}>
              Format
            </option>
            <option value={"h1"}>Heading 1</option>
            <option value={"h2"}>Heading 2</option>
            <option value={"h3"}>Heading 3</option>
            <option value={"h4"}>Heading 4</option>
            <option value={"h5"}>Heading 5</option>
            <option value={"h6"}>Heading 6</option>
            <option value={"h7"}>Heading 7</option>
            <option value={"p"}>Paragraph</option>
          </select>
        </div>

        <div className="col p-2">
          <select
            name=""
            id=""
            className={"form-select"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const _target: HTMLSelectElement = e.target as HTMLSelectElement;
              params.formatDocument(e, FormatCommand.FontSize, _target.value);
            }}
          >
            <option selected={true} hidden={false} disabled={false} value={""}>
              Font size
            </option>
            <option value="1">Extra Small</option>
            <option value="2">Small</option>
            <option value="3">Regular</option>
            <option value="4">Medium </option>
            <option value="5">Large</option>
            <option value="6">Extra Large</option>
            <option value="7">Big</option>
          </select>
        </div>

        
        <div className="col p-2">
          <div className="row">
            <div className="col">
              <span className="w-100">Color</span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="color"
                name="color"
                id="color"
                onInput={(e: FormEvent<HTMLInputElement>) => {
                  const _target: HTMLInputElement =
                    e.target as HTMLInputElement;
                  params.formatDocument(e, FormatCommand.Color, _target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="col p-2">
          <div className="row">
            <div className="col">
              <span className="w-100">Background</span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="color"
                name="background"
                id="background"
                onInput={(e: FormEvent<HTMLInputElement>) => {
                  const _target: HTMLInputElement =
                    e.target as HTMLInputElement;
                  params.formatDocument(
                    e,
                    FormatCommand.Background,
                    _target.value
                  );
                }}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
