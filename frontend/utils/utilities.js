export function setExpiration(timeFrame) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + timeFrame);
  console.log("login-expirationDate", expirationDate);
  return expirationDate;
}
