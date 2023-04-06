import './button.styles.scss';

type Props = {};

const BUTTON_TYPES_CLASSES: { [key: string]: string } = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType }: any) => {
  return (
    <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}>
      {children}
    </button>
  );
};

export default Button;
