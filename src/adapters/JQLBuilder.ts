enum LogicOperators {
  AND = 'AND',
  OR = 'OR',
}
interface Condition {
  key: string;
  operator: string;
  value: unknown;
  logicOperator: string;
}

export default class JQLBuilder {
  private conditions: Condition[];

  constructor() {
    this.conditions = [];
  }

  where(key: string, operator: string, value: unknown): JQLBuilder {
    this.conditions.push({ key: key, operator: operator, value: value, logicOperator: LogicOperators.AND });
    return this;
  }

  whereIn(key: string, value: unknown): JQLBuilder {
    this.conditions.push({ key: key, operator: 'IN', value: `(${value})`, logicOperator: LogicOperators.AND });
    return this;
  }

  when(condition: unknown, callback: (builder: JQLBuilder) => void): JQLBuilder {
    if (condition) {
      callback(this);
      return this;
    } else {
      return this;
    }
  }

  toString(): string {
    if (!this.conditions.length) {
      return '';
    }

    return this.conditions.reduce((previousValue: string, currentValue: Condition): string => {
      let condition = '';
      if (Array.isArray(currentValue.value) || currentValue.logicOperator === 'IN') {
        condition = `${currentValue.key} ${currentValue.operator} ${Array(currentValue.value).join(', ')}`;
      } else if (typeof currentValue.value === 'string' || typeof currentValue.value === 'number') {
        condition = `${currentValue.key} ${currentValue.operator} ${currentValue.value}`;
      }
      return `${previousValue} ${previousValue ? currentValue.logicOperator : ''} ${condition}`;
    }, '');
  }
}
