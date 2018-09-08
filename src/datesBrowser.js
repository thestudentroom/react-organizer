import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {
  format,
  getYear,
  getMonth,
  addMonths,
  subMonths,
  isSameMonth,
  eachDayOfInterval,
  addYears,
  subYears,
} from 'date-fns';
import { days, months } from './utils';
import { EventExample } from './utils';
import { zhCN } from 'date-fns/locale';

const DatesBrowserContext = React.createContext({
  days: [],
  months: [],
  date: new Date(),
  // functions
  getPrevMonthOffset: () => {},
  getNextMonthOffset: () => {},
  getCurrentMonth: () => {},
  getFullMonth: () => {},
  addCalendarMonth: () => {},
  subCalendarMonth: () => {},
  selectDate: () => {},
});

export class DatesBrowser extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    initialDays: PropTypes.array,
    initialMonths: PropTypes.array,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        starts: PropTypes.instanceOf(Date).isRequired,
      }),
    ),
  };
  static defaultProps = {
    stateReducer: (state, changes) => changes,
    onStateChange: () => {},
    onReset: () => {},
    initialDays: days,
    initialMonths: months,
    events: [],
    initialGridBlocks: 42,
  };
  static stateChangeTypes = {
    addCalendarMonth: '__add_calendar_month__',
    subCalendarMonth: '__subtract_calendar_month__',
    selectDate: '__select_date__',
    reset: '__reset__',
    addCalendarYear: '__add_calendar_year__',
    subCalendarYear: '__sub_calendar_year__',
  };
  static Consumer = DatesBrowserContext.Consumer;
  //
  changeDaysLanguage = () => [];
  changeMonthsLanguage = () => [];
  initializeEvents = forDate => {
    const getDate = d => format(d, 'dd/MM/yyyy');
    const currentDate = getDate(forDate);
    return this.props.events.filter(
      ({ starts }) => getDate(starts) === currentDate,
    );
  };
  eventInsert = () => {};
  eventUpdate = () => {};
  eventDelete = () => {};
  //
  getWeeksInAMonth = (month, year) => {
    const weeks = [];
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const numDays = lastDate.getDate();
    let start = 1;
    let end = 7 - firstDate.getDay();
    while (start <= numDays) {
      weeks.push({ start, end });
      start = end + 1;
      end = end + 7;
      if (end > numDays) end = numDays;
    }
    return weeks;
  };
  getMonthByNumber(number) {
    return this.getState().months[number];
  }
  getNumberOfDaysInAMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }
  getToday = () => new Date().getDate() - 1;
  getCurrentMonthNumber = () => new Date().getMonth();
  getCurrentYear = () => new Date().getFullYear();
  // Construct callendar
  getPrevMonthOffset = ({ month, year }) => {
    let prevMonthNumber = month - 2;
    let currentYear = year;
    if (prevMonthNumber < 0) {
      // check if previews year
      prevMonthNumber = 11;
      currentYear = currentYear - 1;
    }
    const { end, start } = this.getWeeksInAMonth(
      prevMonthNumber,
      currentYear,
    ).pop();
    let totalDays =
      this.getNumberOfDaysInAMonth(prevMonthNumber, currentYear) + 1;
    const assignDays = Array(end - start)
      .fill({})
      .map(() => {
        const currentDay = (totalDays -= 1);
        return {
          name: this.getState().days[
            new Date(currentYear, prevMonthNumber, currentDay).getDay()
          ],
          day: currentDay,
          date: new Date(currentYear, prevMonthNumber, currentDay),
          offset: true,
          events: this.initializeEvents(
            currentYear,
            prevMonthNumber,
            currentDay,
          ),
        };
      })
      .reverse();
    return {
      name: this.getMonthByNumber(prevMonthNumber),
      month: prevMonthNumber + 1,
      year: currentYear,
      totalOffsetDays: assignDays.length,
      days: assignDays,
    };
  };
  getCurrentMonth = ({ month, year }) => {
    const currentMonth = month - 1;
    const totalDays = this.getNumberOfDaysInAMonth(currentMonth, year);
    const today = new Date().getDate() - 1;
    const isToday =
      isSameMonth(new Date(year, currentMonth, today), new Date()) && today;
    return {
      name: this.getMonthByNumber(currentMonth),
      month,
      year,
      totalDays,
      totalWeeks: this.getWeeksInAMonth(currentMonth, year).length,
      days: Array(totalDays)
        .fill({})
        .map((u, day) => {
          const currentDay = day + 1;
          return {
            name: this.getState().days[
              new Date(year, currentMonth, currentDay).getDay()
            ],
            day: currentDay,
            date: new Date(year, currentMonth, currentDay),
            today: isToday === day,
            events: this.initializeEvents(
              new Date(year, currentMonth, currentDay),
            ),
          };
        }),
    };
  };
  getNextMonthOffset = ({ month, year, totalOffsetDays, totalDays }) => {
    let currentMonth = month;
    let currentYear = year;
    if (currentMonth > 11) {
      // check if next year
      currentMonth = 0;
      currentYear = currentYear + 1;
    }
    const nextMonthOffset =
      this.getState().gridBlocks - totalOffsetDays - totalDays;
    const assignDays = Array(nextMonthOffset)
      .fill({})
      .map((c, i) => {
        const currentDay = i + 1;
        return {
          name: this.getState().days[
            new Date(currentYear, currentMonth, currentDay).getDay()
          ],
          day: currentDay,
          date: new Date(currentYear, currentMonth, currentDay),
          offset: true,
          events: this.initializeEvents(currentYear, currentMonth, currentDay),
        };
      });
    return {
      name: this.getMonthByNumber(currentMonth),
      month: currentMonth + 1,
      year: currentYear,
      totalOffsetDays: assignDays.length,
      days: assignDays,
    };
  };
  getFullMonth = initMonth => {
    const month = initMonth ? initMonth : getMonth(this.getState().date) + 1;
    const year = getYear(this.getState().date);
    const firstOffset = this.getPrevMonthOffset({ month, year });
    const current = this.getCurrentMonth({ month, year });
    const nextOffset = this.getNextMonthOffset({
      month,
      year,
      totalOffsetDays: firstOffset.totalOffsetDays,
      totalDays: current.totalDays,
    });
    return {
      ...current,
      days: [...firstOffset.days, ...current.days, ...nextOffset.days],
    };
  };
  addCalendarMonth = ({
    type = DatesBrowser.stateChangeTypes.addCalendarMonth,
  }) => {
    this.internalSetState(state => ({
      type,
      date: addMonths(state.date, 1),
    }));
  };
  subCalendarMonth = ({
    type = DatesBrowser.stateChangeTypes.subCalendarMonth,
  }) => {
    this.internalSetState(state => ({
      type,
      date: subMonths(state.date, 1),
    }));
  };
  addCalendarYear = ({
    type = DatesBrowser.stateChangeTypes.addCalendarYear,
  }) => {
    this.internalSetState(state => ({
      type,
      date: addYears(state.date, 1),
    }));
  };
  subCalendarYear = ({
    type = DatesBrowser.stateChangeTypes.subCalendarYear,
  }) => {
    this.internalSetState(state => ({
      type,
      date: subYears(state.date, 1),
    }));
  };
  selectDate = ({ type = DatesBrowser.stateChangeTypes.selectDate, date }) => {
    this.internalSetState({ type, date });
  };
  reset = () => {
    this.internalSetState(
      { ...this.initialState, type: DatesBrowser.stateChangeTypes.reset },
      () => this.props.onReset(this.getState().date),
    );
  };
  //
  initialState = {
    days: this.props.initialDays,
    months: this.props.initialMonths,
    gridBlocks: this.props.initialGridBlocks,
    date: new Date(),
    // functions
    getPrevMonthOffset: this.getPrevMonthOffset,
    getNextMonthOffset: this.getNextMonthOffset,
    getCurrentMonth: this.getCurrentMonth,
    getFullMonth: this.getFullMonth,
    addCalendarMonth: this.addCalendarMonth,
    subCalendarMonth: this.subCalendarMonth,
    addCalendarYear: this.addCalendarYear,
    subCalendarYear: this.subCalendarYear,
    selectDate: this.selectDate,
    reset: this.reset,
  };
  state = this.initialState;
  isControlledProp(key) {
    return this.props[key] !== undefined;
  }
  getState(stateToMerge = this.state) {
    return Object.keys(stateToMerge).reduce((state, key) => {
      state[key] = this.isControlledProp(key)
        ? this.props[key]
        : stateToMerge[key];
      return state;
    }, {});
  }
  internalSetState = (changes, callback = () => {}) => {
    let allChanges;
    this.setState(
      currentState => {
        const combinedState = this.getState(currentState);
        return [changes]
          .map(c => (typeof c === 'function' ? c(currentState) : c))
          .map(c => {
            allChanges = this.props.stateReducer(combinedState, c) || {};
            return allChanges;
          })
          .map(({ type: ignoredType, ...onlyChanges }) => onlyChanges)
          .map(c => {
            return Object.keys(combinedState).reduce((newChanges, stateKey) => {
              if (!this.isControlledProp(stateKey)) {
                newChanges[stateKey] = c.hasOwnProperty(stateKey)
                  ? c[stateKey]
                  : combinedState[stateKey];
              }
              return newChanges;
            }, {});
          })
          .map(c => (Object.keys(c || {}).length ? c : null))[0];
      },
      () => {
        this.props.onStateChange(allChanges, this.state);
        callback();
      },
    );
  };
  render() {
    const { children } = this.props;
    const ui = typeof children === 'function' ? children(this.state) : children;
    return (
      <DatesBrowserContext.Provider value={this.state}>
        {ui}
      </DatesBrowserContext.Provider>
    );
  }
}

export function withDatesBrowser(Component) {
  const Wrapper = React.forwardRef((props, ref) => {
    return (
      <DatesBrowser.Consumer>
        {browserUtils => (
          <Component {...props} dataBrowser={browserUtils} ref={ref} />
        )}
      </DatesBrowser.Consumer>
    );
  });
  Wrapper.displayName = `withDatesBrowser(${Component.displayName ||
    Component.name})`;
  hoistNonReactStatics(Wrapper, Component);
  return Wrapper;
}
