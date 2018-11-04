/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
Array.prototype.groupBy = function (prop) {
  return this.reduce(function (groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}
