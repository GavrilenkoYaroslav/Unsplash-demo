const download = (blob, fileName) => {
  let a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 60 * 1000);
};

export {
  download,
}
