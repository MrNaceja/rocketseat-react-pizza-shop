import { render } from '@testing-library/react'

import { OrderStatusEnum } from '@/lib/constants'
import { orderStatusDescriptionMap, OrderStatusTag } from '@/pages/app/orders/components/order-status-tag'

describe('Order Status Tag', () => {
  it('should display correct text and classNames when status is pending', () => {
    const html = render(<OrderStatusTag status={OrderStatusEnum.pending} />)

    const text = html.getByText(orderStatusDescriptionMap['pending'])
    const badgetStatus = html.getByTestId('badge-status')

    expect(text).toBeInTheDocument()
    expect(badgetStatus).toHaveClass('bg-muted')
  })
  it('should display correct text and classNames when status is canceled', () => {
    const html = render(<OrderStatusTag status={OrderStatusEnum.canceled} />)

    const text = html.getByText(orderStatusDescriptionMap['canceled'])
    const badgetStatus = html.getByTestId('badge-status')

    expect(text).toBeInTheDocument()
    expect(badgetStatus).toHaveClass('bg-destructive')
  })
  it('should display correct text and classNames when status is processing', () => {
    const html = render(<OrderStatusTag status={OrderStatusEnum.processing} />)

    const text = html.getByText(orderStatusDescriptionMap['processing'])
    const badgetStatus = html.getByTestId('badge-status')

    expect(text).toBeInTheDocument()
    expect(badgetStatus).toHaveClass('bg-amber-500')
  })
  it('should display correct text and classNames when status is delivering', () => {
    const html = render(<OrderStatusTag status={OrderStatusEnum.delivering} />)

    const text = html.getByText(orderStatusDescriptionMap['delivering'])
    const badgetStatus = html.getByTestId('badge-status')

    expect(text).toBeInTheDocument()
    expect(badgetStatus).toHaveClass('bg-emerald-500')
  })
  it('should display correct text and classNames when status is delivered', () => {
    const html = render(<OrderStatusTag status={OrderStatusEnum.delivered} />)

    const text = html.getByText(orderStatusDescriptionMap['delivered'])
    const badgetStatus = html.getByTestId('badge-status')

    expect(text).toBeInTheDocument()
    expect(badgetStatus).toHaveClass('bg-emerald-500')
  })
})
