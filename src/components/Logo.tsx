export default function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <circle cx="44" cy="60" r="32" fill="none" stroke="#D16B3A" strokeWidth="4" />
      <circle cx="76" cy="60" r="32" fill="none" stroke="#3A7CA5" strokeWidth="4" />
    </svg>
  )
}
