export default function Ingredients({ list }: { list: { name: string, amount: number, unit: string }[] }) {
  return (
    <>
    <h4>Ingredients:</h4>
      {list.map((row) => (
        <div key={row.name}>
          <span>{ row.name }: </span><span>{row.amount} </span><span>{row.unit}</span>
        </div>
      ))}
    </>
  )
}