function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { days, months } from './utils';
import { format, getYear, getMonth, addMonths, subMonths, isSameMonth, isSameDay, eachDayOfInterval, addYears, subYears, isWeekend, setMonth, setYear, isBefore, getDate } from 'date-fns';
var OrganizerContext = React.createContext({
  days: [],
  months: [],
  date: new Date(),
  selected: null,
  // functions
  getPrevMonthOffset: function getPrevMonthOffset() {},
  getNextMonthOffset: function getNextMonthOffset() {},
  getCurrentMonth: function getCurrentMonth() {},
  getFullMonth: function getFullMonth() {},
  getFullYear: function getFullYear() {},
  addCalendarMonth: function addCalendarMonth() {},
  subCalendarMonth: function subCalendarMonth() {},
  addCalendarYear: function addCalendarYear() {},
  subCalendarYear: function subCalendarYear() {},
  selectDate: function selectDate() {},
  selectRange: function selectRange() {},
  reset: function reset() {},
  selectMonth: function selectMonth() {},
  selectYear: function selectYear() {},
  changeLanguage: function changeLanguage() {}
});
export var Organizer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Organizer, _React$Component);

  function Organizer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Organizer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Organizer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_eventsForMonth", function (month) {
      return _this.props.events.filter(function (_ref) {
        var starts = _ref.starts;
        return getMonth(starts) + 1 === month;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_initializeEvents", function (events, date) {
      return events.filter(function (_ref2) {
        var starts = _ref2.starts;
        return isSameDay(starts, date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getWeeksInAMonth", function (month, year) {
      var weeks = [];
      var firstDate = new Date(year, month, 1);
      var lastDate = new Date(year, month + 1, 0);
      var numDays = lastDate.getDate();
      var start = 1;
      var end = 7 - firstDate.getDay();

      while (start <= numDays) {
        weeks.push({
          start: start,
          end: end
        });
        start = end + 1;
        end = end + 7;
        if (end > numDays) end = numDays;
      }

      return weeks;
    });

    _defineProperty(_assertThisInitialized(_this), "_isDaySelected", function (calendarDay) {
      var selected = _this.getState().selected;

      if (selected && selected instanceof Date) {
        return isSameDay(_this.getState().selected, calendarDay);
      }

      if (Array.isArray(selected)) {
        return selected.map(function (s) {
          return isSameDay(s, calendarDay);
        }).includes(true);
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "changeLanguage", function (_ref3) {
      var _ref3$type = _ref3.type,
          type = _ref3$type === void 0 ? Organizer.stateChangeTypes.changeLanguage : _ref3$type,
          days = _ref3.days,
          months = _ref3.months;

      if (days.length === 7 && months.length === 12) {
        _this.internalSetState({
          type: type,
          days: days,
          months: months
        }, function () {
          return _this.props.onChangeLanguage({
            days: _this.getState().days,
            months: _this.getState().months
          });
        });
      } else {
        throw new Error("changeLanguage: Not enough days ".concat(days.length, " or months ").concat(months.length));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getPrevMonthOffset", function (_ref4) {
      var month = _ref4.month,
          year = _ref4.year;
      var assignDays = [];
      var prevMonthNumber = month - 2;
      var currentYear = year;

      if (prevMonthNumber < 0) {
        // check if previews year
        prevMonthNumber = 11;
        currentYear = currentYear - 1;
      }

      var _this$_getWeeksInAMon = _this._getWeeksInAMonth(prevMonthNumber, currentYear).pop(),
          end = _this$_getWeeksInAMon.end,
          start = _this$_getWeeksInAMon.start;

      var totalDays = _this._getNumberOfDaysInAMonth(prevMonthNumber, currentYear) + 1;

      for (var i = 0; i < end - start; i += 1) {
        var currentDay = totalDays -= 1;
        var date = new Date(currentYear, prevMonthNumber, currentDay);
        assignDays.push({
          name: _this.getState().days[date.getDay()],
          day: currentDay,
          date: date,
          offset: true,
          past: isBefore(date, new Date()),
          events: [],
          weekend: isWeekend(date)
        });
      }

      return {
        name: _this.getState().months[prevMonthNumber],
        month: prevMonthNumber + 1,
        year: currentYear,
        totalOffsetDays: assignDays.length,
        days: assignDays.reverse()
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getCurrentMonth", function (_ref5) {
      var month = _ref5.month,
          year = _ref5.year;
      var generatedDays = [];
      var currentMonth = month - 1;

      var totalDays = _this._getNumberOfDaysInAMonth(currentMonth, year);

      var today = new Date().getDate() - 1;
      var isToday = isSameMonth(new Date(year, currentMonth, today), new Date()) && today;

      for (var i = 0; i < totalDays; i += 1) {
        var currentDay = i + 1;
        var date = new Date(year, currentMonth, currentDay);

        var _today = isToday === i;

        generatedDays.push({
          name: _this.getState().days[date.getDay()],
          day: currentDay,
          date: date,
          today: _today,
          past: _today ? false : isBefore(date, new Date()),
          events: [],
          weekend: isWeekend(date),
          selected: _this._isDaySelected(date)
        });
      }

      return {
        name: _this.getState().months[currentMonth],
        month: month,
        year: year,
        totalDays: totalDays,
        totalWeeks: _this._getWeeksInAMonth(currentMonth, year).length,
        days: generatedDays
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getNextMonthOffset", function (_ref6) {
      var month = _ref6.month,
          year = _ref6.year,
          totalOffsetDays = _ref6.totalOffsetDays,
          totalDays = _ref6.totalDays;
      var assignDays = [];
      var currentMonth = month;
      var currentYear = year;

      if (currentMonth > 11) {
        // check if next year
        currentMonth = 0;
        currentYear = currentYear + 1;
      }

      var nextMonthOffset = _this.getState().gridBlocks - totalOffsetDays - totalDays;

      for (var i = 0; i < nextMonthOffset; i += 1) {
        var currentDay = i + 1;
        var date = new Date(currentYear, currentMonth, currentDay);
        assignDays.push({
          name: _this.getState().days[date.getDay()],
          day: currentDay,
          date: date,
          offset: true,
          past: isBefore(date, new Date()),
          events: [],
          weekend: isWeekend(date)
        });
      }

      return {
        name: _this.getState().months[currentMonth],
        month: currentMonth + 1,
        year: currentYear,
        totalOffsetDays: assignDays.length,
        days: assignDays
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getFullMonth", function (initMonth, events) {
      var month = initMonth ? initMonth : getMonth(_this.getState().date) + 1;
      var year = getYear(_this.getState().date);

      var firstOffset = _this.getPrevMonthOffset({
        month: month,
        year: year,
        events: events
      });

      var current = _this.getCurrentMonth({
        month: month,
        year: year,
        events: events
      });

      var eventsForMonth = _this._eventsForMonth(month);

      var nextOffset = _this.getNextMonthOffset({
        month: month,
        year: year,
        events: events,
        totalOffsetDays: firstOffset.totalOffsetDays,
        totalDays: current.totalDays
      });

      var result = [].concat(_toConsumableArray(firstOffset.days), _toConsumableArray(current.days), _toConsumableArray(nextOffset.days));

      if (eventsForMonth.length && events) {
        // convert into for of
        result = result.map(function (day) {
          return Object.assign(day, {
            events: _this._initializeEvents(eventsForMonth, day.date)
          });
        });
      }

      return _objectSpread({}, current, {
        days: result
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFullYear", function (events) {
      var months = [];

      for (var i = 0; i < 13; i += 1) {
        months.push(_this.getFullMonth(i, events));
      }

      months.shift();
      return months;
    });

    _defineProperty(_assertThisInitialized(_this), "addCalendarMonth", function () {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref7$type = _ref7.type,
          type = _ref7$type === void 0 ? Organizer.stateChangeTypes.addCalendarMonth : _ref7$type;

      _this.internalSetState(function (state) {
        return {
          type: type,
          date: addMonths(state.date, 1)
        };
      }, function () {
        return _this.props.onAddCalendarMonth(_this.getState().date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectMonth", function (_ref8) {
      var _ref8$type = _ref8.type,
          type = _ref8$type === void 0 ? Organizer.stateChangeTypes.selectMonth : _ref8$type,
          month = _ref8.month;

      _this.internalSetState(function (state) {
        return {
          type: type,
          date: setMonth(state.date, month)
        };
      }, function () {
        return _this.props.onSelectMonth(_this.getState().date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "subCalendarMonth", function () {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref9$type = _ref9.type,
          type = _ref9$type === void 0 ? Organizer.stateChangeTypes.subCalendarMonth : _ref9$type;

      _this.internalSetState(function (state) {
        return {
          type: type,
          date: subMonths(state.date, 1)
        };
      }, function () {
        return _this.props.onSubCalendarMonth(_this.getState().date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addCalendarYear", function () {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref10$type = _ref10.type,
          type = _ref10$type === void 0 ? Organizer.stateChangeTypes.addCalendarYear : _ref10$type;

      _this.internalSetState(function (state) {
        return {
          type: type,
          date: addYears(state.date, 1)
        };
      }, function () {
        return _this.props.onAddCalendarYear(_this.getState().date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectYear", function (_ref11) {
      var _ref11$type = _ref11.type,
          type = _ref11$type === void 0 ? Organizer.stateChangeTypes.selectYear : _ref11$type,
          year = _ref11.year;

      _this.internalSetState(function (state) {
        return {
          type: type,
          date: setYear(state.date, year)
        };
      }, function () {
        return _this.props.onSelectYear(_this.getState().date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "subCalendarYear", function () {
      var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref12$type = _ref12.type,
          type = _ref12$type === void 0 ? Organizer.stateChangeTypes.subCalendarYear : _ref12$type;

      _this.internalSetState(function (state) {
        return {
          type: type,
          date: subYears(state.date, 1)
        };
      }, function () {
        return _this.props.onSubCalendarYear(_this.getState().date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectDate", function (_ref13) {
      var _ref13$type = _ref13.type,
          type = _ref13$type === void 0 ? Organizer.stateChangeTypes.selectDate : _ref13$type,
          date = _ref13.date;

      _this.internalSetState({
        type: type,
        date: date,
        selected: date
      }, function () {
        return _this.props.onSelectDate(_this.getState().selected);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectRange", function (_ref14) {
      var _ref14$type = _ref14.type,
          type = _ref14$type === void 0 ? Organizer.stateChangeTypes.selectRange : _ref14$type,
          date = _ref14.date;

      _this.internalSetState(function (state) {
        var selectionState = {};
        var selected = state.selected;

        if (Array.isArray(selected) && selected.length < 2) {
          // if second date selected is before the first it will become first.
          if (isBefore(date, selected[0])) {
            Object.assign(selectionState, {
              selected: [date]
            });
          } else {
            Object.assign(selectionState, {
              selected: [].concat(_toConsumableArray(selected), [date])
            });
          }
        } else {
          Object.assign(selectionState, {
            selected: [date]
          });
        }

        return Object.assign(selectionState, {
          type: type
        });
      }, function () {
        return _this.props.onSelectRange(_this.getState().selected);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      _this.internalSetState(_objectSpread({}, _this.initialState, {
        type: Organizer.stateChangeTypes.reset
      }), function () {
        return _this.props.onReset(_this.getState().date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "initialState", {
      days: _this.props.initialDays,
      months: _this.props.initialMonths,
      gridBlocks: _this.props.initialGridBlocks,
      date: _this.props.initialDate,
      selected: _this.props.initialSelected,
      // fns
      getPrevMonthOffset: _this.getPrevMonthOffset,
      getNextMonthOffset: _this.getNextMonthOffset,
      getCurrentMonth: _this.getCurrentMonth,
      getFullMonth: _this.getFullMonth,
      getFullYear: _this.getFullYear,
      addCalendarMonth: _this.addCalendarMonth,
      subCalendarMonth: _this.subCalendarMonth,
      addCalendarYear: _this.addCalendarYear,
      subCalendarYear: _this.subCalendarYear,
      selectDate: _this.selectDate,
      selectRange: _this.selectRange,
      reset: _this.reset,
      selectMonth: _this.selectMonth,
      selectYear: _this.selectYear,
      changeLanguage: _this.changeLanguage
    });

    _defineProperty(_assertThisInitialized(_this), "state", _this.initialState);

    _defineProperty(_assertThisInitialized(_this), "internalSetState", function (changes) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var allChanges;

      _this.setState(function (currentState) {
        var combinedState = _this.getState(currentState);

        return [changes].map(function (c) {
          return typeof c === 'function' ? c(currentState) : c;
        }).map(function (c) {
          allChanges = _this.props.stateReducer(combinedState, c) || {};
          return allChanges;
        }).map(function (_ref15) {
          var ignoredType = _ref15.type,
              onlyChanges = _objectWithoutProperties(_ref15, ["type"]);

          return onlyChanges;
        }).map(function (c) {
          return Object.keys(combinedState).reduce(function (newChanges, stateKey) {
            if (!_this.isControlledProp(stateKey)) {
              newChanges[stateKey] = c.hasOwnProperty(stateKey) ? c[stateKey] : combinedState[stateKey];
            }

            return newChanges;
          }, {});
        }).map(function (c) {
          return Object.keys(c || {}).length ? c : null;
        })[0];
      }, function () {
        _this.props.onStateChange(allChanges, _this.state);

        callback();
      });
    });

    return _this;
  }

  _createClass(Organizer, [{
    key: "_getNumberOfDaysInAMonth",
    value: function _getNumberOfDaysInAMonth(month, year) {
      return new Date(year, month + 1, 0).getDate();
    }
  }, {
    key: "isControlledProp",
    value: function isControlledProp(key) {
      return this.props[key] !== undefined;
    }
  }, {
    key: "getState",
    value: function getState() {
      var _this2 = this;

      var stateToMerge = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;
      return Object.keys(stateToMerge).reduce(function (state, key) {
        state[key] = _this2.isControlledProp(key) ? _this2.props[key] : stateToMerge[key];
        return state;
      }, {});
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var ui = typeof children === 'function' ? children(this.state) : children;
      return React.createElement(OrganizerContext.Provider, {
        value: this.state
      }, ui);
    }
  }]);

  return Organizer;
}(React.Component);

_defineProperty(Organizer, "propTypes", {
  children: PropTypes.func,
  initialDays: PropTypes.array,
  initialMonths: PropTypes.array,
  events: PropTypes.arrayOf(PropTypes.shape({
    starts: PropTypes.instanceOf(Date).isRequired
  })),
  initialGridBlocks: PropTypes.number,
  initialDate: PropTypes.instanceOf(Date),
  initialSelected: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.arrayOf(PropTypes.instanceOf(Date))])
});

_defineProperty(Organizer, "defaultProps", {
  stateReducer: function stateReducer(state, changes) {
    return changes;
  },
  onStateChange: function onStateChange() {},
  onReset: function onReset() {},
  onSelectDate: function onSelectDate() {},
  onSelectRange: function onSelectRange() {},
  onAddCalendarYear: function onAddCalendarYear() {},
  onSubCalendarYear: function onSubCalendarYear() {},
  onSubCalendarMonth: function onSubCalendarMonth() {},
  onAddCalendarMonth: function onAddCalendarMonth() {},
  onSelectMonth: function onSelectMonth() {},
  onSelectYear: function onSelectYear() {},
  onChangeLanguage: function onChangeLanguage() {},
  initialDays: days,
  initialMonths: months,
  events: [],
  initialGridBlocks: 42,
  initialDate: new Date(),
  initialSelected: null
});

_defineProperty(Organizer, "stateChangeTypes", {
  reset: '__reset__',
  selectDate: '__select_date__',
  selectRange: '__select_range__',
  addCalendarMonth: '__add_calendar_month__',
  subCalendarMonth: '__subtract_calendar_month__',
  addCalendarYear: '__add_calendar_year__',
  subCalendarYear: '__sub_calendar_year__',
  selectMonth: '__select_month__',
  selectYear: '__select_year__',
  changeLanguage: '__change_language__'
});

_defineProperty(Organizer, "Consumer", OrganizerContext.Consumer);

export function withOrganizer(Component) {
  var Wrapper = React.forwardRef(function (props, ref) {
    return React.createElement(Organizer.Consumer, null, function (browserUtils) {
      return React.createElement(Component, _extends({}, props, {
        organizer: browserUtils,
        ref: ref
      }));
    });
  });
  Wrapper.displayName = "withOrganizer(".concat(Component.displayName || Component.name, ")");
  hoistNonReactStatics(Wrapper, Component);
  return Wrapper;
}