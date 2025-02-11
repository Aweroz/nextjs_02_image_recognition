export default function Ingredients({ list }: { list: { name: string, amount: number, unit: string }[] }) {
  return (
    <>
    <h4>Ingredients:</h4>
    <ul>
      {list.map((row) => (
        <li key={row.name}>
          <span>{ row.name }: </span><span><h4 style={{display: 'inline'}}>{row.amount} </h4></span><span>{row.unit}</span>
        </li>
      ))}
    </ul>
    </>
  )
}