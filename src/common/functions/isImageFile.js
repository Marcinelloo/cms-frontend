export const isImageFile = (file) => {
    // Pobierz rozszerzenie pliku z jego nazwy
    const fileName = file.name;
    const fileExtension = fileName.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
    );
  
    const imageFile = ['jpg', 'jpeg','png','gif']
  
    if (imageFile.includes(fileExtension.toLowerCase())) {
      // Sprawdź również typ MIME
      if (file.type === `image/${fileExtension.toLowerCase()}`) {
        return true;
      }
    }
  
    return false;
  };
  