import ArrowRightVector from "./vectors/arrowRight"
import CheckVector from "./vectors/check"
import DividerVector from "./vectors/divider"

const svg = {
  arrowRight: ArrowRightVector,
  check: CheckVector,
  divider: DividerVector,
}

export default function Vector({
  name, 
  ...props
} : {
  name: string
}) {
  const IconComponent = svg[name]
  if (!IconComponent) {
    return null
  }

  return <IconComponent {...props} />
}