export default async function waitFor(ms: number, abortSignal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, ms);

    if (abortSignal) {
      abortSignal.addEventListener(
        'abort',
        () => {
          clearTimeout(timeout);
          reject();
        },
        { once: true },
      );
    }
  });
}
