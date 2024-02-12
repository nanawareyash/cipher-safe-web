export function formDataToJson(formData: FormData): { [key: string]: any } {
  const json: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    if (json.hasOwnProperty(key)) {
      if (Array.isArray(json[key])) {
        (json[key] as any[]).push(value);
      } else {
        json[key] = [json[key], value];
      }
    } else {
      json[key] = value;
    }
  });
  return json;
}
