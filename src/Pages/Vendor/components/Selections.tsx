import { Select } from "@chakra-ui/react";
const Selections = ({
  values,
  assignValue,
  firstValue,
}: {
  values: string[];
  assignValue: Function;
  firstValue?: string;
}) => {
  return (
    <>
      <Select
        value={firstValue}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          assignValue(e.target.value)
        }
        // mb={4}
        placeholder="Select"
      >
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </>
  );
};

export default Selections;
