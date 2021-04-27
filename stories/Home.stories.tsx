import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import { ChoresProvider } from 'contexts/ChoresContext';
import { Home, HomeProps } from 'components/Home';
import { createApolloClient } from 'graphql-client/createApolloClient/browser';
import { cssTheme } from 'helpers/constants';

const apolloClient = createApolloClient({});

const meta: Meta<HomeProps> = {
  title: 'Home',
  component: Home,
  decorators: [
    Story => (
      <ThemeProvider theme={cssTheme}>
        <ChoresProvider>
          <ApolloProvider client={apolloClient}>
            <Story />
          </ApolloProvider>
        </ChoresProvider>
      </ThemeProvider>
    ),
  ],
};
export default meta;

const Template: Story<HomeProps> = args => <Home {...args} />;

export const Default: Story<HomeProps> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  onNavigateToAccountPage: action('onNavigateToAccountPage invoked!'),
};
