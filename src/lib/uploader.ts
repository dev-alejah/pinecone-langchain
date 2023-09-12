function fileReader(file: File) {
  const fr = new FileReader();
  fr.readAsText(file);

  fr.onload = async () => {
    const fileContent = convertToString(fr.result);
    console.log(fileContent);
  };
}

function convertToString(input: ArrayBuffer | null | string): string {
  // Check if the input is null
  if (input === null) {
    return ""; // Return empty string or any default value you want
  }

  // Check if the input is already a string
  if (typeof input === "string") {
    return input; // No conversion needed, return the input as is
  } else {
    console.log("NO RESULT FOUND");
  }

  // Convert ArrayBuffer to string using appropriate encoding (e.g., UTF-8)
  const uint8Array = new Uint8Array(input!);
  const decoder = new TextDecoder("utf-8");
  const convertedString = decoder.decode(uint8Array);

  return convertedString;
}
