import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput, ToolSelect } from "./ToolComponents";

const templates: Record<string, string[]> = {
  thanks: [
    "Thank you so much for watching! 🙏 Your support means everything!",
    "Appreciate you taking the time to watch! Don't forget to subscribe for more content! 🔔",
    "Thanks for being part of this community! What would you like to see next?",
    "Your support keeps me creating! Thank you! 💪",
  ],
  question: [
    "Great question! {answer} Hope that helps! 😊",
    "Thanks for asking! {answer} Let me know if you have more questions!",
    "I get this question a lot! {answer} Happy to clarify further!",
    "Love this question! {answer} Feel free to ask more!",
  ],
  negative: [
    "I appreciate your feedback! I'm always looking to improve. What specifically would make this better?",
    "Thanks for sharing your thoughts. I'll take this into consideration for future videos!",
    "Sorry to hear it didn't meet your expectations. I'd love to know how I can do better!",
    "Every feedback helps me grow. Thanks for being honest! 🙏",
  ],
  collab: [
    "Hey! Thanks for reaching out! I'd love to discuss collaboration. Send me a DM or email at {email}!",
    "Collaboration sounds exciting! Let's connect - check my About page for contact info! 🤝",
    "I'm always open to collabs! What did you have in mind? Drop me a message!",
  ],
  promo: [
    "Thanks for the interest! Check out the link in the description for more info! 👇",
    "All the details are in the video description! Let me know if you have questions!",
    "Great timing! I just linked everything in the description below! 🔗",
  ],
  engagement: [
    "What are YOUR thoughts on this? Drop a comment below! 👇",
    "Did this help you? Let me know in the comments! Your feedback shapes future content!",
    "Which part was most helpful? I'd love to know! 💬",
    "Agree or disagree? Let's discuss in the comments! 🗣️",
  ],
};

const YtCommentTemplates = () => {
  const [category, setCategory] = useState("thanks");
  const [customVar, setCustomVar] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    const categoryTemplates = templates[category] || templates.thanks;
    const populated = categoryTemplates.map(t => 
      t.replace("{answer}", customVar || "[your answer]")
       .replace("{email}", customVar || "your@email.com")
    );

    setResult(
      `💬 Comment Templates: ${category.toUpperCase()}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      populated.map((t, i) => `${i + 1}. ${t}`).join("\n\n") +
      `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `💡 Tips for Engaging Comments:\n` +
      `• Reply within the first hour for algorithm boost\n` +
      `• Ask follow-up questions to encourage conversation\n` +
      `• Use emojis to add personality\n` +
      `• Pin the best comment to encourage more engagement\n` +
      `• Heart comments to show appreciation`
    );
  };

  return (
    <ToolLayout>
      <ToolSelect 
        label="Template Category" 
        value={category} 
        onChange={setCategory}
        options={[
          { value: "thanks", label: "Thank You Responses" },
          { value: "question", label: "Question Responses" },
          { value: "negative", label: "Negative Feedback" },
          { value: "collab", label: "Collaboration Requests" },
          { value: "promo", label: "Promo/Link Requests" },
          { value: "engagement", label: "Engagement Boosters" },
        ]}
      />
      <ToolInput 
        label="Custom Variable (answer, email, etc.)" 
        value={customVar} 
        onChange={setCustomVar} 
        placeholder="Optional: Your specific answer or email..." 
      />
      <ToolButton onClick={generate}>Generate Templates</ToolButton>
      {result && <ToolOutput label="Comment Templates" value={result} />}
    </ToolLayout>
  );
};

export default YtCommentTemplates;
