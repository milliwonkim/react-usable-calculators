import { useState } from "react";
import "../../App.css";
import * as yup from "yup";
import Accordians from "../../components/Accordians";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { boxShadows, colors, spaces } from "../../tokens/tokens";
import FormElement from "../../components/FormElement";
import Errors from "../../components/Errors";
import {
  combineInfo,
  formatCurrency,
  getTranslate,
} from "../../utils/calculate";
import { MenuItem } from "@mui/material";
import { Helmet } from "react-helmet";
import {
  AGE_TYPE,
  FINANCIAL_EARNING_TYPE,
  MID_RANGE_EARNING_TYPE,
  STEADILY_EARNING_TYPE,
  WORKING_PERSON_TYPE,
  YEAR_EARNING_TYPE,
} from "./constants";
import {
  AGE_ERROR_MESSAGE,
  FINANCIAL_ERROR_MESSAGE,
  MID_RANGE_ERROR_MESSAGE,
  STEADILY_EARNING_ERROR_MESSAGE,
  WORKING_PERSON_ERROR_MESSAGE,
  YEAR_EARNING_ERROR_MESSAGE,
} from "./messages";

const YouthSaving = () => {
  const schema = yup.object({
    [AGE_TYPE]: yup
      .string()
      .test(AGE_ERROR_MESSAGE, AGE_ERROR_MESSAGE, (value) => {
        if (value === "아니오") return false;
        return true;
      })
      .typeError(AGE_ERROR_MESSAGE),
    [FINANCIAL_EARNING_TYPE]: yup
      .string()
      .test(FINANCIAL_ERROR_MESSAGE, FINANCIAL_ERROR_MESSAGE, (value) => {
        if (value === "아니오") return false;
        return true;
      })
      .typeError(FINANCIAL_ERROR_MESSAGE),
    [YEAR_EARNING_TYPE]: yup
      .string()
      .test(YEAR_EARNING_ERROR_MESSAGE, YEAR_EARNING_ERROR_MESSAGE, (value) => {
        if (value === "해당없음") return false;
        return true;
      })
      .typeError(YEAR_EARNING_ERROR_MESSAGE),
    [MID_RANGE_EARNING_TYPE]: yup
      .string()
      .test(MID_RANGE_ERROR_MESSAGE, MID_RANGE_ERROR_MESSAGE, (value) => {
        if (value === "아니오") return false;
        return true;
      })
      .typeError(MID_RANGE_ERROR_MESSAGE),
    [WORKING_PERSON_TYPE]: yup
      .string()
      .test(
        WORKING_PERSON_ERROR_MESSAGE,
        WORKING_PERSON_ERROR_MESSAGE,
        (value) => {
          if (value === "아니오") return false;
          return true;
        }
      )
      .typeError(WORKING_PERSON_ERROR_MESSAGE),
    [STEADILY_EARNING_TYPE]: yup
      .string()
      .test(
        STEADILY_EARNING_ERROR_MESSAGE,
        STEADILY_EARNING_ERROR_MESSAGE,
        (value) => {
          if (value === "아니오") return false;
          return true;
        }
      )
      .typeError(STEADILY_EARNING_ERROR_MESSAGE),
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
                  zIndex:
                    i >=
                    Object.entries(combineInfo(info, monthly || 70, interest))
                      .length -
                      2
                      ? 100
                      : 0,
                  position:
                    i >=
                    Object.entries(combineInfo(info, monthly || 70, interest))
                      .length -
                      2
                      ? "sticky"
                      : "relative",
                  bottom:
                    i >=
                    Object.entries(combineInfo(info, monthly || 70, interest))
                      .length -
                      2
                      ? i ===
                        Object.entries(
                          combineInfo(info, monthly || 70, interest)
                        ).length -
                          2
                        ? "80px"
                        : "16px"
                      : "0",
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
                    el[0].toLowerCase().includes("ratio")
                      ? el[1] * 100
                      : (el[1] as number),
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
    <>
      <Helmet>
        <title>청년도약계좌 만기액 계산해보기</title>
      </Helmet>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Accordians defaultExpanded title="조건">
          <FormElement
            isError={Boolean(errors[AGE_TYPE]?.message)}
            label="나이가 만 19세 이상, 만 34세 이하인가요?"
            type="select"
            defaultValue={"아니오"}
            {...register(AGE_TYPE)}
          >
            <MenuItem value="아니오">아니오</MenuItem>
            <MenuItem value="네">네</MenuItem>
          </FormElement>
          <FormElement
            isError={Boolean(errors[FINANCIAL_EARNING_TYPE]?.message)}
            label="금융소득(이자소득, 배당소득)이 2000만원이 넘지 않나요?"
            type="select"
            defaultValue={"아니오"}
            {...register(FINANCIAL_EARNING_TYPE)}
          >
            <MenuItem value="아니오">아니오</MenuItem>
            <MenuItem value="네">네</MenuItem>
          </FormElement>
          <FormElement
            isError={Boolean(errors[YEAR_EARNING_TYPE]?.message)}
            label="연 소득은 얼마 이하인가요?(만 단위로 입력)"
            type="select"
            defaultValue={"해당없음"}
            {...register(YEAR_EARNING_TYPE)}
          >
            {[2400, 3600, 4800, 6000, 7500, "해당없음"].map((el) => {
              if (el === "해당없음")
                return (
                  <MenuItem value={el} key={el}>
                    {el}
                  </MenuItem>
                );
              return (
                <MenuItem value={el} key={el}>
                  {el}만원 이하
                </MenuItem>
              );
            })}
          </FormElement>
          <FormElement
            isError={Boolean(errors[MID_RANGE_EARNING_TYPE]?.message)}
            label="가구소득 중위 180% 이하인가요?"
            type="select"
            defaultValue={"아니오"}
            helperText="최대 6년까지, 군 복무 기간을 연령 계산에서 제외 / 6000만 원~7500만 원은 이자 비과세만 적용"
            {...register(MID_RANGE_EARNING_TYPE)}
          >
            <MenuItem value="아니오">아니오</MenuItem>
            <MenuItem value="네">네</MenuItem>
          </FormElement>
          <FormElement
            isError={Boolean(errors[WORKING_PERSON_TYPE]?.message)}
            label="소득이 없는 취준생, 대학생이 아니거나 혹은 아르바이트 등 고용보험에 가입되어 있나요?"
            defaultValue={"아니오"}
            type="select"
            {...register(WORKING_PERSON_TYPE)}
          >
            <MenuItem value="아니오">아니오</MenuItem>
            <MenuItem value="네">네</MenuItem>
          </FormElement>
          <FormElement
            isError={Boolean(errors[STEADILY_EARNING_TYPE]?.message)}
            label="매달 70만원 한도내에서 꾸준하게 적금하실 수 있나요?"
            type="select"
            defaultValue={"아니오"}
            {...register(STEADILY_EARNING_TYPE)}
          >
            <MenuItem value="아니오">아니오</MenuItem>
            <MenuItem value="네">네</MenuItem>
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
    </>
  );
};

export default YouthSaving;

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

const CalculateBox = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;
