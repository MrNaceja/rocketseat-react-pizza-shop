import type { PizzaShopApiError } from "@/services/pizza-shop/api";
import type { SignInPayload } from "@/services/pizza-shop/auth.service";
import { http, HttpResponse } from "msw";

const mockManagerEmail = "manager@email.com";

export const AuthMock = {
  signIn: http.post<never, SignInPayload>(
    "/authenticate",
    async ({ request }) => {
      const { email } = await request.json();

      if (email !== mockManagerEmail) {
        return HttpResponse.json<PizzaShopApiError>(
          {
            code: "UNAUTHORIZED",
            message: "Credenciais inválidas",
          },
          {
            status: 401,
          },
        );
      }

      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Set-Cookie": "auth=sample-jwt",
        },
      });
    },
  ),
};
