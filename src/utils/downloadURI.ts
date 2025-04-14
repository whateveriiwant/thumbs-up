export const downloadURI = (uri: string, name: string) => {
  const link = document.createElement("a");
  link.href = uri;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
