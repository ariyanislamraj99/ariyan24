import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const JobPostingSchema = () => {
  const [title,setTitle]=useState(""); const [company,setCompany]=useState(""); const [location,setLocation]=useState(""); const [desc,setDesc]=useState(""); const [salary,setSalary]=useState(""); const [date,setDate]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"JobPosting","title":title,"hiringOrganization":{"@type":"Organization","name":company},"jobLocation":{"@type":"Place","address":location},"description":desc,"baseSalary":{"@type":"MonetaryAmount","currency":"USD","value":salary},"datePosted":date};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Job Title" value={title} onChange={setTitle} placeholder="Senior Developer" />
    <ToolInput label="Company" value={company} onChange={setCompany} placeholder="Acme Inc" />
    <ToolInput label="Location" value={location} onChange={setLocation} placeholder="New York, NY" />
    <ToolInput label="Description" value={desc} onChange={setDesc} multiline rows={3} placeholder="We are looking for..." />
    <ToolInput label="Salary" value={salary} onChange={setSalary} placeholder="80000" />
    <ToolInput label="Date Posted" value={date} onChange={setDate} placeholder="2024-01-15" />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Job Posting Schema" value={output} />
  </ToolLayout>;
};
export default JobPostingSchema;
