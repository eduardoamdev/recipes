import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

const Navigation = (props) => {
  let links = props.links;
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="navigation">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {links.map((link) => {
            return (
              <Nav.Link href={link[1]} key={link[2]} className="margin-right-1">
                <p className="white-font kalam-font little-font">{link[0]}</p>
              </Nav.Link>
            );
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
