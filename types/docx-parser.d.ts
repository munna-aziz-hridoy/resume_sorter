declare module 'docx-parser' {
  const parseDocx: (filePath: string, callback: (data: string) => void) => void;
  export { parseDocx };
}
