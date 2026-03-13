import { useState } from "react";
import { ToolLayout, ToolInput, ToolSelect, ToolButton, ToolOutput } from "./ToolComponents";
const LinkBuildingPlanner = () => {
  const [niche, setNiche] = useState(""); const [strategy, setStrategy] = useState("guest-posting"); const [output, setOutput] = useState("");
  const plan = () => {
    const strategies: Record<string,string> = {
      "guest-posting": `📝 Guest Posting Plan\n\n1. Research ${niche} blogs accepting guest posts\n2. Create a list of 20-30 target sites\n3. Craft personalized outreach emails\n4. Write high-quality, unique articles\n5. Include natural contextual links\n\n📧 Outreach Template:\nSubject: Guest Post Idea for [Blog Name]\n\nHi [Name],\n\nI'm a ${niche} expert and I'd love to contribute an article to [Blog]. I noticed your readers would benefit from [topic idea].\n\nWould you be interested?\n\nBest regards`,
      "broken-link": `🔗 Broken Link Building Plan\n\n1. Find ${niche} resource pages\n2. Use tools to scan for broken links\n3. Create replacement content\n4. Email webmasters about broken links\n5. Suggest your content as replacement\n\n📧 Template:\nSubject: Broken link on [Page]\n\nHi, I found a broken link on your ${niche} resources page: [broken URL]. I have a similar resource that could replace it: [your URL].`,
      "skyscraper": `🏗️ Skyscraper Technique Plan\n\n1. Find popular ${niche} content with many backlinks\n2. Create something 10x better\n3. Reach out to sites linking to original\n4. Show why your content is superior\n\nSteps:\n• Find top content in ${niche}\n• Make it longer, more detailed, updated\n• Add visuals, data, examples\n• Email all linkers to the original`,
      "resource-pages": `📚 Resource Page Link Building\n\n1. Search: "${niche}" + "resources" / "useful links"\n2. Find relevant resource pages\n3. Ensure your content fits\n4. Send a brief, friendly email\n\nSearch queries:\n• "${niche} resources"\n• "${niche} useful links"\n• "best ${niche} tools"\n• "${niche} directory"`
    };
    setOutput(strategies[strategy] || "Select a strategy");
  };
  return <ToolLayout>
    <ToolInput label="Your Niche" value={niche} onChange={setNiche} placeholder="e.g., Digital Marketing" />
    <ToolSelect label="Strategy" value={strategy} onChange={setStrategy} options={[{value:"guest-posting",label:"Guest Posting"},{value:"broken-link",label:"Broken Link Building"},{value:"skyscraper",label:"Skyscraper Technique"},{value:"resource-pages",label:"Resource Pages"}]} />
    <ToolButton onClick={plan}>Generate Plan</ToolButton>
    <ToolOutput label="Link Building Plan" value={output} />
  </ToolLayout>;
};
export default LinkBuildingPlanner;
