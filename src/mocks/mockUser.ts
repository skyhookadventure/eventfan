import { CountryCodes } from "postal-address-field-names";
import { Gender, User } from "../types/User";

const mockUser: User = {
  options: undefined,
  traits: {
    address: {
      city: "City",
      country: "GB" as CountryCodes,
      postalCode: "SW11 111",
      state: "London",
      street: "1 Road Name",
    },
    age: 30,
    birthday: "1990-01-01",
    createdAt: new Date("2020-01-01T00:00:00.000Z"),
    email: "test@gmail.com",
    firstName: "FirstName",
    gender: Gender.MALE,
    id: "userID",
    lastName: "LastName",
    name: "FirstName LastName",
    phone: "+447111111111",
    username: "userID",
  },
  userId: "userID",
};

export default mockUser;
