export function mean(args: number[]): number {
  return args.reduce((sum, val) => {
    return sum + val;
  }, 0) / args.length;
}

export const dateKeyRegex = /^\d\d\d\d-\d\d-\d\d$/;

export function dateKeyToDate(key?: string): Date | undefined {
  if (typeof key === 'string') {
    const vals = key.split('-');
    if (vals.length === 3) {
      return new Date(Number(vals[0]), Number(vals[1]) - 1, Number(vals[2]));
    }
  }
}

export function dateToDateKey(val: Date): string {
  return `${lPad(val.getUTCFullYear(), 4)}-${lPad(val.getUTCMonth() + 1, 2)}-${lPad(val.getUTCDate(), 2)}`;
}

function lPad(num: number, len: number): string {
  let result = `${num}`;
  while (result.length < len) {
    result = `0${result}`;
  }
  return result;
}
