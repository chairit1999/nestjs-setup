import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as utc from 'dayjs/plugin/utc';
import 'dayjs/locale/th';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.locale('th');

export const dayJs = (
  date?: dayjs.ConfigType,
  format?: dayjs.OptionType,
  locale?: string,
  strict?: boolean,
) => {
  return dayjs(date, format, locale, strict).tz('Asia/Bangkok');
};
