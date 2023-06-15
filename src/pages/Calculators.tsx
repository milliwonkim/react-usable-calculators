import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { YOUTH_SAVING_TITLE, YOUTH_SAVING_URL } from "../constants/url";

const Calculators = () => {
  const nav = useNavigate();
  return (
    <List component="nav" aria-label="secondary mailbox folder">
      {[
        {
          url: YOUTH_SAVING_URL,
          name: YOUTH_SAVING_TITLE,
        },
      ].map((el, i) => {
        const { url, name } = el;
        return (
          <ListItemButton onClick={() => nav(url)}>
            <ListItemText primary={name} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default Calculators;
