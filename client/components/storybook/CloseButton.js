import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CloseButton } from '../index';

storiesOf('CloseButton', module).add('with click handler', () => (
  <CloseButton color="black" onClick={action('clicked')} />
));
