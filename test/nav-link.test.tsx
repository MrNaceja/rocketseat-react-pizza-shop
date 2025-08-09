import { NavLink } from "@/pages/app/_layout/nav-link"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router"

describe("Nav Link", () => {
    it("should highlight the orders nav link", () => {
        const wrapper = render(
            <>
                <NavLink to="/">Início</NavLink>
                <NavLink to="/orders">Pedidos</NavLink>
            </>,
            {
                wrapper({ children }) {
                    return (
                        <MemoryRouter initialEntries={['/orders']}>{children}</MemoryRouter>
                    )
                }
            }
        )

        expect(wrapper.getByText('Pedidos').dataset.active).toEqual('true')
        expect(wrapper.getByText('Início').dataset.active).toEqual('false')
    })
})