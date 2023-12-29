export default function DividerVector(props) {
  return (
    <svg
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1={2} y1={2} x2={22} y2={10} />
      <line x1={22} y1={2} x2={42} y2={10} />
      <line x1={42} y1={2} x2={62} y2={10} />
      <line x1={62} y1={2} x2={82} y2={10} />
      <line x1={82} y1={2} x2={102} y2={10} />
    </svg>
  )
}