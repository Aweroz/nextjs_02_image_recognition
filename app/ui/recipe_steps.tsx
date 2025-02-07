export default function RecipeSteps({ steps }: { steps: string}) {
  const formatted =  steps.replaceAll('\n', '').replaceAll(/\d+\.(?=$| )/g, '\n');
  const lines = formatted.split('\n');
  lines.shift();

  return (
    <div className="recipe_steps">
      <h4>Steps to prepare the dish:</h4>
      {lines.map((line, i) => (
        <div key={i}>{i + 1}. {line}</div>
      ))}
    </div>
  )
}