export const multiplesFilterCallback = (food, filterKey) => {
    const activeFilterList = filterKey.filter((filter) => filter.isActive)
    return activeFilterList.every((filter) =>
        filter.condition(food[filter.name])
    )
}
