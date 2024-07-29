import React, { useState, useRef, useEffect } from "react";
import "./style.css";

const CommentModal = ({ isOpen, onClose, onSave }) => {
  const [comment, setComment] = useState("");

  const handleSave = () => {
    onSave(comment);
    setComment("");
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
        />
        <button onClick={handleSave}>Save Comment</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

const DocumentEditor = () => {
  const [fontSize, setFontSize] = useState("3");
  const [fontColor, setFontColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [documentContent, setDocumentContent] = useState("");
  const editorRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [highlightedComment, setHighlightedComment] = useState(null);

  const applyFormatting = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
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

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText) {
      setSelectedText(selectedText);
      setIsModalOpen(true);
    }
  };

  const handleSaveComment = (comment) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Create a span element to wrap the selected text
    const span = document.createElement("span");
    const commentId = `comment-${comments.length}`;
    span.className = "commented-text";
    span.setAttribute("id", commentId); // Add an attribute to identify the comment
    range.surroundContents(span);

    const newComment = {
      id: commentId, // Add an id to the comment
      text: selectedText,
      comment,
      startContainer: range.startContainer,
      endContainer: range.endContainer,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
    };
    setComments([...comments, newComment]);
    setIsModalOpen(false);
    setSelectedText("");
  };

  const handleCommentClick = (comment) => {
    // Remove highlight from previously highlighted comment, if any
    if (highlightedComment) {
      const previousSpan = document.getElementById(highlightedComment.id);
      if (previousSpan) {
        previousSpan.classList.remove("highlighted");
      }
    }

    // Highlight the clicked comment
    const span = document.getElementById(comment.id);
    if (span) {
      span.classList.add("highlighted");
    }

    setHighlightedComment(comment);
  };

  useEffect(() => {
    if (highlightedComment) {
      const span = document.getElementById(highlightedComment.id);
      if (span) {
        span.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightedComment]);

  const handleInput = () => {
    const content = editorRef.current.innerHTML;
    setDocumentContent(content);
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
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleMouseUp}
        >
          Add Comment
        </button>
      </div>
      <div className="doc-comm-wrapper">
        <div className="editor">
          <div className="page">
            <div
              className="page-content"
              onMouseUp={handleMouseUp}
              onInput={handleInput}
              contentEditable
              ref={editorRef}
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid #ccc",
                padding: "20px",
                overflow: "auto",
                backgroundColor: "white",
              }}
            ></div>
          </div>
        </div>
        <CommentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveComment}
        />
        <div className="comments">
          <h3>Comments</h3>
          <ul>
            {comments.map((c, index) => (
              <li key={index} onClick={() => handleCommentClick(c)}>
                <strong>Text:</strong> {c.text} <br />
                <strong>Comment:</strong> {c.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
