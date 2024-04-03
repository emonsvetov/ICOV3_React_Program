import React from "react"
import {Container} from "reactstrap";
import {Themed} from '@/theme'
const ParticipantTopbar = () => {
  return (
    <div className="topbar">
      <Container fluid className="topbar__wrapper">
        <Themed component={'Navbar'} />
        <Themed component="Cart" />
      </Container>
    </div>
  )
}
export default ParticipantTopbar;