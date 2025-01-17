import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Home from '../app/(route)/page'

describe('Home', () => {
  it('renders single div tag', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
