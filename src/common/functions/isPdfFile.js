export const isPDFFile = (file) => {
  // Pobierz rozszerzenie pliku z jego nazwy
  const fileName = file.name;
  const fileExtension = fileName.slice(
    ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
  );


  // Sprawdź, czy rozszerzenie jest odpowiednie (zakładamy, że jest to "pdf" lub "PDF")
  if (fileExtension.toLowerCase() === "pdf") {
    // Sprawdź również typ MIME
    if (file.type === "application/pdf") {
      return true;
    }
  }

  return false;
};
