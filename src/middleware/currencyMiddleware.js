import { defaultCurrencies } from "@/utils/currency";

export function currencyMiddleware(to, from, next) {
  const currencyValues = defaultCurrencies.map(item => item.value);

  if (to.path === "/") {
    if (!to.query.currency || !currencyValues.includes(to.query.currency)) {
      next({ path: '/', query: { currency: 'rub' } });
    } else {
      next();
    }
  } else {
    next();
  }
}