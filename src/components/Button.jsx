import PropTypes from 'prop-types';

export const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
