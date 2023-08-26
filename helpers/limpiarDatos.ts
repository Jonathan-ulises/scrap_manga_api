

export const limpiarNombre = (nombre: string): string => {
  const regexV1 = /(CHAPTER[0-9]*|CAP(I|Í)TULO)|[0-9]+$/gim;
  const regexV2 = /(CHAPTER(-|\s)?[0-9]*|CAP(I|Í)TULO)|[0-9]+$/gmi;
  const regexV3 = /(CHAPTER(-|\s)?[0-9]*|CAP(I|Í)TULO(-|\s)?[0-9])|[0-9]+$/gmi;

  const regexOnlyWords = /\w+/gmi
  // Extract name without "chapter, capitulo, n" section in name
  nombre = nombre.replace(regexV3, "")
  return nombre.match(regexOnlyWords)!.join(' ');
}

