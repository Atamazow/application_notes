export const getLastDate = (lastModified) => {
  return new Date(lastModified).toLocaleDateString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
