import { Form, Field, ErrorMessage } from 'formik'
import styled from 'styled-components'

export const XmasTitle = styled.h1`
  font-size: ${props => props.theme.fontSize[6]};
  color: ${props => props.theme.colors.red};
  text-align: center;
  -webkit-text-stroke: 1px ${props => props.theme.colors.white};
`
export const XmasForm = styled(Form)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`
export const XmasInput = styled(Field)`
  width: 50%;
  border-radius: 5px;
  margin-top: ${props => props.theme.space[2]};
  padding: ${props => `${props.theme.space[2]} ${props.theme.space[3]}`};
  font-size: ${props => props.theme.fontSize[4]};
  @media (max-width: ${props => props.theme.breakpoint[0]}) {
    width: 100%;
  }
`
export const XmasSelect = styled(Field)`
  font-size: ${props => props.theme.fontSize[3]};
  margin-top: ${props => props.theme.space[2]};
`
export const XmasButton = styled.button`
  font-size: ${props => props.theme.fontSize[4]};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-top: ${props => props.theme.space[3]};
`

export const XmasError = styled(ErrorMessage)`
  margin-bottom: ${props => props.theme.space[2]};
  font-size: ${props => props.theme.fontSize[4]};
  color: ${props => props.theme.colors.darkred};
`

export const GiftGrid = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.space[4]};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-items: center;
  padding-bottom: ${props => props.theme.space[3]};
  p {
    margin: 0;
  }
`

export const Gift = styled.div`
  cursor: pointer;
  width: 200px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.black};
  padding: ${props => props.theme.space[3]};
  background: rgba(255, 255, 255, 0.2);
  transition: 0.5s ease;
  :hover {
    box-shadow: 0 0 0 5px ${props => props.theme.colors.black};
    transition: 0.5s ease;
  }
`
