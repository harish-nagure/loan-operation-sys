// src/config/fieldSettings.js
export const defaultFields = [
  "firstName", "lastName", "mobile", "email", "confirmEmail",
  "dob", "monthlyIncome", "ssn", "confirmSsn", "amountNeeded",
  "homeAddress", "homeAddress2", "zipCode", "city", "state",
  "homeowner", "agreeTerms", "authorizeCredit", "applicationId",
  "loanType", "loanAmount", "term", "interestRate", "startDate"
];

export const initialSettings = Object.fromEntries(defaultFields.map(key => [key, true]));
  