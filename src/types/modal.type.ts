export type InputData = {
  [key: string]: string | boolean | number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  startDate: string;
  endDate: string;
  checkbox1: boolean;
  checkbox2: boolean;
  roomType?: string,
  miceType?: string,
  quantity?: number
  adult?: number;
  child?: number;
  carType?: string
  additionalInfo?: string;
};