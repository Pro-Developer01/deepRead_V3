import { Stack } from "@mui/system";
import ExpandIcon from "@mui/icons-material/Expand";

/* STYLES */
import { CardBook, CardBookImg, CardBookTitle, CardBookAuthor } from "./styled";

import { AmazonSingleSync } from "../Book/AmazonSingleSync";

const resizeHandleStyle = {
  position: "absolute",
  right: "-29px",
  cursor: "col-resize",
  background: "white",
  color: "var(--fontColor)",
  borderRadius: "33px",
  border: "1px solid var(--borderColors)",
  padding: "2px",
  transform: "rotate(90deg)",
};
function BookDetails(props) {
  /* PROPS */
  const { book, open, setResizableWidth, showResize = true } = props;
  const initialWidth = document.getElementById(
    "listViewResizable-Container"
  )?.offsetWidth;
  let startX;
  let startWidth;
  /* FUNCTIONS */
  function startResize(e) {
    startX = e.pageX;
    startWidth = parseInt(initialWidth);
    document.body.style.cursor = "col-resize"; // set cursor to col-resize
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  }

  function resize(e) {
    const width = startWidth + e.pageX - startX;
    if (width > 609) {
      setResizableWidth(width);
    }
  }

  function stopResize() {
    document.body.style.cursor = "auto"; // set cursor back to auto
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
  }

  return (
    <CardBook>
      {!open && showResize && (
        <ExpandIcon
          style={resizeHandleStyle}
          onMouseDown={(e) => {
            e.preventDefault();
            startResize(e);
          }}
          fontSize="medium"
        />
      )}
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ width: "85%" }}
      >
        <CardBookImg
          classname="Card-image-w50-h50"
          src={book.img_path}
          alt={book.title}
        />
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={0}
          sx={{ width: "90%" }}
        >
          <CardBookTitle>{book.title || ""}</CardBookTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <CardBookAuthor>
              {book.author
                ?.replace(/;/g, " & ")
                .split(" & ")
                .map((name) => name.split(", ").reverse().join(" "))
                .join(" & ")}
            </CardBookAuthor>
            <AmazonSingleSync bookData={book} originView="highlight" />
          </Stack>
        </Stack>
      </Stack>
    </CardBook>
  );
}

export default BookDetails;
