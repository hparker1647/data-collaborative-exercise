export function mean(args: number[]): number {
  return args.reduce((sum, val) => {
    return sum + val;
  }, 0) / args.length;
}
