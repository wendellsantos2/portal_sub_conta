export class CreateSubAccountDTO {
    id: string;
  name: string;
  email: string;
  loginEmail: string;
  phone: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  postalCode: string;
  cpfCnpj: string;
  birthDate: Date | null;
  personType: string;
  companyType: string;
  city: number;
  state: string;
  country: string;
  site: string;
  apiKey: string;
  walletId: string;
  accountNumber: {
    agency: string;
    account: string;
    accountDigit: string;
  };
}
