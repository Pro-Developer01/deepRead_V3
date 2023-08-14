import { useSelector } from "react-redux";

import AccordionDetails from "@mui/material/AccordionDetails";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import { accordianDetailStyling } from "./styled";

import { getBookById } from "../../Utils/Features/librarySlice";

export const Recommendation = ({ id }) => {
  const book = useSelector((state) => getBookById(state, id));
  console.log("rec", book?.recomendation instanceof Array);
  return (
    <>
      <AccordionDetails sx={accordianDetailStyling}>
        {book?.recomendation instanceof Array &&
        book?.recomendation?.length > 0 ? (
          book?.recomendation?.map((item, index) => {
            return (
              <div key={index} style={{ margin: "5px 0" }}>
                <Chip
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "purple",
                        width: 24,
                        height: 24,
                        fontSize: 10,
                        color: "white !important",
                      }}
                    >
                      {item[0]}
                    </Avatar>
                  }
                  label={item}
                  sx={{ fontWeight: 600 }}
                  variant="outlined"
                />
              </div>
            );
          })
        ) : (
          <span>No Data Available</span>
        )}
      </AccordionDetails>
    </>
  );
};
