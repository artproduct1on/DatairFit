import * as yup from "yup";
import t from "./translate.json";
import { LangType } from "../../store/types";

export const loginSchema = (lang: LangType) => yup.object().shape({
  email: yup.string().email(t[lang].yup.email).required(t[lang].yup.required),
  password: yup.string().min(6, t[lang].yup.min).required(t[lang].yup.required),
});

export const registerSchema = (lang: LangType) => yup.object().shape({
  name: yup.string().required(t[lang].yup.required),
  email: yup.string().email(t[lang].yup.email).required(t[lang].yup.required),
  password: yup.string().min(6, t[lang].yup.min).required(t[lang].yup.required),
});

