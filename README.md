# use-form-custom-hook

It is a react library which simplies form validation and error handling using react hooks

## Installation

Install use-form-custom-hook library with npm

```bash
  npm install use-form-custom-hook
```

## Usage/Examples

```ts
import { useFormHook } from "use-form-custom-hook";

const HomePage = () => {
  const {
    err: endDateError,
    value: endDateValue,
    valueChangeHandler: endDateChangeHandler,
  } = useFormHook("Start Date", { required: true });

  return (
    <div>
      <label htmlFor="startDate">Start Date</label>
      <input
        id="startDate"
        type="date"
        placeholder="Start Days"
        ref={daysRef}
        min={new Date().toLocaleString().split(",")[0]}
        onBlur={startDateChangeHandler}
      />
      <div>
        {startDateError && (
          <p className="text-xs color text-red-600 pl-1">{startDateError}</p>
        )}
      </div>
    </div>
  );
};
```

In the above example we provided two things

1. Form Control Name - "Start Date"
2. Validation Object - "{ required: true }"

let us understand this

1. You can provide any name to any input Control
2. You can provide different types of validation and also there custom validation message to be shown

in the above example I provided with _required_ validation with no custom message
so in case no value is provided **onBlur** following message will be shown
**'Start Date is required'**

In case you want to provide custom required message you can pass following Object

**'{ required: true, requiredErrorMessage: 'Start Date is Mandatory'}'**

This was the one simple use case, for the other such generic use cases- eg(max, min , pattern) you can refer the validation type description

```
export type validation = {
  max?: number;
  min?: number;
  pattern?: string;
  required?: boolean;
  custom?: any;
  requiredErrorMessage?: string;
  minErrorMessage?: string;
  maxErrorMessage?: string;
  minMaxErrorMessage?: string;
  patternErrorMessage?: string;
  customErrorMessage?: string;
};
```

Moving on to complex use cases-

Custom validation -
you can provide your own validaiton definition in
custom property which will require the value of your own input Control

eg -

```ts
const customValidator = (startValue: any) => {
  // perform some computation here with the value passed
  // return true if the computation is successful
  // return false if the computation fails
};
```

and provide that custom validator function in
the validation object as shown below

```ts
{
  custom: customValidator;
}
```

if the validation fails and no customErrorMessage
is provided the following error is displayed

"<Form Control Name> is invalid"
