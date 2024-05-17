export interface IPeople {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  skills: string[];
  addressStreet?: string;
  addressCity?: string;
  addressRegion?: string;
  addressPostal: string;
  addressCountry: string;
}
