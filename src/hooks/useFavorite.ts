import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";

export const useFavorite = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error("FavoriteProvider 안에서만 사용 가능");
  return ctx;
};
