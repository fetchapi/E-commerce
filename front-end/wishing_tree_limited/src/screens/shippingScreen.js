import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cart'
import FormContainer from '../components/formContainer'
import FormComponent from '../components/formComponent'
import CheckoutSteps from '../components/checkoutSteps'

const ShippingScreen = ({ history }) => {
  // Local states
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [contactNum, setContactNum] = useState('')

  // Get States from Redux
  const userAuth = useSelector((state) => state.userAuth)
  const { userInfo } = userAuth

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      setAddress1(userInfo.address1 ? userInfo.address1 : '')
      setAddress2(userInfo.address2 ? userInfo.address2 : '')
      setCountry(userInfo.country ? userInfo.country : '')
      setCity(userInfo.city ? userInfo.city : '')
    }
  }, [dispatch, history])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      saveShippingAddress({
        name,
        surname,
        address1,
        address2,
        contactNum,
        country,
        city,
      }),
    )
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler} autoComplete="on">
        <Row>
          <Col md={6}>
            <FormComponent
              label="Given Name"
              type="text"
              value={name}
              required={true}
              placeholder="Enter your given name"
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <FormComponent
              label="Surname"
              type="text"
              value={surname}
              required={true}
              placeholder="Enter your surname"
              onChange={(e) => setSurname(e.target.value)}
            />
          </Col>
        </Row>

        <FormComponent
          label="Address Line 1"
          type="text"
          value={address1}
          required={true}
          placeholder="Enter your Flat, Room No., Block No., and Building Name"
          onChange={(e) => setAddress1(e.target.value)}
        />
        <FormComponent
          label="Address Line 2"
          type="text"
          value={address2}
          required={true}
          placeholder="Enter the street name and district"
          onChange={(e) => setAddress2(e.target.value)}
        />
        <Form.Group className="py-2">
          <Form.Label>Country or Region</Form.Label>
          <Form.Select onChange={(e) => setCountry(e.target.value)} required>
            <option value="">Select a Country or Region</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Japan">Japan</option>
          </Form.Select>
        </Form.Group>
        <FormComponent
          required={true}
          label="City"
          type="text"
          placeholder={'Enter City'}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Form.Group className="py-2">
          <Form.Label>{'Contact Number'}</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              {country === 'Hong Kong' ? '+852' : '+81'}
            </InputGroup.Text>
            <FormControl
              value={contactNum}
              onChange={(e) => setContactNum(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <div className="py-3">
          <Button
            type="submit"
            variant="primary"
            disabled={
              name === '' ||
              surname === '' ||
              address1 === '' ||
              address2 === '' ||
              contactNum === '' ||
              country === '' ||
              city === ''
            }
          >
            Proceed to Payment
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
