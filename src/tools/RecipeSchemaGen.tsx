import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const RecipeSchemaGen = () => {
  const [name,setName]=useState(""); const [desc,setDesc]=useState(""); const [prep,setPrep]=useState("PT15M"); const [cook,setCook]=useState("PT30M"); const [ingredients,setIngredients]=useState(""); const [instructions,setInstructions]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"Recipe","name":name,"description":desc,"prepTime":prep,"cookTime":cook,"recipeIngredient":ingredients.split("\n").filter(Boolean),"recipeInstructions":instructions.split("\n").filter(Boolean).map(s=>({"@type":"HowToStep","text":s}))};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Recipe Name" value={name} onChange={setName} placeholder="Chocolate Cake" />
    <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="A delicious..." />
    <ToolInput label="Prep Time (ISO)" value={prep} onChange={setPrep} placeholder="PT15M" />
    <ToolInput label="Cook Time (ISO)" value={cook} onChange={setCook} placeholder="PT30M" />
    <ToolInput label="Ingredients (one per line)" value={ingredients} onChange={setIngredients} multiline rows={4} placeholder="2 cups flour\n1 cup sugar" />
    <ToolInput label="Instructions (one per line)" value={instructions} onChange={setInstructions} multiline rows={4} placeholder="Preheat oven to 350°F\nMix dry ingredients" />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Recipe Schema" value={output} />
  </ToolLayout>;
};
export default RecipeSchemaGen;
