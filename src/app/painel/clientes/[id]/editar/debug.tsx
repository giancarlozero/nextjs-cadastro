export default function DebugPage({ params }) {
  console.log("DEBUG PARAMS:", params)
  return <pre>{JSON.stringify(params, null, 2)}</pre>
}
