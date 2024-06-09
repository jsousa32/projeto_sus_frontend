export class TimerUtils {
  static check(time: number) {
    return new Promise<boolean>((res) => {
      window.innerWidth <= 1278 ? res(false) : setTimeout(() => res(false), time);
    });
  }
}
