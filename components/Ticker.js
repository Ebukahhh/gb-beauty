import { Fragment } from 'react'

const items = [
  'Facials', 'Massages', 'Waxing', 'Body Scrubs',
  'Fashion Braces', 'Tooth Gems', 'GB Beauty Spa — Lagos',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <Fragment key={i}>
            <span>{item}</span>
            <span className="ticker-sep">·</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
