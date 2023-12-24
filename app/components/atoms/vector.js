import CheckVector from "./vectors/check"
import ArrowRightVector from "./vectors/arrowRight"

const svg = {
  check: CheckVector,
  arrowRight: ArrowRightVector,
}

export default function Vector({name, ...props}) {
  const IconComponent = svg[name]
  if (!IconComponent) {
    return null
  }

  return <IconComponent {...props} />
}