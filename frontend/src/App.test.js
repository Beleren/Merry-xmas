import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, wait, waitForElement } from '@testing-library/react'
import store from './redux/store'
import App from './App'

const renderComponent = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

test('renders form with redux', () => {
  const { getByText } = renderComponent()
  const headerElement = getByText(/What do you want for Christmas/i)
  expect(headerElement).toBeInTheDocument()
})

test('submits valid values to the form', async () => {
  const { container, getByText, getByPlaceholderText } = renderComponent()
  const emailInput = getByPlaceholderText(/E-mail/i)
  const wishInput = getByPlaceholderText(/Wish Gift/i)
  const select = container.querySelector('select[name="interval"]')
  const submitBtn = getByText(/Send to Santa/i)
  expect(emailInput).toBeInTheDocument()
  expect(wishInput).toBeInTheDocument()

  await wait(() =>
    fireEvent.change(emailInput, {
      target: {
        value: 'teste@teste.com',
      },
    })
  )
  expect(emailInput.value).toBe('teste@teste.com')
  await wait(() =>
    fireEvent.change(wishInput, {
      target: {
        value: 'teste de string grandinha',
      },
    })
  )
  expect(wishInput.value).toBe('teste de string grandinha')
  await wait(() =>
    fireEvent.change(select, {
      target: {
        value: '120',
      },
    })
  )
  expect(select.value).toBe('120')
  // await wait(() =>
  //   fireEvent.click(submitBtn)
  // )
  // expect(select.value).toBe('')
  // await waitForElement(() => getByText(/Email: teste@teste.com/i))
  // expect(getByText(/Email: teste@teste.com/i)).toBeInTheDocument()
  // expect(getByText(/Item: teste de string grandinha/i)).toBeInTheDocument()
  // expect(getByText(/Interval: 120/i)).toBeInTheDocument()
})
