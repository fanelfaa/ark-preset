import type { DateValue } from "@internationalized/date";
import {
  DatePicker,
  DatePickerLabel,
  DatePickerControl,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerPositioner,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerViewTrigger,
  DatePickerRangeText,
  DatePickerContext,
  DatePickerTable,
  DatePickerTableHead,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableHeader,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
} from "@ui/solid";
import type { UseDatePickerContext } from "@ark-ui/solid/date-picker";
import { Portal } from "solid-js/web";

export default function DatePickerBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <DatePicker class="flex flex-col gap-1">
        <DatePickerLabel>Label</DatePickerLabel>
        <DatePickerControl>
          <DatePickerInput />
          <DatePickerTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-4"
            >
              <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
              <path d="M16 3v4" />
              <path d="M8 3v4" />
              <path d="M4 11h16" />
              <path d="M11 15h1" />
              <path d="M12 15v3" />
              <title>Calendar</title>
            </svg>
          </DatePickerTrigger>
          <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
        </DatePickerControl>
        <Portal>
          <DatePickerPositioner>
            <DatePickerContent>
              <DatePickerView view="day">
                <DatePickerContext>
                  {(datePicker: UseDatePickerContext) => (
                    <>
                      <DatePickerViewControl>
                        <DatePickerPrevTrigger>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-4"
                          >
                            <path d="M15 6l-6 6l6 6" />
                            <title>Previous</title>
                          </svg>
                        </DatePickerPrevTrigger>
                        <DatePickerViewTrigger>
                          <DatePickerRangeText />
                        </DatePickerViewTrigger>
                        <DatePickerNextTrigger>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-4"
                          >
                            <path d="M9 6l6 6l-6 6" />
                            <title>Next</title>
                          </svg>
                        </DatePickerNextTrigger>
                      </DatePickerViewControl>
                      <DatePickerTable>
                        <DatePickerTableHead>
                          <DatePickerTableRow>
                            {datePicker().weekDays.map((weekDay: { short: string }) => (
                              <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                            ))}
                          </DatePickerTableRow>
                        </DatePickerTableHead>
                        <DatePickerTableBody>
                          {datePicker().weeks.map((week: DateValue[]) => (
                            <DatePickerTableRow>
                              {week.map((day: DateValue) => (
                                <DatePickerTableCell value={day}>
                                  <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                                </DatePickerTableCell>
                              ))}
                            </DatePickerTableRow>
                          ))}
                        </DatePickerTableBody>
                      </DatePickerTable>
                    </>
                  )}
                </DatePickerContext>
              </DatePickerView>
              <DatePickerView view="month">
                <DatePickerContext>
                  {(datePicker: UseDatePickerContext) => (
                    <>
                      <DatePickerViewControl>
                        <DatePickerPrevTrigger>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-4"
                          >
                            <path d="M15 6l-6 6l6 6" />
                            <title>Previous</title>
                          </svg>
                        </DatePickerPrevTrigger>
                        <DatePickerViewTrigger>
                          <DatePickerRangeText />
                        </DatePickerViewTrigger>
                        <DatePickerNextTrigger>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-4"
                          >
                            <path d="M9 6l6 6l-6 6" />
                            <title>Next</title>
                          </svg>
                        </DatePickerNextTrigger>
                      </DatePickerViewControl>
                      <DatePickerTable>
                        <DatePickerTableBody>
                          {datePicker()
                            .getMonthsGrid({ columns: 4, format: "short" })
                            .map((months: { value: number; label: string }[]) => (
                              <DatePickerTableRow>
                                {months.map((month: { value: number; label: string }) => (
                                  <DatePickerTableCell value={month.value}>
                                    <DatePickerTableCellTrigger>
                                      {month.label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                ))}
                              </DatePickerTableRow>
                            ))}
                        </DatePickerTableBody>
                      </DatePickerTable>
                    </>
                  )}
                </DatePickerContext>
              </DatePickerView>
              <DatePickerView view="year">
                <DatePickerContext>
                  {(datePicker: UseDatePickerContext) => (
                    <>
                      <DatePickerViewControl>
                        <DatePickerPrevTrigger>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-4"
                          >
                            <path d="M15 6l-6 6l6 6" />
                            <title>Previous</title>
                          </svg>
                        </DatePickerPrevTrigger>
                        <DatePickerViewTrigger>
                          <DatePickerRangeText />
                        </DatePickerViewTrigger>
                        <DatePickerNextTrigger>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-4"
                          >
                            <path d="M9 6l6 6l-6 6" />
                            <title>Next</title>
                          </svg>
                        </DatePickerNextTrigger>
                      </DatePickerViewControl>
                      <DatePickerTable>
                        <DatePickerTableBody>
                          {datePicker()
                            .getYearsGrid({ columns: 4 })
                            .map((years: { value: number; label: string }[]) => (
                              <DatePickerTableRow>
                                {years.map((year: { value: number; label: string }) => (
                                  <DatePickerTableCell value={year.value}>
                                    <DatePickerTableCellTrigger>
                                      {year.label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                ))}
                              </DatePickerTableRow>
                            ))}
                        </DatePickerTableBody>
                      </DatePickerTable>
                    </>
                  )}
                </DatePickerContext>
              </DatePickerView>
            </DatePickerContent>
          </DatePickerPositioner>
        </Portal>
      </DatePicker>
    </div>
  );
}
