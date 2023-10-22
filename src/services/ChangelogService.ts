import { TransitionCount } from '@/interfaces/TransitionCount';
import Changelog from '@/adapters/Changelog';
import ChangelogItem from '@/adapters/ChangelogItem';
import { ChangelogItemField } from '@/enums/ChangelogItemField';

const buildKey = (from: number, to: number): string => `${from}-${to}`;

export default class ChangelogService {
  calcTransitionsCount(logs: Changelog[]): TransitionCount[] {
    const map: Map<string, TransitionCount> = new Map();

    logs.forEach((log: Changelog) => {
      log.items.forEach((item: ChangelogItem) => {
        if (item.field !== ChangelogItemField.STATUS) {
          return;
        }

        if (!item.from || !item.to) {
          return;
        }

        const key = buildKey(item.from, item.to);
        const counter: TransitionCount = map.has(key)
          ? (map.get(key) as TransitionCount)
          : {
              from: item.from,
              to: item.to,
              count: 0,
            };

        counter.count++;
        map.set(key, counter);
      });
    });

    return Array.from(map.values());
  }

  aggregateTransitionsCount(counts: TransitionCount[]): TransitionCount[] {
    const map: Map<string, TransitionCount> = new Map();

    counts.forEach((count: TransitionCount): void => {
      const key = buildKey(count.from, count.to);
      const counter: TransitionCount = map.has(key)
        ? (map.get(key) as TransitionCount)
        : {
            from: count.from,
            to: count.to,
            count: count.count,
          };

      counter.count++;
      map.set(key, counter);
    });

    return Array.from(map.values());
  }
}
