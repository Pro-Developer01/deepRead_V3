import { useSelector } from "react-redux";

import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";

import "../../pages/MyLibrary/MyLibrary.css";
import ChromeExtensionConnector from "../Connectors/ChromeExtensionCommunication";

import { formatDateString } from "../../helperFunctions/timing";

export const AmazonSingleSync = ({ bookData, originView }) => {
  const { userId, token } = useSelector((state) => state.auth);
  const { amazonSyncDisabled, singleBookSyncMessage } = useSelector(
    (state) => state.amazonSync
  );

  const bookSyncInfoMessage = `Gets updateted book information for your book\n${bookData?.title}.`;
  const highlightSyncInfoMessage = `Gets full highlights for your book\n${bookData?.title}.`;

  const getSyncInfoMessage = () => {
    if (originView === "book") return bookSyncInfoMessage;
    if (originView === "highlight") return highlightSyncInfoMessage;
    return "";
  };

  const fillUpdatedTimeForSyncMessage = (message) => {
    if (message && bookData?.updated_at)
      return message.replace(
        "#TIME#",
        formatDateString(new Date(bookData?.updated_at))
      );
    return "";
  };

  const handleAmazonSingleSync = async (bookId) => {
    try {
      ChromeExtensionConnector.SyncAmazonSingleBook(
        token,
        userId,
        bookId,
        originView
      );
    } catch (error) {
      console.log("Error handleAmazonSingleBookSync: ", error);
    }
  };

  return (
    <Stack direction="row" justifyContent="left" alignItems="center">
      {amazonSyncDisabled ? (
        <div title={fillUpdatedTimeForSyncMessage(singleBookSyncMessage)}>
          <PublishedWithChangesIcon sx={{ color: "red" }} />
        </div>
      ) : (
        <div title={fillUpdatedTimeForSyncMessage(singleBookSyncMessage)}>
          <PublishedWithChangesIcon
            sx={{ color: "lightgreen" }}
            onClick={() => handleAmazonSingleSync(bookData?._id)}
          />
        </div>
      )}
      <div title={getSyncInfoMessage()}>
        <InfoIcon sx={{ color: "lightgreen", width: 20 }} />
      </div>
    </Stack>
  );
};
