import { Database } from "~/types";
import History = Database.History;

export const HistoryUserType = new Map<number, string>([
  [History.IUserType.login, "Вход"],
  [History.IUserType.registration, "Регистрация"]
])

export const HistoryNavigationType = new Map<number, string>([
  [History.INavigationType.index, "Главная"],
  [History.INavigationType.discount, "Дис.карта"],
  [History.INavigationType.login, "Вход"],
  [History.INavigationType.profile, "Профиль"],
  [History.INavigationType.rules, "Правила"],
  [History.INavigationType.stocks, "Акции"],
  [History.INavigationType["categories-beverages"], "Категория: напитки"],
  [History.INavigationType["categories-coffee"], "Категория: кофе"],
  [History.INavigationType["categories-desserts"], "Категория: десерты"],
  [History.INavigationType["categories-hookah"], "Категория: кальян"],
  [History.INavigationType["categories-snacks"], "Категория: закуски"],
  [History.INavigationType["categories-tea"], "Категория: чай"]
])
