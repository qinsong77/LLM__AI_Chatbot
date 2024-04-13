import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Page from '../app/page'
describe('Home component', () => {
  it('renders correctly', () => {
    render(<Page />)
    expect(screen.getByText(/bot/i)).toBeInTheDocument()
  })
})
