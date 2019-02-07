import styled from 'styled-components';
import { themeGet, space, color } from 'styled-system';
import defaultTheme from '@client/utils/theme';

const type = (props) => {
  const badgeColors = {
    blue: {
      backgroundColor: props.theme.colors.blue,
      color: props.theme.colors.white,
    },
    lightBlue: {
      backgroundColor: props.theme.colors.lightBlue,
      color: props.theme.colors.darkBlue,
    },
    green: {
      backgroundColor: props.theme.colors.green,
      color: props.theme.colors.white,
    },
    lightGreen: {
      backgroundColor: props.theme.colors.lightGreen,
      color: props.theme.colors.darkGreen,
    },
    red: {
      backgroundColor: props.theme.colors.red,
      color: props.theme.colors.white,
    },
    lightRed: {
      backgroundColor: props.theme.colors.lightRed,
      color: props.theme.colors.darkRed,
    },
    orange: {
      backgroundColor: props.theme.colors.orange,
      color: props.theme.colors.darkRed,
    },
    gray: {
      backgroundColor: props.theme.colors.gray,
      color: props.theme.colors.white,
    },
    lightGray: {
      backgroundColor: props.theme.colors.lightGray,
      color: props.theme.colors.black,
    },
  };
  return (
    !(props.bg && props.color) &&
    (badgeColors[props.bg] || badgeColors.lightGray)
  );
};

const Badge = styled.div`
  border-radius: 99999px;
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: ${themeGet('letterSpacings.caps')};
  ${space} ${type} ${color};
`;

Badge.displayName = 'Badge';

Badge.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
};

Badge.defaultProps = {
  px: 12,
  py: 1,
  theme: defaultTheme,
};

export default Badge;
