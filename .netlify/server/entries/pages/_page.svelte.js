import { c as create_ssr_component, b as add_attribute, e as escape, d as createEventDispatcher, f as each, v as validate_component, a as subscribe, h as add_styles } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index2.js";
const css$2 = {
  code: ".time-picker.svelte-132npca{font-size:1.1em;display:flex;align-items:center;width:-moz-fit-content;width:fit-content;border:1px solid rgba(108, 120, 147, 0.3);border-radius:3px;margin:auto;font-variant-numeric:tabular-nums;margin-top:6px}span.svelte-132npca{-webkit-user-select:all;-moz-user-select:all;user-select:all;outline:none;position:relative;z-index:1;padding:4px 0px}span.svelte-132npca:not(:focus)::-moz-selection{background-color:transparent}span.svelte-132npca:not(:focus)::selection{background-color:transparent}span.svelte-132npca:first-child{padding-left:6px}span.svelte-132npca:last-child{padding-right:6px}",
  map: `{"version":3,"file":"TimePicker.svelte","sources":["TimePicker.svelte"],"sourcesContent":["<script>export let browseDate;\\nexport let timePrecision;\\nexport let setTime;\\nlet fields = [];\\nfunction select(node) {\\n  const selection = window.getSelection();\\n  const range = document.createRange();\\n  range.selectNodeContents(node);\\n  selection?.removeAllRanges();\\n  selection?.addRange(range);\\n}\\nfunction keydown(e) {\\n  if (e.key === \\"ArrowUp\\" || e.key === \\"ArrowDown\\") {\\n    const value = get_value(e.currentTarget);\\n    const delta = e.key === \\"ArrowUp\\" ? 1 : -1;\\n    set_value(e.currentTarget, value + delta, true);\\n    e.preventDefault();\\n    select(e.currentTarget);\\n  } else if (e.key === \\"ArrowLeft\\" || e.key === \\"ArrowRight\\" || \\":;-,.\\".includes(e.key)) {\\n    const field_index = fields.indexOf(e.currentTarget);\\n    const delta = e.key === \\"ArrowLeft\\" ? -1 : 1;\\n    const el = fields[field_index + delta];\\n    e.preventDefault();\\n    if (el) {\\n      el.focus();\\n      select(el);\\n    }\\n  }\\n}\\nfunction get_value(node) {\\n  const label = get_field(node).label;\\n  if (label === \\"Hours\\") {\\n    return browseDate.getHours();\\n  } else if (label === \\"Minutes\\") {\\n    return browseDate.getMinutes();\\n  } else if (label === \\"Seconds\\") {\\n    return browseDate.getSeconds();\\n  } else {\\n    return browseDate.getMilliseconds();\\n  }\\n}\\nfunction clamp(value, max, loop_around) {\\n  if (loop_around && value < 0) {\\n    return max;\\n  } else if (loop_around && value > max) {\\n    return 0;\\n  } else {\\n    return Math.max(0, Math.min(max, value));\\n  }\\n}\\nfunction get_field(element) {\\n  const label = element.getAttribute(\\"aria-label\\");\\n  if (label === \\"Hours\\") {\\n    return { label, len: 2, max: 23 };\\n  } else if (label === \\"Minutes\\") {\\n    return { label, len: 2, max: 59 };\\n  } else if (label === \\"Seconds\\") {\\n    return { label, len: 2, max: 59 };\\n  } else if (label === \\"Milliseconds\\") {\\n    return { label, len: 3, max: 999 };\\n  } else {\\n    throw new Error(\\"Invalid label \\" + label);\\n  }\\n}\\n$:\\n  setText(browseDate);\\nfunction setText(d) {\\n  const hours = (\\"00\\" + d.getHours()).slice(-2);\\n  const minutes = (\\"00\\" + d.getMinutes()).slice(-2);\\n  const seconds = (\\"00\\" + d.getSeconds()).slice(-2);\\n  const milliseconds = (\\"000\\" + d.getMilliseconds()).slice(-3);\\n  if (fields[0] && fields[0].innerText !== hours) {\\n    fields[0].innerText = hours;\\n  }\\n  if (fields[1] && fields[1].innerText !== minutes) {\\n    fields[1].innerText = minutes;\\n  }\\n  if (fields[2] && fields[2].innerText !== seconds) {\\n    fields[2].innerText = seconds;\\n  }\\n  if (fields[3] && fields[3].innerText !== milliseconds) {\\n    fields[3].innerText = milliseconds;\\n  }\\n}\\nfunction set_value(node, value, loop_around = false) {\\n  const field = get_field(node);\\n  value = clamp(value, field.max, loop_around);\\n  if (field.label === \\"Hours\\") {\\n    browseDate.setHours(value);\\n  } else if (field.label === \\"Minutes\\") {\\n    browseDate.setMinutes(value);\\n  } else if (field.label === \\"Seconds\\") {\\n    browseDate.setSeconds(value);\\n  } else if (field.label === \\"Milliseconds\\") {\\n    browseDate.setMilliseconds(value);\\n  }\\n  browseDate = setTime(browseDate);\\n  setText(browseDate);\\n}\\nfunction parse(text, length) {\\n  return parseInt(text.replace(/[^\\\\d]/g, \\"\\").slice(-length));\\n}\\nfunction input(e_unknown) {\\n  const e = e_unknown;\\n  const field = get_field(e.currentTarget);\\n  let new_value;\\n  if (e.inputType === \\"insertText\\") {\\n    const original_text = \\"000\\" + get_value(e.currentTarget);\\n    new_value = parse(original_text + e.currentTarget.innerText, field.len);\\n    if (new_value > field.max && e.data) {\\n      new_value = parse(e.data, field.len);\\n    }\\n  } else {\\n    new_value = parse(\\"000\\" + e.currentTarget.innerText, field.len);\\n  }\\n  set_value(e.currentTarget, new_value);\\n  select(e.currentTarget);\\n}\\nfunction focus(e) {\\n  select(e.currentTarget);\\n}\\n<\/script>\\n\\n{#if timePrecision}\\n\\t<div\\n\\t\\tclass=\\"time-picker\\"\\n\\t\\trole=\\"none\\"\\n\\t\\ton:mousedown={(e) => {\\n\\t\\t\\tif (e.target instanceof HTMLElement && e.target.tagName === 'SPAN') {\\n\\t\\t\\t\\te.target.focus()\\n\\t\\t\\t\\te.preventDefault() // prevent text dragging\\n\\t\\t\\t}\\n\\t\\t}}\\n\\t>\\n\\t\\t<span\\n\\t\\t\\tbind:this={fields[0]}\\n\\t\\t\\trole=\\"spinbutton\\"\\n\\t\\t\\taria-label=\\"Hours\\"\\n\\t\\t\\ttabindex=\\"0\\"\\n\\t\\t\\tcontenteditable\\n\\t\\t\\tinputmode=\\"numeric\\"\\n\\t\\t\\ton:keydown={keydown}\\n\\t\\t\\ton:input={input}\\n\\t\\t\\ton:focus={focus}>{('00' + browseDate.getHours()).slice(-2)}</span\\n\\t\\t>:\\n\\t\\t<span\\n\\t\\t\\tbind:this={fields[1]}\\n\\t\\t\\trole=\\"spinbutton\\"\\n\\t\\t\\taria-label=\\"Minutes\\"\\n\\t\\t\\ttabindex=\\"0\\"\\n\\t\\t\\tcontenteditable\\n\\t\\t\\tinputmode=\\"numeric\\"\\n\\t\\t\\ton:keydown={keydown}\\n\\t\\t\\ton:input={input}\\n\\t\\t\\ton:focus={focus}>{('00' + browseDate.getMinutes()).slice(-2)}</span\\n\\t\\t>\\n\\t\\t{#if timePrecision !== 'minute'}\\n\\t\\t\\t:<span\\n\\t\\t\\t\\tbind:this={fields[2]}\\n\\t\\t\\t\\trole=\\"spinbutton\\"\\n\\t\\t\\t\\taria-label=\\"Seconds\\"\\n\\t\\t\\t\\ttabindex=\\"0\\"\\n\\t\\t\\t\\tcontenteditable\\n\\t\\t\\t\\tinputmode=\\"numeric\\"\\n\\t\\t\\t\\ton:keydown={keydown}\\n\\t\\t\\t\\ton:input={input}\\n\\t\\t\\t\\ton:focus={focus}>{('00' + browseDate.getSeconds()).slice(-2)}</span\\n\\t\\t\\t>\\n\\t\\t\\t{#if timePrecision !== 'second'}\\n\\t\\t\\t\\t.<span\\n\\t\\t\\t\\t\\tbind:this={fields[3]}\\n\\t\\t\\t\\t\\trole=\\"spinbutton\\"\\n\\t\\t\\t\\t\\taria-label=\\"Milliseconds\\"\\n\\t\\t\\t\\t\\ttabindex=\\"0\\"\\n\\t\\t\\t\\t\\tcontenteditable\\n\\t\\t\\t\\t\\tinputmode=\\"numeric\\"\\n\\t\\t\\t\\t\\ton:keydown={keydown}\\n\\t\\t\\t\\t\\ton:input={input}\\n\\t\\t\\t\\t\\ton:focus={focus}>{('000' + browseDate.getMilliseconds()).slice(-3)}</span\\n\\t\\t\\t\\t>\\n\\t\\t\\t{/if}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>.time-picker {\\n  font-size: 1.1em;\\n  display: flex;\\n  align-items: center;\\n  width: -moz-fit-content;\\n  width: fit-content;\\n  border: 1px solid rgba(108, 120, 147, 0.3);\\n  border-radius: 3px;\\n  margin: auto;\\n  font-variant-numeric: tabular-nums;\\n  margin-top: 6px;\\n}\\n\\nspan {\\n  -webkit-user-select: all;\\n     -moz-user-select: all;\\n          user-select: all;\\n  outline: none;\\n  position: relative;\\n  z-index: 1;\\n  padding: 4px 0px;\\n}\\nspan:not(:focus)::-moz-selection {\\n  background-color: transparent;\\n}\\nspan:not(:focus)::selection {\\n  background-color: transparent;\\n}\\nspan:first-child {\\n  padding-left: 6px;\\n}\\nspan:last-child {\\n  padding-right: 6px;\\n}</style>\\n"],"names":[],"mappings":"AAyLO,2BAAa,CAClB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,gBAAgB,CACvB,KAAK,CAAE,WAAW,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,oBAAoB,CAAE,YAAY,CAClC,UAAU,CAAE,GACd,CAEA,mBAAK,CACH,mBAAmB,CAAE,GAAG,CACrB,gBAAgB,CAAE,GAAG,CAChB,WAAW,CAAE,GAAG,CACxB,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,GAAG,CAAC,GACf,CACA,mBAAI,KAAK,MAAM,CAAC,gBAAiB,CAC/B,gBAAgB,CAAE,WACpB,CACA,mBAAI,KAAK,MAAM,CAAC,WAAY,CAC1B,gBAAgB,CAAE,WACpB,CACA,mBAAI,YAAa,CACf,YAAY,CAAE,GAChB,CACA,mBAAI,WAAY,CACd,aAAa,CAAE,GACjB"}`
};
const TimePicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { browseDate } = $$props;
  let { timePrecision } = $$props;
  let { setTime } = $$props;
  let fields = [];
  function setText(d) {
    ("00" + d.getHours()).slice(-2);
    ("00" + d.getMinutes()).slice(-2);
    ("00" + d.getSeconds()).slice(-2);
    ("000" + d.getMilliseconds()).slice(-3);
  }
  if ($$props.browseDate === void 0 && $$bindings.browseDate && browseDate !== void 0)
    $$bindings.browseDate(browseDate);
  if ($$props.timePrecision === void 0 && $$bindings.timePrecision && timePrecision !== void 0)
    $$bindings.timePrecision(timePrecision);
  if ($$props.setTime === void 0 && $$bindings.setTime && setTime !== void 0)
    $$bindings.setTime(setTime);
  $$result.css.add(css$2);
  {
    setText(browseDate);
  }
  return `${timePrecision ? `<div class="time-picker svelte-132npca" role="none"><span role="spinbutton" aria-label="Hours" tabindex="0" contenteditable inputmode="numeric" class="svelte-132npca"${add_attribute("this", fields[0], 0)}>${escape(("00" + browseDate.getHours()).slice(-2))}</span>:
		<span role="spinbutton" aria-label="Minutes" tabindex="0" contenteditable inputmode="numeric" class="svelte-132npca"${add_attribute("this", fields[1], 0)}>${escape(("00" + browseDate.getMinutes()).slice(-2))}</span> ${timePrecision !== "minute" ? `:<span role="spinbutton" aria-label="Seconds" tabindex="0" contenteditable inputmode="numeric" class="svelte-132npca"${add_attribute("this", fields[2], 0)}>${escape(("00" + browseDate.getSeconds()).slice(-2))}</span> ${timePrecision !== "second" ? `.<span role="spinbutton" aria-label="Milliseconds" tabindex="0" contenteditable inputmode="numeric" class="svelte-132npca"${add_attribute("this", fields[3], 0)}>${escape(("000" + browseDate.getMilliseconds()).slice(-3))}</span>` : ``}` : ``}</div>` : ``}`;
});
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function getMonthLength(year, month) {
  const feb = isLeapYear(year) ? 29 : 28;
  const monthLengths = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return monthLengths[month];
}
function toText(date, formatTokens) {
  let text = "";
  if (date) {
    for (const token of formatTokens) {
      if (typeof token === "string") {
        text += token;
      } else {
        text += token.toString(date);
      }
    }
  }
  return text;
}
function getMonthDays(year, month) {
  const monthLength = getMonthLength(year, month);
  const days = [];
  for (let i = 0; i < monthLength; i++) {
    days.push({
      year,
      month,
      number: i + 1
    });
  }
  return days;
}
function getCalendarDays(value, weekStartsOn) {
  const year = value.getFullYear();
  const month = value.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  let days = [];
  const daysBefore = (firstWeekday - weekStartsOn + 7) % 7;
  if (daysBefore > 0) {
    let lastMonth = month - 1;
    let lastMonthYear = year;
    if (lastMonth === -1) {
      lastMonth = 11;
      lastMonthYear = year - 1;
    }
    days = getMonthDays(lastMonthYear, lastMonth).slice(-daysBefore);
  }
  days = days.concat(getMonthDays(year, month));
  let nextMonth = month + 1;
  let nextMonthYear = year;
  if (nextMonth === 12) {
    nextMonth = 0;
    nextMonthYear = year + 1;
  }
  const daysAfter = 42 - days.length;
  days = days.concat(getMonthDays(nextMonthYear, nextMonth).slice(0, daysAfter));
  return days;
}
function getLocaleDefaults() {
  return {
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    weekStartsOn: 1
  };
}
function getInnerLocale(locale = {}) {
  const innerLocale = getLocaleDefaults();
  if (typeof locale.weekStartsOn === "number") {
    innerLocale.weekStartsOn = locale.weekStartsOn;
  }
  if (locale.months)
    innerLocale.months = locale.months;
  if (locale.weekdays)
    innerLocale.weekdays = locale.weekdays;
  return innerLocale;
}
const css$1 = {
  code: ".date-time-picker.svelte-go79cf.svelte-go79cf{display:inline-block;color:var(--date-picker-foreground, #000000);background:var(--date-picker-background, #ffffff);-moz-user-select:none;user-select:none;-webkit-user-select:none;padding:0.5rem;cursor:default;font-size:0.75rem;border:1px solid rgba(103, 113, 137, 0.3);border-radius:3px;box-shadow:0px 2px 6px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.11);outline:none;transition:all 80ms cubic-bezier(0.4, 0, 0.2, 1)}.date-time-picker.svelte-go79cf.svelte-go79cf:focus{border-color:var(--date-picker-highlight-border, #0269f7);box-shadow:0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4))}.tab-container.svelte-go79cf.svelte-go79cf{outline:none}.top.svelte-go79cf.svelte-go79cf{display:flex;justify-content:center;align-items:center;padding-bottom:0.5rem}.dropdown.svelte-go79cf.svelte-go79cf{margin-left:0.25rem;margin-right:0.25rem;position:relative;display:flex}.dropdown.svelte-go79cf svg.svelte-go79cf{position:absolute;right:0px;top:0px;height:100%;width:8px;padding:0rem 0.5rem;pointer-events:none;box-sizing:content-box}.month.svelte-go79cf.svelte-go79cf{flex-grow:1}.year.svelte-go79cf.svelte-go79cf{flex-grow:1}svg.svelte-go79cf.svelte-go79cf{display:block;fill:var(--date-picker-foreground, #000000);opacity:0.75;outline:none}.page-button.svelte-go79cf.svelte-go79cf{background-color:transparent;width:1.5rem;height:1.5rem;flex-shrink:0;border-radius:5px;box-sizing:border-box;border:1px solid transparent;display:flex;align-items:center;justify-content:center}.page-button.svelte-go79cf.svelte-go79cf:hover{background-color:rgba(128, 128, 128, 0.08);border:1px solid rgba(128, 128, 128, 0.08)}.page-button.svelte-go79cf svg.svelte-go79cf{width:0.68rem;height:0.68rem}select.dummy-select.svelte-go79cf.svelte-go79cf{position:absolute;width:100%;pointer-events:none;outline:none;color:var(--date-picker-foreground, #000000);background-color:var(--date-picker-background, #ffffff);border-radius:3px}select.svelte-go79cf:focus+select.dummy-select.svelte-go79cf{border-color:var(--date-picker-highlight-border, #0269f7);box-shadow:0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4))}select.svelte-go79cf.svelte-go79cf:not(.dummy-select){opacity:0}select.svelte-go79cf.svelte-go79cf{font-size:inherit;font-family:inherit;-webkit-appearance:none;-moz-appearance:none;appearance:none;flex-grow:1;padding:0rem 0.35rem;height:1.5rem;padding-right:1.3rem;margin:0px;border:1px solid rgba(108, 120, 147, 0.3);outline:none;transition:all 80ms cubic-bezier(0.4, 0, 0.2, 1);background-image:none}.header.svelte-go79cf.svelte-go79cf{display:flex;font-weight:600;padding-bottom:2px}.header-cell.svelte-go79cf.svelte-go79cf{width:1.875rem;text-align:center;flex-grow:1}.week.svelte-go79cf.svelte-go79cf{display:flex}.cell.svelte-go79cf.svelte-go79cf{display:flex;align-items:center;justify-content:center;width:2rem;height:1.94rem;flex-grow:1;border-radius:5px;box-sizing:border-box;border:2px solid transparent}.cell.svelte-go79cf.svelte-go79cf:hover{border:1px solid rgba(128, 128, 128, 0.08)}.cell.today.svelte-go79cf.svelte-go79cf{font-weight:600;border:2px solid var(--date-picker-today-border, rgba(128, 128, 128, 0.3))}.cell.svelte-go79cf.svelte-go79cf:hover{background-color:rgba(128, 128, 128, 0.08)}.cell.disabled.svelte-go79cf.svelte-go79cf{visibility:hidden}.cell.disabled.svelte-go79cf.svelte-go79cf:hover{border:none;background-color:transparent}.cell.other-month.svelte-go79cf span.svelte-go79cf{opacity:0.4}.cell.selected.svelte-go79cf.svelte-go79cf{color:var(--date-picker-selected-color, inherit);background:var(--date-picker-selected-background, rgba(2, 105, 247, 0.2));border:2px solid var(--date-picker-highlight-border, #0269f7)}",
  map: '{"version":3,"file":"DatePicker.svelte","sources":["DatePicker.svelte"],"sourcesContent":["<script>import TimePicker from \\"./TimePicker.svelte\\";\\nimport { getMonthLength, getCalendarDays } from \\"./date-utils.js\\";\\nimport { getInnerLocale } from \\"./locale.js\\";\\nimport { createEventDispatcher } from \\"svelte\\";\\nconst dispatch = createEventDispatcher();\\nfunction cloneDate(d) {\\n  return new Date(d.getTime());\\n}\\nexport let value = null;\\nfunction setValue(d) {\\n  if (d.getTime() !== value?.getTime()) {\\n    browseDate = clamp(d, min, max);\\n    value = cloneDate(browseDate);\\n  }\\n}\\nfunction setValueDate(d) {\\n  if (d.getTime() !== value?.getTime()) {\\n    browseDate = clampDate(d, min, max);\\n    value = cloneDate(browseDate);\\n  }\\n}\\nfunction browse(d) {\\n  browseDate = clampDate(d, min, max);\\n  if (!browseWithoutSelecting && value) {\\n    setValue(browseDate);\\n  }\\n}\\nfunction setTime(d) {\\n  browseDate = clamp(d, min, max);\\n  if (value) {\\n    setValue(browseDate);\\n  }\\n  return browseDate;\\n}\\nconst todayDate = /* @__PURE__ */ new Date();\\nconst defaultDate = /* @__PURE__ */ new Date();\\nexport let timePrecision = null;\\nexport let min = new Date(defaultDate.getFullYear() - 20, 0, 1);\\nexport let max = new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999);\\n$:\\n  if (value && value > max) {\\n    setValue(max);\\n  } else if (value && value < min) {\\n    setValue(min);\\n  }\\nfunction clamp(d, min2, max2) {\\n  if (d > max2) {\\n    return cloneDate(max2);\\n  } else if (d < min2) {\\n    return cloneDate(min2);\\n  } else {\\n    return cloneDate(d);\\n  }\\n}\\nfunction clampDate(d, min2, max2) {\\n  const limit = clamp(d, min2, max2);\\n  if (limit.getTime() !== d.getTime()) {\\n    d = new Date(\\n      limit.getFullYear(),\\n      limit.getMonth(),\\n      limit.getDate(),\\n      d.getHours(),\\n      d.getMinutes(),\\n      d.getSeconds(),\\n      d.getMilliseconds()\\n    );\\n    d = clamp(d, min2, max2);\\n  }\\n  return d;\\n}\\nlet browseDate = value ? cloneDate(value) : cloneDate(clampDate(defaultDate, min, max));\\n$:\\n  setBrowseDate(value);\\nfunction setBrowseDate(value2) {\\n  if (browseDate.getTime() !== value2?.getTime()) {\\n    browseDate = value2 ? cloneDate(value2) : browseDate;\\n  }\\n}\\nlet years = getYears(min, max);\\n$:\\n  years = getYears(min, max);\\nfunction getYears(min2, max2) {\\n  let years2 = [];\\n  for (let i = min2.getFullYear(); i <= max2.getFullYear(); i++) {\\n    years2.push(i);\\n  }\\n  return years2;\\n}\\nexport let locale = {};\\n$:\\n  iLocale = getInnerLocale(locale);\\nexport let browseWithoutSelecting = false;\\n$:\\n  browseYear = browseDate.getFullYear();\\nfunction setYear(newYear) {\\n  browseDate.setFullYear(newYear);\\n  browse(browseDate);\\n}\\n$:\\n  browseMonth = browseDate.getMonth();\\nfunction setMonth(newMonth) {\\n  let newYear = browseDate.getFullYear();\\n  if (newMonth === 12) {\\n    newMonth = 0;\\n    newYear++;\\n  } else if (newMonth === -1) {\\n    newMonth = 11;\\n    newYear--;\\n  }\\n  const maxDate = getMonthLength(newYear, newMonth);\\n  const newDate = Math.min(browseDate.getDate(), maxDate);\\n  browse(\\n    new Date(\\n      newYear,\\n      newMonth,\\n      newDate,\\n      browseDate.getHours(),\\n      browseDate.getMinutes(),\\n      browseDate.getSeconds(),\\n      browseDate.getMilliseconds()\\n    )\\n  );\\n}\\n$:\\n  calendarDays = getCalendarDays(browseDate, iLocale.weekStartsOn);\\nfunction selectDay(calendarDay) {\\n  if (dayIsInRange(calendarDay, min, max)) {\\n    browseDate.setFullYear(0);\\n    browseDate.setMonth(0);\\n    browseDate.setDate(1);\\n    browseDate.setFullYear(calendarDay.year);\\n    browseDate.setMonth(calendarDay.month);\\n    browseDate.setDate(calendarDay.number);\\n    setValueDate(browseDate);\\n    dispatch(\\"select\\", cloneDate(browseDate));\\n  }\\n}\\nfunction dayIsInRange(calendarDay, min2, max2) {\\n  const date = new Date(calendarDay.year, calendarDay.month, calendarDay.number);\\n  const minDate = new Date(min2.getFullYear(), min2.getMonth(), min2.getDate());\\n  const maxDate = new Date(max2.getFullYear(), max2.getMonth(), max2.getDate());\\n  return date >= minDate && date <= maxDate;\\n}\\nfunction shiftKeydown(e) {\\n  if (e.shiftKey && e.key === \\"ArrowUp\\") {\\n    setYear(browseDate.getFullYear() - 1);\\n  } else if (e.shiftKey && e.key === \\"ArrowDown\\") {\\n    setYear(browseDate.getFullYear() + 1);\\n  } else if (e.shiftKey && e.key === \\"ArrowLeft\\") {\\n    setMonth(browseDate.getMonth() - 1);\\n  } else if (e.shiftKey && e.key === \\"ArrowRight\\") {\\n    setMonth(browseDate.getMonth() + 1);\\n  } else {\\n    return false;\\n  }\\n  e.preventDefault();\\n  return true;\\n}\\nfunction yearKeydown(e) {\\n  let shift = e.shiftKey || e.altKey;\\n  if (shift) {\\n    shiftKeydown(e);\\n    return;\\n  } else if (e.key === \\"ArrowUp\\") {\\n    setYear(browseDate.getFullYear() - 1);\\n  } else if (e.key === \\"ArrowDown\\") {\\n    setYear(browseDate.getFullYear() + 1);\\n  } else if (e.key === \\"ArrowLeft\\") {\\n    setMonth(browseDate.getMonth() - 1);\\n  } else if (e.key === \\"ArrowRight\\") {\\n    setMonth(browseDate.getMonth() + 1);\\n  } else {\\n    shiftKeydown(e);\\n    return;\\n  }\\n  e.preventDefault();\\n}\\nfunction monthKeydown(e) {\\n  let shift = e.shiftKey || e.altKey;\\n  if (shift) {\\n    shiftKeydown(e);\\n    return;\\n  } else if (e.key === \\"ArrowUp\\" || e.key === \\"ArrowLeft\\") {\\n    setMonth(browseDate.getMonth() - 1);\\n  } else if (e.key === \\"ArrowDown\\" || e.key === \\"ArrowRight\\") {\\n    setMonth(browseDate.getMonth() + 1);\\n  } else {\\n    shiftKeydown(e);\\n    return;\\n  }\\n  e.preventDefault();\\n}\\nfunction keydown(e) {\\n  let shift = e.shiftKey || e.altKey;\\n  if (e.target?.tagName === \\"SELECT\\" || e.target?.tagName === \\"SPAN\\") {\\n    return;\\n  }\\n  if (shift) {\\n    shiftKeydown(e);\\n    return;\\n  } else if (e.key === \\"ArrowUp\\") {\\n    browseDate.setDate(browseDate.getDate() - 7);\\n    setValueDate(browseDate);\\n  } else if (e.key === \\"ArrowDown\\") {\\n    browseDate.setDate(browseDate.getDate() + 7);\\n    setValueDate(browseDate);\\n  } else if (e.key === \\"ArrowLeft\\") {\\n    browseDate.setDate(browseDate.getDate() - 1);\\n    setValueDate(browseDate);\\n  } else if (e.key === \\"ArrowRight\\") {\\n    browseDate.setDate(browseDate.getDate() + 1);\\n    setValueDate(browseDate);\\n  } else if (e.key === \\"Enter\\") {\\n    setValue(browseDate);\\n    dispatch(\\"select\\", cloneDate(browseDate));\\n  } else {\\n    return;\\n  }\\n  e.preventDefault();\\n}\\n<\/script>\\n\\n<!-- svelte-ignore a11y-no-noninteractive-tabindex -->\\n<!-- svelte-ignore a11y-no-static-element-interactions -->\\n<div class=\\"date-time-picker\\" on:focusout tabindex=\\"0\\" on:keydown={keydown}>\\n\\t<div class=\\"tab-container\\" tabindex=\\"-1\\">\\n\\t\\t<div class=\\"top\\">\\n\\t\\t\\t<button\\n\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\tclass=\\"page-button\\"\\n\\t\\t\\t\\ttabindex=\\"-1\\"\\n\\t\\t\\t\\ton:click={() => setMonth(browseDate.getMonth() - 1)}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t><path\\n\\t\\t\\t\\t\\t\\td=\\"M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z\\"\\n\\t\\t\\t\\t\\t\\ttransform=\\"rotate(180, 12, 12)\\"\\n\\t\\t\\t\\t\\t/></svg\\n\\t\\t\\t\\t>\\n\\t\\t\\t</button>\\n\\t\\t\\t<div class=\\"dropdown month\\">\\n\\t\\t\\t\\t<select\\n\\t\\t\\t\\t\\tvalue={browseMonth}\\n\\t\\t\\t\\t\\ton:keydown={monthKeydown}\\n\\t\\t\\t\\t\\ton:input={(e) => setMonth(parseInt(e.currentTarget.value))}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t{#each iLocale.months as monthName, i}\\n\\t\\t\\t\\t\\t\\t<option\\n\\t\\t\\t\\t\\t\\t\\tdisabled={new Date(browseYear, i, getMonthLength(browseYear, i), 23, 59, 59, 999) <\\n\\t\\t\\t\\t\\t\\t\\t\\tmin || new Date(browseYear, i) > max}\\n\\t\\t\\t\\t\\t\\t\\tvalue={i}>{monthName}</option\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</select>\\n\\t\\t\\t\\t<!--\\n\\t\\t\\t\\t\\tHere we have use `select.dummy-select` for showing just the <select> button. This\\n\\t\\t\\t\\t\\tis to style the <select> button without affecting the menu popup\\n\\t\\t\\t\\t\\t- `option { color: initial }` causes invisible menu in dark mode on Firefox\\n\\t\\t\\t\\t\\t- `option { color: initial; background-color: initial }` causes invisible menu in Chrome\\n\\t\\t\\t\\t\\t- `select { background-color: $bg; color: $text }` causes white scrollbar in dark mode on Firefox\\n\\t\\t\\t\\t-->\\n\\t\\t\\t\\t<select class=\\"dummy-select\\" tabindex=\\"-1\\">\\n\\t\\t\\t\\t\\t{#each iLocale.months as monthName, i}\\n\\t\\t\\t\\t\\t\\t<option value={i} selected={i === browseMonth}>{monthName}</option>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</select>\\n\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t><path d=\\"M6 0l12 12-12 12z\\" transform=\\"rotate(90, 12, 12)\\" /></svg\\n\\t\\t\\t\\t>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"dropdown year\\">\\n\\t\\t\\t\\t<select\\n\\t\\t\\t\\t\\tvalue={browseYear}\\n\\t\\t\\t\\t\\ton:input={(e) => setYear(parseInt(e.currentTarget.value))}\\n\\t\\t\\t\\t\\ton:keydown={yearKeydown}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t{#each years as v}\\n\\t\\t\\t\\t\\t\\t<option value={v}>{v}</option>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</select>\\n\\t\\t\\t\\t<!-- style <select> button without affecting menu popup -->\\n\\t\\t\\t\\t<select class=\\"dummy-select\\" tabindex=\\"-1\\">\\n\\t\\t\\t\\t\\t{#each years as v}\\n\\t\\t\\t\\t\\t\\t<option value={v} selected={v === browseDate.getFullYear()}>{v}</option>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</select>\\n\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t><path d=\\"M6 0l12 12-12 12z\\" transform=\\"rotate(90, 12, 12)\\" /></svg\\n\\t\\t\\t\\t>\\n\\t\\t\\t</div>\\n\\t\\t\\t<button\\n\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\tclass=\\"page-button\\"\\n\\t\\t\\t\\ttabindex=\\"-1\\"\\n\\t\\t\\t\\ton:click={() => setMonth(browseDate.getMonth() + 1)}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t><path d=\\"M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z\\" /></svg\\n\\t\\t\\t\\t>\\n\\t\\t\\t</button>\\n\\t\\t</div>\\n\\t\\t<div class=\\"header\\">\\n\\t\\t\\t<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->\\n\\t\\t\\t{#each Array(7) as _, i}\\n\\t\\t\\t\\t{#if i + iLocale.weekStartsOn < 7}\\n\\t\\t\\t\\t\\t<div class=\\"header-cell\\">{iLocale.weekdays[iLocale.weekStartsOn + i]}</div>\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<div class=\\"header-cell\\">{iLocale.weekdays[iLocale.weekStartsOn + i - 7]}</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t\\t<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->\\n\\t\\t{#each Array(6) as _, weekIndex}\\n\\t\\t\\t<div class=\\"week\\">\\n\\t\\t\\t\\t{#each calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7) as calendarDay}\\n\\t\\t\\t\\t\\t<!-- svelte-ignore a11y-click-events-have-key-events -->\\n\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\tclass=\\"cell\\"\\n\\t\\t\\t\\t\\t\\ton:click={() => selectDay(calendarDay)}\\n\\t\\t\\t\\t\\t\\tclass:disabled={!dayIsInRange(calendarDay, min, max)}\\n\\t\\t\\t\\t\\t\\tclass:selected={value &&\\n\\t\\t\\t\\t\\t\\t\\tcalendarDay.year === value.getFullYear() &&\\n\\t\\t\\t\\t\\t\\t\\tcalendarDay.month === value.getMonth() &&\\n\\t\\t\\t\\t\\t\\t\\tcalendarDay.number === value.getDate()}\\n\\t\\t\\t\\t\\t\\tclass:today={calendarDay.year === todayDate.getFullYear() &&\\n\\t\\t\\t\\t\\t\\t\\tcalendarDay.month === todayDate.getMonth() &&\\n\\t\\t\\t\\t\\t\\t\\tcalendarDay.number === todayDate.getDate()}\\n\\t\\t\\t\\t\\t\\tclass:other-month={calendarDay.month !== browseMonth}\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<span>{calendarDay.number}</span>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</div>\\n\\t\\t{/each}\\n\\n\\t\\t<TimePicker {timePrecision} bind:browseDate {setTime} />\\n\\n\\t\\t<slot />\\n\\t</div>\\n</div>\\n\\n<style>.date-time-picker {\\n  display: inline-block;\\n  color: var(--date-picker-foreground, #000000);\\n  background: var(--date-picker-background, #ffffff);\\n  -moz-user-select: none;\\n       user-select: none;\\n  -webkit-user-select: none;\\n  padding: 0.5rem;\\n  cursor: default;\\n  font-size: 0.75rem;\\n  border: 1px solid rgba(103, 113, 137, 0.3);\\n  border-radius: 3px;\\n  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.11);\\n  outline: none;\\n  transition: all 80ms cubic-bezier(0.4, 0, 0.2, 1);\\n}\\n.date-time-picker:focus {\\n  border-color: var(--date-picker-highlight-border, #0269f7);\\n  box-shadow: 0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4));\\n}\\n\\n.tab-container {\\n  outline: none;\\n}\\n\\n.top {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  padding-bottom: 0.5rem;\\n}\\n\\n.dropdown {\\n  margin-left: 0.25rem;\\n  margin-right: 0.25rem;\\n  position: relative;\\n  display: flex;\\n}\\n.dropdown svg {\\n  position: absolute;\\n  right: 0px;\\n  top: 0px;\\n  height: 100%;\\n  width: 8px;\\n  padding: 0rem 0.5rem;\\n  pointer-events: none;\\n  box-sizing: content-box;\\n}\\n\\n.month {\\n  flex-grow: 1;\\n}\\n\\n.year {\\n  flex-grow: 1;\\n}\\n\\nsvg {\\n  display: block;\\n  fill: var(--date-picker-foreground, #000000);\\n  opacity: 0.75;\\n  outline: none;\\n}\\n\\n.page-button {\\n  background-color: transparent;\\n  width: 1.5rem;\\n  height: 1.5rem;\\n  flex-shrink: 0;\\n  border-radius: 5px;\\n  box-sizing: border-box;\\n  border: 1px solid transparent;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n}\\n.page-button:hover {\\n  background-color: rgba(128, 128, 128, 0.08);\\n  border: 1px solid rgba(128, 128, 128, 0.08);\\n}\\n.page-button svg {\\n  width: 0.68rem;\\n  height: 0.68rem;\\n}\\n\\nselect.dummy-select {\\n  position: absolute;\\n  width: 100%;\\n  pointer-events: none;\\n  outline: none;\\n  color: var(--date-picker-foreground, #000000);\\n  background-color: var(--date-picker-background, #ffffff);\\n  border-radius: 3px;\\n}\\n\\nselect:focus + select.dummy-select {\\n  border-color: var(--date-picker-highlight-border, #0269f7);\\n  box-shadow: 0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4));\\n}\\n\\nselect:not(.dummy-select) {\\n  opacity: 0;\\n}\\n\\nselect {\\n  font-size: inherit;\\n  font-family: inherit;\\n  -webkit-appearance: none;\\n  -moz-appearance: none;\\n  appearance: none;\\n  flex-grow: 1;\\n  padding: 0rem 0.35rem;\\n  height: 1.5rem;\\n  padding-right: 1.3rem;\\n  margin: 0px;\\n  border: 1px solid rgba(108, 120, 147, 0.3);\\n  outline: none;\\n  transition: all 80ms cubic-bezier(0.4, 0, 0.2, 1);\\n  background-image: none;\\n}\\n\\n.header {\\n  display: flex;\\n  font-weight: 600;\\n  padding-bottom: 2px;\\n}\\n\\n.header-cell {\\n  width: 1.875rem;\\n  text-align: center;\\n  flex-grow: 1;\\n}\\n\\n.week {\\n  display: flex;\\n}\\n\\n.cell {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  width: 2rem;\\n  height: 1.94rem;\\n  flex-grow: 1;\\n  border-radius: 5px;\\n  box-sizing: border-box;\\n  border: 2px solid transparent;\\n}\\n.cell:hover {\\n  border: 1px solid rgba(128, 128, 128, 0.08);\\n}\\n.cell.today {\\n  font-weight: 600;\\n  border: 2px solid var(--date-picker-today-border, rgba(128, 128, 128, 0.3));\\n}\\n.cell:hover {\\n  background-color: rgba(128, 128, 128, 0.08);\\n}\\n.cell.disabled {\\n  visibility: hidden;\\n}\\n.cell.disabled:hover {\\n  border: none;\\n  background-color: transparent;\\n}\\n.cell.other-month span {\\n  opacity: 0.4;\\n}\\n.cell.selected {\\n  color: var(--date-picker-selected-color, inherit);\\n  background: var(--date-picker-selected-background, rgba(2, 105, 247, 0.2));\\n  border: 2px solid var(--date-picker-highlight-border, #0269f7);\\n}</style>\\n"],"names":[],"mappings":"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"}'
};
function cloneDate(d) {
  return new Date(d.getTime());
}
function clamp(d, min2, max2) {
  if (d > max2) {
    return cloneDate(max2);
  } else if (d < min2) {
    return cloneDate(min2);
  } else {
    return cloneDate(d);
  }
}
function clampDate(d, min2, max2) {
  const limit = clamp(d, min2, max2);
  if (limit.getTime() !== d.getTime()) {
    d = new Date(limit.getFullYear(), limit.getMonth(), limit.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
    d = clamp(d, min2, max2);
  }
  return d;
}
function getYears(min2, max2) {
  let years2 = [];
  for (let i = min2.getFullYear(); i <= max2.getFullYear(); i++) {
    years2.push(i);
  }
  return years2;
}
function dayIsInRange(calendarDay, min2, max2) {
  const date = new Date(calendarDay.year, calendarDay.month, calendarDay.number);
  const minDate = new Date(min2.getFullYear(), min2.getMonth(), min2.getDate());
  const maxDate = new Date(max2.getFullYear(), max2.getMonth(), max2.getDate());
  return date >= minDate && date <= maxDate;
}
const DatePicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let iLocale;
  let browseYear;
  let browseMonth;
  let calendarDays;
  createEventDispatcher();
  let { value = null } = $$props;
  function setValue(d) {
    if (d.getTime() !== value?.getTime()) {
      browseDate = clamp(d, min, max);
      value = cloneDate(browseDate);
    }
  }
  function setTime(d) {
    browseDate = clamp(d, min, max);
    if (value) {
      setValue(browseDate);
    }
    return browseDate;
  }
  const todayDate = /* @__PURE__ */ new Date();
  const defaultDate = /* @__PURE__ */ new Date();
  let { timePrecision = null } = $$props;
  let { min = new Date(defaultDate.getFullYear() - 20, 0, 1) } = $$props;
  let { max = new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999) } = $$props;
  let browseDate = value ? cloneDate(value) : cloneDate(clampDate(defaultDate, min, max));
  function setBrowseDate(value2) {
    if (browseDate.getTime() !== value2?.getTime()) {
      browseDate = value2 ? cloneDate(value2) : browseDate;
    }
  }
  let years = getYears(min, max);
  let { locale = {} } = $$props;
  let { browseWithoutSelecting = false } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.timePrecision === void 0 && $$bindings.timePrecision && timePrecision !== void 0)
    $$bindings.timePrecision(timePrecision);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.browseWithoutSelecting === void 0 && $$bindings.browseWithoutSelecting && browseWithoutSelecting !== void 0)
    $$bindings.browseWithoutSelecting(browseWithoutSelecting);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (value && value > max) {
        setValue(max);
      } else if (value && value < min) {
        setValue(min);
      }
    }
    {
      setBrowseDate(value);
    }
    years = getYears(min, max);
    iLocale = getInnerLocale(locale);
    browseYear = browseDate.getFullYear();
    browseMonth = browseDate.getMonth();
    calendarDays = getCalendarDays(browseDate, iLocale.weekStartsOn);
    $$rendered = `  <div class="date-time-picker svelte-go79cf" tabindex="0"><div class="tab-container svelte-go79cf" tabindex="-1"><div class="top svelte-go79cf"><button type="button" class="page-button svelte-go79cf" tabindex="-1" data-svelte-h="svelte-t4cock"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-go79cf"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" transform="rotate(180, 12, 12)"></path></svg></button> <div class="dropdown month svelte-go79cf"><select${add_attribute("value", browseMonth, 0)} class="svelte-go79cf">${each(iLocale.months, (monthName, i) => {
      return `<option ${new Date(browseYear, i, getMonthLength(browseYear, i), 23, 59, 59, 999) < min || new Date(browseYear, i) > max ? "disabled" : ""}${add_attribute("value", i, 0)}>${escape(monthName)}</option>`;
    })}</select>  <select class="dummy-select svelte-go79cf" tabindex="-1">${each(iLocale.months, (monthName, i) => {
      return `<option${add_attribute("value", i, 0)} ${i === browseMonth ? "selected" : ""}>${escape(monthName)}</option>`;
    })}</select> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-go79cf"><path d="M6 0l12 12-12 12z" transform="rotate(90, 12, 12)"></path></svg></div> <div class="dropdown year svelte-go79cf"><select${add_attribute("value", browseYear, 0)} class="svelte-go79cf">${each(years, (v) => {
      return `<option${add_attribute("value", v, 0)}>${escape(v)}</option>`;
    })}</select>  <select class="dummy-select svelte-go79cf" tabindex="-1">${each(years, (v) => {
      return `<option${add_attribute("value", v, 0)} ${v === browseDate.getFullYear() ? "selected" : ""}>${escape(v)}</option>`;
    })}</select> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-go79cf"><path d="M6 0l12 12-12 12z" transform="rotate(90, 12, 12)"></path></svg></div> <button type="button" class="page-button svelte-go79cf" tabindex="-1" data-svelte-h="svelte-1a006lp"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-go79cf"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path></svg></button></div> <div class="header svelte-go79cf"> ${each(Array(7), (_, i) => {
      return `${i + iLocale.weekStartsOn < 7 ? `<div class="header-cell svelte-go79cf">${escape(iLocale.weekdays[iLocale.weekStartsOn + i])}</div>` : `<div class="header-cell svelte-go79cf">${escape(iLocale.weekdays[iLocale.weekStartsOn + i - 7])}</div>`}`;
    })}</div>  ${each(Array(6), (_, weekIndex) => {
      return `<div class="week svelte-go79cf">${each(calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7), (calendarDay) => {
        return ` <div class="${[
          "cell svelte-go79cf",
          (!dayIsInRange(calendarDay, min, max) ? "disabled" : "") + " " + (value && calendarDay.year === value.getFullYear() && calendarDay.month === value.getMonth() && calendarDay.number === value.getDate() ? "selected" : "") + " " + (calendarDay.year === todayDate.getFullYear() && calendarDay.month === todayDate.getMonth() && calendarDay.number === todayDate.getDate() ? "today" : "") + " " + (calendarDay.month !== browseMonth ? "other-month" : "")
        ].join(" ").trim()}"><span class="svelte-go79cf">${escape(calendarDay.number)}</span> </div>`;
      })} </div>`;
    })} ${validate_component(TimePicker, "TimePicker").$$render(
      $$result,
      { timePrecision, setTime, browseDate },
      {
        browseDate: ($$value) => {
          browseDate = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${slots.default ? slots.default({}) : ``}</div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
function parse(str, tokens, baseDate) {
  let missingPunctuation = "";
  let valid = true;
  baseDate = baseDate || new Date(2020, 0, 1, 0, 0, 0, 0);
  let year = baseDate.getFullYear();
  let month = baseDate.getMonth();
  let day = baseDate.getDate();
  let hours = baseDate.getHours();
  let minutes = baseDate.getMinutes();
  let seconds = baseDate.getSeconds();
  const ms = baseDate.getMilliseconds();
  function parseString(token) {
    for (let i = 0; i < token.length; i++) {
      if (str.startsWith(token[i])) {
        str = str.slice(1);
      } else {
        valid = false;
        if (str.length === 0)
          missingPunctuation = token.slice(i);
        return;
      }
    }
  }
  function parseUint(pattern, min, max) {
    const matches = str.match(pattern);
    if (matches?.[0]) {
      str = str.slice(matches[0].length);
      const n = parseInt(matches[0]);
      if (n > max || n < min) {
        valid = false;
        return null;
      } else {
        return n;
      }
    } else {
      valid = false;
      return null;
    }
  }
  function parseToken(token) {
    if (typeof token === "string") {
      parseString(token);
    } else if (token.id === "yy") {
      const value = parseUint(/^[0-9]{2}/, 0, 99);
      if (value !== null)
        year = 2e3 + value;
    } else if (token.id === "yyyy") {
      const value = parseUint(/^[0-9]{4}/, 0, 9999);
      if (value !== null)
        year = value;
    } else if (token.id === "MM") {
      const value = parseUint(/^[0-9]{2}/, 1, 12);
      if (value !== null)
        month = value - 1;
    } else if (token.id === "dd") {
      const value = parseUint(/^[0-9]{2}/, 1, 31);
      if (value !== null)
        day = value;
    } else if (token.id === "HH") {
      const value = parseUint(/^[0-9]{2}/, 0, 23);
      if (value !== null)
        hours = value;
    } else if (token.id === "mm") {
      const value = parseUint(/^[0-9]{2}/, 0, 59);
      if (value !== null)
        minutes = value;
    } else if (token.id === "ss") {
      const value = parseUint(/^[0-9]{2}/, 0, 59);
      if (value !== null)
        seconds = value;
    }
  }
  for (const token of tokens) {
    parseToken(token);
    if (!valid)
      break;
  }
  const monthLength = getMonthLength(year, month);
  if (day > monthLength) {
    valid = false;
  }
  return {
    date: valid ? new Date(year, month, day, hours, minutes, seconds, ms) : null,
    missingPunctuation
  };
}
function twoDigit(value) {
  return ("0" + value.toString()).slice(-2);
}
const ruleTokens = [
  {
    id: "yyyy",
    toString: (d) => d.getFullYear().toString()
  },
  {
    id: "yy",
    toString: (d) => d.getFullYear().toString().slice(-2)
  },
  {
    id: "MM",
    toString: (d) => twoDigit(d.getMonth() + 1)
  },
  {
    id: "dd",
    toString: (d) => twoDigit(d.getDate())
  },
  {
    id: "HH",
    toString: (d) => twoDigit(d.getHours())
  },
  {
    id: "mm",
    toString: (d) => twoDigit(d.getMinutes())
  },
  {
    id: "ss",
    toString: (d) => twoDigit(d.getSeconds())
  }
];
function parseRule(s) {
  for (const token of ruleTokens) {
    if (s.startsWith(token.id)) {
      return token;
    }
  }
}
function createFormat(s) {
  const tokens = [];
  while (s.length > 0) {
    const token = parseRule(s);
    if (token) {
      tokens.push(token);
      s = s.slice(token.id.length);
    } else if (typeof tokens[tokens.length - 1] === "string") {
      tokens[tokens.length - 1] += s[0];
      s = s.slice(1);
    } else {
      tokens.push(s[0]);
      s = s.slice(1);
    }
  }
  return tokens;
}
const css = {
  code: ".date-time-field.svelte-1vabmef{position:relative}input.svelte-1vabmef{color:var(--date-picker-foreground, #000000);background:var(--date-picker-background, #ffffff);min-width:0px;box-sizing:border-box;padding:4px 6px;margin:0px;border:1px solid rgba(103, 113, 137, 0.3);border-radius:3px;width:var(--date-input-width, 150px);outline:none;transition:all 80ms cubic-bezier(0.4, 0, 0.2, 1)}input.svelte-1vabmef:focus{border-color:var(--date-picker-highlight-border, #0269f7);box-shadow:0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4))}input.svelte-1vabmef:disabled{opacity:0.5}.invalid.svelte-1vabmef{border:1px solid rgba(249, 47, 114, 0.5);background-color:rgba(249, 47, 114, 0.1)}.invalid.svelte-1vabmef:focus{border-color:#f92f72;box-shadow:0px 0px 0px 2px rgba(249, 47, 114, 0.5)}.picker.svelte-1vabmef{display:none;position:absolute;padding:1px;left:var(--picker-left-position);z-index:10}.picker.above.svelte-1vabmef{bottom:100%}.picker.visible.svelte-1vabmef{display:block}",
  map: `{"version":3,"file":"DateInput.svelte","sources":["DateInput.svelte"],"sourcesContent":["<script>import { fly } from \\"svelte/transition\\";\\nimport { cubicInOut } from \\"svelte/easing\\";\\nimport { toText } from \\"./date-utils.js\\";\\nimport { parse, createFormat } from \\"./parse.js\\";\\nimport DateTimePicker from \\"./DatePicker.svelte\\";\\nimport { writable } from \\"svelte/store\\";\\nimport { createEventDispatcher } from \\"svelte\\";\\nconst dispatch = createEventDispatcher();\\nconst defaultDate = /* @__PURE__ */ new Date();\\nconst innerStore = writable(null);\\nconst store = (() => {\\n  return {\\n    subscribe: innerStore.subscribe,\\n    set: (date) => {\\n      if (date === null || date === void 0) {\\n        innerStore.set(null);\\n        value = date;\\n      } else if (date.getTime() !== $innerStore?.getTime()) {\\n        innerStore.set(date);\\n        value = date;\\n      }\\n    }\\n  };\\n})();\\nexport let value = null;\\n$:\\n  store.set(value);\\nexport let min = new Date(defaultDate.getFullYear() - 20, 0, 1);\\nexport let max = new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999);\\nexport let id = null;\\nexport let placeholder = \\"2020-12-31 23:00:00\\";\\nexport let valid = true;\\nexport let disabled = false;\\nexport let required = false;\\nlet classes = \\"\\";\\nexport { classes as class };\\nexport let format = \\"yyyy-MM-dd HH:mm:ss\\";\\nlet formatTokens = createFormat(format);\\n$:\\n  formatTokens = createFormat(format);\\nexport let locale = {};\\nfunction valueUpdate(value2, formatTokens2) {\\n  text = toText(value2, formatTokens2);\\n}\\n$:\\n  valueUpdate($store, formatTokens);\\nexport let text = toText($store, formatTokens);\\nfunction textUpdate(text2, formatTokens2) {\\n  if (text2.length) {\\n    const result = parse(text2, formatTokens2, $store);\\n    if (result.date !== null) {\\n      valid = true;\\n      store.set(result.date);\\n    } else {\\n      valid = false;\\n    }\\n  } else {\\n    valid = true;\\n    if (value) {\\n      value = null;\\n      store.set(null);\\n    }\\n  }\\n}\\n$:\\n  textUpdate(text, formatTokens);\\nexport let visible = false;\\nexport let closeOnSelection = false;\\nexport let browseWithoutSelecting = false;\\nexport let timePrecision = null;\\nfunction onFocusOut(e) {\\n  if (e?.currentTarget instanceof HTMLElement && e.relatedTarget && e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) {\\n    return;\\n  } else {\\n    visible = false;\\n  }\\n}\\nfunction keydown(e) {\\n  if (e.key === \\"Escape\\" && visible) {\\n    visible = false;\\n    e.preventDefault();\\n    e.stopPropagation();\\n  } else if (e.key === \\"Enter\\") {\\n    visible = !visible;\\n    e.preventDefault();\\n  }\\n}\\nfunction onSelect(e) {\\n  dispatch(\\"select\\", e.detail);\\n  if (closeOnSelection) {\\n    visible = false;\\n  }\\n}\\nexport let dynamicPositioning = false;\\nlet InputElement;\\nlet pickerElement;\\nlet showAbove = false;\\nlet pickerLeftPosition = null;\\nfunction setDatePickerPosition() {\\n  showAbove = false;\\n  pickerLeftPosition = null;\\n  if (visible && pickerElement && dynamicPositioning) {\\n    const inputRect = InputElement.getBoundingClientRect();\\n    const horizontalOverflow = pickerElement.offsetWidth - inputRect.width;\\n    const bottomThreshold = inputRect.bottom + pickerElement.offsetHeight + 5;\\n    const rightThreshold = inputRect.left + pickerElement.offsetWidth + 5;\\n    if (bottomThreshold > window.innerHeight) {\\n      showAbove = true;\\n    }\\n    if (rightThreshold > window.innerWidth) {\\n      pickerLeftPosition = -horizontalOverflow;\\n      if (inputRect.left < horizontalOverflow + 5) {\\n        const windowCenterPos = window.innerWidth / 2;\\n        const newPos = windowCenterPos - pickerElement.offsetWidth / 2;\\n        pickerLeftPosition = newPos - inputRect.left;\\n      }\\n    }\\n  }\\n}\\nfunction flyAutoPosition(node) {\\n  setDatePickerPosition();\\n  return fly(node, {\\n    duration: 200,\\n    easing: cubicInOut,\\n    y: showAbove ? 5 : -5\\n  });\\n}\\n<\/script>\\n\\n<!-- svelte-ignore a11y-no-static-element-interactions -->\\n<div class=\\"date-time-field {classes}\\" on:focusout={onFocusOut} on:keydown={keydown}>\\n\\t<input\\n\\t\\tbind:this={InputElement}\\n\\t\\tclass:invalid={!valid}\\n\\t\\ttype=\\"text\\"\\n\\t\\tautocomplete=\\"off\\"\\n\\t\\tvalue={text}\\n\\t\\t{id}\\n\\t\\t{placeholder}\\n\\t\\t{disabled}\\n\\t\\t{required}\\n\\t\\ton:focus={() => (visible = true)}\\n\\t\\ton:mousedown={() => (visible = true)}\\n\\t\\ton:input={(e) => {\\n\\t\\t\\tif (\\n\\t\\t\\t\\te instanceof InputEvent &&\\n\\t\\t\\t\\te.inputType === 'insertText' &&\\n\\t\\t\\t\\ttypeof e.data === 'string' &&\\n\\t\\t\\t\\te.currentTarget.value === text + e.data\\n\\t\\t\\t) {\\n\\t\\t\\t\\t// check for missing punctuation, and add if there is any\\n\\t\\t\\t\\tlet result = parse(text, formatTokens, $store)\\n\\t\\t\\t\\tif (result.missingPunctuation !== '' && !result.missingPunctuation.startsWith(e.data)) {\\n\\t\\t\\t\\t\\ttext = text + result.missingPunctuation + e.data\\n\\t\\t\\t\\t\\treturn\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\ttext = e.currentTarget.value\\n\\t\\t}}\\n\\t/>\\n\\t{#if visible && !disabled}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"picker\\"\\n\\t\\t\\tclass:visible\\n\\t\\t\\tclass:above={showAbove}\\n\\t\\t\\ttransition:flyAutoPosition\\n\\t\\t\\tbind:this={pickerElement}\\n\\t\\t\\tstyle:--picker-left-position=\\"{pickerLeftPosition}px\\"\\n\\t\\t>\\n\\t\\t\\t<DateTimePicker\\n\\t\\t\\t\\ton:focusout={onFocusOut}\\n\\t\\t\\t\\ton:select={onSelect}\\n\\t\\t\\t\\tbind:value={$store}\\n\\t\\t\\t\\t{min}\\n\\t\\t\\t\\t{max}\\n\\t\\t\\t\\t{locale}\\n\\t\\t\\t\\t{browseWithoutSelecting}\\n\\t\\t\\t\\t{timePrecision}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<slot />\\n\\t\\t\\t</DateTimePicker>\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n\\n<style>.date-time-field {\\n  position: relative;\\n}\\n\\ninput {\\n  color: var(--date-picker-foreground, #000000);\\n  background: var(--date-picker-background, #ffffff);\\n  min-width: 0px;\\n  box-sizing: border-box;\\n  padding: 4px 6px;\\n  margin: 0px;\\n  border: 1px solid rgba(103, 113, 137, 0.3);\\n  border-radius: 3px;\\n  width: var(--date-input-width, 150px);\\n  outline: none;\\n  transition: all 80ms cubic-bezier(0.4, 0, 0.2, 1);\\n}\\ninput:focus {\\n  border-color: var(--date-picker-highlight-border, #0269f7);\\n  box-shadow: 0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4));\\n}\\ninput:disabled {\\n  opacity: 0.5;\\n}\\n\\n.invalid {\\n  border: 1px solid rgba(249, 47, 114, 0.5);\\n  background-color: rgba(249, 47, 114, 0.1);\\n}\\n.invalid:focus {\\n  border-color: #f92f72;\\n  box-shadow: 0px 0px 0px 2px rgba(249, 47, 114, 0.5);\\n}\\n\\n.picker {\\n  display: none;\\n  position: absolute;\\n  padding: 1px;\\n  left: var(--picker-left-position);\\n  z-index: 10;\\n}\\n.picker.above {\\n  bottom: 100%;\\n}\\n.picker.visible {\\n  display: block;\\n}</style>\\n"],"names":[],"mappings":"AAyLO,+BAAiB,CACtB,QAAQ,CAAE,QACZ,CAEA,oBAAM,CACJ,KAAK,CAAE,IAAI,wBAAwB,CAAC,QAAQ,CAAC,CAC7C,UAAU,CAAE,IAAI,wBAAwB,CAAC,QAAQ,CAAC,CAClD,SAAS,CAAE,GAAG,CACd,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,GAAG,CAAC,GAAG,CAChB,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IAAI,kBAAkB,CAAC,MAAM,CAAC,CACrC,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAClD,CACA,oBAAK,MAAO,CACV,YAAY,CAAE,IAAI,8BAA8B,CAAC,QAAQ,CAAC,CAC1D,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,8BAA8B,CAAC,uBAAuB,CACxF,CACA,oBAAK,SAAU,CACb,OAAO,CAAE,GACX,CAEA,uBAAS,CACP,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACzC,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC1C,CACA,uBAAQ,MAAO,CACb,YAAY,CAAE,OAAO,CACrB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CACpD,CAEA,sBAAQ,CACN,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,GAAG,CACZ,IAAI,CAAE,IAAI,sBAAsB,CAAC,CACjC,OAAO,CAAE,EACX,CACA,OAAO,qBAAO,CACZ,MAAM,CAAE,IACV,CACA,OAAO,uBAAS,CACd,OAAO,CAAE,KACX"}`
};
const DateInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  let $innerStore, $$unsubscribe_innerStore;
  createEventDispatcher();
  const defaultDate = /* @__PURE__ */ new Date();
  const innerStore = writable(null);
  $$unsubscribe_innerStore = subscribe(innerStore, (value2) => $innerStore = value2);
  const store = (() => {
    return {
      subscribe: innerStore.subscribe,
      set: (date) => {
        if (date === null || date === void 0) {
          innerStore.set(null);
          value = date;
        } else if (date.getTime() !== $innerStore?.getTime()) {
          innerStore.set(date);
          value = date;
        }
      }
    };
  })();
  $$unsubscribe_store = subscribe(store, (value2) => $store = value2);
  let { value = null } = $$props;
  let { min = new Date(defaultDate.getFullYear() - 20, 0, 1) } = $$props;
  let { max = new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999) } = $$props;
  let { id = null } = $$props;
  let { placeholder = "2020-12-31 23:00:00" } = $$props;
  let { valid = true } = $$props;
  let { disabled = false } = $$props;
  let { required = false } = $$props;
  let { class: classes = "" } = $$props;
  let { format = "yyyy-MM-dd HH:mm:ss" } = $$props;
  let formatTokens = createFormat(format);
  let { locale = {} } = $$props;
  function valueUpdate(value2, formatTokens2) {
    text = toText(value2, formatTokens2);
  }
  let { text = toText($store, formatTokens) } = $$props;
  function textUpdate(text2, formatTokens2) {
    if (text2.length) {
      const result = parse(text2, formatTokens2, $store);
      if (result.date !== null) {
        valid = true;
        store.set(result.date);
      } else {
        valid = false;
      }
    } else {
      valid = true;
      if (value) {
        value = null;
        store.set(null);
      }
    }
  }
  let { visible = false } = $$props;
  let { closeOnSelection = false } = $$props;
  let { browseWithoutSelecting = false } = $$props;
  let { timePrecision = null } = $$props;
  let { dynamicPositioning = false } = $$props;
  let InputElement;
  let pickerElement;
  let pickerLeftPosition = null;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.valid === void 0 && $$bindings.valid && valid !== void 0)
    $$bindings.valid(valid);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  if ($$props.format === void 0 && $$bindings.format && format !== void 0)
    $$bindings.format(format);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  if ($$props.closeOnSelection === void 0 && $$bindings.closeOnSelection && closeOnSelection !== void 0)
    $$bindings.closeOnSelection(closeOnSelection);
  if ($$props.browseWithoutSelecting === void 0 && $$bindings.browseWithoutSelecting && browseWithoutSelecting !== void 0)
    $$bindings.browseWithoutSelecting(browseWithoutSelecting);
  if ($$props.timePrecision === void 0 && $$bindings.timePrecision && timePrecision !== void 0)
    $$bindings.timePrecision(timePrecision);
  if ($$props.dynamicPositioning === void 0 && $$bindings.dynamicPositioning && dynamicPositioning !== void 0)
    $$bindings.dynamicPositioning(dynamicPositioning);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      store.set(value);
    }
    formatTokens = createFormat(format);
    {
      valueUpdate($store, formatTokens);
    }
    {
      textUpdate(text, formatTokens);
    }
    $$rendered = ` <div class="${"date-time-field " + escape(classes, true) + " svelte-1vabmef"}"><input type="text" autocomplete="off"${add_attribute("value", text, 0)}${add_attribute("id", id, 0)}${add_attribute("placeholder", placeholder, 0)} ${disabled ? "disabled" : ""} ${required ? "required" : ""} class="${["svelte-1vabmef", !valid ? "invalid" : ""].join(" ").trim()}"${add_attribute("this", InputElement, 0)}> ${visible && !disabled ? `<div class="${[
      "picker svelte-1vabmef",
      (visible ? "visible" : "") + " "
    ].join(" ").trim()}"${add_styles({
      "--picker-left-position": `${pickerLeftPosition}px`
    })}${add_attribute("this", pickerElement, 0)}>${validate_component(DatePicker, "DateTimePicker").$$render(
      $$result,
      {
        min,
        max,
        locale,
        browseWithoutSelecting,
        timePrecision,
        value: $store
      },
      {
        value: ($$value) => {
          $store = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}</div>` : ``} </div>`;
  } while (!$$settled);
  $$unsubscribe_store();
  $$unsubscribe_innerStore();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let date = /* @__PURE__ */ new Date();
  let allowK1 = false;
  let inputtedComposerCode = "";
  let shouldReplaceStocks = false;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      console.log(inputtedComposerCode);
    }
    $$rendered = `<main class="bg-white min-h-screen flex flex-col items-center justify-center p-8"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-2dq9qu">Historical Ticker Replacer</h1> <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-8 flex flex-col items-center justify-center"><div class="flex items-center mb-4"><input id="allowK1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"${add_attribute("checked", allowK1, 1)}> <label for="allowK1" class="ml-2 text-sm font-medium text-gray-900" data-svelte-h="svelte-1pa5hff">Allow K1</label></div> <div class="flex items-center mb-4"><input id="replaceStocks" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"${add_attribute("checked", shouldReplaceStocks, 1)}> <label for="replaceStocks" class="ml-2 text-sm font-medium text-gray-900" data-svelte-h="svelte-12onqw0">Replace individual stocks</label></div> ${``} <label for="date" class="text-sm font-medium text-gray-900 mb-2" data-svelte-h="svelte-urbtw9">Backtest to:</label> ${validate_component(DateInput, "DateInput").$$render(
      $$result,
      { timePrecision: null, value: date },
      {
        value: ($$value) => {
          date = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <textarea rows="4" class="w-full max-w-md p-2 border border-gray-300 rounded mb-4" placeholder="Insert Composer Code here ">${escape("")}</textarea> <div class="flex items-center gap-3"><button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" ${""}>Submit</button> ${``} ${``}</div> ${``} ${``}</main>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
