export const fileExtension = (image: any) => {
  return image ? image.split(";")[0].split("/")[1] : "";
};

export const getSrc = (image: string, from: string) => {
  if (image && image.includes("data:image")) {
    return image;
  } else if (image) {
    return require("../images/" + from + "/" + image);
  }
};
