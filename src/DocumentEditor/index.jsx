import React, { useState } from "react";
import "./style.css";

const DocumentEditor = () => {
  const [fontSize, setFontSize] = useState("3");
  const [fontColor, setFontColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [pages, setPages] = useState([React.createRef()]);

  const applyFormatting = (command, value = null) => {
    document.execCommand(command, false, value);
    pages[pages.length - 1].current.focus();
  };

  const toggleFormatting = (format) => {
    switch (format) {
      case "bold":
        setIsBold((prev) => !prev);
        applyFormatting("bold");
        break;
      case "italic":
        setIsItalic((prev) => !prev);
        applyFormatting("italic");
        break;
      case "underline":
        setIsUnderline((prev) => !prev);
        applyFormatting("underline");
        break;
      case "subscript":
        setIsSubscript((prev) => !prev);
        applyFormatting("subscript");
        break;
      case "superscript":
        setIsSuperscript((prev) => !prev);
        applyFormatting("superscript");
        break;
      case "strikethrough":
        setIsStrikethrough((prev) => !prev);
        applyFormatting("strikethrough");
        break;
      case "justifyLeft":
        applyFormatting("justifyLeft");
        break;
      case "justifyCenter":
        applyFormatting("justifyCenter");
        break;
      case "justifyRight":
        applyFormatting("justifyRight");
        break;
      case "justifyFull":
        applyFormatting("justifyFull");
        break;
      default:
        break;
    }
  };

  const handleFontSizeChange = (event) => {
    const size = event.target.value;
    setFontSize(size);
    applyFormatting("fontSize", size);
  };

  const handleFontColorChange = (event) => {
    const color = event.target.value;
    setFontColor(color);
    applyFormatting("foreColor", color);
  };

  const addNewPage = () => {
    setPages((prevPages) => {
      const newPages = [...prevPages, React.createRef()];
      // Focus on the newly created page
      setTimeout(() => {
        const newPageRef = newPages[newPages.length - 1].current;
        if (newPageRef) {
          newPageRef.focus();
        }
      }, 0); // Adding a small delay to ensure the new page is rendered before focusing
      return newPages;
    });
  };

  const checkOverflow = () => {
    const lastPage = pages[pages.length - 1].current;
    const lineHeight = 24; // Assuming each line is 24px in height
    const numberOfLines = Math.floor(lastPage.scrollHeight / lineHeight);
    console.log(numberOfLines, "number");
    if (numberOfLines > 25) {
      addNewPage();
    }
  };

  const handleInput = (index) => {
    let debounceTimeout;
    return () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        checkOverflow();
      }, 500); // Adjust the debounce time as needed
    };
  };
  

  return (
    <div>
      <div>
        <button
          className={`${isBold ? "selected" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("bold")}
        >
          Bold
        </button>
        <button
          className={`${isItalic ? "selected" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("italic")}
        >
          Italic
        </button>
        <button
          className={`${isUnderline ? "selected" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("underline")}
        >
          Underline
        </button>
        <button
          className={`${isStrikethrough ? "selected" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("strikethrough")}
        >
          Strikethrough
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("justifyLeft")}
        >
          Align Left
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("justifyCenter")}
        >
          Align Center
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("justifyRight")}
        >
          Align Right
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("justifyFull")}
        >
          Justify
        </button>
        <button
          className={`${isSubscript ? "selected" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("subscript")}
        >
          Subscript
        </button>
        <button
          className={`${isSuperscript ? "selected" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleFormatting("superscript")}
        >
          Superscript
        </button>
        <label>
          Font Size:
          <select value={fontSize} onChange={handleFontSizeChange}>
            <option value="1">8px</option>
            <option value="2">10px</option>
            <option value="3">12px</option>
            <option value="4">14px</option>
            <option value="5">18px</option>
            <option value="6">24px</option>
            <option value="7">36px</option>
          </select>
        </label>
        <label>
          Font Color:
          <input
            type="color"
            value={fontColor}
            onChange={handleFontColorChange}
          />
        </label>
      </div>
      <div className="editor">
        {pages.map((page, index) => (
          <div className="page" key={index}>
            <div
              className="page-content"
              contentEditable
              ref={page}
              onInput={handleInput(index)}
              style={{
                width: "1240px",
                height: "1754px",
                border: "none",
                padding: "20px",
                overflow: "hidden",
                backgroundColor: "white",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentEditor;
