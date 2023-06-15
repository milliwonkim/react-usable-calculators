import React, { useEffect, useState } from "react";
import "./App.css";
import * as yup from "yup";
import Accordians from "./components/Accordians";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { boxShadows, colors, spaces } from "./tokens/tokens";
import FormElement from "./components/FormElement";
import Errors from "./components/Errors";
import { combineInfo, formatCurrency, getTranslate } from "./utils/calculate";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";

const AGE_TYPE = "age";
const FINANCIAL_EARNING_TYPE = "financial_earning";
const YEAR_EARNING_TYPE = "year_earning";
const MID_RANGE_EARNING_TYPE = "mid_range_earning";
const WORKING_PERSON_TYPE = "working_person";
const STEADILY_EARNING_TYPE = "steadily_earning";

function App() {
  const schema = yup.object({
    [AGE_TYPE]: yup
      .string()
      .test(
        "만 19세 이상, 만 34세 이하만 가능합니다.",
        "만 19세 이상, 만 34세 이하만 가능합니다.",
        (value) => {
          if (value === "아니오") return false;
          return true;
        }
      )
      .typeError("만 19세 이상, 만 34세 이하만 가능합니다."),
    [FINANCIAL_EARNING_TYPE]: yup
      .string()
      .test(
        "금융소득(이자소득 + 배당소득)이 2000만원이 넘으면 신청하실 수 없습니다.",
        "금융소득(이자소득 + 배당소득)이 2000만원이 넘으면 신청하실 수 없습니다.",
        (value) => {
          if (value === "아니오") return false;
          return true;
        }
      )
      .typeError(
        "금융소득(이자소득 + 배당소득)이 2000만원이 넘으면 신청하실 수 없습니다."
      ),
    [YEAR_EARNING_TYPE]: yup
      .string()
      .test(
        "연 소득은 7500만원 이하여야 합니다.",
        "연 소득은 7500만원 이하여야 합니다.",
        (value) => {
          if (value === "해당없음") return false;
          return true;
        }
      )
      .typeError("연 소득은 7500만원 이하여야 합니다."),
    [MID_RANGE_EARNING_TYPE]: yup
      .string()
      .test(
        "가구소득 중위 180% 이하여야 합니다.",
        "가구소득 중위 180% 이하여야 합니다.",
        (value) => {
          if (value === "아니오") return false;
          return true;
        }
      )
      .typeError("가구소득 중위 180% 이하여야 합니다."),
    [WORKING_PERSON_TYPE]: yup
      .string()
      .test(
        "소득이 없는 취준생, 대학생은 해당되지 않습니다. 아르바이트의 경우, 고용보험에 가입되어 있다면 가능합니다.",
        "소득이 없는 취준생, 대학생은 해당되지 않습니다. 아르바이트의 경우, 고용보험에 가입되어 있다면 가능합니다.",
        (value) => {
          if (value === "아니오") return false;
          return true;
        }
      )
      .typeError(
        "소득이 없는 취준생, 대학생은 해당되지 않습니다. 아르바이트의 경우, 고용보험에 가입되어 있다면 가능합니다."
      ),
    [STEADILY_EARNING_TYPE]: yup
      .string()
      .test(
        "매달 70만원 한도 내에서 조금이라도 꾸준히 산입하지 않으면 정부지원금을 반환해야합니다.(특별사유 제외)",
        "매달 70만원 한도 내에서 조금이라도 꾸준히 산입하지 않으면 정부지원금을 반환해야합니다.(특별사유 제외)",
        (value) => {
          if (value === "아니오") return false;
          return true;
        }
      )
      .typeError(
        "매달 70만원 한도 내에서 조금이라도 꾸준히 산입하지 않으면 정부지원금을 반환해야합니다.(특별사유 제외)"
      ),
  });

  const [monthly, setMonthly] = useState(70);
  const [isExpanded, setIsExpanded] = useState(false);
  const [info, setInfo] = useState(0);
  const [interest, setInterest] = useState(5);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: any) => {
    setLocalStorage("청년도약계좌", JSON.stringify(values));
    setIsExpanded(true);
    setInfo(Number(values[YEAR_EARNING_TYPE]));
  };

  const renderCalculate = () => {
    return (
      <Accordians
        disabled={!isExpanded}
        expanded={isExpanded}
        title={`계산결과 (5년 만기, 매월 납입, 비과세, 단리, 최대 5천만원까지)`}
      >
        <FormElement
          type="number"
          value={monthly}
          onChange={(e: { target: { valueAsNumber: number } }) => {
            setMonthly(e.target?.valueAsNumber);
          }}
          min={1}
          max={70}
          label="매월 얼마를 적금할 예정인가요? (만 단위)"
        />
        <FormElement
          type="number"
          value={interest}
          onChange={(e: { target: { valueAsNumber: number } }) => {
            setInterest(e.target?.valueAsNumber);
          }}
          min={1}
          max={10}
          label="연 금리는 몇 퍼센트인가요?"
        />

        {Object.entries(combineInfo(info, monthly || 70, interest)).map(
          (el, i) => {
            return (
              <CalculateBox
                style={{
                  background:
                    i >=
                    Object.entries(combineInfo(info, monthly || 70, interest))
                      .length -
                      2
                      ? colors.skyblue_2
                      : "",
                  padding:
                    i >=
                    Object.entries(combineInfo(info, monthly || 70, interest))
                      .length -
                      2
                      ? "16px"
                      : "",
                  color:
                    i >=
                    Object.entries(combineInfo(info, monthly || 70, interest))
                      .length -
                      2
                      ? colors.white_1
                      : "",
                  boxShadow:
                    i >=
                    Object.entries(combineInfo(info, monthly || 70, interest))
                      .length -
                      2
                      ? boxShadows.type_1
                      : "",
                }}
              >
                <div>{getTranslate(el[0])}</div>
                <div>
                  {formatCurrency(
                    el[1] as number,
                    el[0].toLowerCase().includes("ratio") ? " %" : " 원"
                  )}
                </div>
              </CalculateBox>
            );
          }
        )}
      </Accordians>
    );
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Accordians defaultExpanded title="조건">
          <FormElement
            isError={Boolean(errors[AGE_TYPE]?.message)}
            label="나이가 만 19세 이상, 만 34세 이하인가요?"
            type="select"
            {...register(AGE_TYPE)}
          >
            <option value="아니오">아니오</option>
            <option value="네">네</option>
          </FormElement>
          <FormElement
            isError={Boolean(errors[FINANCIAL_EARNING_TYPE]?.message)}
            label="금융소득(이자소득, 배당소득)이 2000만원이 넘지 않나요?"
            type="select"
            {...register(FINANCIAL_EARNING_TYPE)}
          >
            <option value="아니오">아니오</option>
            <option value="네">네</option>
          </FormElement>
          <FormElement
            isError={Boolean(errors[YEAR_EARNING_TYPE]?.message)}
            label="연 소득은 얼마 이하인가요?(만 단위로 입력)"
            type="select"
            {...register(YEAR_EARNING_TYPE)}
          >
            {[2400, 3600, 4800, 6000, 7500, "해당없음"].map((el) => {
              if (el === "해당없음")
                return (
                  <option value={el} key={el}>
                    {el}
                  </option>
                );
              return (
                <option value={el} key={el}>
                  {el}만원 이하
                </option>
              );
            })}
          </FormElement>
          <FormElement
            isError={Boolean(errors[MID_RANGE_EARNING_TYPE]?.message)}
            label="가구소득 중위 180% 이하인가요?"
            type="select"
            helperText="최대 6년까지, 군 복무 기간을 연령 계산에서 제외 / 6000만 원~7500만 원은 이자 비과세만 적용"
            {...register(MID_RANGE_EARNING_TYPE)}
          >
            <option value="아니오">아니오</option>
            <option value="네">네</option>
          </FormElement>
          <FormElement
            isError={Boolean(errors[WORKING_PERSON_TYPE]?.message)}
            label="소득이 없는 취준생, 대학생이 아니거나 혹은 아르바이트 등 고용보험에 가입되어 있나요?"
            type="select"
            {...register(WORKING_PERSON_TYPE)}
          >
            <option value="아니오">아니오</option>
            <option value="네">네</option>
          </FormElement>
          <FormElement
            isError={Boolean(errors[STEADILY_EARNING_TYPE]?.message)}
            label="매달 70만원 한도내에서 꾸준하게 적금하실 수 있나요?"
            type="select"
            {...register(STEADILY_EARNING_TYPE)}
          >
            <option value="아니오">아니오</option>
            <option value="네">네</option>
          </FormElement>
          <Errors
            messages={[
              errors[AGE_TYPE]?.message,
              errors[FINANCIAL_EARNING_TYPE]?.message,
              errors[YEAR_EARNING_TYPE]?.message,
              errors[MID_RANGE_EARNING_TYPE]?.message,
              errors[WORKING_PERSON_TYPE]?.message,
              errors[STEADILY_EARNING_TYPE]?.message,
            ]}
          />
          <Buttons type="submit">확인하기</Buttons>
        </Accordians>
      </FormContainer>
      {renderCalculate()}
    </Container>
  );
}

export default App;

const FormContainer = styled.form``;

const Buttons = styled.button`
  display: inline-block;
  width: 100%;
  background: ${colors.skyblue_1};
  border-radius: ${spaces.space_8};
  border: transparent;
  padding: ${spaces.space_16};
  color: ${colors.white_1};
  font-size: ${spaces.space_16};
  box-shadow: ${boxShadows.type_1};

  &:hover {
    background: ${colors.white_1};
    color: ${colors.skyblue_1};
  }
`;

const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: ${spaces.space_16};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spaces.space_16};
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: ${spaces.space_16};
`;

const CalculateBox = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;
