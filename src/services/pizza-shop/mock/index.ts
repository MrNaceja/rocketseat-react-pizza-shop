import { AuthMock } from "@/services/pizza-shop/mock/auth.mock"
import { setupWorker } from 'msw/browser'

export const mockWorker = setupWorker(AuthMock.signIn)