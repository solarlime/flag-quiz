export default async function waitFor(ms: number) {
  return new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, ms);
  });
}
