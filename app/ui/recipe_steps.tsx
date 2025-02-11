export default function RecipeSteps({ steps }: { steps: string}) {
  const formatted =  steps.replaceAll('\n', '').replaceAll(/\d+\.(?=$| )/g, '\n');
  let lines = formatted.split('\n');
  lines.shift();
  lines = lines.map(line => {
    if (line[0] === ' ') {
      return line.substring(1);
    } else return line;
  })

  return (
    <div className="recipe_steps">
      <h4>Steps to prepare the dish:</h4>
      <ol>
      {lines.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
      </ol>
    </div>
  )
}