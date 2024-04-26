export default function promisify<T>(value: T): Promise<T> {
  return new Promise((res) => {
    res(value);
  });
}
