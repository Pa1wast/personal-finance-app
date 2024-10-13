export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/account", "/transactions", "/bills", "/budgets", "/pots"],
};
