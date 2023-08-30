import Accordians from "@/components/Accordians";
import styled from "@emotion/styled";
import React, { ChangeEvent, useState } from "react";
import { boxShadows, colors, spaces } from "@/tokens/tokens";
import { Box, Button, Input } from "@mui/material";
import { v4 as uuid } from "uuid";

interface DataItem {
  content: string;
  key: string;
}

function getRandomItem(data: DataItem[]): DataItem | null {
  if (data.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

const RandomChoicePage = () => {
  const [list, setList] = useState([
    {
      content: "",
      key: uuid(),
    },
    {
      content: "",
      key: uuid(),
    },
    {
      content: "",
      key: uuid(),
    },
  ]);
  const handleSubmit = () => {
    window.alert(getRandomItem(list)?.content);
  };

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: string
  ) => {
    setList((prev) => {
      return prev.map((el) => {
        if (el.key === key) el.content = e.target.value;
        return el;
      });
    });
  };

  const handleRemoveInput = (key: string) => {
    setList((prev) => {
      return prev.filter((el) => {
        return el.key !== key;
      });
    });
  };

  const handleRemoveAll = () => {
    setList((prev) => {
      return prev.map((el) => ({ ...el, content: "" }));
    });
  };

  const handleAdd = () => {
    setList((prev) => [...prev, { key: uuid(), content: "" }]);
  };

  return (
    <div>
      <Accordians defaultExpanded title="후보군 나열하기">
        {list.map((el, i) => {
          return (
            <div style={{ display: "flex", gap: "16px", width: "100%" }}>
              <Input
                fullWidth
                value={el.content}
                placeholder={`후보 ${i + 1}`}
                onChange={(e) => handleChange(e, el.key)}
              />
              <Button
                variant="outlined"
                color="info"
                onClick={() => handleRemoveInput(el.key)}
              >
                X
              </Button>
            </div>
          );
        })}
        <Box display="flex" gap="16px">
          <Buttons background={colors.grey_1} onClick={handleRemoveAll}>
            전체삭제
          </Buttons>
          <Buttons background={colors.grey_1} onClick={handleAdd}>
            후보군추가
          </Buttons>
          <Buttons onClick={handleSubmit} background={colors.skyblue_1}>
            결정하기
          </Buttons>
        </Box>
      </Accordians>
    </div>
  );
};

export default RandomChoicePage;

const Buttons = styled.button<{ [key: string]: any }>`
  cursor: pointer;
  display: inline-block;
  width: 100%;
  background: ${(props) => props.background};
  border-radius: ${spaces.space_8};
  border: transparent;
  padding: ${spaces.space_16};
  color: ${colors.white_1};
  font-size: ${spaces.space_14};
  box-shadow: ${boxShadows.type_1};

  &:hover {
    background: ${colors.white_1};
    color: ${colors.skyblue_1};
  }
`;
