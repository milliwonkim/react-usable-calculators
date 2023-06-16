import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BOX_SHADOW_PICKER_TITLE,
  BOX_SHADOW_PICKER_URL,
  CALCULATORS_TITLE,
  CALCULATORS_URL,
  CSS_PICKER_TITLE,
  CSS_PICKER_URL,
  YOUTH_SAVING_TITLE,
  YOUTH_SAVING_URL,
} from "../constants/url";
import { colors } from "../tokens/tokens";

const HomePage = () => {
  const nav = useNavigate();
  return (
    <>
      <List
        component="nav"
        aria-label="secondary mailbox folder"
        subheader={
          <Typography
            style={{
              padding: "0 0 8px 0",
              borderBottom: `1px solid ${colors.grey_1}`,
            }}
          >
            계산기
          </Typography>
        }
      >
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
      <List
        component="nav"
        aria-label="secondary mailbox folder"
        subheader={
          <Typography
            style={{
              padding: "0 0 8px 0",
              borderBottom: `1px solid ${colors.grey_1}`,
            }}
          >
            프로그래밍(Programming)
          </Typography>
        }
      >
        {[
          {
            url: CSS_PICKER_URL,
            name: CSS_PICKER_TITLE,
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
    </>
  );
};

export default HomePage;
