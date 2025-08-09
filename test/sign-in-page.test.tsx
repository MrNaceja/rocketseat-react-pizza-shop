import { appProvidersDependencies } from "@/app"
import { SignInPage } from "@/pages/auth/sign-in"
import { QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { UnheadProvider } from "@unhead/react/client"
import { MemoryRouter } from "react-router"

describe('Sign In Page', () => {
    it("should check if email input is automatically filled with url search params email field", () => {
        const email = "test@email.com"
        
        const wrapper = render(
            <SignInPage />,
            {
                wrapper({ children }) {
                    return (
                        <UnheadProvider>
                            <QueryClientProvider client={appProvidersDependencies.queryClient}>
                                <MemoryRouter initialEntries={[`/sign-in?email=${email}`]}>{children}</MemoryRouter>
                            </QueryClientProvider>
                        </UnheadProvider>
                    )
                }
            }
        )

        const emailInput = wrapper.getByLabelText("Seu email") as HTMLInputElement

        expect(emailInput.value).toEqual(email)
    })
})