# Calendar custom function

This function generates calendar view of given year and month.

## Syntax

**getCalendarView**(*year*, *month*, *startOfWeek*, *onlyBizDay*)

- `year` - Required. Year of calendar.
- `month` - Required. Month of calendar.
- `startOfWeek` - Option. Start of week (Sun:1, Mon:2).
- `onlyBizDay` - Option. If true, drop weekend in calendar.

### Output
Record.

|Path|Type|Description|
|--|--|--|
|getCalendarView().firstDay|Date|First day in calendar view.|
|getCalendarView().lastDay|Date|Last day in calendar view.|
|getCalendarView().dates|Table|List of date in calendar view.|
