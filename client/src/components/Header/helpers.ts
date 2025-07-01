import t from "./translate.json";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrainingIcon from "@mui/icons-material/FitnessCenter";
import BlogIcon from "@mui/icons-material/Book";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import SunnyIcon from "@mui/icons-material/Sunny";
import ContrastIcon from "@mui/icons-material/Contrast";
import { LangType } from "../../store/types";

export const pages = (lang: LangType) => [
  { title: t[lang].navbar.dashboard, Icon: DashboardIcon, path: "/" },
  { title: t[lang].navbar.training, Icon: TrainingIcon, path: "/training" },
  { title: t[lang].navbar.exercises, Icon: BlogIcon, path: "/exercises" },
];

export const languageOptions = [
  { value: "uk", label: "Українська" },
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
];

export const themeOptions = (lang: LangType) => [
  { value: "dark", label: t[lang].themeLabels.dark, Icon: NightlightRoundedIcon },
  { value: "system", label: t[lang].themeLabels.system, Icon: ContrastIcon },
  { value: "light", label: t[lang].themeLabels.light, Icon: SunnyIcon },
];
