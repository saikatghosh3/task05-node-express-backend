function applyErrors(user, errors) {
  if (errors <= 0) return user;

  const errorTypes = ["delete", "add", "swap"];
  const applyError = (str) => {
    const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    switch (errorType) {
      case "delete":
        return (
          str.slice(0, Math.floor(Math.random() * str.length)) +
          str.slice(Math.floor(Math.random() * str.length) + 1)
        );
      case "add":
        return (
          str.slice(0, Math.floor(Math.random() * str.length)) +
          randomChar() +
          str.slice(Math.floor(Math.random() * str.length))
        );
      case "swap":
        const pos = Math.floor(Math.random() * (str.length - 1));
        return str.slice(0, pos) + str[pos + 1] + str[pos] + str.slice(pos + 2);
      default:
        return str;
    }
  };

  const randomChar = () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26));

  return {
    ...user,
    name: applyError(user.name),
    address: applyError(user.address),
    phone: applyError(user.phone),
  };
}

module.exports = { applyErrors };
