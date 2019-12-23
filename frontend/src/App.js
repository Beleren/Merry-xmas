/*
Ideias de tema de natal:
Letra chique
Cores verde, vermelho, branco e um pouco de amarelo
*/
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const App = () => (
  <div>
    <h1>What do you want for Christmas?</h1>
    <Formik
      initialValues={{
        email: '',
        item: '',
        interval: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required('Please fill the email field')
          .email('This is not a valid email address!'),
        item: Yup.string()
          .max(50, 'Search text is too long!')
          .required('Please fill the search field'),
        interval: Yup.number()
          .min(120)
          .max(1800)
          .required('Please choose an interval to send email'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(process.env.REACT_APP_API_URL)
        fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => response.json())
          .then(res => {
            setSubmitting(false)
          })
      }}
    >
      {({ isSubmitting, handleChange, handleBlur, values }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="text" name="item" />
          <ErrorMessage name="intem" component="div" />
          <Field
            as="select"
            name="interval"
            value={values.interval}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ display: 'block' }}
          >
            <option value="" label="Select an interval">
              Select an interval
            </option>
            <option value="120" label="2 minutes">
              2 minutes
            </option>
            <option value="600" label="10 minutes">
              10 minutes
            </option>
            <option value="1800" label="30 minutes">
              30 minutes
            </option>
          </Field>
          <ErrorMessage name="interval" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Send to Santa
          </button>
        </Form>
      )}
    </Formik>
  </div>
)

export default App
