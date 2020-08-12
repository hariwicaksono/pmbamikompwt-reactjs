const getRegions = country => {
    // Simulate async call
    return new Promise((resolve, reject) => {
      switch (country) {
        case "United States":
          resolve([
            { value: "Washington", label: "Washington" },
            { value: "California", label: "California" }
          ]);
          break;
        case "Canada":
          resolve([
            { value: "Alberta", label: "Alberta" },
            { value: "NovaScotia", label: "Nova Scotia" }
          ]);
          break;
        default:
          resolve([]);
      }
    });
  };

const {
    values,
    handleChange,
    setFieldValue
  } = props;


<label htmlFor="country">Country</label>
<Field
  id="country"
  name="country"
  as="select"
  value={values.country}
  onChange={async e => {
    const { value } = e.target;
    const _regions = await getRegions(value);
    console.log(_regions);
    setFieldValue("country", value);
    setFieldValue("region", "");
    setFieldValue("regions", _regions);
  }}
>
  <option value="None">Select country</option>
  <option value="United States">United States</option>
  <option value="Canada">Canada</option>
</Field>
 <label htmlFor="region">Region</label>
 <Field
   value={values.region}
   id="region"
   name="region"
   as="select"
   onChange={handleChange}
 >
   <option value="None">Select region</option>
   {values.regions &&
     values.regions.map(r => (
       <option key={r.value} value={r.value}>
         {r.label}
       </option>
     ))}
 </Field>