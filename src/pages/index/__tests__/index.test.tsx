/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';

import { Chore } from '../index';
import { cssTheme } from '../../../helpers/constants';

jest.mock('../../../helpers/clientCache', () => ({
  getChores: jest.fn(),
  setChores: jest.fn(),
}));

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

describe('<Chore />', () => {
  let realDateNow: () => number;

  beforeEach(() => {
    realDateNow = Date.now.bind(global.Date);
    const firstSecondOf2020 = new Date('January 1 2020');
    const dateNowStub = jest.fn(() => firstSecondOf2020.getTime());
    global.Date.now = dateNowStub;
  });

  afterEach(() => {
    global.Date.now = realDateNow;
  });

  describe('overdue', () => {
    describe('date range crosses new year', () => {
      it('1 day ago', () => {
        const dueDate = {
          year: 2019,
          month: 11, // December
          day: 31,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'overdue chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('9 days ago', () => {
        const dueDate = {
          year: 2019,
          month: 11, // December
          day: 23,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('1 month ago', () => {
        const dueDate = {
          year: 2019,
          month: 11, // December
          day: 1,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('11 months ago', () => {
        const dueDate = {
          year: 2019,
          month: 1, // February
          day: 1,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('1 year ago', () => {
        const dueDate = {
          year: 2019,
          month: 0, // January
          day: 1,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('10 years ago', () => {
        const dueDate = {
          year: 2010,
          month: 0, // January
          day: 1,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('due today', () => {
    it('exact date', () => {
      const dueDate = {
        year: 2020,
        month: 0, // January
        day: 1,
      };

      const tree = renderer
        .create(
          <ThemeProvider theme={cssTheme}>
            <Chore
              dueDate={dueDate}
              clickHandler={() => {}}
              name={'today`s chore'}
            />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('later in day', () => {
      const noon = new Date('January 1 2020 12:00:00');
      const dateNowStub = jest.fn(() => noon.getTime());
      global.Date.now = dateNowStub;

      const dueDate = {
        year: 2020,
        month: 0, // January
        day: 1,
      };

      const tree = renderer
        .create(
          <ThemeProvider theme={cssTheme}>
            <Chore
              dueDate={dueDate}
              clickHandler={() => {}}
              name={'today`s chore'}
            />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('not yet due', () => {
    it('1 day in future', () => {
      const dueDate = {
        year: 2020,
        month: 0, // January
        day: 2,
      };

      const tree = renderer
        .create(
          <ThemeProvider theme={cssTheme}>
            <Chore
              dueDate={dueDate}
              clickHandler={() => {}}
              name={'future chore'}
            />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('9 days in future', () => {
      const dueDate = {
        year: 2020,
        month: 0, // January
        day: 10,
      };

      const tree = renderer
        .create(
          <ThemeProvider theme={cssTheme}>
            <Chore
              dueDate={dueDate}
              clickHandler={() => {}}
              name={'future chore'}
            />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('1 month in future', () => {
      const dueDate = {
        year: 2020,
        month: 1, // February
        day: 1,
      };

      const tree = renderer
        .create(
          <ThemeProvider theme={cssTheme}>
            <Chore
              dueDate={dueDate}
              clickHandler={() => {}}
              name={'future chore'}
            />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('11 months in future', () => {
      const dueDate = {
        year: 2020,
        month: 11, // December
        day: 1,
      };

      const tree = renderer
        .create(
          <ThemeProvider theme={cssTheme}>
            <Chore
              dueDate={dueDate}
              clickHandler={() => {}}
              name={'future chore'}
            />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('1 year in future', () => {
      const dueDate = {
        year: 2021,
        month: 0, // January
        day: 1,
      };

      const tree = renderer
        .create(
          <ThemeProvider theme={cssTheme}>
            <Chore
              dueDate={dueDate}
              clickHandler={() => {}}
              name={'future chore'}
            />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('10 years in future', () => {
      const dueDate = {
        year: 2030,
        month: 0, // January
        day: 1,
      };

      const tree = renderer
        .create(
          <ThemeProvider theme={cssTheme}>
            <Chore
              dueDate={dueDate}
              clickHandler={() => {}}
              name={'future chore'}
            />
          </ThemeProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    describe('date range crosses new year', () => {
      let previousDateNow: () => number;

      beforeEach(() => {
        previousDateNow = Date.now.bind(global.Date);
        const lastDayOf2019 = new Date('December 31 2019');
        const dateNowStub = jest.fn(() => lastDayOf2019.getTime());
        global.Date.now = dateNowStub;
      });

      afterEach(() => {
        global.Date.now = previousDateNow;
      });

      it('1 day in future', () => {
        const dueDate = {
          year: 2020,
          month: 0, // January
          day: 1,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('9 days in future', () => {
        const dueDate = {
          year: 2020,
          month: 0, // January
          day: 9,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('1 month in future', () => {
        const dueDate = {
          year: 2020,
          month: 0, // January
          day: 31,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('11 months in future', () => {
        const dueDate = {
          year: 2020,
          month: 10, // November
          day: 30,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('1 year in future', () => {
        const dueDate = {
          year: 2020,
          month: 11, // December
          day: 31,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('10 years in future', () => {
        const dueDate = {
          year: 2029,
          month: 11, // December
          day: 31,
        };

        const tree = renderer
          .create(
            <ThemeProvider theme={cssTheme}>
              <Chore
                dueDate={dueDate}
                clickHandler={() => {}}
                name={'future chore'}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
