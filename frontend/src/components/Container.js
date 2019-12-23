import React from 'react'
import styled from 'styled-components'

// WORKAROUND: styled-components não está dando extend em React component
export const ContainedContent = styled.div`
  display: block;
  margin: ${props => props.theme.space[0]} auto;
  max-width: 940px;
  padding: ${props => `${props.theme.space[0]} ${props.theme.space[3]}`};

  @media (max-width: ${props => props.theme.breakpoint[0]}) {
    max-width: 720px;
  }
`

export default function Container({ className, children }) {
  return <ContainedContent className={className}>{children}</ContainedContent>
}
