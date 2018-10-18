class RuleTranslator {
  setApp (app) {
    this.app = app
  }

  getCondition (aCondition) {
    const fact = aCondition.fact
    const op = aCondition.operator
    const value = aCondition.value
    return 'if ' + fact + ' is ' + op + ' to ' + value
  }

  translateOp (op) {
    if (op === 'all') {
      return 'and'
    }
    return 'or'
  }

  translateCondition (conditions) {
    const booleanOp = Object.keys(conditions)[0]
    if (booleanOp === 'all' || booleanOp === 'any') {
      var coloquialRule = ''
      conditions[booleanOp].forEach((aCondition, idx) => {
        coloquialRule += this.translateCondition(aCondition)
        if (idx < (conditions[booleanOp].length - 1)) {
          coloquialRule += ' ' + this.translateOp(booleanOp) + ' '
        }
      })
      return coloquialRule
    }
    return '(' + this.getCondition(conditions) + ')'
  }

  translateRule (aRule) {
    const rule = JSON.parse(aRule)
    const type = rule.event.type
    const params = rule.event.params.data
    return this.translateCondition(rule.conditions) + ' then ' + type + ': ' + params
  }
}
const instance = new RuleTranslator()
export default instance
