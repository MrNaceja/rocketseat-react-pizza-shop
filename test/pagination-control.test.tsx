import { PaginationControl } from "@/components/pagination-control"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe('Pagination Control', () => {
    it("should display the right amount of pages and results", () => {
        const wrapper = render(
            <PaginationControl
                currentPageIndex={0}
                recordsTotal={20}
                recorsPerPage={10}
                onPageChange={() => { }}
            />
        )

        expect(wrapper.getByText('Página 1 de 2')).toBeInTheDocument()
        expect(wrapper.getByText('Total de 20 registro(s)')).toBeInTheDocument()
    })

    it("should be able to navigate to the next page", async () => {
        const onPageChangeWithSpy = vi.fn()

        const wrapper = render(
            <PaginationControl
                currentPageIndex={0}
                recordsTotal={20}
                recorsPerPage={10}
                onPageChange={onPageChangeWithSpy}
            />
        )

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Próxima página'
        })

        await userEvent.click(nextPageButton)

        expect(onPageChangeWithSpy).toBeCalledWith(2)
    })

    it("should be able to navigate to the previous page", async () => {
        const onPageChangeWithSpy = vi.fn()

        const wrapper = render(
            <PaginationControl
                currentPageIndex={5}
                recordsTotal={200}
                recorsPerPage={10}
                onPageChange={onPageChangeWithSpy}
            />
        )

        const previousPageButton = wrapper.getByRole('button', {
            name: 'Página anterior'
        })

        await userEvent.click(previousPageButton)

        expect(onPageChangeWithSpy).toBeCalledWith(5)
    })

    it("should be able to navigate to the first page", async () => {
        const onPageChangeWithSpy = vi.fn()

        const wrapper = render(
            <PaginationControl
                currentPageIndex={5}
                recordsTotal={20}
                recorsPerPage={10}
                onPageChange={onPageChangeWithSpy}
            />
        )

        const firstPageButton = wrapper.getByRole('button', {
            name: 'Primeira página'
        })

        await userEvent.click(firstPageButton)

        expect(onPageChangeWithSpy).toBeCalledWith(1)
    })

    it("should be able to navigate to the last page", async () => {
        const onPageChangeWithSpy = vi.fn()

        const wrapper = render(
            <PaginationControl
                currentPageIndex={5}
                recordsTotal={20}
                recorsPerPage={10}
                onPageChange={onPageChangeWithSpy}
            />
        )

        const lastPageButton = wrapper.getByRole('button', {
            name: 'Última página'
        })

        await userEvent.click(lastPageButton)

        expect(onPageChangeWithSpy).toBeCalledWith(2)
    })
})