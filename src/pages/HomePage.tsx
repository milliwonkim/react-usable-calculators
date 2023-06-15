import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CALCULATORS_TITLE, CALCULATORS_URL } from "../constants/url";

const HomePage = () => {
  const nav = useNavigate();
  return (
    <List
      subheader={<div />}
      component="nav"
      aria-label="secondary mailbox folder"
    >
      {[
        {
          url: CALCULATORS_URL,
          name: CALCULATORS_TITLE,
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

export default HomePage;
