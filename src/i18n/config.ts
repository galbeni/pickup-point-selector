import { getRequestConfig } from "next-intl/server";

import en from "./en.json";
import hu from "./hu.json";

export const locales = {
  en,
  hu,
};

export default getRequestConfig(async () => {
  const locale = "en";

  return {
    locale,
    messages: locales[locale],
  };
});
