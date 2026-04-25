import { Plan } from "./plan";

export interface PlanConfig {
  id: Plan;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
}