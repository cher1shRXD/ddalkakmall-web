import { TimePeriod } from "../types/time-period";

export const getTimePeriod = (): TimePeriod => {
  const h = new Date().getHours();
  if (h < 6) return "dawn";
  if (h < 9) return "morning";
  if (h < 12) return "forenoon";
  if (h < 18) return "afternoon";
  if (h < 21) return "evening";
  return "night";
};
