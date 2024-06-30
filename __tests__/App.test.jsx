import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test} from 'vitest';
import { LocationDisplay } from '/src/App'
import { MemoryRouter} from 'react-router-dom'
import CustomProvider from '/src/redux/provider.jsx'
import { Google, Login, Signup, Tests, Activation } from "/src/pages/auth";

describe('behaviour on full app rendering before authenticating', () => {
  test('landing on a bad page if not authenticated', () => {
    const badRoute = '/some/bad/route'
  
    render(
      <CustomProvider>
        <MemoryRouter initialEntries={[badRoute]}>
          <Login/>
        </MemoryRouter>,
      </CustomProvider>
    )
  
    // verify navigation to "Log In" route
    expect(screen.getByText(/Log In/i)).toBeInTheDocument()
  })

  test('full login page rendering', async () => {
    render(
      <CustomProvider>
        <MemoryRouter initialEntries={["/auth/login"]}>
          <Login/>
        </MemoryRouter>
      </CustomProvider>
    )

    expect(screen.getByText(/Log In/i)).toBeInTheDocument()
  })
  
  test('rendering a component that uses useLocation', () => {
    const route = '/auth/signup'
  
    render(
      <MemoryRouter initialEntries={[route]}>
        <LocationDisplay />
      </MemoryRouter>,
    )
  
    // verify location display is rendered
    expect(screen.getByTestId('location-display')).toHaveTextContent(route)
  })
})