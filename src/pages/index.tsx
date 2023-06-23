import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import {
  CSS_PICKER_TITLE,
  CSS_PICKER_URL,
  YOUTH_SAVING_TITLE,
  YOUTH_SAVING_URL,
} from "../constants/url";
import { colors } from "../tokens/tokens";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
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
            <ListItemButton key={name} onClick={() => router.push(url)}>
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
            <ListItemButton key={name} onClick={() => router.push(url)}>
              <ListItemText primary={name} />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
};

export default HomePage;
