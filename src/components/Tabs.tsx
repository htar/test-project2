import * as React from 'react'

export type TabItem<T extends string = string> = {
  value: T
  label: React.ReactNode
}

type TabsProps<T extends string> = {
  items: Array<TabItem<T>>
  value?: T
  onChange?: (value: T) => void
}
export const Tabs = <T extends string>({
  items,
  value,
  onChange,
}: TabsProps<T>) => {
  const [selected, setSelected] = React.useState<string>(value)
  const select = (v: T) => {
    setSelected(v)
    onChange?.(v)
  }

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="inline-flex overflow-hidden rounded-md border "
    >
      {items.map((t: TabItem<T>) => {
        const active = t.value === selected
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={active}
            disabled={t.disabled}
            onClick={() => select(t.value)}
            className={[
              'px-5 py-2 text-sm transition cursor-pointer',

              active ? 'bg-black text-white hover:bg-black' : 'text-black',
            ].join(' ')}
            type="button"
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
