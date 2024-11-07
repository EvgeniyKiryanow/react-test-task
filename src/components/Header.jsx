import PropTypes from 'prop-types';
function Header(props){
    return (
        <header><h1>{props.name || "Header"}</h1></header>
    )
}

export default Header;

Header.propTypes = {
    name: PropTypes.string
  };