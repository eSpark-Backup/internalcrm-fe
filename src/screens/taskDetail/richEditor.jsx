import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  Bold,
  Bullet,
  // Capitalise,
  // Center,
  Color,
  Image,
  Italic,
  // Left,
  Link,
  List,
  // Right,
  Underline,
} from "../../assets/svg/rich-editor-icons";

// import styles from "./style.module.css";

let icons = Quill.import("ui/icons");
icons["bold"] = Bold;
icons["italic"] = Italic;
icons["underline"] = Underline;
icons["list"] = List;
icons["bullet"] = Bullet;
icons["color"] = Color;
icons["image"] = Image;
icons["link"] = Link;

const RichTextEditor = (props) => {
  const { handleChange, comment } = props;

  // const [customEditor, setCustomEditor] = useState({
  //   textLeft: false,
  //   textRight: false,
  //   textCenter: false,
  //   capitalize: false,
  //   align: "left",
  // });

  // const updateState = (value) => {
  //   setCustomEditor((prevState) => ({ ...prevState, openCardModal: value }));
  // };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div>
      <div id="toolbar">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <select className="ql-align" />
        {/* <button className="ql-align-center">
          <Center />
        </button>
        <button className="ql-align-right">
          <Left />
        </button>
        <button
          className="ql-align-left"
          onClick={() => updateState({ textRight: !customEditor.textRight })}
        >
          <Right />
        </button> */}
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="ordered" />
        <select className="ql-color" />
        {/* <button className="ql-capitalise">
          <Capitalise />
        </button> */}
        <button className="ql-image" />
        <button className="ql-link" />
      </div>

      <ReactQuill
        value={comment}
        onChange={handleChange}
        modules={modules}
        placeholder="Write a comment"
      />
    </div>
  );
};

export default RichTextEditor;
