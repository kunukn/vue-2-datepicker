export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type DateYearMonthDay = `${number}-${number}-${number}`

export type Modify<T, R> = Omit<T, keyof R> & R // https://stackoverflow.com/a/55032655/815507
