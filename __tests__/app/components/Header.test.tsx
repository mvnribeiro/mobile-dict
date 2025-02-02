import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react-native'
import Header from '../../../app/components/Header'

jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}))

describe('Header Component', () => {
  const mockLogout = jest.fn()

  beforeEach(() => {
    mockLogout.mockClear()

    const mockUseAuth = require('../../../context/AuthContext').useAuth
    mockUseAuth.mockReturnValue({
      logout: mockLogout,
    })
  })

  it('should render the logout button', () => {
    render(<Header />)

    const logoutText = screen.getByText('Logout')
    expect(logoutText).toBeTruthy()
  })

  it('should call logout when Logout text is pressed', async () => {
    render(<Header />)

    const logoutText = screen.getByText('Logout')
    fireEvent.press(logoutText)

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  it('should show Words, History, and Favorites buttons', () => {
    render(<Header />)

    expect(screen.getByText('Words')).toBeTruthy()
    expect(screen.getByText('History')).toBeTruthy()
    expect(screen.getByText('Favorites')).toBeTruthy()
  })

  it('should call logout and handle errors properly', async () => {
    const errorMessage = 'Logout failed'
    mockLogout.mockRejectedValueOnce(new Error(errorMessage))

    render(<Header />)

    const logoutText = screen.getByText('Logout')
    fireEvent.press(logoutText)

    expect(mockLogout).toHaveBeenCalledTimes(1)
    expect(mockLogout).toHaveBeenCalledWith()
  })
})