import { Select } from "antd";
type ValueLabel = {
    label: string;
    value: string;
  };
import type { SelectProps } from "antd";

const MultiSelections = ({
  values,
  assignValue,
  firstValue ='',
}: {
  values: ValueLabel[];
  assignValue: Function;
  firstValue?: string;
}) => {

  const options: SelectProps["options"] = values;

  return (
    <div>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        onChange={(value: string[])=> assignValue(value)}
        options={options}
      />
    </div>
  );
};

export default MultiSelections;
